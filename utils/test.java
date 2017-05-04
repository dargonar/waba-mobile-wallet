import java.io.*;
import java.util.*;

//import org.junit.Test;
import java.util.regex.Pattern;

///mport static org.junit.Assert.assertFalse;
//import static org.junit.Assert.assertTrue;
//import static org.junit.Assert.assertEquals;

import com.xwallet.crypto.UWCryptoModule_impl;
import com.xwallet.crypto.UWFileOpener;

import org.bitcoinj.crypto.MnemonicException.MnemonicLengthException;


public class test {
  
  public static void main(String[] args) {

    CryptoValidatorTest p = new CryptoValidatorTest(args[0], args.length > 1 ? args[1] : null );

    try {
      p.gen_mnemonic();
    } catch (Exception ex) {
      System.out.println(ex.toString());
    }
    
  }
  
}

class CryptoValidatorTest implements UWFileOpener {

  String m_path;
  String m_words;
  public CryptoValidatorTest(String path, String words) {
    m_path = path;
    m_words = words;
  }

  public InputStream open(String file_name) throws IOException {
    return new FileInputStream(m_path + "/" + file_name);
  }

  //@Test
  public void gen_mnemonic() throws Exception, IOException, MnemonicLengthException {
    UWCryptoModule_impl impl = new UWCryptoModule_impl(this);

    System.out.println("**************************************************************");

    HashMap<String, String> tmp;

    tmp = impl.generateMnemonic("es", 128);
    String mnemonic_es = tmp.get("mnemonic");
    //mnemonic_es = "orgía balanza vereda candil batir panal separar vector rasgo rumor tobillo carbón";

    if(m_words != null)
      mnemonic_es = m_words;

    System.out.println(mnemonic_es);

    tmp = impl.mnemonicToMasterKey(mnemonic_es);
    String master_key = tmp.get("masterPrivateKey");
    System.out.println(master_key);


    tmp = impl.derivePrivate("", "", master_key, 1);
    System.out.println(tmp.get("extendedPrivateKey"));
    System.out.println(tmp.get("address"));
    System.out.println(tmp.get("pubkey"));
    System.out.println(tmp.get("privkey"));
    System.out.println("*************");

    tmp = impl.derivePrivate("", "", master_key, 2);
    System.out.println(tmp.get("extendedPrivateKey"));
    System.out.println(tmp.get("address"));
    System.out.println(tmp.get("pubkey"));
    System.out.println(tmp.get("privkey"));
    System.out.println("*************");

    tmp = impl.derivePrivate("", "", master_key, 3);
    System.out.println(tmp.get("extendedPrivateKey"));
    System.out.println(tmp.get("address"));
    System.out.println(tmp.get("pubkey"));
    System.out.println(tmp.get("privkey"));
    System.out.println("*************");

    System.out.println("**************************************************************");

    //String[] words_es = mnemonic_es.split(" ");
    //assertTrue(words_es.length == 12);
  }

}


