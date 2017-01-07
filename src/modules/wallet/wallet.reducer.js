import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function (state = initialState.wallet, action) {
	switch (action.type) {

		case types.READY_SUCCESS:
			return {
				...state,
				ready: action.ready
			};

		case types.BLOCKCHAIN_SUCCESS:
			return {
				...state,
				blockchain: action.blockchain
			};
			
		case types.ASSET_SUCCESS:
			return {
				...state,
				asset: action.asset
			};
			
		case types.FEE_SCHEDULE_SUCCESS:
			return {
				...state,
				fees: action.fees
			};
		
		case types.MY_ACCOUNT_ID_SUCCESS:
			account    = state.account
			account.id = action.id
			return {
				...state,
				account: account
			};
			
		case types.RETRIEVE_HISTORY_SUCCESS:
			if( action.start == 0 ) {
				return {
					...state,
					history   : action.history,
					total_ops : action.total_ops 
				};
			} else {
				//console.log('UPDATE con >0', state);
				return {
					...state,
					history   : state.history.concat(action.history),
					total_ops : state.total_ops + action.total_ops
				};
			}
			

		case types.CREATE_KEYS_SUCCESS:
			return {
				...state,
				new_keys: action.new_keys
			};
			
		case types.MEMO_SUCCESS:
			return {
				...state,
				memo: action.memo
			};
		case types.RETRIEVE_BALANCE_SUCCESS:
			return {
				...state,
				balance: action.balance
			};
		
		case types.CREATE_ACCOUNT_SUCCESS:
			console.log(' -- REDUCER -> CREATE_ACCOUNT_SUCCESS');
			return {
				...state,
				account: action.account
			};
			
// 		case types.RETRIEVE_NOWPLAYING_MOVIES_SUCCESS:
// 			return {
// 				...state,
// 				nowPlayingMovies: action.nowPlayingMovies
// 			};

// 		case types.RETRIEVE_MOVIES_GENRES_SUCCESS:
// 			return {
// 				...state,
// 				genres: action.moviesGenres
// 			};

// 		case types.RETRIEVE_MOVIES_LIST_SUCCESS:
// 			return {
// 				...state,
// 				list: action.list
// 			};

// 		case types.RETRIEVE_MOVIE_DETAILS_SUCCESS:
// 			return {
// 				...state,
// 				details: action.details
// 			};

		// case types.RETRIEVE_SIMILAR_MOVIES_SUCCESS:
		// 	return {
		// 		...state,
		// 		similarMovies: action.similarMovies
		// 	};

// 		case types.RETRIEVE_MOVIES_SEARCH_RESULT_SUCCESS:
// 			return {
// 				...state,
// 				searchResults: action.searchResults
// 			};
		default:
			return state;
	}
}