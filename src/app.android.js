import React from 'react'; // eslint-disable-line
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';
import configureStore from './store/configureStore';
import { iconsLoaded, iconsMap } from './utils/AppIcons';
import { launchTest, launchOnboard, launchWallet } from './utils/Helper';
import initialState from './reducers/initialState';
import * as walletActions from './modules/wallet/wallet.actions';

import { AsyncStorage } from 'react-native'


import {
  ToastAndroid,
} from 'react-native';

let account = null;
try {
	// AsyncStorage.removeItem('@Store:data');
  // AsyncStorage.setItem('@Store:data', '{"mnemonic":"pañuelo barco ternura lanza ingenio célebre envase fábula ganar rabia ostra insecto","keys":[{"extendedPrivateKey":"xprv9vPmRCsDw1nGc6Ahf7U5onbgwuo2GKUZFDkSamcNaxN85pH8Xh4sK9QjuyjkgWAiRCz7p2fgHEfDXrLXdeBDE8b1X6comZhvho3m19MJ3o3","pubkey":"BTS8c4a9PdZNqRgtVnPSiSytwtq4QZcfDkG2q7uxGSwqiK6qve3GJ","privkey":"4f296eb28e5aa23e9d71d1b77db8c12c9523d0274f0bef0d6705e9d41aad3386","address":"BTSUTqms4gjrsyEd96BembtzbiPkXKJ8HZ1"},{"extendedPrivateKey":"xprv9vPmRCsDw1nGdkHqEDcXaYNpWPrRgjoE6pYu2Y2xruT2CeC8anStJzhgFAHsD3c9czF9p4nqywFW9NMsq1KLT5tHNQz14Av9nWkxbnrcjZM","pubkey":"BTS891B5NKZr44765vvK8mX1sh1RrT7yhPX9UX8QkxZVpTomdHXnR","privkey":"07baf7bd2d721d5e60ecdd2ffba0c1b23bf545a5ec53be1c14278dcacb2907a2","address":"BTS8hxMeQrM23KXwqCwS6uFxW6sQ53m7SDGt"},{"extendedPrivateKey":"xprv9vPmRCsDw1nGhdmRfYPg63JRk2xrghUUfwudx8KvHBDsGvQat3vSegkwzoXGVs96SreLpk3TjWpp5zUrTGXAsmX7ckm9fbDBXVP7yJeZ62N","pubkey":"BTS5wEoWM8CGLGdV45NGF2MofSWewMUbnJ6tduqqqmxPiVk7t5and","privkey":"e89a90e6ea84e506dc08f8233e484f6556ba0d1ba0a7b8b3f0dd23cc4bbb688e","address":"BTSLWfXNo12C21HHATpCy9Q9D2HqUq9K9FyZ"}],"name":"petu"}');

  AsyncStorage.getItem('@Store:data').then((value)=>{
		console.log('@Store:data => ', value);

		if (value !== null) {
			account = JSON.parse(value);
		} else {
			account = null;
		}

		iconsLoaded.then(() => {
			initialState.wallet.account = account;
			const store = configureStore(initialState);

			registerScreens(store, Provider);

 			if(!account){
 				launchOnboard();
 			}
 			else{

				let unsubscribe = store.subscribe(() => {
					let s = store.getState();
					console.log('READY =>', s.wallet.ready);
					if(s.wallet.ready) {
						unsubscribe();
						launchWallet(account);

					} else if(s.wallet.errors > 0) {
            if(!(s.wallet.errors % 10)) {
							ToastAndroid.show('Está tomando mucho tiempo iniciar la aplicación, verifique su conexión a Internet', ToastAndroid.SHORT);
						}
						// AHORA TRAEMOS COMERCIOS
						store.dispatch(walletActions.retrieveHistory(account.name, account.keys, true, 0, account.subaccount) );
						store.dispatch(walletActions.retrieveBusinesses(0, '', initialState.business_filter) );
						
					}
				});

				// AHORA TRAEMOS COMERCIOS
				store.dispatch(walletActions.retrieveHistory(account.name, account.keys, true, 0, account.subaccount) );
				store.dispatch(walletActions.retrieveBusinesses(0, '', initialState.business_filter) );
 			}
		});

	});
} catch (error) {
	console.log('Error!!!!');
	//TODO: Error?
}
