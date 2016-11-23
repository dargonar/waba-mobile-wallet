import { Navigation } from 'react-native-navigation';
import UWCrypto from './Crypto';
import { iconsMap } from './AppIcons';


function launchWallet() {
  Navigation.startSingleScreenApp({
    screen: {
      screen				 : 'wallet.Main',
      navigatorStyle : {
       navBarButtonColor : '#ffffff',
       drawUnderNavBar   : true,
       navBarTransparent : true
      },
      fab: {
        collapsedId: 'newTx',
        collapsedIcon: iconsMap['ios-add'].uri,
        backgroundColor: '#1f475b'
      },
      rightButtons: [
				{
					icon: iconsMap['qrcode'], 
					id: 'qrCode'
				}
			]
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
      screen				 : 'wallet.Welcome',
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
