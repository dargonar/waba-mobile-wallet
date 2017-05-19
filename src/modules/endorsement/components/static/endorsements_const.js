import colors from '../styles/SliderEntry';

// export const AVAL1000_ID     = '1.3.1319';
// export const AVAL10000_ID    = '1.3.1322';
// export const AVAL30000_ID    = '1.3.1320';
export const avales_colors = {'1.3.1319':colors.avalI_bg, '1.3.1322':colors.avalX_bg, '1.3.1320':colors.avalXXX_bg};
import * as config from '../../../../constants/config';
export const avales = [
        {
          amount          : 1000,
          amount_txt      : '$1.000',
          description     : 'Individuos',
          _key            : config.AVAL1000_ID,
          remaining       : 0,
          user_name       : 'N/A',
          quantity        : 0,
          checked         : false,
          asset_id        : config.AVAL1000_ID
        },
        {
          amount          : 10000,
          amount_txt      : '$10.000',
          description     : 'Productores y cuentapropistas',
          _key            : config.AVAL10000_ID,
          remaining       : 0,
          user_name       : 'N/A',
          quantity        : 0,
          checked         : false,
          asset_id        : config.AVAL10000_ID
        },
        {
          amount          : 30000,
          amount_txt      : '$30.000',
          description     : 'Empresas',
          _key            : config.AVAL30000_ID,
          remaining       : 0,
          user_name       : 'N/A',
          quantity        : 0,
          checked         : false,
          asset_id        : config.AVAL30000_ID
        }];

export function getAvales(){
	return JSON.parse(JSON.stringify(avales));
}

export function getAvalByKey(key, _avales){
	for(var i = 0; i < _avales.length; i++)
		if ( _avales[i]._key==key )
			return _avales[i];
	return undefined;
}

export function getAvalByAmount(amount, _avales){
//   return _avales.filter((entry) => {
// 			return ( entry.amount==amount ) ;
// 		});
	for(var i = 0; i < _avales.length; i++)
		if ( _avales[i].amount==amount )
			return _avales[i];
	return undefined;
}

export function getAvalDesc(aval){
	if(!aval)
		return '';
	return aval.description + ' - ' + aval.amount_txt;
}