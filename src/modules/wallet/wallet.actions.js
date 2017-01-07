// import axios from 'axios';
import * as types from '../../constants/actionTypes';
// import { TMDB_URL, TMDB_API_KEY } from '../../constants/api';
import * as config from '../../constants/config';
import UWCrypto from '../../utils/Crypto';
import Bts2helper from '../../utils/Bts2helper';
import gql from 'graphql-tag';

import ApolloClient, { createNetworkInterface } from 'apollo-client';
const networkInterface = createNetworkInterface(config.GRAPHQL_URL);
const apollo = new ApolloClient({
  networkInterface,
});

let memo_cache = {};

function myDecodeMemo(privkey, pubkey, memo_from, memo_to, memo_nonce, memo_message) {
	return new Promise( (resolve, reject) => {
		Bts2helper.decodeMemo(privkey, pubkey, memo_from, memo_to, memo_nonce, memo_message).then( message => {
			resolve({error:0, message:message});
		}, err => {
			console.log('No puedo con este memo ', memo_message);
			resolve({error:1, message:''});
		});
	});	
}

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

// export function getAccount(name) {
// 	return new Promise((resolve, reject) => {
		
// 		fetch(config.getAPIURL('/account/'+name), {
// 			method: 'GET',
// 			headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
// 		})
// 		.then((response) => response.json(), err=>{ reject(err); }) 
// 		.then((responseJson) => {
// 			resolve(responseJson);
// 		}, err => {
// 			reject(err);
// 		});
		
// 	}
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

export function blockChainSuccess(blockchain) {
	return {
		type      	: types.BLOCKCHAIN_SUCCESS,
		blockchain  : blockchain
	};
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

export function myAccountIdSuccess(id) {
	return {
		type    : types.MY_ACCOUNT_ID_SUCCESS,
		id      : id
	};
}

export function feeScheduleSuccess(fees) {
	return {
		type    : types.FEE_SCHEDULE_SUCCESS,
		fees    : fees
	};
}

export function readySuccess(ready) {
	return {
		type    : types.READY_SUCCESS,
		ready   : ready
	};
}

export function assetSuccess(asset) {
	return {
		type    : types.ASSET_SUCCESS,
		asset   : asset
	};
}


// HISTORY
export function retrieveHistorySuccess(data, total_ops, start) {
	return {
		type         : types.RETRIEVE_HISTORY_SUCCESS,
		history      : data,
		total_ops    : total_ops,
		start        : start
	};
}

export function retrieveBalanceSuccess(balance) {
	return {
		type         : types.RETRIEVE_BALANCE_SUCCESS,
		balance      : balance
	};
}

export function retrieveHistory(account_name, keys, first_time, start) {
	return function (dispatch) {
		start = start | 0;
		console.log( 'retrieveHistory()', account_name, first_time, start);
		
		let memo_key_map = {};
		for(var i=0; i<keys.length; i++) {
			memo_key_map[keys[i].pubkey] = keys[i].privkey;
		}
		
		const query = apollo.query({
			query: gql`
				query getTodo($account : String!, $asset : String!, $first_time : Boolean!, $start : Int) {
  				asset(id:$asset) @include(if:$first_time)
					blockchain {
						refBlockNum
						refBlockPrefix
						fees @include(if:$first_time)
					}
					account(name:$account) {
						id
						balance {
							quantity
							asset {
								id
							}
						} 
						history(start:$start, limit:6) {
							id
							__typename
							block {
								timestamp
							}
							... on NoDetailOp {
								id
							}
							... on OverdraftChange {
								amount {
									quantity
									asset {
										symbol
										id
									}
								}
								type
							}
							... on Transfer {
								from {
									id
									name
								}
								to {
									id
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
				account 				  : account_name,
				first_time        : first_time,
				asset   					: config.ASSET_ID,
				start   					: -start
			},
			forceFetch: true
		});

		query.then((graphQLResult) => {
      const { errors, data } = graphQLResult;

      if (data) {

				dispatch(myAccountIdSuccess(data.account.id));
				dispatch(blockChainSuccess(data.blockchain));
				
				if(data.fees) {
					dispatch(feeScheduleSuccess(JSON.parse(data.fees)));
				}
				
				if(data.asset) {
					dispatch(assetSuccess(JSON.parse(data.asset)));
				}
				
				
				let history = data.account.history;
				let proms = [];
				let inxs  = [];
				
				let real_ops = 0;
				
				for(var i=0; i<history.length; i++) {

					//Meta magia
					if( history[i].__typename == 'OverdraftChange' ) {
						if(history[i].type == 'up')
							real_ops += 4;
						else
							real_ops += 6;
					} else {
						real_ops += 1;
					}
					
					//history[i].__typename == 'Transfer' && 
					if(history[i].memo){
						//console.log(history[i].memo);
 						
						if(history[i].id in memo_cache) {
							//noconsole.log('CACHE HIT =>', history[i].id, memo_cache[history[i].id]);
							history[i].message = memo_cache[history[i].id];
						} else {

							let memo    = history[i].memo;
							let privkey = memo_key_map[memo.from];
							let pubkey  = memo.to;

							if(!privkey) {
								privkey = memo_key_map[memo.to];
								pubkey  = memo.from;
							}

							if(privkey) {

								let p = myDecodeMemo(
									privkey,
									pubkey,
									memo.from,
									memo.to,
									memo.nonce,
									memo.message
								);

								proms.push(p);
								inxs.push(i);
							} else {
								console.log('no lo puedo DECODESSSSS');
							}
						}
					}

				}
				
				let balance = data.account.balance;

				if(balance) {
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
				}
				
				//Decrypt memos
				Promise.all(proms).then(res => {
					for(var i=0; i<res.length;i++) {
							history[inxs[i]].message = res[i].message;
							memo_cache[history[inxs[i]].id] = res[i].message;
					}
					
					dispatch(retrieveHistorySuccess(history, real_ops, start));
					dispatch(readySuccess(1));
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
	
