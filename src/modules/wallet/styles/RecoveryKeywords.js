import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff'
		//justifyContent:'flex-start'
	},
  fullWidthButton: {
    height:60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
	fullWidthButton1: {
    backgroundColor: '#f15d44'
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
    fontFamily : 'Montserrat-Medium',
    fontSize   : 15,
    lineHeight : 30,
		color: '#666',
    padding: 5

  },
  keywordsTitle:{
    fontFamily : 'Montserrat-Regular',
    fontSize   : 13,
    lineHeight : 25,
		color: '#b0b0b0'
  }

});

export default styles;
