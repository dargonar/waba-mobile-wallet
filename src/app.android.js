import React from 'react'; // eslint-disable-line
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';
import configureStore from './store/configureStore';
import { iconsLoaded, iconsMap } from './utils/AppIcons';
import { launchOnboard, launchWallet } from './utils/Helper';

import { AsyncStorage } from 'react-native'

AsyncStorage.removeItem('@Store:data');
AsyncStorage.setItem('@Store:data', '{"mnemonic":"candil pasión talón fraude favor baño pinza farol adorno manco verbo acudir","keys":[{"privkey":"eb5f269efcda68c96765a4310c94351b980760821e3dfc4e6e357f45b2828d45","address":"BTS28e54SydADNzHZhRgkegvgFgkVEwXkynB","pubkey":"BTS8ajqhMaA4NWvLh9LVGZcUATdato9CDcYYPf1s4zEsvB6CxLvDt","extendedPrivateKey":"xprv9uarLEcs7VZkRenp86MJQqUg93kepnXmB3xwvMazh8PtLhTXy1KAHZW1w2TxWqAacVLvmU2HtAzhMwkXrBPjBKWstiCdmSuTvy3s2bLxMBk"},{"privkey":"be340e5f772916ee0ab3beab841c084d23ec07ee0f39b5a455239d68695fb928","address":"BTS6LHts3hDRKo6rxTFaQxMMdsCwg72UQqss","pubkey":"BTS57XV6ck5cxgekCaBSt45DfNMU4orxWeFdbFmKJdtSs5S7s6fFy","extendedPrivateKey":"xprv9uarLEcs7VZkUUFcnPSJQSbLbQZYhk6wLg2wz5TH9VdGBGL6b5p9AMD57mwtu5TAgeSG51vn4YHYsrCBydkR2Rg8hADPHx8Tkkd268fFZvx"},{"privkey":"9745bc4b2c03a5e05053eb519af31cd6846862603872698f691eaca81df2e41e","address":"BTSKDd419gBexyUGaj7DgerDSnstXpAWkeRY","pubkey":"BTS6BrLNNQvtJE6QR3irGXJyRx14JPWxkRs53r86YgskXk2kRHdwZ","extendedPrivateKey":"xprv9uarLEcs7VZkVxs3qpud7B7a2ZwrSzhnTBnMMP45aahPqm2xRdGeeNzGW8XJeV1MoP3EaZYURWFQ1uNVAGLsJrLaVPAFXjQCnw2WbeN76XU"}],"name":"tuti"}');

// AsyncStorage.removeItem('@Store:data');
// AsyncStorage.setItem('@Store:data','{"mnemonic":"optar lanza pilar surgir variar fase suceso observar matriz nube cama puño","keys":[{"privkey":"4557486c99ddc947dc1c26901e575f5be08ff74e3430435718fdf298d2881ff2","address":"BTS8zxtjaWmL2yqeNW6CRNVuX3NaCWcR3KeK","pubkey":"BTS5DW4VJZ6AbwbmCgT3WtfEzx4wC3JY2SoYm24XMXQW9eFUxQVjT","extendedPrivateKey":"xprv9uBZDL1vKpnoiz8aRATnmYZqaJusgU9LJLnmSePNayBJMJjNNtHoGGiPBeyZatVs11e2HDEktG129TtumUexiAenMXaVnpRrWHCgnYctFqn"},{"privkey":"6ef5e9686b1f770887cca00ac46facb5d2416e6531a1d40a9bd9238bb46cebca","address":"BTS9j7cxefuGBCbtafHQaB97YBWTiCwWEdCo","pubkey":"BTS7hbsKJuDFHknZtrXqd2hxmuR1MB3jGNb13M5hje4tiaAQG9VfZ","extendedPrivateKey":"xprv9uBZDL1vKpnoo7K7KEqZuiYE1ehteyLaGDq8AtGX3SqPAGpKzbWzQ3YAgjFNXBExjRQiGBYTW33PDiSE2UnKpjXBhc2nReNUfVxBWkyacGk"},{"privkey":"99164feb3f3416f44ffcc36d6764a23d04444c559c24f829b1d7157ae7c534db","address":"BTSG4G8sW3AWX53AGRSwLkjjgEUYzLJJ9C9","pubkey":"BTS7r6oLMpZVF2PegTxkTJ6FKcDUXTzmuMRtPGGmS1YXa7QmCXGuN","extendedPrivateKey":"xprv9uBZDL1vKpnooFDjiUn7zd7j6XGpXmX7bWx8HEbECVA6aCVxqY6FWZ8zfzzKMNNd8ob4ySDUKALch5idLtzRuokYLFk9AP4jZ6HshtVTaSK"}],"name":"tytytyt"}');

// AsyncStorage.removeItem('@Store:data');
// AsyncStorage.setItem('@Store:data','{"mnemonic":"asunto bufanda excusa oro combate isla andén pichón doble haz vulgar reparto","keys":[{"privkey":"c80f46a3a2a9a20e6ada968eef6507e98d371a11d2b16576a4d6ccc3bb6440fb","address":"BTS6yEg9mcUfC4WydHNmrezJrqtYp1uq74nc","pubkey":"BTS7orKEmiHzxJwxFNJF9U1M6YmTsschCDysRo6jjgr8u2BNkL74T","extendedPrivateKey":"xprv9u4qwYHYHjUQ8Sg7kEsNqqQ6gsxMgEZ6DZG7w9fFRPSjgiJZt75q3csnMFz3BySe4ixn4kGNRUQjpcG13WfrYuZ1BhTRRNjLZYecqAibcgC"},{"privkey":"5109a88b6889db77f4eae532a88db3f0e8c327e988734f6c5b8ce5064b477ed3","address":"BTSALPCWHe7BE9GKYtJnFSYGyHhvsdhasSao","pubkey":"BTS7R7LVEH8RapgGjSzJczooTSxcMmeDAcxetos985iboFcDwxTx4","extendedPrivateKey":"xprv9u4qwYHYHjUQ8qBMnJFU6wDwgiWqBCHcSWNLpYoAkYd3YrjmVCAfJysTTUzTvNTuVU3k6Fou7qdejTdPE3iJEhD5D2eHPEF6N7CeZryGWCC"},{"privkey":"b9564d3aea349d5db31b39887b94d97688984683965d819f9c5a0d4356b303fe","address":"BTS2s1rWjMt582xDuTKPyNckPTdjVVHV89dk","pubkey":"BTS54BJmRGVtNXgLBrYKD2AV8uV6VeRrXmTgnRjLLhK3kQihoV7dR","extendedPrivateKey":"xprv9u4qwYHYHjUQDKQ4wbVf6rTVkhtUa4HFeB61nWr3DrBSDHnVrvQyLpMeSA9FX57gVNRrFRAkhHCeutBxE5MfFsyevE3gfWEyudfRHwFtdap"}],"name":"vulioyttt"}');

// AsyncStorage.removeItem('@Store:data');
// AsyncStorage.setItem('@Store:data','{"mnemonic":"orgía balanza vereda candil batir panal separar vector rasgo rumor tobillo carbón","keys":[{"privkey":"0ff360cf48fcddf0b1bb16a9047f94cdfb206221a6cd609b8799e166c43ddd2f","address":"BTSMnfYrTve1Z6GtJJ8XJdFVKNMVUPuaPiKy","pubkey":"BTS5mHPPYiwMJNVmzLFqmMYAv853knSZVGgTo8e5zs9CN2dNVpRZF","extendedPrivateKey":"xprv9v79WqJyYVpnydbXxsKJhPREKYRyygyYMfAPEANXmFK3jMBTUwrWQTA53Lpusa6wXj1kRT7nMi1kBc1EE7ieZ5PDt8gzjdVZmxKu52JmHjg"},{"privkey":"21406283769d24d8bc1d09b1fbde59334e00cd33565268ed3017dd4f0fbf7cf5","address":"BTSFzYhTG9BVNjMuxngUmYteUQ4wxukx9LEq","pubkey":"BTS5bBEamxBzsNPpGDsvsvq3y7GDtuwr9XdRGXPN3xqrgkeva5QFH","extendedPrivateKey":"xprv9v79WqJyYVpo2UXaiVJdVe9zCDvkm8ZuTFbwTftsHrFTARJCBWVa5Noan7BkxTA6Qnxm2KGznVXePQX37atSzn9k6juDPtheFhMMhoHrRHv"},{"privkey":"65fa9ad76e020f168f4f3aeac7b689c4132d785abd1dc0fc978bbcb58f59efca","address":"BTS4GKqXnx9UHnGAXH2taUnHLCG2qSpbyDPZ","pubkey":"BTS7CpR1wgK51xUNa8JFCgx77cGW4894FVNSyjpnN2uNtQeYb7YZs","extendedPrivateKey":"xprv9v79WqJyYVpo4zB5cssDxUjBz8kFCj7n6NJZqX4w5aNHGQEUGjdyzbs6TCpv3sAqCWmDrBHNUdXuPtzLEYr2UyBWG6vqa4ntxDe6W93spCM"}],"name":"pablo"}');

let account = null;
try {
	AsyncStorage.getItem('@Store:data').then((value)=>{
		console.log('@Store:data => ', value);
		
		if (value !== null) {
			account = JSON.parse(value);
		} else {
			account = null;
		}
		
		iconsLoaded.then(() => {
			const store = configureStore(
					{
							wallet: {
								account:   account
							}
					}
			);
			registerScreens(store, Provider);

// 			launchOnboard();
 			if(!account){
 				launchOnboard();
 			}
 			else{
 				launchWallet();
 			}
		});

	});
} catch (error) {
	console.log('Error!!!!');
	//TODO: Error?
}


