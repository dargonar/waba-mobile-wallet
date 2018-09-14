import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 20,
		paddingTop: 10,
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
		fontFamily : 'Montserrat-Medium',
		fontWeight : '100',
    	fontSize   : 15,
		color			 : '#cccccc'
	},
	amountQuantityView:{
		justifyContent: 'center',
		flexDirection: 'row',
	},
	amountQuantityCard:{
		flexDirection: 'row',
		borderWidth: 2,
		borderColor: '#ff7233', 
		padding: 0,
		minWidth: 100,
		paddingRight: 25,
		justifyContent: 'center',
		paddingLeft: 25,
		margin: 5,
		borderRadius: 10,
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
	},
	feeView:{
		marginBottom: 20,
		alignItems: 'center',
	},
	fromToView:{
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		marginBottom: 20,
		flex: 1,
		height: 150,
	},
	feeCard:{
		minWidth: 100,
		alignItems: 'center',
		marginTop: -6,
		borderWidth: 1,
		// borderColor: '#DCDCDC',
		// borderRadius: 10,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
		borderColor: '#ccc',
		zIndex: -1,
		paddingTop: 5,
		paddingBottom: 8
	},
	fromToThumb:{
		backgroundColor:'#ccc', 
		height:40, 
		width:40, 
		borderRadius:7, 
		marginTop:5, 
		marginBottom:10
	},
	fromToCard:{
		flexDirection: 'column',
		flex: 1,
		borderWidth: 3,
		borderColor: '#FFF', 
		elevation: 5,
		padding: 0,
		paddingRight: 5,
		paddingLeft: 5,
		margin: 5,
		borderRadius: 7,
		alignItems: 'center',
		justifyContent: 'center',
		height: 100,
		width: 130,
		backgroundColor: '#FFFFFF',
		
	},
	amountQuantity:{
		fontSize: 55,
		fontFamily : 'Montserrat-Light',
	},
	text:{
		fontFamily : 'Montserrat-Medium',
	},
	label:{
		fontFamily : 'Montserrat-Bold',
		fontSize: 12,
		color: '#CCC',

	}
});

export default styles;