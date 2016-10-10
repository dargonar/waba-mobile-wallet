/**
 * @flow
 */

'use strict';

var { combineReducers } = require('redux');

module.exports = combineReducers({
  balance: require('./balance'),
  history: require('./history'),
  //faqs: require('./faqs'),
  //topics: require('./topics'),
});
