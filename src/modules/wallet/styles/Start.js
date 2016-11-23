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
		
		color:"#ffffff", 
		textAlign:'center',
		fontFamily : 'roboto_light',
		fontWeight : '100',
    fontSize   : 25,
		lineHeight : 25
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
    backgroundColor: '#2c3f50'
  },
  fullWidthButtonDisabled: {
    backgroundColor: '#999999'
  },
	fullWidthButtonText: {
    fontFamily : 'roboto_light',
		fontWeight : '100',
    fontSize   : 15,
		color: 'white'
  },
	textError:{
		marginTop  : 20,
		flex			 : 1,
		color			 : '#f53d3d',
		fontFamily : 'roboto_light',
		fontWeight : '300',
    fontSize   : 18,
		lineHeight : 20,
		textAlign  : 'center'
	}
});

export default styles;
