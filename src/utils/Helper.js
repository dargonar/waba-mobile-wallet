import { Navigation } from 'react-native-navigation';
import UWCrypto from './Crypto';

function launchWallet() {
  Navigation.startSingleScreenApp({
    screen: {
      screen				 : 'wallet.Main',
      navigatorStyle : {
       navBarButtonColor : '#ffffff',
       drawUnderNavBar   : true,
       navBarTransparent : true
      }
    },
    animationType : 'none',
    drawer: {
      left: {
        screen: 'global.Drawer'
      },
    }
  });
}

function launchOnboard() {
  Navigation.startSingleScreenApp({
    screen: {
      screen				 : 'wallet.Start',
      navigatorStyle : {
       navBarButtonColor : '#ffffff',
       drawUnderNavBar   : true,
       navBarTransparent : true
       //navBarHidden: true
      }
    },
    animationType : 'none',
  });
}

export {
  launchOnboard,
  launchWallet
};