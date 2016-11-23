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

// export function createAccountSuccess(data) {
// 	return {
// 		type      : types.CREATE_ACCOUNT_SUCCESS,
// 		data  : data
// 	};
// }

export function createAccount(name) {

		return new Promise((resolve, reject) => {

			let that = this;
			UWCrypto.generateMnemonic('es', 128).then(function(res1) {
				UWCrypto.mnemonicToMasterKey(res1.mnemonic).then(function(res2) {
					let p = []
					Promise.all([ 
						UWCrypto.derivePrivate('', '', res2.masterPrivateKey, 1),
						UWCrypto.derivePrivate('', '', res2.masterPrivateKey, 2),
						UWCrypto.derivePrivate('', '', res2.masterPrivateKey, 3)
					]).then(function(res3) {

						fetch('http://35.161.140.21:8080/api/v1/register', {
							method: 'POST',
							headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
							body: JSON.stringify({
								name:   	name,
								owner:  	res3[0].pubkey,
								active: 	res3[1].pubkey,
								memo:   	res3[2].pubkey
							})
						})
						.then((response) => response.json()) 
						.then((responseJson) => {
							// return resolve(responseJson);
							if(responseJson.error){
								reject(responseJson.error);
								return;
							}
							else
							{
								return resolve({
									mnemonic : res1.mnemonic,
									keys     : res3,
									name     : name
								});
							}
						})
						.catch((error) => {
							console.error(error);
							reject(error);
							return;
						});
					}, function(err) {
						reject(err);
					});
				}, function(err) {
					reject(err);
				});
			}, function(err) {
				reject(err);
			});
			
		});
}

// export function createAccount(name) {
// 	return function (dispatch) {
		
// 	}
// }

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


// HISTORY
export function retrieveHistorySuccess(data) {
	return {
		type         : types.RETRIEVE_HISTORY_SUCCESS,
		history      : data
	};
}

export function retrieveBalanceSuccess(balance) {
	return {
		type         : types.RETRIEVE_BALANCE_SUCCESS,
		balance      : balance
	};
}

export function retrieveHistory() {
	return function (dispatch) {
		const query = apollo.query({
			query: gql`
				{
					account(name:"latincoin") {
						balance {
							quantity
							asset {
								id
							}
						}
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
			forceFetch: true
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
				let inxs  = [];
				
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

						let p = UWCrypto.decryptMemo(pub, memo.message, '9b2f6605ce31b57201c632af7d630f7d5ba0f7789e9f24371769b0bd255b4ef2', memo.nonce);
						proms.push(p);
						inxs.push(i);
					}
					data2[mes].push(history[i]);
				}
				
				dispatch(retrieveHistorySuccess(data2));
				
				let balance = data.account.balance;
				let b = 0;
				for(var i=0; i<balance.length; i++) {
					if(balance[i].asset.id == '1.3.1004') {
						b = balance[i].quantity;
						console.log('ENCONTRE ESTO => ', b);
						break;
					}
				}
				dispatch(retrieveBalanceSuccess(b));
				
				//Decrypt memos
					Promise.all(proms).then(res => {
						console.log('Memo para vos =>', res);
						for(var i=0; i<res.length;i++) {
							history[inxs[i]].message = res[i].message;
							console.log('********************************')
							console.log(i, history[inxs[i]]);
							console.log('********************************')
							dispatch(retrieveHistorySuccess(data2));
						}
						
					}, err => {
						console.log('Error decrypting memo', err);
					});



				//UWCrypto.decryptMemo(String pubKey, String encryptedMemo, String privKey, String nonce

				
				
			} //if(data)

      if (errors) {
        console.log('got some GraphQL execution errors', errors);
      }
    }); //.catch(logError);
	}
  
}
		
		//return axios.get(`${TMDB_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`)
		//.then(res => {
	
