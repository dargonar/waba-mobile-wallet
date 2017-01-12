import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
    width           : undefined,
    height          : undefined,
    backgroundColor : 'transparent',
    justifyContent  : 'center',
    alignItems      : 'center',
		flex            : 3
	},
	
	wrapper:{
		flex:1,
		flexDirection:'column', 
		justifyContent  : 'center',
    alignItems      : 'center'
	},
	
	balance_wrapper:{
		flex:2,
		flexDirection:'column', 
		justifyContent  : 'flex-end',
    alignItems      : 'center'
	},
	balance_wrapperNoCredit:{
		flex:2,
		flexDirection:'column', 
		justifyContent  : 'center',
    alignItems      : 'center'
	},
	
	
  balance : {
    flexDirection : 'row',
		justifyContent: 'center',
    alignItems: 'center',
  },
	
	symbol_part:{
		fontFamily : 'roboto_light',
    fontWeight : '100',
    fontSize   : 15,
		lineHeight : 15,
		marginVertical: 6,
		alignSelf  : 'flex-start'
	},
	int_part : {
    fontFamily : 'roboto_regular',
    fontWeight : '400',
    fontSize   : 45,
		lineHeight : 45,
		alignSelf  : 'center'
  },
	par_part:{
		fontFamily : 'roboto_thin',
    fontWeight : '100',
    fontSize   : 15,
		lineHeight : 15,
		marginVertical: 2,
	},
	dec_part : {
    fontFamily  : 'roboto_regular',
    lineHeight  : 45,
    fontSize    : 23,
		fontWeight : '100',
  },
	
	gray_color:{
		color       : '#ccc',
	},
	bold_color:{
		color      : '#FFFFFF',
	},
	bold_colorOLD:{
		color      : '#B7F072',
	},
	white_color:{
		color      : '#FFFFFF',
	},
  
	balanceText : {
    fontFamily  : 'roboto_thin',
		fontWeight : '400',
    fontSize    : 14,
		alignSelf   : 'center'  ,
// 		textShadowColor: '#ccc',
// 		textShadowOffset: {width: 0, height: 0},
// 		textShadowRadius: 3,
		marginBottom: 5
  },
  
	
	credit_wrapper:{
		flex:1,
		flexDirection:'row', 
		justifyContent: 'center',
		alignItems: 'center',
		paddingRight: 25
	},
	credit_title:{
		fontFamily  : 'roboto_thin',
    fontSize    : 12,
		lineHeight  : 14,
		paddingRight: 5
	},
	credit_amount:{
		fontFamily  : 'roboto_regular',
    color       : '#FFFFFF',
    fontSize    : 14,
		fontWeight  : '400',
		lineHeight  : 14,
	},
	credit_amountGreen:{
		color       : '#B7F072'
	},
	credit_amountBlue:{
		color       : '#60A3C0'
	},
	credit_amountRed:{
	  color       : '#ed1c24'
	}
	
});

export default styles;
