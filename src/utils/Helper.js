import { Navigation } from 'react-native-navigation';
import UWCrypto from './Crypto';
import { iconsMap } from './AppIcons';


function launchTest(){

	Navigation.startSingleScreenApp({
    appStyle : { orientation : 'portrait' },
		screen: {
      screen: 'endorsement.Register',
			title: 'Registro',
      navigatorStyle : {
       navBarButtonColor : '#ffffff',
       drawUnderNavBar   : true,
       navBarTransparent : true,
       topBarElevationShadowEnabled: false
      }
    },
    animationType : 'none',
  });


}

function launchWallet(account) {

  let _rightButtons = [];
  if(!account || !account.subaccount || account.subaccount.wallet_mode!='subaccount')
  {
    _rightButtons = [
        {
          icon: iconsMap['qrcode--active'],
          id: 'scanQRCode' // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        }
      ];
  }

  Navigation.startSingleScreenApp({
    appStyle : { orientation : 'portrait' },
		screen: {
 			screen				 : 'wallet.Main',
			// screen				 : 'discoin.Main',
      navigatorStyle : {
       navBarButtonColor : '#ffffff',
       drawUnderNavBar   : true,
       navBarTransparent : true,
			 navBarNoBorder 	 : true,
			 topBarElevationShadowEnabled: false
      },
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
      rightButtons : _rightButtons,
			leftButtons: [
    		{
    			icon: iconsMap['ios-menu'],
    			title: '',
    			id: 'sideMenu'
    		}
    	]
    },
    animationType : 'none',
    drawer: {
      left: {
        screen: 'global.Drawer'
      },
      right: {
        screen: 'discoin.BusinessFilter'
      },
    }
  });
}

function launchOnboard() {
	// screen				 : 'wallet.Onboarding',
  Navigation.startSingleScreenApp({
    appStyle : { orientation : 'portrait' },
		screen: {
      screen				 : 'wallet.Onboarding',
      navigatorStyle : {
       navBarButtonColor : '#ffffff',
       drawUnderNavBar   : true,
       navBarTransparent : true,
			 topBarElevationShadowEnabled: false
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
