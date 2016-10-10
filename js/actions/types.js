/**
 * @flow
 */

'use strict';

export type Action =
	{ type : 'LOADED_BALANCE', list: Array<Object> }
  |	{ type : 'LOADED_HISTORY', list: Array<Object> }
  
  // | { type: 'LOADED_MAPS', list: Array<Object> }
  // | { type: 'SEEN_ALL_NOTIFICATIONS' }
  // | { type: 'RESET_NUXES' }
  ;

export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
