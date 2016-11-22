package com.xwallet;

import android.support.multidex.MultiDex;
import android.content.Context;
import android.util.Log;

import com.facebook.react.ReactPackage;

import java.util.Arrays;
import java.util.List;

import com.reactnativenavigation.NavigationApplication;
import com.xwallet.crypto.UWCryptoPackage;
import com.eguma.barcodescanner.BarcodeScannerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.geektime.reactnativeonesignal.ReactNativeOneSignalPackage;
import com.react.rnspinkit.RNSpinkitPackage;  

public class MainApplication extends NavigationApplication {

  protected void attachBaseContext(Context base) {
    super.attachBaseContext(base);
    MultiDex.install(this);
  }

  //@Nullable
  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return Arrays.<ReactPackage>asList(
        new UWCryptoPackage(),
        new BarcodeScannerPackage(),
        new VectorIconsPackage(),
        new LinearGradientPackage(),
        new ReactNativeConfigPackage(),
        new ReactNativeOneSignalPackage(),
        new RNSpinkitPackage()  
    );

    //return null;
  }

  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }
}