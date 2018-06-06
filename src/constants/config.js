// export const API_URL         = 'https://api.monedapar.com';
export const API_URL          = 'http://35.163.59.126:8089';
export const API_URL_V1       = API_URL+'/api/v3';
export const MERCADOPAR_URL   = 'http://mercado.monedapar.com?category=productos-y-servicios';
export const EMPLEOSPAR_URL   = 'http://mercado.monedapar.com?category=empleos-solicitados';
export const WABA_NETWORK_URL = 'https://waba.network';

export const API_GRAPHQL_URL = 'http://35.163.59.126:8080';
export const GRAPHQL_URL     = API_GRAPHQL_URL+'/graphql/v3';

export const ASSET_PRECISION = 2;
export const ASSET_DIVIDER   = 100;
export const CHAIN_ID        = '2cfcf449d44f477bc8415666766d2258aa502240cb29d290c1b0de91e756c559';

export const I_ENDORSE_PREFIX    = '~ie';
export const ENDORSED_BY_PREFIX  = '~eb';
export const ENDORSED_TX_PREFIX  = '~et';

export const REFUND_PREFIX  			= '~re';
export const PAYDISCOUNTED_PREFIX = '~di';

export const ASSET_ID            	= '1.3.9'
export const DISCOIN_ID          	= ASSET_ID
export const DISCOIN_CREDIT_ID   	= '1.3.7' // DESCUBIERTO | THEDISCOIN.OD
export const DISCOIN_ACCESS_ID   	= '1.3.8' // ENDORSEMENT | DISCOIN.KEY | THEDISCOIN.A
export const DISCOIN_SYMBOL        = 'THEDISCOIN.M'
export const DISCOIN_CREDIT_SYMBOL = 'THEDISCOIN.OD'
export const DISCOIN_ACCESS_SYMBOL = 'THEDISCOIN.A'


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
	var d = new Date();
	return leadingZeros(d.getUTCFullYear())+leadingZeros(d.getUTCMonth())+leadingZeros(d.getUTCDate());
}
