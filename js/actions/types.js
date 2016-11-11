/**
 * @flow
 */

'use strict';

export type Action =
	{ type : 'LOADED_BALANCE', balance : Array<Object> } |
	{ type : 'LOADED_HISTORY', history : Array<Object> } |
	{ type : 'LOADED_ACCOUNT', account : Object } 
  // | { type: 'LOADED_MAPS', list: Array<Object> }
  // | { type: 'SEEN_ALL_NOTIFICATIONS' }
  // | { type: 'RESET_NUXES' }
  ;

export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
