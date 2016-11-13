package com.xwallet;

import android.support.multidex.MultiDex;
import android.content.Context;
import android.util.Log;

// import com.facebook.react.ReactApplication;
// import com.facebook.react.ReactInstanceManager;
// import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
// import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

import com.reactnativenavigation.NavigationApplication;
import com.xwallet.crypto.UWCryptoPackage;
import com.eguma.barcodescanner.BarcodeScannerPackage;
import com.oblador.vectoricons.VectorIconsPackage;

public class MainApplication extends NavigationApplication {

//   private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    
//     @Override
//     protected boolean getUseDeveloperSupport() {
//       return BuildConfig.DEBUG;
//     }

//     @Override
//     protected List<ReactPackage> getPackages() {
//       return Arrays.<ReactPackage>asList(
//           new MainReactPackage(),
//           new UWCryptoPackage(),
//           new BarcodeScannerPackage()
//       );
//     }
//   };
//   @Override
//   public ReactNativeHost getReactNativeHost() {
//       return mReactNativeHost;
//   }


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
        new VectorIconsPackage()      
    );

    //return null;
  }

  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }
}