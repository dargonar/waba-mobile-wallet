import React from 'react';
import Svg, { Path } from 'react-native-svg'

const Menu = ({
  fill = '#323334'
}) =>
  <Svg width='20' height='16'>
    <Path
      fill={fill}
      d='M1087,549 C1086.44772,549 1086,548.552285 1086,548 C1086,547.447715 1086.44772,547 1087,547 L1105,547 C1105.55228,547 1106,547.447715 1106,548 C1106,548.552285 1105.55228,549 1105,549 L1087,549 Z M1087,556 C1086.44772,556 1086,555.552285 1086,555 C1086,554.447715 1086.44772,554 1087,554 L1105,554 C1105.55228,554 1106,554.447715 1106,555 C1106,555.552285 1105.55228,556 1105,556 L1087,556 Z M1087,563 C1086.44772,563 1086,562.552285 1086,562 C1086,561.447715 1086.44772,561 1087,561 L1105,561 C1105.55228,561 1106,561.447715 1106,562 C1106,562.552285 1105.55228,563 1105,563 L1087,563 Z'
      transform='translate(-1086 -547)'
    />
  </Svg>

export default Menu;