import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#0B5F83'
	},
	
	separator : {
    height             : 1,
    backgroundColor    : '#858585',
  },
	
	input:{
		flex:1, 
		color:"#ffffff", 
		textAlign:'center',
		fontFamily : 'roboto_light',
		fontWeight : '100',
    fontSize   : 25,
		lineHeight : 30
	},
	
	fullWidthButton: {
		borderRadius: 5,
    height:60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
	fullWidthButton1: {
    backgroundColor: '#1e759b'
  },
	fullWidthButton2: {
    backgroundColor: '#6bbd07',
    marginBottom:20
  },
  
	fullWidthButtonText: {
    fontFamily : 'roboto_light',
		fontWeight : '100',
    fontSize   : 15,
		color: 'white'
  },
  welcomeTitle:{
    fontFamily : 'roboto_light',
		fontWeight : '100',
    fontSize   : 30,
    lineHeight : 40,
		color      : 'white',
    textAlign  : 'center'
  },
	welcomeTitle2:{
    fontFamily : 'roboto_light',
		fontWeight : '100',
    fontSize   : 20,
    lineHeight : 30,
		color      : 'white',
    textAlign  : 'center'
  },
});

export default styles;
