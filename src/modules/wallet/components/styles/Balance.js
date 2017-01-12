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
    flexDirection : 'row'
  },
  int_part : {
    fontFamily : 'roboto_light',
    color      : '#B7F072',
		fontWeight : '100',
    fontSize   : 32,
		lineHeight : 35		
  },
  dec_part : {
    fontFamily  : 'roboto_regular',
    color       : '#B7F072',
    lineHeight  : 35,
    fontSize    : 16
  },
  currency : {
    fontFamily  : 'roboto_thin',
    color       : '#ccc',
    fontSize    : 12
		
  },
	
	credit_wrapper:{
		flex:1,
		flexDirection:'row', 
		justifyContent: 'center',
		alignItems: 'center'
	},
	credit_title:{
		fontFamily  : 'roboto_thin',
    color       : '#fff',
    fontSize    : 10,
		lineHeight  : 16,
		paddingRight: 5
		
		
	},
	credit_amount:{
		fontFamily  : 'roboto_regular',
    color       : '#60A3C0',
    fontSize    : 16,
		fontWeight  : '400',
		paddingLeft:5
	},
});

export default styles;
