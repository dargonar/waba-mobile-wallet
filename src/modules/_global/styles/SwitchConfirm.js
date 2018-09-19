import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
    
	},
	data_part : {
    fontFamily : 'Montserrat-Bold',
    color      : '#666',
    fontSize   : 22
  },
	data_part_small : {
    fontFamily : 'Montserrat-Bold',
    color      : '#1e3695',
		fontSize   : 13,
    marginLeft: 10,
  },
	data_part_empty:{
    fontFamily : 'roboto_light',
		fontWeight : '100',
    color      : '#cccccc',
    fontSize   : 24,
		lineHeight : 32
  },
  data_partView:{
    padding: 10,
    backgroundColor: '#f0f4f7',
    borderRadius: 5,
    marginTop: 10,
    paddingLeft: 20,
  },
  title_part : {
    fontFamily  : 'roboto_regular',
    color       : '#a9a9a9',
    lineHeight  : 35,
    fontSize    : 16
  },
	title_part_big : {
    fontFamily  : 'Montserrat-Bold',
    color       : '#a9a9a9',
    lineHeight  : 35,
    fontSize    : 15,
    textAlign: 'center',
    marginBottom: 20,
  },
  data_dayAmount:{
    fontFamily  : 'Montserrat-ExtraLight',
    color       : '#666',
    fontSize    : 60,
    textAlign: 'center',
    marginLeft: 10,
  },
  subaccountButtonContainer: { 
    height:75, 
    position: 'absolute', 
    bottom: 0,
    left: 0,
    padding:20,
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidthButton: {
    borderRadius: 0,
    padding: 15,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e3695',
    width: '100%',
    position: 'absolute',
    elevation: 10
  },
  fullWidthButtonText: {
    fontFamily : 'Montserrat-Regular',
    fontWeight : '100',
    fontSize   : 15,
    color: 'white',
  },
  label:{
    fontFamily : 'Montserrat-Bold',
    fontSize: 12,
    color: '#CCC',
  },
	fullWidthButtonDisabled: {
    backgroundColor: '#999999'
  },
	fullWidthButtonTextDisabled:{
		fontFamily : 'roboto_light',
		fontWeight : '100',
    fontSize   : 20,
		color			 : '#cccccc'
	},
});

export default styles;
