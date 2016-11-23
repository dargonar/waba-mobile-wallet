// import axios from 'axios';
import * as types from '../../constants/actionTypes';
// import { TMDB_URL, TMDB_API_KEY } from '../../constants/api';
import UWCrypto from '../../utils/Crypto';
import gql from 'graphql-tag';

import ApolloClient, { createNetworkInterface } from 'apollo-client';
const networkInterface = createNetworkInterface('http://35.161.140.21:8080/graphql');
const apollo = new ApolloClient({
  networkInterface,
});

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

export function memoSuccessHACK(memo) {
	return {
		type      : types.MEMO_SUCCESS,
		memo  		: memo
	};
}

export function memoSuccess(memo) {
	return function (dispatch) {
		dispatch(memoSuccessHACK(memo));	
	}
}

// USERS


export function retrieveUsers(query) {

		return new Promise((resolve, reject) => {

			fetch('http://35.161.140.21:8080/api/v1/searchAccount?search='+query, {
				method: 'GET',
				headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
			})
			.then((response) => response.json()) 
			.then((responseJson) => {
        return resolve(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
			
		});
}


// GENRES
export function retrieveHistorySuccess(data) {
	return {
		type         : types.RETRIEVE_HISTORY_SUCCESS,
		history      : data
	};
}

export function retrieveHistory() {
	return function (dispatch) {
		const query = apollo.query({
			query: gql`
				{
					account(name:"latincoin") {
						history(start:0, limit:20) {
							id
							__typename
							block {
								timestamp
							}
							... on NoDetailOp {
								id
							}
							... on Transfer {
								type
								from {
									name
								}
								to {
									name
								}
								memo {
									from
									to
									nonce
									message
								}
								amount {
									quantity
									asset {
										symbol
										id
									}
								}
								fee {
									quantity
									asset {
										symbol
										id
									}
								}
							}
						}
					}
				}
			`,
			forceFetch: false
		});

		query.then((graphQLResult) => {
      const { errors, data } = graphQLResult;

      if (data) {
				
// 				console.log('**************************************8');
// 				console.log(data);
// 				console.log('**************************************8');
				
				let meses = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
				
				let data2 = {}
				let history = data.account.history;
				let proms = [];
				for(var i=0; i<history.length; i++) {
					var month = history[i].block.timestamp.substr(5,2) >> 0;
					var mes   = meses[month];
					if(!(mes in data2)) {
						data2[mes] = []
					}
					
					if(history[i].__typename == 'Transfer' && history[i].memo){
						//console.log(history[i].memo);
						let memo = history[i].memo;
						let pub = memo.from;
						
						if(memo.from == 'BTS6HihtEB8LfvLe4cSSrqtyxkdfKDkeMocKwu7PJkb6W8gqddi3R')
							pub = memo.to;

						//let p = UWCrypto.decryptMemo(pub, memo.message, '9b2f6605ce31b57201c632af7d630f7d5ba0f7789e9f24371769b0bd255b4ef2', memo.nonce);
						//proms.push(p);// = i;
					}
					
// 					Promise.all(proms).then(res => {
// 							console.log('Memo para vos =>', res);
// 							//history[i].message = res.message;
// 						}, err => {
// 							console.log('Error decrypting memo', err);
// 						});
					
					
					
					//UWCrypto.decryptMemo(String pubKey, String encryptedMemo, String privKey, String nonce
					
					data2[mes].push(history[i]);
				}
				
				dispatch(retrieveHistorySuccess(data2));
				
				//Decrypt memos

				
				
			}

      if (errors) {
        console.log('got some GraphQL execution errors', errors);
      }
    }); //.catch(logError);
	}
  
}
		
		
		
		
		//return axios.get(`${TMDB_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`)
		//.then(res => {
	
//     let res = { data : { 
//       'Octubre'    : [
//         { id: 1, type: 'out', from: 'me', to :'javi.rr', msg: 'Devolucion!', amount: '500.00'},
//         { id: 2, type: 'in', from: 'RamiroRoa', to :'me', msg: 'Gracias por el flete...', amount: '156.00'},
//         { id: 3, type: 'out', from: 'me', to :'Fundacion LTCN', amount: '10.00'},
//         { id: 4, type: 'in', from: 'Cooperativa TUA', to :'me', amount: '10.00'},
//       ], 
//       'Septiembre' : [
//         { id: 5, type: 'in', from: 'PedroGoyena', to :'me', msg: 'Varios', amount: '30.00'},
//         { id: 6, type: 'out', from: 'me', to :'LopezOrono', msg: 'Correccion', amount: '220.00'},
//         { id: 7, type: 'out', from: 'me', to :'LopezOrono', amount: '500.00'},
//       ],
//       'Agosto'     : [
//         { id: 8,  type: 'in',  from: 'AldoPirose', to :'me', amount: '10.00'},
//         { id: 9,  type: 'out', from: 'me', to :'pancho.', msg: 'Signatura rocosa!', amount: '1502.15'},
//         { id: 10, type: 'in',  from: 'Treniso', to :'me', amount: '25.00'},
//         { id: 11, type: 'out', from: 'me', to :'javi.rr', msg: 'Lo del dulce', amount: '1800.00'},
//       ]
//     } }

    //dispatch(retrieveHistorySuccess(res));

    //})
		//.catch(error => {
		//	console.log(error); //eslint-disable-line
		//});
	//};
//}

