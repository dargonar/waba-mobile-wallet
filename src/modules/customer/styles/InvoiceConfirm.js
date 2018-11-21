import { Platform, StyleSheet } from 'react-native';

import * as config from '../../../constants/config';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f7f7f7'
	},

  align_center:{
    alignSelf: 'center'
  },
  business_name : {
    fontFamily : 'Montserrat-Medium',
    color      : '#f15d44',
    fontSize   : 32,

  },
  recipient:{
    fontSize: config.normalizeFontSize(12), 
    lineHeight: config.normalizeFontSize(17), 
    paddingBottom:3, 
    fontFamily : 'Montserrat-Regular'
  },
  recipientName :{
      fontSize:   config.normalizeFontSize(18), 
      lineHeight: config.normalizeFontSize(30), 
      fontFamily: 'Montserrat-Medium'
  },

  business_subaccount_name: {
    fontFamily : 'Montserrat-Medium',
    color      : '#f15d44',
    fontSize   : 24,
    lineHeight : 32
  },

  total_bill_sign:{
    fontFamily : 'Montserrat-Medium',
    color      : '#f15d44',
    fontSize   : config.normalizeFontSize(17),
    lineHeight : config.normalizeFontSize(17),
    marginRight: 4,
    alignSelf : 'flex-start'
  },
   total_bill_sign_light:{
    fontFamily : 'Montserrat-Medium',
    color      : '#f39b8c',
    fontSize   : config.normalizeFontSize(17),
    lineHeight : config.normalizeFontSize(17),
    marginRight: 4,
    alignSelf : 'flex-start'
  },
  total_bill_sign_gray:{
    fontFamily : 'Montserrat-Medium',
    color      : '#acacac',
    fontSize   : config.normalizeFontSize(17),
    lineHeight : config.normalizeFontSize(17),
    marginRight: 4,
    alignSelf : 'flex-start'
  },
  total_bill : {
    fontFamily : 'Montserrat-Medium',
    color      : '#000',
    fontSize   : config.normalizeFontSize(30),
    lineHeight : config.normalizeFontSize(30)
  },
  total_bill_gray : {
    fontFamily : 'Montserrat-Medium',
    color      : '#acacac',
    fontSize   : config.normalizeFontSize(30),
    lineHeight : config.normalizeFontSize(30)
  },
  total_bill_red : {
    fontFamily : 'Montserrat-Medium',
    color      : '#f15d44',
    fontSize   : config.normalizeFontSize(30),
    lineHeight : config.normalizeFontSize(30)
  },
  total_bill_red_light : {
    fontFamily : 'Montserrat-Medium',
    color      : '#f39b8c',
    fontSize   : config.normalizeFontSize(30),
    lineHeight : config.normalizeFontSize(30)
  },
  discoin_amount : {
    fontFamily : 'Montserrat-Medium',
    color      : '#f15d44',
    fontSize   : config.normalizeFontSize(30)
  },
  discoin_amount_w: {
    fontFamily : 'roboto_bold',
    color      : '#ffffff',
    fontSize   : 32, 
    backgroundColor:'#f15d44',
    paddingLeft:10,
    paddingRight:10
  },
  discoin_amount_small : {
    fontFamily : 'Montserrat-Medium',
    color      : '#f15d44',
    fontSize   : 20,
    lineHeight : 32
  },

	data_part : {
    fontFamily : 'Montserrat-Medium',
    color      : '#f15d44',
    fontSize   : 32
  },
	data_part2 : {
    fontFamily : 'Montserrat-Medium',
    color      : '#a9a9a9',
    fontSize   : 26
  },
	data_part_small : {
    fontFamily : 'Montserrat-Medium',
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
    fontFamily  : 'Montserrat-Regular',
    color       : '#999999',
    lineHeight  : config.normalizeFontSize(17),
    fontSize    : config.normalizeFontSize(17)
  },
  title_part_red:{
    fontFamily  : 'Montserrat-Regular',
    lineHeight  : config.normalizeFontSize(17),
    fontSize    : config.normalizeFontSize(17),
    color       : '#f15d44',
  },
  title_part_bold : {
    fontFamily  : 'Montserrat-Bold',
    color       : '#a9a9a9',
    lineHeight  : config.normalizeFontSize(35),
    fontSize    : config.normalizeFontSize(24)
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
    borderRadius: 4,
    height:50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff7233'
  },
  fullWidthButtonText: {
    fontFamily : 'Montserrat-Medium',
    fontSize   : 15,
    color: '#fff',
    marginRight:50
  },

	fullWidthButtonDisabled: {
    backgroundColor: '#bbb'
  },
	
	fullWidthButtonTextDisabled:{
		fontFamily : 'Montserrat-Light',
		fontWeight : '100',
    fontSize   : 20,
		color			 : '#cccccc'
	},
});

export default styles;
