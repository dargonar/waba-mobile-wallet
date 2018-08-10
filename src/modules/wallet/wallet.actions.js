import * as types from '../../constants/actionTypes';
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
		//console.log(' -- REDUCER -> CREATE_ACCOUNT_SUCCESS');
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
						console.log('==== generateMnemonic:');
						console.log(JSON.stringify(res1));
						console.log('==== mnemonicToMasterKey:');
						console.log(JSON.stringify(res2));
						console.log('==== derivatePrivate:');
						console.log(JSON.stringify(res3));

						fetch(config.getAPIURL('/account/register'), {
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

              console.log(' #### /account/register:', console.log(responseJson));
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
									name     : name,
                  identicon: responseJson.identicon,
                  id:        responseJson.account_id
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

// ---------------------
// Address
export function addressSuccessHACK(address) {
	return {
		type      : types.ADDRESS_SUCCESS,
		address  	: address
	};
}

export function addressSuccess(address) {
	return function (dispatch) {
		dispatch(addressSuccessHACK(address));
	}
}
// ---------------------

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
export function endorseApply(from, endorse_type) {
	return new Promise((resolve, reject) => {
		fetch(config.getAPIURL('/endorse/apply'), {
			method: 'POST',
			headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
			body: JSON.stringify({
				from         : from,
				endorse_type : endorse_type
			})
		})
		.then((response) => response.json())
		.then((responseJson) => {
			return resolve(responseJson);
		})
		.catch((error) => {
			return reject(error);
		});
	});
}

// USERS
/*
	# --------------------------------------------------- #
    # search_filter:
    #   0 = ALL
    #   1 = NO_CREDIT && NO_BLACK
    #   2 = HAS_CREDIT
    # --------------------------------------------------- #
*/
export function retrieveUsers(query, search_filter) {
    search_filter = search_filter || '0';
		return new Promise((resolve, reject) => {
			fetch(config.getAPIURL('/account/search2?search='+query+'&search_filter='+search_filter), {
				method: 'GET',
				headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
			})
			.then((response) => response.json())
			.then((responseJson) => {
        console.log(' -- retrieveUsers:')
        console.log(JSON.stringify(responseJson));

        resolve(responseJson);
        return;
      })
      .catch((error) => {
        console.error(error);
        reject(error);
        return;
      });

		});
}

export function retrieveBusinesses(skip, count, query, filter) {
    // search_filter = search_filter || '0';
		return new Promise((resolve, reject) => {
			fetch(config.getAPIURL('/dashboard/business/credited/'+skip+'/'+count), {
				method: 'GET',
				headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
			})
			.then((response) => response.json())
			.then((responseJson) => {
        console.log(' -- retrieveBusinesses:')
        console.log(JSON.stringify(responseJson));

        resolve(responseJson);
        return;
      })
      .catch((error) => {
        console.error(error);
        reject(error);
        return;
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
export function retrieveHistoryError() {
	return {
		type         : types.RETRIEVE_HISTORY_ERROR,
	};
}

export function retrieveHistorySuccess(data, start) {
	return {
		type         : types.RETRIEVE_HISTORY_SUCCESS,
		history      : data,
		start        : start
	};
}

export function retrieveBalanceSuccess(balance) {
	return {
		type         : types.RETRIEVE_BALANCE_SUCCESS,
		balance      : balance
	};
}

export function creditReadySuccess(credit_ready) {
	return {
		type         : types.CREDIT_READY_SUCCESS,
		credit_ready : credit_ready
	};
}


export function retrieveHistory(account_name, keys, first_time, start, subaccount) {

  console.log(' -- retrieveHistory::subaccount->', JSON.stringify(subaccount));

  return function (dispatch) {
		if (start === undefined) start=0;
		console.log( 'retrieveHistory()', account_name, first_time, start, JSON.stringify(subaccount));

		let memo_key_map = {};
		for(var i=0; i<keys.length; i++) {
			memo_key_map[keys[i].pubkey] = keys[i].privkey;
		}

		//http://stackoverflow.com/questions/40837676/apolloclient-timeout-best-option
		let x = 0;
		let timer = setTimeout(() => {
			if (x === 0) {
				console.log('error TOTAL');
				dispatch(retrieveHistoryError());
				return;
			}
			x = 1;
		}, 10000);

    console.log(JSON.stringify({
      account 				  : account_name,
      first_time        : first_time,
      asset   					: config.DISCOIN_ID,
      type              : start == 0 ? 'relative' : 'normal',
      start   					: start
    }));

		let query = apollo.query({
			query: gql`
				query getTodo($account : String!, $asset : String!, $first_time : Boolean!, $start : String!, $type : String!) {
  				asset(id:$asset) @include(if:$first_time)
					blockchain {
						refBlockNum
						refBlockPrefix
						fees @include(if:$first_time)
					}
					account(name:$account) {
						id
						blacklistedBy(account:"discoin.admin")
						balance {
							quantity
							asset {
								id
							}
						}
						history(type:$type, start:$start, limit:25) {
							id
							__typename
							block {
								timestamp
							}
							... on NoDetailOp {
								id
							}
							... on WithdrawPermission {
                amount {
                  quantity
                  asset {
                    id
                  }
                }
                from {
                  id
                  name
                }
                to {
                  id
                  name
                }
              }
              ... on WithdrawPermissionClaim {
                amount {
                  quantity
                  asset {
                    id
                  }
                }
                from {
                  id
                  name
                }
                to {
                  id
                  name
                }
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
				asset   					: config.DISCOIN_ID,
				type              : start == 0 ? 'relative' : 'normal',
				start   					: start
			},
			forceFetch: true
		});

    // NUNCA
    if(config.isSubaccountMode(subaccount) && false)
    {
      query = apollo.query({
  			query: gql`
        query getTodo($account: String!, $asset: String!, $first_time: Boolean!, $start: String!, $type: String!) {
          asset(id: $asset) @include(if: $first_time)
          blockchain {
            refBlockNum
            refBlockPrefix
            fees @include(if: $first_time)
          }
          account(name: $account) {
            id
            blacklistedBy(account: "discoin.admin")
            balance {
              quantity
              asset {
                id
              }
            }
            history(type: $type, start: $start, limit: 25) {
              id
              __typename
              block {
                timestamp
              }
              ... on WithdrawPermission {
                amount {
                  quantity
                  asset {
                    id
                  }
                }
                from {
                  id
                  name
                }
                to {
                  id
                  name
                }
              }
              ... on WithdrawPermissionClaim {
                amount {
                  quantity
                  asset {
                    id
                  }
                }
                from {
                  id
                  name
                }
                to {
                  id
                  name
                }
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
  				asset   					: config.DISCOIN_ID,
  				type              : start == 0 ? 'relative' : 'normal',
  				start   					: start
  			},
  			forceFetch: true
  		});
    }



		query.then((graphQLResult) => {
      clearTimeout(timer);
			if (x === 1) {
				return;
			}

			const { errors, data } = graphQLResult;

			if(errors ) {
				dispatch(retrieveHistoryError());
				console.log('got some GraphQL execution errors', errors);
				return;
			}

      if (data) {

				dispatch(myAccountIdSuccess(data.account.id));
				dispatch(blockChainSuccess(data.blockchain));

				if(data.blockchain.fees) {
					dispatch(feeScheduleSuccess(JSON.parse(data.blockchain.fees)));
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
					if(history[i].memo ){
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

				let balance_map = {};
				if(balance) {
					for(var i=0; i<balance.length; i++) {
						balance_map[balance[i].asset.id] = parseFloat(balance[i].quantity);
						console.log('ENCONTRE ESTO ', balance[i].asset_id, ' => ', balance[i].quantity);
					}
					dispatch(retrieveBalanceSuccess(balance_map));
				}

				dispatch(creditReadySuccess(data.account.blacklistedBy));

				//Decrypt memos
				Promise.all(proms).then(res => {
					for(var i=0; i<res.length;i++) {
							history[inxs[i]].message = res[i].message;
							memo_cache[history[inxs[i]].id] = res[i].message;
					}

					console.log('**** retrieveHistorySuccess', start, history.length);

					dispatch(retrieveHistorySuccess(history, start));
					dispatch(readySuccess(1));
				});

			} //if(data)

    }).catch((err)=>{

			clearTimeout(timer);
			dispatch(retrieveHistoryError());
			console.log('catch error', err);
		}); //query.then

	} //dispatch

} //function

// ************************************************************************************
// WALLET MODE
export function switchModeSuccess(wallet_mode) {
	return {
		type         : types.SWITCH_MODE_SUCCESS,
		wallet_mode  : wallet_mode
	};
}


export function getBusiness(account_id) {
  return new Promise((resolve, reject) => {
		fetch(config.getAPIURL('/dashboard/business/profile/'+account_id+'/load'), {
			method: 'GET',
			headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
		})
		.then((response) => response.json())
		.then((responseJson) => {
      console.log(' -- wallet.actions:: call getBusiness: ')
      console.log(JSON.stringify(responseJson));

      resolve(responseJson);
      return;
    })
    .catch((error) => {
      console.error(error);
      reject(error);
      return;
    });
  });
}

export function getSubAccountPermissions(account_id) {
    return new Promise((resolve, reject) => {
			fetch(config.getAPIURL('/business/subaccount/list/'+account_id), {
				method: 'GET',
				headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
			})
			.then((response) => response.json())
			.then((responseJson) => {
        console.log(' -- wallet.actions:: call switchMode -> getCurrentPermissions')
        console.log(JSON.stringify(responseJson));

        resolve(responseJson);
        return;
      })
      .catch((error) => {
        console.error(error);
        reject(error);
        return;
      });

		});
}
