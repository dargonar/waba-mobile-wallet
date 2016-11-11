/**
 * @flow
 */

'use strict';

import type {Action} from '../actions/types';

type State = Array<Object>;

function balance(state: State = [], action: Action): State {
  
  if (action.type === 'LOADED_BALANCE') {
    return action.balance;
  }

  return state;
}

module.exports = balance;
