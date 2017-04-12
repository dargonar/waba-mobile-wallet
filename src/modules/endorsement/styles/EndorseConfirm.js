import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 5,
		backgroundColor: '#2e2f3d'
		
	},
	data_part : {
    fontFamily : 'roboto_normal',
    color      : '#B7F072',
    fontSize   : 32,
		paddingLeft: 30
  },
	data_part_small : {
    fontFamily : 'roboto_normal',
    color      : '#B7F072',
		fontSize   : 24,
		lineHeight : 32,
		paddingLeft: 30
  },
	data_part_empty:{
    fontFamily : 'roboto_light',
		fontWeight : '100',
    color      : '#cccccc',
    fontSize   : 24,
		lineHeight : 32
  },
  title_part : {
    fontFamily  : 'roboto_regular',
    color       : '#ffffff',
    lineHeight  : 35,
    fontSize    : 16,
		paddingLeft : 30
  },
	
	
	fullWidthButton: {
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
		color: 'white',
		fontSize   : 20
  },
	fullWidthButtonTextDisabled:{
		fontFamily : 'roboto_light',
		fontWeight : '100',
    fontSize   : 20,
		color			 : '#cccccc'
	},
});

export default styles;