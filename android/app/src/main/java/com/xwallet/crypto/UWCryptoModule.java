package com.xwallet.crypto;

import java.util.HashMap;
import java.util.Set;
import java.util.Iterator;
import java.util.Map;

import java.io.InputStream;
import java.io.IOException;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import com.xwallet.crypto.UWCryptoModule_impl;
import com.xwallet.crypto.UWFileOpener;

public class UWCryptoModule extends ReactContextBaseJavaModule implements UWFileOpener {

  UWCryptoModule_impl mImpl;
  ReactApplicationContext mReactContext;

  public UWCryptoModule(ReactApplicationContext reactContext) {
    super(reactContext);
    mReactContext = reactContext;
    mImpl = new UWCryptoModule_impl(this);
  }

  @Override
  public String getName() {
    return "UWCrypto";
  }

  @ReactMethod
  public void generateMnemonic(String lang, int entropy, Promise promise) {
    try {
      promise.resolve(toWritableMap(mImpl.generateMnemonic(lang, entropy)));
    } catch (Exception ex) {
      promise.reject(ex.toString());
    }
  }

  @ReactMethod
  public void mnemonicToMasterKey( String words, Promise promise ) {
    try {
      promise.resolve(toWritableMap(mImpl.mnemonicToMasterKey(words)));
    } catch (Exception ex) {
      promise.reject(ex.toString());
    }
  }

  @ReactMethod
  public void derivePrivate(String grandParent, String parent, String key, int deriv, Promise promise ) {
    try {
      promise.resolve(toWritableMap(mImpl.derivePrivate(grandParent, parent, key, deriv)));
    } catch (Exception ex) {
      promise.reject(ex.toString());
    }
  }

  @ReactMethod
  public void signHash(String privkey, String hash, Promise promise ) {
    try {
      promise.resolve(toWritableMap(mImpl.signHash(privkey, hash)));
    } catch (Exception ex) {
      promise.reject(ex.toString());
    }
  }

  @ReactMethod
  public void decryptMemo(String pubKey, String encryptedMemo, String privKey, String nonce, Promise promise ) {
    try {
      promise.resolve(toWritableMap(mImpl.decryptMemo(pubKey, encryptedMemo, privKey, nonce)));
    } catch (Exception ex) {
      promise.reject(ex.toString());
    }
  }

  @ReactMethod
  public void createMemo(String privKey, String destPubkey, String message, String custom_nonce, Promise promise ) {
    try {
      promise.resolve(toWritableMap(mImpl.createMemo(privKey, destPubkey, message, custom_nonce)));
    } catch (Exception ex) {
      promise.reject(ex.toString());
    }
  }

  public WritableMap toWritableMap(HashMap<String,String> hm) {

    WritableMap wmap = Arguments.createMap();

    Set set = hm.entrySet();
    Iterator i = set.iterator();
    
    while(i.hasNext()) {
      Map.Entry<String,String> me = (Map.Entry<String, String>)i.next();
      wmap.putString(me.getKey(), me.getValue());
    }

    return wmap;
  }

  public InputStream open(String file_name) throws IOException {
    return mReactContext.getAssets().open(file_name);
  }
}