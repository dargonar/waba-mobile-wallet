/**
 * @flow
 */

'use strict';

const createApolloReducer = require('./createApolloReducer');

export type Faq = {
  id       : string;
  question : string;
  answer   : string;
};

function reducer(action: Object): Faq[] {
  return action.data.viewer.faqs;
}

module.exports = createApolloReducer('LOADED_FAQS', reducer);
