import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	inputText:{
		textAlign:'right',
		textAlignVertical:'center',
		/* backgroundColor: '#ff00ff' */
		height: 50,
		fontSize: 25
	},
	inputText2:{
		textAlign:'right',
		textAlignVertical:'center',
		fontSize: 22,
		alignSelf: 'center',
		justifyContent: 'center',
		fontFamily : 'Montserrat-Regular',
	},
	inputTextLeft:{
		textAlign:'center',
		textAlignVertical:'center',
		paddingLeft:10,
		flex:1,
		fontSize: 12,
		fontFamily : 'Montserrat-Bold',
		opacity: 0.5
	},
	top_bordered:{
		borderTopColor: '#c4c4c4', borderTopWidth: 0.5,
	},
	fullWidthButton: {
		borderRadius: 0,
    height:100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
		// backgroundColor: '#f15d44'
  },
	fullWidthButtonDisabled: {
    backgroundColor: '#999999'
  },
	buttonReward: {
    backgroundColor: '#1abc9c'
  },
	buttonDiscount: {
    backgroundColor: '#3498db'
  },
	fullWidthButtonText: {
    fontFamily : 'roboto_light',
		fontWeight : '100',
    fontSize   : 15,
		color: '#ffffff'
  },
	fullWidthButtonTextDisabled:{
		fontFamily : 'roboto_light',
		fontWeight : '100',
    fontSize   : 15,
		color			 : '#cccccc'
	},
	button_row:{

		height 					: 100,
		flex 						: 1
  },
	textSimple:{
		flex			: 1,
		fontSize  : 35,
		textAlign: 'right',
		paddingRight: 5
	},
	textSimple2:{
		flex			: 1,
		fontSize  : 20,
		textAlign: 'center',
		paddingRight: 5,
		paddingTop: 10,
		fontFamily : 'Montserrat-Light',
	},
	textInput:{
		height: 90,
	    fontSize: 60,
	    fontFamily : 'Montserrat-Thin',
	    color: '#666',
	    flex: 1,
	    width: '100%'
	},
	textInputCenter:{
		textAlign: 'center'
	},
	hint:{
		textAlign:'center',
		textAlignVertical:'center',
		fontFamily : 'Montserrat-SemiBold',
		flex:1,
		fontSize: 10,
		paddingRight: 5,
		opacity: 0.5
	},
	hintInside:{
		textAlign:'center',
		textAlignVertical:'center',
		fontFamily : 'Montserrat-SemiBold',
		opacity: 0.5,
		height:15,
		fontSize: 10,
		paddingRight: 5
	},
	bill_amount:{
		width: '100%',
		alignItems: 'center',
		padding: 0,
		flexDirection: 'row', 
		justifyContent: 'center',
		flex: 1,
		height: 70,
	},
	rewardRate:{
		color: '#ff7233',
		fontFamily : 'Montserrat-Regular',
		fontSize: 45,
		height: 65,
		width: 130,
		alignSelf: 'center',
		marginBottom: 20,
		paddingBottom: 10,
		borderBottomColor: '#ff7233', borderBottomWidth: 0.5,
	},
	discountRate:{
		color: '#6b91f8',
		fontFamily : 'Montserrat-Regular',
		fontSize: 45,
		height: 65,
		width: 130,
		alignSelf: 'center',
		marginBottom: 20,
		paddingBottom: 10,
		borderBottomColor: '#6b91f8', borderBottomWidth: 0.5,
	},
	plusIcon:{
		fontFamily : 'Montserrat-Bold',
		fontSize: 15,
		alignSelf: 'center',
		margin: 7,
	},
	buttonDiscount:{
		//borderRadius: 4,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonDiscountText:{
		fontFamily : 'Montserrat-Bold',
		color: '#FFF',
		fontSize: 11,
	}
});

export default styles;
