import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:'#FFF'
	},
	fullWidthButton: {
		borderRadius: 0,
    height:100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
		backgroundColor: '#044967' 
  },
	fullWidthButtonDisabled: {
    backgroundColor: '#999999'
  },
	fullWidthButtonText: {
    fontFamily : 'roboto_light',
		fontWeight : '100',
    fontSize   : 20,
		color: 'white'
  },
	fullWidthButtonTextDisabled:{
		fontFamily : 'roboto_light',
		fontWeight : '100',
    fontSize   : 15,
		color			 : '#cccccc'
	}
});

export default styles;