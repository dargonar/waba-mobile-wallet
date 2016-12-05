package com.diventi.bts2helper;

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

import com.diventi.bts2helper.Bts2helper;

public class Bts2helperModule extends ReactContextBaseJavaModule {

  ReactApplicationContext mReactContext;

  static {
    System.loadLibrary("c++_shared");
    System.loadLibrary("bts2helper");
  }

  public Bts2helperModule(ReactApplicationContext reactContext) {
    super(reactContext);
    mReactContext = reactContext;
  }
  
  @Override
  public String getName() {
    return "Bts2helper";
  }

  @ReactMethod
  public void txDigest(String txJson, String chainId, Promise promise) {
    try {
      promise.resolve(Bts2helper.txDigest(txJson, chainId));
    } catch (Exception ex) {
      promise.reject(ex.toString());
    }
  }
  
  @ReactMethod
  public void signCompact(String digest, String wif, Promise promise) {
    try {
      promise.resolve(Bts2helper.signCompact(digest, wif));
    } catch (Exception ex) {
      promise.reject(ex.toString());
    }
  }
}