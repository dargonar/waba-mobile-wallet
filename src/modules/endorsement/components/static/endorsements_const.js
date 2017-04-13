import colors from '../styles/SliderEntry';

export const avales_colors = {'I':colors.avalI_bg, 'X':colors.avalX_bg, 'XXX':colors.avalXXX_bg};
import * as config from '../../../../constants/config';
export const avales = [
        {
          amount          : 1000,
          amount_txt      : '$1.000',
          description     : 'Individuos',
          _key            : 'I',
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
          _key             : 'X',
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
          _key             : 'XXX',
          remaining       : 0,
          user_name       : 'N/A',
          quantity        : 0,
          checked         : false,
          asset_id        : config.AVAL30000_ID
        }];

