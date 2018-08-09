import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff'

	},

  align_center:{
    alignSelf: 'center'
  },
  business_name : {
    fontFamily : 'roboto_normal',
    color      : '#f15d44',
    fontSize   : 32,

  },

  business_subaccount_name: {
    fontFamily : 'roboto_normal',
    color      : '#f15d44',
    fontSize   : 24,
    lineHeight : 32
  },

  total_bill : {
    fontFamily : 'roboto_normal',
    color      : '#f15d44',
    fontSize   : 38
  },
  discoin_amount : {
    fontFamily : 'roboto_normal',
    color      : '#f15d44',
    fontSize   : 32
  },
  discoin_amount_small : {
    fontFamily : 'roboto_normal',
    color      : '#f15d44',
    fontSize   : 20,
    lineHeight : 32
  },

	data_part : {
    fontFamily : 'roboto_normal',
    color      : '#f15d44',
    fontSize   : 32
  },
	data_part2 : {
    fontFamily : 'roboto_normal',
    color      : '#a9a9a9',
    fontSize   : 26
  },
	data_part_small : {
    fontFamily : 'roboto_normal',
    color      : '#f15d44',
		fontSize   : 24,
		lineHeight : 32
  },
	data_part_empty:{
    fontFamily : 'roboto_light',
		fontWeight : '100',
    color      : '#cccccc',
    fontSize   : 24,
		lineHeight : 32
  },
  title_part : {
    fontFamily  : 'roboto_regular',
    color       : '#a9a9a9',
    lineHeight  : 35,
    fontSize    : 16
  },
  title_part_bold : {
    fontFamily  : 'roboto_bold',
    color       : '#a9a9a9',
    lineHeight  : 35,
    fontSize    : 24
  },
	rewardButton: {
		borderRadius: 0,
    height:100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
		backgroundColor: '#1abc9c'
  },


	fullWidthButton: {
		borderRadius: 0,
    height:100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
		backgroundColor: '#f15d44'
  },
	fullWidthButtonDisabled: {
    backgroundColor: '#999999'
  },
	fullWidthButtonText: {
    fontFamily : 'roboto_light',
		fontWeight : '100',
		color: 'white',
		fontSize   : 20
  },
	fullWidthButtonTextDisabled:{
		fontFamily : 'roboto_light',
		fontWeight : '100',
    fontSize   : 20,
		color			 : '#cccccc'
	},
});

export default styles;
