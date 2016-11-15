import { combineReducers } from 'redux';
import wallet from '../modules/wallet/wallet.reducer';

const rootReducer = combineReducers({
	wallet
});

export default rootReducer;