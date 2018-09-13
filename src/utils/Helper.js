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

  if(account && account.subaccount && account.subaccount.wallet_mode=='subaccount')
  {
    
    launchSubaccountWallet(account);
    return;
  }

  Navigation.startSingleScreenApp({
    appStyle : { orientation : 'portrait' },
    screen: {
      screen         : 'wallet.Main',
      // screen        : 'discoin.Main',
      navigatorStyle : {
       navBarButtonColor : '#000',
       drawUnderNavBar   : true,
       navBarTransparent : true,
       navBarNoBorder    : true,
       topBarElevationShadowEnabled: false
      },
      rightButtons : [
        {
          icon: iconsMap['ios-search'],
          id: 'searchBusiness' // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        }
      ],
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

function launchSubaccountWallet(account) {

  Navigation.startSingleScreenApp({
    appStyle : { orientation : 'portrait' },
		screen: {
 			screen				 : 'wallet.Wallet',
      // screen         : 'wallet.Main',
			// screen				 : 'discoin.Main',
      navigatorStyle : {
       navBarButtonColor : '#fff',
       drawUnderNavBar   : true,
       navBarTransparent : true,
			 navBarNoBorder 	 : true,
			 topBarElevationShadowEnabled: false
      },
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
