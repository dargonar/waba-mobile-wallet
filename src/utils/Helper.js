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

function launchWallet(account, error) {

  if(account && account.subaccount && account.subaccount.wallet_mode=='subaccount')
  {
    
    launchSubaccountWallet(account, error);
    return;
  }

  Navigation.startSingleScreenApp({
    appStyle : { 
      orientation : 'portrait' 
    },
    screen: {
      screen        : 'wallet.Wallet',
      navigatorStyle : {
       navBarButtonColor : '#fff',
       drawUnderNavBar   : true,
       navBarTransparent : true,
       navBarNoBorder    : true,
       topBarElevationShadowEnabled: false
      },
      rightButtons : [
        {
          icon: iconsMap['store'],
          id: 'listBusinesses' // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
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
        screen: 'discoin.BusinessFilter',
        enabled: false
      },
    },
    passProps: {
      with_error: error
    }
  });
}

function launchWalletBusinessesFirst(account) {

  if(account && account.subaccount && account.subaccount.wallet_mode=='subaccount')
  {
    
    launchSubaccountWallet(account, 0);
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

function launchSubaccountWallet(account, error) {

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
    },
    passProps: {
      with_error: error
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
