import React from 'react';
import { Fab, Icon } from 'native-base'
import styled from 'styled-components'

const Wrapper = styled.View`
  padding: 0 20px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`

const StyledFab = styled(Fab)`
  background-color: #5067ff;
`

const Footer = () =>
  <Wrapper>
    <StyledFab>
      <Icon name='add' style={{ fontSize: 33, lineHeight: 33 }} />
    </StyledFab>
  </Wrapper>

export default Footer;
