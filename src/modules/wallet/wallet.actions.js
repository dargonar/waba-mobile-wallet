// import axios from 'axios';
import * as types from '../../constants/actionTypes';
// import { TMDB_URL, TMDB_API_KEY } from '../../constants/api';
import UWCrypto from '../../utils/Crypto';

export function createKeysSuccess(new_keys) {
	return {
		type      : types.CREATE_KEYS_SUCCESS,
		new_keys  : new_keys
	};
}

export function createKeys() {
	return function (dispatch) {
		let that = this;
		UWCrypto.generateMnemonic('es', 128).then(function(res1) {
			UWCrypto.mnemonicToMasterKey(res1.mnemonic).then(function(res2) {
				let p = []
				Promise.all([ 
					UWCrypto.derivePrivate('', '', res2.masterPrivateKey, 1),
					UWCrypto.derivePrivate('', '', res2.masterPrivateKey, 2),
					UWCrypto.derivePrivate('', '', res2.masterPrivateKey, 3)
				]).then(function(res3) {
					dispatch(createKeysSuccess({
						mnemonic : res1.mnemonic,
						keys     : res3
					}))
				}, function(err) {
					reject(err);
				});
			}, function(err) {
				reject(err);
			});
		}, function(err) {
			reject(err);
		});
	}
}


// GENRES
export function retrieveHistorySuccess(res) {
	return {
		type         : types.RETRIEVE_HISTORY_SUCCESS,
		history      : res.data
	};
}

export function retrieveHistory() {
	return function (dispatch) {
		//return axios.get(`${TMDB_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`)
		//.then(res => {
	
    let res = { data : { 
      'Octubre'    : [
        { id: 1, type: 'out', from: 'me', to :'javi.rr', msg: 'Devolucion!', amount: '500.00'},
        { id: 2, type: 'in', from: 'RamiroRoa', to :'me', msg: 'Gracias por el flete...', amount: '156.00'},
        { id: 3, type: 'out', from: 'me', to :'Fundacion LTCN', amount: '10.00'},
        { id: 4, type: 'in', from: 'Cooperativa TUA', to :'me', amount: '10.00'},
      ], 
      'Septiembre' : [
        { id: 5, type: 'in', from: 'PedroGoyena', to :'me', msg: 'Varios', amount: '30.00'},
        { id: 6, type: 'out', from: 'me', to :'LopezOrono', msg: 'Correccion', amount: '220.00'},
        { id: 7, type: 'out', from: 'me', to :'LopezOrono', amount: '500.00'},
      ],
      'Agosto'     : [
        { id: 8,  type: 'in',  from: 'AldoPirose', to :'me', amount: '10.00'},
        { id: 9,  type: 'out', from: 'me', to :'pancho.', msg: 'Signatura rocosa!', amount: '1502.15'},
        { id: 10, type: 'in',  from: 'Treniso', to :'me', amount: '25.00'},
        { id: 11, type: 'out', from: 'me', to :'javi.rr', msg: 'Lo del dulce', amount: '1800.00'},
      ]
    } }

    dispatch(retrieveHistorySuccess(res));

    //})
		//.catch(error => {
		//	console.log(error); //eslint-disable-line
		//});
	};
}

