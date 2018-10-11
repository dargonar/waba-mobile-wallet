import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	keywordsBG:{
		justifyContent:'center',
		alignItems:'flex-start',
		padding:25,
		paddingTop: 15,

	},
	textInput:{
		flex: 4,
		margin: 25,
		marginTop: 0,
    marginBottom: 75,
		backgroundColor: '#f0f4f7',
		borderRadius: 7,

		fontFamily : 'Montserrat-Medium',
		fontSize   : 18,
		lineHeight : 20,
		color: '#666',
		padding: 20,

	},
	keywordsTitle:{
		fontFamily : 'Montserrat-Regular',
		fontSize   : 13,
		lineHeight : 25,
		color: '#b0b0b0',
		alignSelf: 'flex-start',
		justifyContent: 'flex-start'
  },
	fullWidthButton: {
		flex:1,
		borderRadius: 0,
    height:100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
		backgroundColor: '#F15D44'
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
    backgroundColor: '#ff7232',
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
});

export default styles;
