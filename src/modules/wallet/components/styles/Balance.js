import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
    width           : undefined,
    height          : undefined,
    backgroundColor : '#f15d44' ,//'transparent',
    justifyContent  : 'center',
    alignItems      : 'center',
		flex            : 3
	},

	container_subaccount: {
    width           : undefined,
    height          : undefined,
    backgroundColor : '#0A566B' ,//'transparent',
    justifyContent  : 'center',
    alignItems      : 'center',
		flex            : 2
	},

	wrapper:{
		flex:1,
		flexDirection:'column',
		justifyContent  : 'center',
    alignItems      : 'center',
// 		backgroundColor: '#0B5F83'
// 		backgroundColor: '#044967'
	},

	balance_wrapper:{
		flex:2,
		flexDirection:'column',
		justifyContent  : 'center',
    alignItems      : 'center',
		paddingTop: 30
	},
	balance_wrapperNoCredit:{
		flex:2,
		flexDirection:'column',
		justifyContent  : 'center',
    alignItems      : 'center',

	},


  balance : {
    flexDirection : 'row',
		justifyContent: 'center',

  },

	symbol_part:{
		flex:1,
// 		fontFamily : 'roboto_light',
		fontFamily  : 'roboto_thin',
    fontWeight : '100',
    fontSize   : 40,
		lineHeight : 40,
// 		marginVertical: 6,
		textAlign  : 'right',
		alignSelf  : 'center'
	},

	int_part : {
		flex:0,
  //  fontFamily : 'roboto_regular',
    fontFamily  : 'roboto_light',
// 		fontWeight : '400',
    fontSize   : 45,
		lineHeight : 45,
		alignSelf : 'flex-end',

  },

	balanceAmountWrapper:{
		flex:1,
		flexDirection : 'row',
		justifyContent: 'flex-start',
    alignItems: 'stretch',
		//backgroundColor: '#f00'
	},
	dec_part : {
		flex:0,
 	  fontFamily  : 'roboto_thin',
// 		fontFamily : 'roboto_regular',
//     fontWeight : '100',
		lineHeight  : 20,
    fontSize    : 20,
		marginVertical: 6,
// 		alignSelf : 'flex-start',
		paddingLeft: 0,

  },

	par_part:{
		flex:1,
		fontFamily : 'roboto_thin',
    fontWeight : '100',
    fontSize   : 20,
		lineHeight : 20,
 		marginVertical: 1,
		alignSelf : 'flex-end',
		textShadowColor: '#ccc',
		textShadowOffset: {width: 0.5, height: 0.5},
		textShadowRadius: 4
	},

	gray_color:{
		color       : '#e0e0e0', //ccc
	},
	bold_color:{
		color      : '#FFFFFF',
	},
	white_color:{
		color      : '#FFFFFF',
	},

	red_color:{
// 		color: '#CF2E08'
 		color: '#FF9379'
// 		color: '#FFFFFF'
	},

	balanceText : {
    fontFamily  : 'roboto_light',
		fontWeight : '100',
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
	},
	credit_title:{
		fontFamily  : 'roboto_light',
    fontSize    : 12,
		lineHeight  : 14,
		textAlign: 'center',
		flex: 1
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
	},



	credit_available_wrapper:{
		flex:1,
		flexDirection:'row',
		justifyContent: 'center',
		alignItems: 'center',

		borderRadius: 0,
    backgroundColor: 'rgba(87, 87, 87, 0.5)'
	},
	credit_available:{
		flex:1,
		flexDirection:'row',
		justifyContent: 'center',
		alignItems: 'center',

	},
	credit_title2:{
		fontFamily  : 'roboto_light',
    fontSize    : 12,
		lineHeight  : 14,
		textAlign: 'center',
	},

	credit_card_amount:{
		fontFamily  : 'roboto_light',
    color       : '#FFFFFF',
    fontSize    : 11,
		fontWeight  : '400',
		lineHeight  : 14,
		marginLeft:10
	},
	credit_card_container:{
		flex:1,
		flexDirection   : 'row',
    justifyContent  : 'center',
		alignItems      : 'center',
		marginBottom: 3
	},
	row_card:{
    borderTopLeftRadius     : 6,
    borderTopRightRadius    : 6,
    borderBottomLeftRadius  : 6,
    borderBottomRightRadius : 6,
    width                   : 75,
    height                  : 25,
    alignItems      				: 'center',
    justifyContent  				: 'center',
		flexDirection   				: 'row',
		marginLeft     	 				: 3,
		marginRight     				: 3,
  },
	row_hand : {
    resizeMode      :'contain',
    height          :15,
    width           :15
  },
});

export default styles;
