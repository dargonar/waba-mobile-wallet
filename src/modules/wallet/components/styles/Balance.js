import { StyleSheet } from 'react-native';
import * as config from '../../../../constants/config';

const styles = StyleSheet.create({
  sectionTitle:{
    fontSize: 13,
    padding: 0,
    marginBottom: 0,
    marginTop: 30,
    paddingBottom: 0,
    paddingLeft: 0,
    color: '#a7a8aa',
    fontFamily : 'Montserrat-SemiBold',
  }, 
  container_discoin: {
  	padding: 15,
  	paddingBottom: 0,
    width           : undefined,
    height          : undefined,
    backgroundColor : '#fff' ,//'transparent',
    justifyContent  : 'center',
    alignItems      : 'center',
	flex            : 3
  },
  discoinCount:{
    width: '100%',
    alignItems: 'center',
    padding: 0,
    paddingRight: 20,
    flexDirection: 'row', 
    justifyContent: 'flex-end',
  },
  discoinCountValue:{
    fontSize: 45,
    fontFamily : 'Montserrat-Light', 
    color: '#FFF',
  },
  discoinCountGradient:{
    borderRadius: 35,
    height: 60,
   	elevation: 5, 
   	marginTop: -10,
  },
  container_discoin_wrapper_outer: {
    width           : '100%',
    padding: 10,
    backgroundColor : '#fff' ,//'transparent',
    justifyContent  : 'center',
    alignItems      : 'center'
	},
  container_discoin_wrapper: {
    width           : '100%',
    padding: 10,
    paddingBottom: 0,
    paddingTop: 0,
    height          : 90,
    backgroundColor : '#fff' ,//'transparent',
    justifyContent  : 'center',
    alignItems      : 'center'
	},
	container_discoin: {
		// flex            : 3
		height: 150,
		paddingTop: 30
	},
	container: {
		width           : undefined,
		height          : undefined,
		backgroundColor : '#f15d44' ,//'transparent',
		justifyContent  : 'center',
		alignItems      : 'center',
		// flex            : 3,
		height 					: config.normalizeFontSize(200),
		borderBottomLeftRadius: 15, 
		borderBottomRightRadius: 15,
		marginBottom: 0
	},
	container_subaccount: {
		width           : undefined,
		height          : undefined,
		backgroundColor : '#7029eb' ,//'transparent',
		justifyContent  : 'center',
		alignItems      : 'center',
		flex            : 3,
		borderBottomLeftRadius: 15, 
		borderBottomRightRadius: 15,
		marginBottom: 0
	},

	wrapper:{
		flex:1,
		flexDirection:'column',
		justifyContent  : 'flex-end',
    	alignItems      : 'flex-end',
// 		backgroundColor: '#0B5F83'
// 		backgroundColor: '#044967'
	},

	balance_wrapper:{
		flex:2,
		flexDirection:'column',
		justifyContent  : 'flex-end',
   	 	alignItems      : 'flex-end',
   	 	paddingBottom: 40,
	},
	balance_wrapperNoCredit:{
		flex:2,
		flexDirection:'column',
		justifyContent  : 'flex-end',
    	alignItems      : 'flex-end',
    	paddingBottom: 30,
	},


  balance : {
    flexDirection : 'row',
		justifyContent  : 'center',
  	alignItems      : 'center',
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
		fontFamily  : 'Montserrat-ExtraLight',
		// 		fontWeight : '400',
		fontSize   : config.normalizeFontSize(75),
		lineHeight : config.normalizeFontSize(75),
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
		fontFamily  : 'Montserrat-ExtraLight',
		fontSize    : config.normalizeFontSize(32),
		alignSelf : 'flex-start',
		
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
