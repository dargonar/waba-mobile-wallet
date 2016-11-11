'use strict';

import type {Action} from '../actions/types';

type State = Object;

function account(state: State = undefined, action: Action): State {
  if (action.type === 'LOADED_ACCOUNT') {
    console.log('SE DISPARA ESTE REDUCER!!');
    return action.account;
  }

  return state;
}

module.exports = surveys;
