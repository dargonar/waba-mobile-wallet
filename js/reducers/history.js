/**
 * @flow
 */

'use strict';

const createApolloReducer = require('./createApolloReducer');

export type Operation = {
  id  : string;
};

function reducer(action: Object): Operation[] {
  return action.data.account.history;
}

module.exports = createApolloReducer('LOADED_HISTORY', reducer);
