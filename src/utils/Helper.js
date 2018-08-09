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

function launchWallet() {
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
      rightButtons : [
        {
          //disableIconTint: true,
          //title: 'Memo',
          icon: iconsMap['qrcode--active'],
          id: 'scanQRCode' // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        }
      ],
			leftButtons: [
    		{
    			icon: iconsMap['ios-menu'],
    			// icon: Platform.OS === 'ios' ? iconsMap['ios-menu'] : null,
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
