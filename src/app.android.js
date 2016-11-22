import React from 'react'; // eslint-disable-line
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';
import configureStore from './store/configureStore';
import { iconsLoaded, iconsMap } from './utils/AppIcons';
import { launchOnboard, launchWallet } from './utils/Helper';

import { AsyncStorage } from 'react-native'

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
	// 	launchWallet();
	launchOnboard();
	//launchNormal();

// 	try {
// 		AsyncStorage.getItem('@Store:registered').then((value)=>{
			
// 			if (value !== null) {
// 				launchNormal();
//  			} else {
//  				launchOnboard();
//  			}
// 		});
// 	} catch (error) {
// 		console.log('Error!!!!');
// 		//TODO: Error?
// 	}
	
});

