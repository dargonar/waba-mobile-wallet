import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1f475b'
	},
	
	separator : {
    height             : 1,
    backgroundColor    : '#85858544',
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
    backgroundColor: '#415261'
  },
	fullWidthButton2: {
    backgroundColor: '#2c3f50',
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
  }
});

export default styles;
