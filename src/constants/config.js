export const API_URL         = 'https://api.monedapar.com';
export const API_URL_V1      = API_URL+'/api/v2';
export const MERCADOPAR_URL  = 'http://mercado.monedapar.com?category=productos-y-servicios';
export const EMPLEOSPAR_URL  = 'http://mercado.monedapar.com?category=empleos-solicitados';
export const GRAPHQL_URL     = API_URL+'/graphql';
export const ASSET_PRECISION = 2;
export const ASSET_DIVIDER   = 100;
export const CHAIN_ID        = '4018d7844c78f6a6c41c6a552b898022310fc5dec06da467ee7905a8dad512c8';
export const ASSET_ID        = '1.3.1236';
export const ASSET2_ID       = '1.3.1237';
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
