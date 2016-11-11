/**
 * @flow
 */

'use strict';

require('../../shim');
var {ChainStore} = require("graphenejs-lib");

import type { Action } from './types';

async function loadAccount(account_name: string) : Action {
  const account  = await ChainStore.FetchChain("getAccount", account_name);
  return {
    type    : 'LOADED_ACCOUNT',
    account : account
  };
}

function loadBalance(account_name: string) : ThunkAction {
  
  return (dispatch, getState) => {
    
    return dispatch( loadAccount(account_name) ).then( (res) => {

      //console.log(JSON.stringify(res));
      
      const balances = res.account.get('balances');

      var proms = [];  
      Array.from(balances.keys()).forEach( function(key) {
        proms.push( ChainStore.FetchChain("getObject", key) );
        proms.push( ChainStore.FetchChain("getObject", balances.get(key)) )
      });
      
      Promise.all(proms).then(bals => {
        
        var balance = [];
        for(var i=0; i<bals.length/2; i++) {
          balance.push({asset:bals[2*i], amount:bals[2*i+1]});
        }
        
        dispatch(
          { type : 'LOADED_BALANCE', balance:balance }
        );
        
      }, err => {
        
      })
      
      
      //return {type : 'LOADED_BALANCE', balance : [{asset: "papa", balance: "pepe"}] };
      
//       Promise.all(proms).then(bals => {
//         dispatch( {type : 'LOADED_BALANCE', balance : [{asset: "papa", balance: "pepe"}] } );
//       }, err => {
//         console.log('EJJJA');
//       });
      
    });
  }
  
}

module.exports = {
  loadBalance,
  loadAccount,
};
