package com.xwallet.crypto;

import java.util.*;
import java.io.*;
//import android.util.Log;

import java.security.SecureRandom;
import java.math.BigInteger;

import com.google.common.base.Joiner;

import org.bitcoinj.core.ECKey;
import org.bitcoinj.core.ECKey.ECDSASignature;
import org.bitcoinj.core.Base58;
import org.bitcoinj.core.NetworkParameters;
import org.bitcoinj.core.DumpedPrivateKey;
import org.bitcoinj.core.Sha256Hash;
import org.bitcoinj.core.Utils;
import org.bitcoinj.core.AddressFormatException;

import org.bitcoinj.crypto.ChildNumber;
import org.bitcoinj.crypto.MnemonicCode;
import org.bitcoinj.crypto.MnemonicException.MnemonicLengthException;
import org.bitcoinj.crypto.HDKeyDerivation;
import org.bitcoinj.crypto.DeterministicKey;
import org.bitcoinj.crypto.LinuxSecureRandom;

import org.spongycastle.math.ec.ECPoint;
import org.spongycastle.crypto.macs.HMac;
import org.spongycastle.crypto.digests.SHA512Digest;
import org.spongycastle.crypto.digests.SHA256Digest;
import org.spongycastle.crypto.digests.SHA224Digest;
import org.spongycastle.crypto.digests.RIPEMD160Digest;
import org.spongycastle.crypto.params.KeyParameter;

import org.spongycastle.crypto.BufferedBlockCipher;
import org.spongycastle.crypto.engines.AESFastEngine;
import org.spongycastle.crypto.modes.CBCBlockCipher;
import org.spongycastle.crypto.paddings.PaddedBufferedBlockCipher;
import org.spongycastle.crypto.params.ParametersWithIV;
import org.spongycastle.crypto.CipherParameters;
import org.spongycastle.crypto.InvalidCipherTextException;

import com.subgraph.orchid.encoders.Hex;

import org.bitcoinj.params.MainNetParams;

import com.xwallet.crypto.UWFileOpener;

public class UWCryptoModule_impl {

  private UWFileOpener mFileOpener;

  String BTS_PREFIX = "BTS";

  String BIP39_ENGLISH_SHA256 = "ad90bf3beb7b0eb7e5acd74727dc0da96e0a280a258354e7293fb7e211ac03db";
  String BIP39_ENGLISH_FILE   = "english.txt";

  String BIP39_SPANISH_SHA256 = "a556a26c6a5bb36db0fb7d8bf579cb7465fcaeec03957c0dda61b569962d9da5";
  String BIP39_SPANISH_FILE   = "spanish.txt";

  public UWCryptoModule_impl(UWFileOpener fileOpener) {
    mFileOpener = fileOpener;
    new LinuxSecureRandom();
  }

  private boolean arraysEquals(byte[] arr1, int offset1, byte[] arr2, int offset2, int count) {
    boolean r = true;
    for(int i=0; i<count; i++) {
      r = (arr1[i+offset1] == arr2[i+offset2]);
      if(r == false) break;
    }
    return r;
  }

  private byte[] sha224(byte[] bytes) {
    SHA224Digest digest = new SHA224Digest();
    digest.update(bytes, 0, bytes.length);
    byte[] ret = new byte[digest.getDigestSize()];
    digest.doFinal(ret, 0);
    return ret;
  }

  private byte[] sha256(byte[] bytes) {
    SHA256Digest digest = new SHA256Digest();
    digest.update(bytes, 0, bytes.length);
    byte[] ret = new byte[digest.getDigestSize()];
    digest.doFinal(ret, 0);
    return ret;
  }

  private byte[] sha512(byte[] bytes) {
    SHA512Digest digest = new SHA512Digest();
    digest.update(bytes, 0, bytes.length);
    byte[] ret = new byte[digest.getDigestSize()];
    digest.doFinal(ret, 0);
    return ret;
  }

  private HMac createHmacSha256Digest(byte[] key) {
    SHA256Digest digest = new SHA256Digest();
    HMac hMac = new HMac(digest);
    hMac.init(new KeyParameter(key));
    return hMac;
  }

  private byte[] hmacSha256(HMac hmacSha256, byte[] input) {
    hmacSha256.reset();
    hmacSha256.update(input, 0, input.length);
    byte[] out = new byte[32];
    hmacSha256.doFinal(out, 0);
    return out;
  }

  private byte[] hmacSha256(byte[] key, byte[] data) {
    return hmacSha256(createHmacSha256Digest(key), data);
  }

  private byte[] ripemd160(byte[] bytes) {
    RIPEMD160Digest digest = new RIPEMD160Digest();
    digest.update(bytes, 0, bytes.length);
    byte[] ret = new byte[digest.getDigestSize()];
    digest.doFinal(ret, 0);
    return ret;
  }

  private String pubKeyToAddress(byte[] pubkey) {
    byte[] r = ripemd160( sha512(pubkey) );
    byte[] c = ripemd160( r );
    byte[] tmp = new byte[r.length+4];
    System.arraycopy(r, 0, tmp, 0, r.length);
    System.arraycopy(c, 0, tmp, r.length, 4);
    return BTS_PREFIX + Base58.encode(tmp);
  }

  private String encodePubKey(byte[] pubkey) {
    byte[] r = ripemd160( pubkey );
    byte[] tmp = new byte[pubkey.length+4];
    System.arraycopy(pubkey, 0, tmp, 0, pubkey.length);
    System.arraycopy(r, 0, tmp, pubkey.length, 4);
    return BTS_PREFIX + Base58.encode(tmp);
  }

  private byte[] decodePubKey(String pubkey) throws Exception {
    if(pubkey.indexOf(BTS_PREFIX) != 0) throw new Exception("invalid prefix");
    byte[] data = Base58.decode(pubkey.substring(3));
    if(data.length != 37) throw new Exception("invalid length");
    byte[] c1 = Arrays.copyOfRange(data, 33, 37);
    byte[] pubkey_data = Arrays.copyOfRange(data, 0, 33);
    byte[] c2 = ripemd160(pubkey_data);
    if(!((c1[0] == c2[0] && c1[1] == c2[1] && c1[2] == c2[2] && c1[3] == c2[3]))) throw new Exception("invalid checksum");
    return pubkey_data;
  }

  private byte[] getSharedSecret(ECKey Qp, ECKey dd) {
    ECKey tmp = ECKey.fromPublicOnly( ECKey.compressPoint(Qp.getPubKeyPoint().multiply(dd.getPrivKey())) );
    byte[] Xk_b = Arrays.copyOfRange(tmp.getPubKey(), 1, 33);
    return sha512(Xk_b);
  }

  private DeterministicKey fromB58(String parent, String key) {
    if ( key.isEmpty() )
      return null;
      
    if ( parent.isEmpty() )
      return DeterministicKey.deserializeB58(null, key, MainNetParams.get());

    return DeterministicKey.deserializeB58(DeterministicKey.deserializeB58(null, parent, MainNetParams.get()), key, MainNetParams.get());
  }

  public HashMap<String, String> generateMnemonic(String lang, int entropy) throws IOException, MnemonicLengthException {

    String file_name   = BIP39_ENGLISH_FILE;
    String file_sha256 = BIP39_ENGLISH_SHA256;

    if(lang.equals("es")) {
      file_name   = BIP39_SPANISH_FILE;
      file_sha256 = BIP39_SPANISH_SHA256;
    }

    InputStream fp = mFileOpener.open(file_name);
    MnemonicCode mc = new MnemonicCode(fp, file_sha256);

    String mnemonic = Joiner.on(" ").join( mc.toMnemonic(new SecureRandom().generateSeed(entropy/8)) );

    HashMap<String, String> res = new HashMap<String, String>();
    res.put("mnemonic", mnemonic);
    
    fp.close();

    return res;
  }

  public HashMap<String, String> mnemonicToMasterKey( String oldWords ) throws IOException, Exception {
    
    String words = new String(oldWords.getBytes("UTF-8"), "UTF-8");
    
    byte[] seed = MnemonicCode.toSeed(Arrays.asList(words.split(" ")), "");

    DeterministicKey dk = HDKeyDerivation.createMasterPrivateKey(seed);
    
    HashMap<String, String> res = new HashMap<String, String>();
    
    String peto = dk.serializePrivB58(MainNetParams.get());

    res.put("masterPrivateKey", peto);
    return res;
  }

  public HashMap<String, String> derivePrivate(String grandParent, String parent, String key, int deriv) throws UnsupportedEncodingException {
    
    DeterministicKey dk = HDKeyDerivation.deriveChildKey(DeterministicKey.deserializeB58(fromB58(grandParent, parent), key, MainNetParams.get()), new ChildNumber(deriv, true));
    String child = dk.serializePrivB58(MainNetParams.get());

    HashMap<String, String> res = extractDataFromKey(parent, key, child);
    res.put("extendedPrivateKey", child);
    return res;
  }

  public HashMap<String, String> extractDataFromKey(String grandParent, String parent, String key) throws UnsupportedEncodingException {

    DeterministicKey dk = DeterministicKey.deserializeB58(fromB58(grandParent, parent), key, MainNetParams.get());
    byte[] pubkey =  ECKey.publicKeyFromPrivate(dk.getPrivKey(), true);

    HashMap<String, String> res = new HashMap<String, String>();
    res.put("address", pubKeyToAddress(pubkey));
    res.put("pubkey" , encodePubKey(pubkey));
    res.put("privkey", new String(Hex.encode(dk.getPrivKeyBytes()), "UTF-8"));
    return res;
  }

  private byte[] compactSing(Sha256Hash hash, ECKey key) {
    ECKey.ECDSASignature sig = key.sign(hash).toCanonicalised();

    ECPoint pub = key.getPubKeyPoint();
    
    // Now we have to work backwards to figure out the recId needed to recover the signature.
    int recId = -1;
    for (int i = 0; i < 4; i++) {
        ECKey k = ECKey.recoverFromSignature(i, sig, hash, key.isCompressed());
        if (k != null && k.getPubKeyPoint().equals(pub)) {
            recId = i;
            break;
        }
    }
    if (recId == -1)
        throw new RuntimeException("Could not construct a recoverable key. This should never happen.");
    int headerByte = recId + 27 + (key.isCompressed() ? 4 : 0);
    byte[] sigData = new byte[65];  // 1 header + 32 bytes for R + 32 bytes for S
    sigData[0] = (byte)headerByte;
    System.arraycopy(Utils.bigIntegerToBytes(sig.r, 32), 0, sigData, 1, 32);
    System.arraycopy(Utils.bigIntegerToBytes(sig.s, 32), 0, sigData, 33, 32);
    return sigData;
  }

  public HashMap<String, String> signHash(String privkey, String hash) throws IOException {
    ECKey  key = ECKey.fromPrivate(Hex.decode(privkey));//.decompress();
    byte[] signature = compactSing(Sha256Hash.wrap(hash), key);

    HashMap<String, String> res = new HashMap<String, String>();
    res.put("signature", new String(Hex.encode(signature), "UTF-8"));
    return res;
  }

  public HashMap<String, String> decryptMemo( String pubKey, String encryptedMemo, String privKey, String nonce) throws IOException, Exception, InvalidCipherTextException {

    try {
      ECKey dd = ECKey.fromPrivate(Hex.decode(privKey));//.decompress();
      ECKey Qp = ECKey.fromPublicOnly(decodePubKey(pubKey));

      byte[] ss = getSharedSecret(Qp, dd);

      String tmp = nonce + (new String(Hex.encode(ss), "UTF-8"));
      byte[] nonce_plus_secret = sha512(tmp.getBytes());

      final BufferedBlockCipher cipher = new PaddedBufferedBlockCipher(new CBCBlockCipher(new AESFastEngine()));
      KeyParameter kp = new KeyParameter(Arrays.copyOfRange(nonce_plus_secret, 0, 32));
      CipherParameters ivAndKey= new ParametersWithIV(kp, Arrays.copyOfRange(nonce_plus_secret, 32, 32+16));
      cipher.init(false, ivAndKey);

      byte[] cipherBytes = Hex.decode(encryptedMemo); 

      final byte[] decryptedBytes = new byte[cipher.getOutputSize(cipherBytes.length)];
      final int processLen = cipher.processBytes(cipherBytes, 0, cipherBytes.length, decryptedBytes, 0);
      final int doFinalLen = cipher.doFinal(decryptedBytes, processLen);

      HashMap<String, String> res = new HashMap<String, String>();

      byte[] memo_data = Arrays.copyOf(decryptedBytes, processLen + doFinalLen);

      String message = new String(Arrays.copyOfRange(memo_data, 4, memo_data.length), "UTF-8");
      byte[] msg_hash = sha256(message.getBytes());

      if( !arraysEquals(memo_data, 0, msg_hash, 0, 4) ) {
        res.put("message", "");
        return res;
      }

      res.put("message", message);
      return res;
    } catch (Exception ex) {
      HashMap<String, String> res = new HashMap<String, String>();
      res.put("message", "");
      return res;
    }
  }

  public HashMap<String, String> createMemo(String privKey, String destPubkey, String message, String custom_nonce) throws IOException, Exception, InvalidCipherTextException {

    String nonce = custom_nonce;

    if(nonce == null || nonce.length() == 0) {
      BigInteger lnonce = new BigInteger(1,  Arrays.copyOfRange( new ECKey().getPrivKeyBytes(), 0, 7 ));
      nonce = lnonce.toString();
    }

    ECKey dd = ECKey.fromPrivate(Hex.decode(privKey));//.decompress();
    ECKey Qp = ECKey.fromPublicOnly(decodePubKey(destPubkey));

    byte[] ss = getSharedSecret(Qp, dd);

    String tmp = nonce + (new String(Hex.encode(ss), "UTF-8"));
    byte[] nonce_plus_secret = sha512(tmp.getBytes());

    byte[] msg_hash  = sha256(message.getBytes());
    byte[] message_b = message.getBytes();

    byte[] memo_content = new byte[message_b.length + 4]; 
    Arrays.fill(memo_content, (byte)0);

    System.arraycopy(msg_hash,     0, memo_content,    0,       4);
    System.arraycopy(message_b,    0, memo_content,    4,       message_b.length);

    final BufferedBlockCipher cipher = new PaddedBufferedBlockCipher(new CBCBlockCipher(new AESFastEngine()));
    KeyParameter kp = new KeyParameter(Arrays.copyOfRange(nonce_plus_secret, 0, 32));
    CipherParameters ivAndKey= new ParametersWithIV(kp, Arrays.copyOfRange(nonce_plus_secret, 32, 32+16));
    cipher.init(true, ivAndKey);

    final byte[] encryptedBytes = new byte[cipher.getOutputSize(memo_content.length)];
    final int processLen = cipher.processBytes(memo_content, 0, memo_content.length, encryptedBytes, 0);
    final int doFinalLen = cipher.doFinal(encryptedBytes, processLen);

    byte[] encrypted_memo_data = Arrays.copyOf(encryptedBytes, processLen + doFinalLen);

    HashMap<String, String> res = new HashMap<String, String>(); 
    res.put("encrypted_memo", new String(Hex.encode(encrypted_memo_data), "UTF-8"));
    res.put("nonce", nonce);
    return res;
  }

  // public HashMap<String, String> recoverPubkey(String signature, String msg) throws UnsupportedEncodingException, AddressFormatException {
  //   byte[] sig_bytes = Hex.decode(signature);

  //   Sha256Hash hash = Sha256Hash.create(msg.getBytes());
  //   byte[] b1 = Arrays.copyOfRange(sig_bytes, 1,  33);
  //   byte[] b2 = Arrays.copyOfRange(sig_bytes, 33, 65);

  //   BigInteger r = new BigInteger(1, b1);
  //   BigInteger s = new BigInteger(1, b2);

  //   ECKey.ECDSASignature sig = new ECKey.ECDSASignature(r,s);

  //   int i = (int)sig_bytes[0] - 27;
  //   ECKey key = ECKey.recoverFromSignature(i, sig, hash, true);

  //   HashMap<String, String> res = new HashMap<String, String>();
  //   res.put("pubkey", key != null ? encodePubKey(key.getPubKey()) : "<null>");
  //   return res;
  // }


}