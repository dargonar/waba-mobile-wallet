/**
 * @flow
 */

'use strict';

const createApolloReducer = require('./createApolloReducer');

export type Operation = {
  id  : string;
};

function reducer(action: Object): Operation[] {
  console.log('llaman al reducer con => ', JSON.stringify(action));
  return action.history;
}

module.exports = createApolloReducer('LOADED_HISTORY', reducer);
