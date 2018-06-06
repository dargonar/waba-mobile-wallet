import styled from 'styled-components'

export const Card = styled.TouchableOpacity`
  background: #FFFFFF;
  border-radius: 6px;
  margin-bottom: 16px;
  box-shadow: 0 1px 15px rgba(0,0,0,0.10);
  padding: 16px;
  width: 100%;
  flex-direction: row;
`

export const Description = styled.Text`
  font-size: 12px;
  line-height: 14px;
  color: #7B7B7B;
`

export const Pic = styled.Image`
  margin: 0 auto;
  width: 24px;
  height: 24px;
`

export const Center = styled.View`
  border-left-width: 1px;
  border-left-color: #ededed;
  padding: 0 16px;
  margin-left: 16px;
  margin-right: auto;
`

export const Amount = styled.Text`
  color: ${props => props.amount > 0 ? '#3E82FE' : '#D0021B'};
  font-size: 16px;
  line-height: 19px;
`

export const Left = styled.View`
  justify-content: center;
  align-items: center;
`

export const Time = styled.Text`
  font-size: 24px;
  line-height: 29px;
  margin-bottom: 2px;
`

export const Month = styled.Text`
  font-size: 14px;
  line-height: 16px;
  color: #7B7B7B;
`

export const Recipient = styled.Text`
  font-size: 16px;
  line-height: 19px;
  margin-left: 8px;
`

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 9px;
`
