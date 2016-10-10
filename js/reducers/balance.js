/**
 * @flow
 */

'use strict';

const createApolloReducer = require('./createApolloReducer');

export type Balance = {
  name  : string;
};

function reducer(action: Object): Balance[] {
  return action.data.account.balance;
}

module.exports = createApolloReducer('LOADED_BALANCE', reducer);
