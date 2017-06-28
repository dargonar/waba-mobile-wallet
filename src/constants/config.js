export const API_URL         = { 
																	'aqua' : 'http://aqua-demo.waba.co.in',
																	'ecoin'  : 'http://uoc-demo.waba.co.in'
																};
export const PROGRAMS = {
  'aqua'  : [require('../modules/program/img/aqua.png'), 'Aqua', 'Moeda Ambiental de São Paulo', 'AQUA'],
  'ecoin' : [require('../modules/program/img/ecoin.png'), 'eCOin', 'Moneda Complementaria - UOC', 'eCOin'],
};
export const API_URL_V1      = '/api/v3';
export const MERCADOPAR_URL  = 'http://sustainability.school'; //http://mercado.monedapar.com?category=productos-y-servicios';
export const EMPLEOSPAR_URL  = 'http://sustainability.school'; //http://mercado.monedapar.com?category=empleos-solicitados';
export const GRAPHQL_URL     = '/graphql/v3';
export const ASSET_PRECISION = 4;
export const ASSET_DIVIDER   = 10000;
export const CHAIN_ID        = '4018d7844c78f6a6c41c6a552b898022310fc5dec06da467ee7905a8dad512c8';

export const I_ENDORSE_PREFIX    = '~ie';
export const ENDORSED_BY_PREFIX  = '~eb';
export const ENDORSED_TX_PREFIX  = '~et';

export const PROPUESTAPAR_ID = '1.2.151476';

// export const MONEDAPAR_ID    = '1.3.1236';
export const MONEDAPAR_ID    = '1.3.1004';
export const DESCUBIERTO_ID  = '1.3.1237';

export const AVAL1000_ID     = '1.3.1319';
export const AVAL10000_ID    = '1.3.1322';
export const AVAL30000_ID    = '1.3.1320';
export const ALL_AVALS       = [AVAL1000_ID, AVAL10000_ID, AVAL30000_ID];
export const ALL_AVALS_DESC  = {'1.3.1319': '$1000', '1.3.1322': '$10000', '1.3.1320': '$30000'};

export const ASSET_SYMBOLS   = { 
																	'aqua' 	: '$',
																	'ecoin' : '€'
																};

export const TX_TYPE_UNKNOWN 			= 0;
export const TX_TYPE_SENT 				= 1;
export const TX_TYPE_RECEIVED 		= 2;
export const TX_TYPE_CREDIT_UP 		= 4;
export const TX_TYPE_CREDIT_DOWN 	= 8;

import { AsyncStorage } from 'react-native';

export function getGRAPHQLURL(program) {
	
	if (!program || program==='' )
		return '';
	return API_URL[program]+GRAPHQL_URL;
	
}


export function getAPIURL(path, program) {
	
	if (!program || program==='' )
		return '';
	return API_URL[program]+API_URL_V1+path;
	
}

export function getAssetSymbol(program) {
	
	if (!program || program==='' || !(program in ASSET_SYMBOLS) )
		return '';
	
	return ASSET_SYMBOLS[program];
	
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
