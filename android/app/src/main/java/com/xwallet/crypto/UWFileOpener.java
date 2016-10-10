package com.xwallet.crypto;

import java.io.InputStream;
import java.io.IOException;

public interface UWFileOpener {

  public InputStream open(String file_name) throws IOException;

}