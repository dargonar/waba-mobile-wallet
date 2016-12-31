export const API_URL         = 'http://api.monedapar.com:8080';
export const API_URL_V1      = API_URL+'/api/v1';
export const MERCADOPAR_URL  = 'http://mercado.monedapar.com?category=productos-y-servicios';
export const EMPLEOSPAR_URL  = 'http://mercado.monedapar.com?category=empleos-solicitados';
export const GRAPHQL_URL     = API_URL+'/graphql';
export const ASSET_PRECISION = 4;
export const ASSET_DIVIDER   = 10000;

export function getAPIURL(path) {
	return API_URL_V1+path;
}
