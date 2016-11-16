import React from 'react'; // eslint-disable-line
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { registerScreens } from './screens';
import configureStore from './store/configureStore';
import { iconsLoaded } from './utils/AppIcons';

import OneSignal from 'react-native-onesignal';
// var _navigator; // If applicable, declare a variable for accessing your navigator object to handle payload.

OneSignal.configure({
	onIdsAvailable: function(device) {
		console.log('UserId = ', device.userId);
		console.log('PushToken = ', device.pushToken);
	},
  onNotificationOpened: function(message, data, isActive) {
		console.log('MESSAGE: ', message);
		console.log('DATA: ', data);
		console.log('ISACTIVE: ', isActive);
		// Do whatever you want with the objects here
		// _navigator.to('main.post', data.title, { // If applicable
		//  article: {
		//    title: data.title,
		//    link: data.url,
		//    action: data.actionSelected
		//  }
		// });
	}
});

iconsLoaded.then(() => {
	
	const store = configureStore();
	
	registerScreens(store, Provider);

	const navigatorStyle = {
		 //navBarTextColor   : '#ffffff',
		 navBarButtonColor : '#ffffff',
		 drawUnderNavBar   : true,
		 navBarTransparent : true
	};

	Navigation.startSingleScreenApp({
		screen: {
			screen				: 'wallet.Main',
			navigatorStyle
		},
	
		animationType : 'none',
		drawer: {
			left: {
				screen: 'wallet.Drawer'
			}
		}
	});
});

