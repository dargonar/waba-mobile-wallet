import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff'
	},

	separator : {
    height             : 1,
    backgroundColor    : '#85858544',
  },

	input:{

		color:"#ff7232",
		textAlign:'center',
		fontFamily : 'Montserrat-Regular',
		fontWeight : '100',
    	fontSize   : 20,
		lineHeight : 25,
		margin: 20,
	},

	fullWidthButton: {
		borderRadius: 0,
	    height:50,
	    flexDirection: 'row',
	    justifyContent: 'center',
	    alignItems: 'center',
	    margin: 20,
	    borderRadius: 5
  },
	fullWidthButton1: {
    backgroundColor: '#415261'
  },
	fullWidthButton2: {
    backgroundColor: '#ff7232'
  },
  fullWidthButtonDisabled: {
    backgroundColor: '#999999'
  },
	fullWidthButtonText: {
    	fontFamily : 'Montserrat-Medium',
		fontWeight : '100',
    	fontSize   : 15,
		color: 'white'
  },
	fullWidthButtonTextDisabled:{
		fontFamily : 'Montserrat-Medium',
		fontWeight : '100',
   		fontSize   : 15,
		color			 : '#cccccc',
	},
	textError:{
		marginTop  : 20,
		flex			 : 1,
		color			 : '#f53d3d',
		fontFamily : 'Montserrat-Regular',
		fontWeight : '300',
    fontSize   : 18,
		lineHeight : 20,
		textAlign  : 'center'
	}
});

export default styles;
