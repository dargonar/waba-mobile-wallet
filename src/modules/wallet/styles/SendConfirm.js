import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  discoinCount:{
    width: '100%',
    alignItems: 'center',
    padding: 0,
    paddingRight: 20,
    flexDirection: 'row', 
    justifyContent: 'center'
  },

discoinCountValue:{
    fontSize: 45,
    lineHeight: 45,
    fontFamily : 'Montserrat-Regular', 
    color: '#000',
  },

  discoinFee:{
    alignItems: 'center',
    padding: 0,
    paddingRight: 20,
    flexDirection: 'row', 
    justifyContent: 'center',
    borderRadius:8,
    padding:8

  },
  discoinFeeValue:{
    fontSize: 20,
    lineHeight: 20,
    fontFamily : 'Montserrat-Regular', 
    color: '#888',
  },
  discoinFeeText:{
    fontSize: 10,
    lineHeight: 10,
    fontFamily : 'Montserrat-Medium', 
    color: '#888',
    marginLeft:5
  },

  memo_style:{
    lineHeight: 20,
    fontSize: 20,
    fontFamily : 'Montserrat-Medium', 
    color: '#000'
  },

  memo_empty:{
    fontFamily : 'Montserrat-Thin', 
    color      : '#000'
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





	container: {
		flex: 1,
		backgroundColor: '#f0f0f0',
    flexDirection: 'column',


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

	rewardButton: {
		borderRadius: 0,
    height:100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
		backgroundColor: '#0A566B' //'#1abc9c'
  },

 
  fullWidthButton_SubAcc: {
    backgroundColor: '#0A566B'
  },
  
	fullWidthButtonDisabled: {
    backgroundColor: '#999999'
  },
	 
	fullWidthButtonTextDisabled:{
		fontFamily : 'roboto_light',
		fontWeight : '100',
    fontSize   : 20,
		color			 : '#cccccc'
	},
});

export default styles;
