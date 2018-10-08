// export const API_URL         = 'https://api.monedapar.com';
// export const API_URL          = 'http://34.212.171.239:8089';

// HEX 

// PRIMARY-300 USER #ff9e5d
// PRIMARY-500 USER #ff7232
// PRIMARY-500 SUBACC #1e3695
// SECONDARY-700 SUBACC #1c228e


import Identicon from 'identicon.js';

export const API_URL          = 'http://34.212.171.239:8088';
export const FILES_URL        = API_URL+'/files/';
export const API_URL_V1       = API_URL+'/api/v3';
export const WABA_NETWORK_URL = 'https://waba.network';

export const API_GRAPHQL_URL = 'http://34.212.171.239:8088';
export const GRAPHQL_URL     = API_GRAPHQL_URL+'/graphql/v3';

export const ASSET_PRECISION = 2;
export const ASSET_DIVIDER   = 100;


export const I_ENDORSE_PREFIX    = '~ie';
export const ENDORSED_BY_PREFIX  = '~eb';
export const ENDORSED_TX_PREFIX  = '~et';

export const REFUND_PREFIX  			= '~re';
export const PAYDISCOUNTED_PREFIX = '~di';

// SERVER
export const CHAIN_ID        				= 'bde617520673d18e67db5d7060ca2740f80e28093519c30176044c8d4a227e73';
// export const CHAIN_ID        				= '2cfcf449d44f477bc8415666766d2258aa502240cb29d290c1b0de91e756c559';
// export const ASSET_ID            		= '1.3.9';
// export const DISCOIN_ID          		= ASSET_ID;
// export const DISCOIN_CREDIT_ID   		= '1.3.7' // DESCUBIERTO | THEDISCOIN.OD
// export const DISCOIN_ACCESS_ID   		= '1.3.8' // ENDORSEMENT | DISCOIN.KEY | THEDISCOIN.A

// LOCAL
// export const CHAIN_ID        				= 'f5a42a1c16cf678773313f5f94ef7ebb69257c5f33a147aa8c4ac0fa5e451805';
export const ASSET_ID            		= '1.3.2';
export const DISCOIN_ID          		= ASSET_ID;
export const DISCOIN_CREDIT_ID   		= '1.3.3' // DESCUBIERTO | THEDISCOIN.OD
export const DISCOIN_ACCESS_ID   		= '1.3.4' // ENDORSEMENT | DISCOIN.KEY | THEDISCOIN.A

export const DISCOIN_SYMBOL         = 'THEDISCOIN.M'
export const DISCOIN_CREDIT_SYMBOL  = 'THEDISCOIN.OD'
export const DISCOIN_ACCESS_SYMBOL  = 'THEDISCOIN.A'

export const SEARCH_TYPE_SEND 			= 'search_type_send'; 
export const SEARCH_TYPE_CONFIRM 		= 'search_type_confirm';

export const QRSCAN_ACCOUNT_ONLY 			= 'ao'; //'account_only';
export const QRSCAN_ACCOUNT_N_AMOUNT 	= 'aa'; //'account_n_amount';
export const QRSCAN_PAYMENT_REQUEST 	= 'pr'; //'payment_request';
export const QRSCAN_INVOICE_DISCOUNT 	= 'id'; //'invoice_discount';
export const QRSCAN_FOR_REWARD 				= 'ir'; //'invoice_reward';
export const QRIMAGE_SIZE 						= 250;

export const SA_RESET_BALANCE 						= 'reset_balance';
export const SA_RESET_BALANCE_PREFIX 			= '~rb';
export const SA_SEND_EXTRA_BALANCE 				= 'send_extra_balance';
export const SA_SEND_EXTRA_BALANCE_PREFIX = '~se';

export const PROPUESTAPAR_ID = '1.2.151476';
export const MONEDAPAR_ID    = '1.3.1236';
export const DESCUBIERTO_ID  = '1.3.1237';

export const AVAL1000_ID     = '1.3.1319';
export const AVAL10000_ID    = '1.3.1322';
export const AVAL30000_ID    = '1.3.1320';
export const ALL_AVALS       = [AVAL1000_ID, AVAL10000_ID, AVAL30000_ID];
export const ALL_AVALS_DESC  = {'1.3.1319': '$1000', '1.3.1322': '$10000', '1.3.1320': '$30000'};

export const ASSET_SYMBOL    = '$';
// export const ASSET_SYMBOL    = '₱';

export const TX_TYPE_UNKNOWN 			= 0;
export const TX_TYPE_SENT 				= 1;
export const TX_TYPE_RECEIVED 		= 2;
export const TX_TYPE_CREDIT_UP 		= 4;
export const TX_TYPE_CREDIT_DOWN 	= 8;


import UWCrypto from '../utils/Crypto';

export function getAPIURL(path) {
	return API_URL_V1+path;
}

export function toHex(value) {
	// utf8 to latin1
	let s = unescape(encodeURIComponent(value))
	let h = ''
	for (var i = 0; i < s.length; i++) {
			h += s.charCodeAt(i).toString(16)
	}
	return h;
}

export function fromHex(hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2) str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

export function hasOverdraft(balances){
	if(DESCUBIERTO_ID in balances)
		return balances[DESCUBIERTO_ID];
	return false;
}

export function hasEndorsements(balances){
	for(var i = 0; i < ALL_AVALS.length; i++) {
		if(ALL_AVALS[i] in balances)
			if(Number(balances[ALL_AVALS[i]])>0)
				return ALL_AVALS[i];
	}
	return false;
}

export function readyToRequestCredit(balances, credit_ready){
	if(!credit_ready)
		return false;
	return hasEndorsements(balances);
}

export function getToday(){
	var d = new Date();
	var days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
	return days[d.getDay()];
}

function leadingZeros(n){
    return n > 9 ? "" + n: "0" + n.toString();
}

export function getUTCNow(){
	// var d = new Date();
	var now = new Date();
	var d = new Date( now.getTime() + (now.getTimezoneOffset() * 60000));
	return leadingZeros(d.getUTCFullYear())+leadingZeros(d.getUTCMonth())+leadingZeros(d.getUTCDate());
}

export function getFullUTCNow(){
	// var d = new Date();
	var now = new Date();
	var d = new Date( now.getTime() + (now.getTimezoneOffset() * 60000));
	return d.toISOString().replace('Z', '').split('.')[0];
}

export function dateAdd(date, interval, units) {
	var ret = new Date(date); //don't change original date
	switch(interval.toLowerCase()) {
		case 'year'   :  ret.setFullYear(ret.getFullYear() + units);  break;
		case 'quarter':  ret.setMonth(ret.getMonth() + 3*units);  break;
		case 'month'  :  ret.setMonth(ret.getMonth() + units);  break;
		case 'week'   :  ret.setDate(ret.getDate() + 7*units);  break;
		case 'day'    :  ret.setDate(ret.getDate() + units);  break;
		case 'hour'   :  ret.setTime(ret.getTime() + units*3600000);  break;
		case 'minute' :  ret.setTime(ret.getTime() + units*60000);  break;
		case 'second' :  ret.setTime(ret.getTime() + units*1000);  break;
		default       :  ret = undefined;  break;
	}
	return ret;
}

export function isSubaccountMode(subaccount){
	return (subaccount && subaccount.wallet_mode=='subaccount');
}

var sha512 = require('js-sha512').sha512;

export function getIdenticon(data){
	var hash = sha512.create();
	hash.update(data);
	console.log(' --------------- hash.hex()', hash.hex());
	return getIdenticonForHash(hash.hex());
}

export function getIdenticonForHash(_hash){
	var hash = _hash || 'cc65d8bb036388b414deac65a34d83e296b4c8b84f521cb059b561d0b5c0b4579495023d3dbdfb75492ff413ec0ad281f6e5263589d3a6418ba6dbce86bba6bf';
	var data = new Identicon(hash, {background:[255,255,255,255] }).toString();
	return'data:image/png;base64,'+data;
}


export function getRedDiscoinIcon(){
	return 'data:image/png;base64,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';
}


export function getDiscoinIcon(){
	return 'data:image/png;base64,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';
}

export function cleanMnemonics(mnemonics){
	let m = mnemonics; //'reforma ligero chacal buceo fase esquí taza oca aleta cima intuir bloque'
	let words = m.split(' ');
	// let original_words = words;
	let i;
	let replace_indexes = [];
	let vowels = ['á', 'é', 'í', 'ó', 'ú'];
	  //['á', 'é', 'í', 'ó', 'ú']
	  //['á', 'é', 'í', 'ó', 'u']
	
	for (i = 0; i < words.length; i++)
	  for (j = 0; j < vowels.length; j++)
	  	if(words[i].toLowerCase().indexOf(vowels[j])!==-1 )
			{
				// console.log('--------------------')
				// console.log('-- added word:')
				// console.log(words[i])
				// console.log('+++idx: ')
				// console.log(i)
				// console.log('+++vowel:')
				// console.log(vowels[j]);
				replace_indexes.push(i);
				break;
			}
	  
	// console.log('-- replace_indexes: ')
	// console.log(replace_indexes)

	for (i = 0; i < replace_indexes.length; i++)
		words[replace_indexes[i]] = 'reforma';

	return words.join(' ');
}

export function logNewAccountKeys(){
	
	UWCrypto.generateMnemonic('es', 128).then(function(res1) {

			// console.log(' --------------- menmonics', res1.mnemonic);
			// ToastAndroid.show(res1.mnemonic, ToastAndroid.LONG);
			let mnemonics = cleanMnemonics(res1.mnemonic);
			// ToastAndroid.show(res1.mnemonic + ' ++++' + mnemonics, ToastAndroid.LONG);
			// return;
			UWCrypto.mnemonicToMasterKey(mnemonics).then(function(res2) {
					let p = []
					Promise.all([
						UWCrypto.derivePrivate('', '', res2.masterPrivateKey, 1),
						UWCrypto.derivePrivate('', '', res2.masterPrivateKey, 2),
						UWCrypto.derivePrivate('', '', res2.masterPrivateKey, 3)
					]).then(function(res3) {
						console.log('==== generateMnemonic:');
						console.log(JSON.stringify(mnemonics));
						console.log('==== mnemonicToMasterKey:');
						console.log(JSON.stringify(res2));
						console.log('==== derivatePrivate:');
						console.log(JSON.stringify(res3));

				}, function(err) {
					console.log('*********** ERR#1: ' + str(err));
				});
			}, function(err) {
				console.log('*********** ERR#2: ' + str(err));
			});
		}, function(err) {
			console.log('*********** ERR#3: ' + str(err));
		});
}