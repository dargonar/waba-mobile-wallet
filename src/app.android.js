import React from 'react'; // eslint-disable-line
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';
import configureStore from './store/configureStore';
import { iconsLoaded, iconsMap } from './utils/AppIcons';
import { launchOnboard, launchWallet } from './utils/Helper';
import initialState from './reducers/initialState';
import * as walletActions from './modules/wallet/wallet.actions';

import { AsyncStorage } from 'react-native'


// import {
//   ToastAndroid,
// } from 'react-native';

// ToastAndroid.show('This is a toast with short duration', ToastAndroid.SHORT);

let account = null;
try {
	AsyncStorage.getItem('@Store:data').then((value)=>{
		//console.log('@Store:data => ', value);
		
		if (value !== null) {
			account = JSON.parse(value);
		} else {
			account = null;
		}
		
		iconsLoaded.then(() => {
			initialState.wallet.account = account;
			const store = configureStore(initialState);
			
			registerScreens(store, Provider);

// 			launchOnboard();
 			if(!account){
 				launchOnboard();
 			}
 			else{

				let unsubscribe = store.subscribe(() => {
					let s = store.getState();
					console.log('READY =>', s.wallet.ready);
					if(s.wallet.ready) {
						unsubscribe();
						launchWallet();
					}
				})

				store.dispatch(walletActions.retrieveHistory(account.name, account.keys, true, 0) );
 				
 			}
		});

	});
} catch (error) {
	console.log('Error!!!!');
	//TODO: Error?
}


