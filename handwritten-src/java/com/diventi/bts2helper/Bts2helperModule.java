package com.diventi.bts2helper;

import java.util.HashMap;
import java.util.Set;
import java.util.Iterator;
import java.util.Map;
import java.util.Arrays;
import java.util.ArrayList;

import java.io.InputStream;
import java.io.IOException;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;
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
  public void encodeMemo(String priv, String pub, String msg, Promise promise) {
    try {
      promise.resolve(Bts2helper.encodeMemo(priv, pub, msg));
    } catch (Exception ex) {
      promise.reject(ex.toString());
    }
  }
  
  @ReactMethod
  public void decodeMemo(String priv, String pub, String memo_from, String memo_to, String memo_nonce, String memo_message, Promise promise) {
    try {
      promise.resolve(Bts2helper.decodeMemo(priv, pub, memo_from, memo_to, memo_nonce, memo_message));
    } catch (Exception ex) {
      promise.reject(ex.toString());
    }
  }

  @ReactMethod
  public void calcFee(String feeSchedule, ReadableArray ops, String coreExchangeRatio, Promise promise) {
    try {
      
      ArrayList<String> opsList = new ArrayList<String>();
      for(int i=0; i<ops.size(); i++) {
        opsList.add(ops.getString(i));
      }
      
      ArrayList<Long> res = Bts2helper.calcFee(feeSchedule, opsList, coreExchangeRatio);
      
      WritableArray fees = new WritableNativeArray();
      for(int j=0; j<res.size(); j++) {
        fees.pushString(res.get(j).toString());
      }
      
      promise.resolve(fees);
      
    } catch (Exception ex) {
      promise.reject(ex.toString());
    }
  }

  @ReactMethod
  public void isCheapName(String name, Promise promise) {
    try {
      promise.resolve(Bts2helper.isCheapName(name));
    } catch (Exception ex) {
      promise.reject(ex.toString());
    }
  }

  @ReactMethod
  public void isValidName(String name, Promise promise) {
    try {
      promise.resolve(Bts2helper.isValidName(name));
    } catch (Exception ex) {
      promise.reject(ex.toString());
    }
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