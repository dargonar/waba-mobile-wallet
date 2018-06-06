import React from 'react';
import { View } from 'react-native';
import Transaction from '../Transaction/Transaction'
import styled from 'styled-components'

const Wrapper = styled.ScrollView`
  padding: 20px;
`

const Transactions = ({transactions, navigationHandler}) =>
  <Wrapper>
    {transactions &&
      <View>
        {transactions.map(({ id, ...transaction }) =>
          <Transaction key={id} {...transaction} handler={navigationHandler(id)} />
        )}
      </View>
    }
  </Wrapper>

export default Transactions;
