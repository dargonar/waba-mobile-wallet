import { Navigation } from 'react-native-navigation';
import UWCrypto from './Crypto';
import { iconsMap } from './AppIcons';


function launchWallet() {
  Navigation.startSingleScreenApp({
    portraitOnlyMode : true,
		screen: {
			screen			: 'wallet.ShareEndorsement',
			title				: 'Indique tipo de aval',
      
// 			screen				 : 'wallet.Main',
//       navigatorStyle : {
//        navBarButtonColor : '#ffffff',
//        drawUnderNavBar   : true,
//        navBarTransparent : true
//       },
//       fab: {
//         collapsedId: 'newTx',
//         collapsedIcon: iconsMap['ios-add'].uri,
//         backgroundColor: '#0B5F83'
//       },
			
//       rightButtons: [
// 				{
// 					icon: iconsMap['qrcode'], 
// 					id: 'qrCode'
// 				}
// 			]
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
	// 
  Navigation.startSingleScreenApp({
    portraitOnlyMode : true,
		screen: {
      screen				 : 'wallet.Onboarding',
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
