/**
 * @flow
 */

'use strict';

import type { Action } from '../actions/types';

type Convert<T> = (object: Object) => Array<T>;
type Reducer<T> = (state: ?Array<T>, action: any) => Array<T>;

function createApolloReducer<T>(
  type: string,
  convert: Convert<T>
): Reducer<T> {
  return function(state: ?Array<T>, action: Action): Array<T> {
    if (action.type === type) {
      // Flow can't guarantee {type, list} is a valid action
      return convert(action);
    }
    return state || [];
  };
}

module.exports = createApolloReducer;
