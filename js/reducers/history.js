/**
 * @flow
 */

'use strict';

const createApolloReducer = require('./createApolloReducer');

export type Operation = {
  id  : string;
};

function reducer(action: Object): Operation[] {
  return [1,2,3,4,5,6,7,8,9,10]
}

module.exports = createApolloReducer('LOADED_HISTORY', reducer);
