// export const API_URL         = 'https://api.monedapar.com';
// export const API_URL          = 'http://35.163.59.126:8089';

import Identicon from 'identicon.js';

export const API_URL          = 'http://35.163.59.126:8088';
export const FILES_URL        = 'http://35.163.59.126:8088/files/';
export const API_URL_V1       = API_URL+'/api/v3';
export const MERCADOPAR_URL   = 'http://mercado.monedapar.com?category=productos-y-servicios';
export const EMPLEOSPAR_URL   = 'http://mercado.monedapar.com?category=empleos-solicitados';
export const WABA_NETWORK_URL = 'https://waba.network';

export const API_GRAPHQL_URL = 'http://35.163.59.126:8088';
export const GRAPHQL_URL     = API_GRAPHQL_URL+'/graphql/v3';

export const ASSET_PRECISION = 2;
export const ASSET_DIVIDER   = 100;


export const I_ENDORSE_PREFIX    = '~ie';
export const ENDORSED_BY_PREFIX  = '~eb';
export const ENDORSED_TX_PREFIX  = '~et';

export const REFUND_PREFIX  			= '~re';
export const PAYDISCOUNTED_PREFIX = '~di';

// SERVER
// export const CHAIN_ID        				= '2cfcf449d44f477bc8415666766d2258aa502240cb29d290c1b0de91e756c559';
// export const ASSET_ID            		= '1.3.9';
// export const DISCOIN_ID          		= ASSET_ID;
// export const DISCOIN_CREDIT_ID   		= '1.3.7' // DESCUBIERTO | THEDISCOIN.OD
// export const DISCOIN_ACCESS_ID   		= '1.3.8' // ENDORSEMENT | DISCOIN.KEY | THEDISCOIN.A

// LOCAL
export const CHAIN_ID        				= 'f5a42a1c16cf678773313f5f94ef7ebb69257c5f33a147aa8c4ac0fa5e451805';
export const ASSET_ID            		= '1.3.2';
export const DISCOIN_ID          		= ASSET_ID;
export const DISCOIN_CREDIT_ID   		= '1.3.3' // DESCUBIERTO | THEDISCOIN.OD
export const DISCOIN_ACCESS_ID   		= '1.3.4' // ENDORSEMENT | DISCOIN.KEY | THEDISCOIN.A

export const DISCOIN_SYMBOL         = 'THEDISCOIN.M'
export const DISCOIN_CREDIT_SYMBOL  = 'THEDISCOIN.OD'
export const DISCOIN_ACCESS_SYMBOL  = 'THEDISCOIN.A'


export const QRSCAN_ACCOUNT_ONLY 			= 'ao'; //'account_only';
export const QRSCAN_ACCOUNT_N_AMOUNT 	= 'aa'; //'account_n_amount';
export const QRSCAN_PAYMENT_REQUEST 	= 'pr'; //'payment_request';
export const QRSCAN_INVOICE_DISCOUNT 	= 'id'; //'invoice_discount';
export const QRSCAN_INVOICE_REWARD 		= 'ir'; //'invoice_reward';
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
	var data = new Identicon(hash).toString();
	return'data:image/png;base64,'+data;
}


export function getDiscoinIcon(){
	//var hash = '';
	return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHUAAAB0CAYAAAC7WH0ZAAAACXBIWXMAAAsSAAALEgHS3X78AAAHzklEQVR4nO2d4XXaSBDHf+b5u7kK0FUQrgIrFZirIEoFcSoI14FTQXAFZ1cQuYJABSd3ABVwHwYFgQVIs7vSguf3Hi96jiWt+WtWu7OzM1fr9ZoKY+AemAA3XD6vQAEsgfnmuADyvhrkg6uKqBnwo7+mRMcCEXe++bfosS2tKEXNMEFPUYo8Q4SOlqv1ej1EnsL30N364hURd0aEFjzg/bw/fTICvgH/AU9A2mtr9hgQWYPOkDvgJ2KxWa8t2TAAkr4bcSGMkHFJQc/iDojwnXDmlOLm9NQLDjjzOVnE3CLd8gwYdnljG/12wwrpkp+6uNkA8abcd3Gzd8wN8C8ianCrHWz+nQH/hL6ZwR3iuBiHvMmgcjwFPgLPIW9oMAJ+EXCEfLXn0K8ypuMXfMcM2f6N482n63HFIwHEPSbqeyRBpiHlZ9TBPZ8RYZe+LmiiHmeMfOETwgq8QB4iL8KaqM1JEYE/Bbq+N2FN1PYkiLj3+H8HexHWRNUzRGYMXzxf11lYE9WdBJnn33q85jPyHlcxOP0rxgkKxLL+RtyBPrhDHhQVZql+GSKuQF9W+xmFuGapflkiVuvL5foDhUvRLDUcE8TKXEfIr4iwjQdOZqnhKGOXXN+zI1p2wSZqWMoVmYXjde5oMRq27rcbhkiEyQeHa6yQ6dPJbrgrURO2AW5pFzdEvsS8o3s1IUEs1+Ud22j+GkrUtPLxOSlvywrx+jz02IYqY+RBcxH2IyceVp+ixry5Ksi6pZIUCUjTsuDENMfHQClFnpxfyApGbIKCtCuWOKwct3nsB048oC6WOka6tT671zasiCuSI0f/3b1yJAhfa6lTxDLPRVCQHiTtuxEVJujnsCOOWGtbURNkBPdN2Zi+SftuQIUlbu/56aH/aCNqigjqMtcydnlCH7054sD0pqmoGTJii3EQ1Iai7wbU4DKAqz23iagZl7PLPO+7ATUU6EfDt9QMmE6JOuFyBH0kTksFmUVoB01vrPWYqGMcVt8jY0E889Q6lui9Xm/eq4fmqT4c0LHwgvzh3oKlA+Gy+/AvKslFrg/80pRwgpa5i0JTIKPLTrYPemCJtFUTV5xR6YnqLDXFzTe5zwvS2JzIU9VEwBhx6rRlx8NUJ2qBny0Gj4jFFx6u9Z7Q+gL+ZPNd7w+UMtwFXSB9fIYJqmGmPC8tD/ZFnSovWPKIdCHWzerRjgHS8qAqaoablca0ZnnOFOhimtLyYF9ULSaoX3LFOSM2S4ulqAn6ZbQXTFDf5MrzxrAVVbsZp0wlY/glV563I2qqvMgDNsINwRKZe7YlATdRV8QTpXeJFIpzfluqNivJE/H7U8+ZXHuiSxbRc/Gpnisag7mFraVqMFHDonbgaKMJX7Q3NMJjSZwvj6FW1NxvO4wacuV5Y9ufeoFoRU18NsLwizbdeuK3GUYNifK8pdZSgyYhNgC9qHNttYsbTNhocSlhok6zZjRCve3SpYRJpr2p0QhNT7iC7ehX4yE6ukfScEZjqXPYiporbzxV3tw4jcZSl7AVVeucH+EegWjUowkv2rHUObqVdpAkxpnyXKMe7cyigF2PkksUgyrbpXEQ7Xe5Y6kgkeEuyRFzzGJ9kSrPeyOqyx5JEIfEj801bPDkhsYH8HsGs+8mdNnRXPIFeWIyx+u8V1J0MWO/IyX2RV3iZzRbrfp7jy0AtCFTnpeXB4d2kodIrVNuNp7TTRTiHPlDzy3icYnOUv/YnHtQ1AT3NKYxUMYmT3tuR1MydIlTXjiylbGkIO7EF025QbKzzXpuR1My5Xk7zqNj66kz4LvyJrHxifitNUW/SW1H1CZZRGeEK1rXJY3TlfdEjk7Una4Xmmc8e1TcLDZiyyJaJUVvpbP9H7TJTXgJXXGsrsyp8rwVNYsxbWKU7pEyVb7qmRnCBLd36ZvXSdvAsxnSVbjWWemLou8G7DHEzTU7rfuhJpqwLKDzlfOz2tg2dU3RJ0955sBD6hKh/4CMJv/hPMT9Tlwj3xS3groHLdxXCZMh8s7NCFuQXYvXQu4ecEkuCTXTmCohig2NEXFT4shC+oy0JxZBwa3SBVRS1tURuizYEBF5vDlO6G7FJkfeobFlX5vh5sw5mbPKCvh1S4ZbpvNGXjHbytgdGe6p66dEVJXxvZPhLujRwVEVEzU8Ge6CrpBxSdHkl637DcsUP9VCprTwhpmlhqF0//lYsmxUCLeKieqfsvSLjzn66+Z6rebY1v365R5/pV9WKEuvHCphYrQjQazTZ+nRDKXjxCzVjSEyiJnjV9DPOKwomaXqyXBbOjvEVxyjH22g1I4h22pNIVajvNQiMEttxhgRckK4AHdvxSVM1MOkiIgTwq8Rf8ZjwLmJKiSbT7r5aLOVa/AqKNSLmiB/WOLzRpFRru8O6W8hf8W2zrtXqqKWw3OXuBmjGQukWy9CXLwUdcjlFMGNne8E3nxWijrDBA1NWZgpeJjq1Xq91hZiNZrziFhnJ8Fv11jiyJC8ItaZd3lTlxImxmFWiLsvoYd6A9dYehyflOkIHugxzvga98BiQ7rZGT2LWXK1Xq9T4GffDTlTXhAxZ/02Y5dylSbHrLUpC0TEJ+LbGglsRR0jwp57ip1QPLPdxlH02pIGVNdTfQZMnTMLRLicbYKts6JukXzCdqXiUlmydaSXx9WfnTX/Axi46q7UFfjEAAAAAElFTkSuQmCC';
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
			let mnemonics = config.cleanMnemonics(res1.mnemonic);
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