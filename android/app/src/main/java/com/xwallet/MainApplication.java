package com.xwallet;

import android.support.multidex.MultiDex;
import android.content.Context;
import android.util.Log;
import com.facebook.react.ReactPackage;

import java.util.Arrays;
import java.util.List;

import com.reactnativenavigation.NavigationApplication;
import com.xwallet.crypto.UWCryptoPackage;
import com.diventi.bts2helper.Bts2helperPackage;


// import com.eguma.barcodescanner.BarcodeScannerPackage;
// import com.BV.LinearGradient.LinearGradientPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;

import com.ekreutz.barcodescanner.BarcodeScannerPackage;

import com.oblador.vectoricons.VectorIconsPackage;

import com.geektime.reactnativeonesignal.ReactNativeOneSignalPackage;
import com.react.rnspinkit.RNSpinkitPackage;  
import com.zmxv.RNSound.RNSoundPackage;
import com.devfd.RNGeocoder.RNGeocoderPackage;
import com.airbnb.android.react.maps.MapsPackage;

import com.horcrux.svg.SvgPackage;

public class MainApplication extends NavigationApplication {

  protected void attachBaseContext(Context base) {
    super.attachBaseContext(base);
    MultiDex.install(this);
  }

  //@Nullable
  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return Arrays.<ReactPackage>asList(
        new Bts2helperPackage(),
        new UWCryptoPackage(),
        new BarcodeScannerPackage(),
        // new LinearGradientPackage(),
        new ReactNativeConfigPackage(),
        new VectorIconsPackage(),
        new ReactNativeOneSignalPackage(),
        new RNSpinkitPackage(),
        new RNSoundPackage(),
        new RNGeocoderPackage(),
        new MapsPackage(),
        new SvgPackage()
    );

    //return null;
  }

  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }
}


/* RN 0.44 fruta nueva

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.horcrux.svg.SvgPackage;
import com.ekreutz.barcodescanner.BarcodeScannerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, false);
  }
*/


