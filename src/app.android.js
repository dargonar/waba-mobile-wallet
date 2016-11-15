import React from 'react'; // eslint-disable-line
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { registerScreens } from './screens';
import configureStore from './store/configureStore';
import { iconsLoaded } from './utils/AppIcons';

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
			screen: 'wallet.Main',
			navigatorStyle
		},
		drawer: {
			left: {
				screen: 'wallet.Drawer'
			}
		}
	});
});

