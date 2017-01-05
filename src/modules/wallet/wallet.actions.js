// import axios from 'axios';
import * as types from '../../constants/actionTypes';
// import { TMDB_URL, TMDB_API_KEY } from '../../constants/api';
import * as config from '../../constants/config';
import UWCrypto from '../../utils/Crypto';
import gql from 'graphql-tag';

import ApolloClient, { createNetworkInterface } from 'apollo-client';
const networkInterface = createNetworkInterface(config.GRAPHQL_URL);
const apollo = new ApolloClient({
  networkInterface,
});

export function createAccountSuccess(account) {
	return {
		type      : types.CREATE_ACCOUNT_SUCCESS,
		account   : account
	};
}

export function createAccountSuccessHACK(account) {
	return function (dispatch) {
		console.log(' -- REDUCER -> CREATE_ACCOUNT_SUCCESS');
		dispatch(createAccountSuccess(account));	
	}
}

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
						
						//fetch('http://35.161.140.21:8080/api/v1/register', {
						fetch(config.getAPIURL('/register'), {
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
								let account = {
									mnemonic : res1.mnemonic,
									keys     : res3,
									name     : name
								};
								createAccountSuccessHACK(account);
								return resolve(account);
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
			// 			fetch('http://35.161.140.21:8080/api/v1/searchAccount?search='+query, {
			fetch(config.getAPIURL('/searchAccount?search='+query), {
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

export function retrieveHistory(account_name, memo_pubkey, memo_privkey) {
	return function (dispatch) {
		//console.log( 'retrieveHistory(account_name, memo_pubkey, memo_privkey)', account_name, memo_pubkey, memo_privkey);
		
		const query = apollo.query({
			query: gql`
				query getTodo($v1 : String!) {
					account(name:$v1) {
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
			variables : { 
				v1 : account_name
			},
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
						
						if(memo.from == memo_pubkey)
							pub = memo.to;

// 						console.log('---TO DECRYPT');
// 						console.log('pub =>', pub);
// 						console.log('memo =>', memo.message);
// 						console.log('privkey =>', memo_privkey);
// 						console.log('memo =>', memo.nonce);
						
						let p = UWCrypto.decryptMemo(pub, memo.message, memo_privkey, memo.nonce);
						proms.push(p);
						inxs.push(i);
					}
					data2[mes].push(history[i]);
				}
				
				dispatch(retrieveHistorySuccess(data2));
				
				let balance = data.account.balance;
				
				let b = 0;
				let d = 0;
				
				for(var i=0; i<balance.length; i++) {
					if(balance[i].asset.id == config.ASSET_ID) {
						b = balance[i].quantity;
						console.log('ENCONTRE MONEDA ESTO => ', b);
					}
					if(balance[i].asset.id == config.ASSET2_ID) {
						d = balance[i].quantity;
						console.log('ENCONTRE DESCUB ESTO => ', d);
					}					
				}
			
				dispatch(retrieveBalanceSuccess([b,d]));
				
				//Decrypt memos
				Promise.all(proms).then(res => {
					//console.log('Memo para vos =>', res);
					for(var i=0; i<res.length;i++) {
						history[inxs[i]].message = res[i].message;
// 						console.log('********************************')
// 						console.log(i, history[inxs[i]]);
// 						console.log('********************************')
					}

					//HACK MEGA HACK
					dispatch(retrieveHistorySuccess( JSON.parse(JSON.stringify(data2)) ));
					
					//dispatch(retrieveHistorySuccess(data2));

				}, err => {
					console.log('Error decrypting memo', err);
				});

			} //if(data)

      if (errors) {
        console.log('got some GraphQL execution errors', errors);
      }
    }); //.catch(logError);
	}
  
}
		
		//return axios.get(`${TMDB_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`)
		//.then(res => {
	
