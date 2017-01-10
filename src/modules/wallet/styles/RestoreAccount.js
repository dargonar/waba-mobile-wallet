import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
  keywordsTitle:{
    fontFamily : 'roboto_light',
		fontWeight : '100',
    fontSize   : 15,
    lineHeight : 25,
		color: 'white',
    marginBottom: 15
  },
	fullWidthButton: {
		flex:1,
		borderRadius: 0,
    height:100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
		backgroundColor: '#2c3f50' 
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

});

export default styles;