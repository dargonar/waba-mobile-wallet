export default {
	wallet: {
		balance    		: {},
		history    		: [],
		at_end     		: false,
		ready      		: 0,
		errors     		: 0,
		fees       		: {},
		asset      		: {},
		new_keys   		: {},
		memo			 		: '',
		account    		: null,
		account_id 		: null,
		blockchain 		: {},
		credit_ready  : false,
		endorsements  : {},
		endorsed 			: null,
		new_tx 				: null,
		business_list : [],
		business_list_at_end : false,
		business_list_filter: {
			order: 
				{
					field: 'discount', 							//'discount', 'reward', 'proximity' 
					date : ''
				}
		},

		business_filter: 
			{
				selected_categories:[], 
				order: 
				{
					field: 'discount',//'discount', 'reward', 'proximity' 
					date : ''
				},
				// filter: { 
				// 	payment_methods: ['cash', 'debit_card', 'credit_card']
				// }
			} 
	}
};
