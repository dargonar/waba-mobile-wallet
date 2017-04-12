import colors from '../styles/SliderEntry';

export const avales_colors = {'I':colors.avalI_bg, 'X':colors.avalX_bg, 'XXX':colors.avalXXX_bg};

export const avales = [
        {
          amount          : 1000,
          amount_txt      : '$1.000',
          description     : 'Individuos',
          _key            : 'I',
          remaining       : 0,
          user_name       : 'N/A',
          quantity        : 0,
          checked         : false
        },
        {
          amount          : 10000,
          amount_txt      : '$10.000',
          description     : 'Productores y cuentapropistas',
          _key             : 'X',
          remaining       : 0,
          user_name       : 'N/A',
          quantity        : 0,
          checked         : false
        },
        {
          amount          : 30000,
          amount_txt      : '$30.000',
          description     : 'Empresas',
          _key             : 'XXX',
          remaining       : 0,
          user_name       : 'N/A',
          quantity        : 0,
          checked         : false
        }];

