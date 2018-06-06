import React from 'react';
import { Menu, QR } from '../../icons'
import { Title } from 'native-base'
import { TouchableOpacity } from 'react-native'

import styled from 'styled-components'

const Wrapper = styled.View`
  padding: 0 20px 20px;
  flex-direction: row;
  justify-content: space-between;
`

const Header = ({ menuToggle, qrToggle }) =>
  <Wrapper>
    <TouchableOpacity onPress={menuToggle}>
      <Menu />
    </TouchableOpacity>

    <Title>Balance</Title>

    <TouchableOpacity onPress={qrToggle}>
      <QR />
    </TouchableOpacity>
  </Wrapper>

export default Header;
