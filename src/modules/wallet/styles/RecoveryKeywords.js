import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#3F779D'
		//justifyContent:'flex-start'
	},
  fullWidthButton: {
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
  
	fullWidthButtonText: {
    fontFamily : 'roboto_light',
		fontWeight : '100',
    fontSize   : 15,
		color: 'white'
  },
  keywordsText:{
    fontFamily : 'roboto_light',
		fontWeight : '100',
    fontSize   : 25,
    lineHeight : 40,
		color: 'white'
  },
  keywordsTitle:{
    fontFamily : 'roboto_light',
		fontWeight : '100',
    fontSize   : 15,
    lineHeight : 25,
		color: 'white'
  }

});

export default styles;