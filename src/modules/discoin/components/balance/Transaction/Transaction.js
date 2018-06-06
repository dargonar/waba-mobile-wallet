import React from 'react';
import { View } from 'react-native'
import dayjs from 'dayjs'
import currency from 'currency-formatter'

import {
  Card,
  Left,
  Time,
  Month,
  Center,
  Row,
  Pic,
  Recipient,
  Description,
  Amount,
} from './styles'

const Transaction = ({
  date,
  picture,
  recipient,
  description,
  amount,
  handler
}) =>
  <Card onPress={handler}>
    <Left>
      <Time>{dayjs(date).day()}</Time>
      <Month>{dayjs(date).format('MMM')}</Month>
    </Left>

    <Center>
      <Row>
        <Pic source={picture} />
        <Recipient>{recipient}</Recipient>
      </Row>
      <Description>{description}</Description>
    </Center>

    <View>
      <Amount amount={amount}>{currency.format(amount, { locale: 'en-US' })}</Amount>
    </View>
  </Card>

export default Transaction;
