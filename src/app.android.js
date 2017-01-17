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


import {
  ToastAndroid,
} from 'react-native';

let account = null;
try {
	//AsyncStorage.removeItem('@Store:data');
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
					} else if(s.wallet.errors > 0) {
						
						if(!(s.wallet.errors % 10)) {
							ToastAndroid.show('Esta tomando mucho tiempo iniciar la aplicación, verifique su conexión a Internet', ToastAndroid.SHORT);
						}

						store.dispatch(walletActions.retrieveHistory(account.name, account.keys, true, 0) );
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


