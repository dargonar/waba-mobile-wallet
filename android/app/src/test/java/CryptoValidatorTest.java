import java.io.*;
import java.util.*;

import org.junit.Test;
import java.util.regex.Pattern;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertEquals;

import com.xwallet.crypto.UWCryptoModule_impl;
import com.xwallet.crypto.UWFileOpener;

import org.bitcoinj.crypto.MnemonicException.MnemonicLengthException;

public class CryptoValidatorTest implements UWFileOpener {

  public InputStream open(String file_name) throws IOException {
    return new FileInputStream("/home/ubuntu/" + file_name);
  }

  @Test
  public void UWCryptoModule_Mnemonic_ENES() throws IOException, MnemonicLengthException {
    UWCryptoModule_impl impl = new UWCryptoModule_impl(this);

    HashMap<String, String> p_en = impl.generateMnemonic("en", 128);
    String mnemonic_en = p_en.get( "mnemonic");
    String[] words_en = mnemonic_en.split(" ");
    assertTrue(words_en.length == 12);

    HashMap<String, String> p_es = impl.generateMnemonic("es", 128);
    String mnemonic_es = p_es.get("mnemonic");
    String[] words_es = mnemonic_es.split(" ");
    assertTrue(words_es.length == 12);
  }


}