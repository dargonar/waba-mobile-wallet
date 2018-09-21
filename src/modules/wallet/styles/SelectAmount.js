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
		fontFamily : 'Montserrat-Light',
		flex:1,
		fontSize: 35,
		marginRight: 10,
	},
// LABEL
label:{
	fontFamily : 'Montserrat-Bold',
	fontSize: 12,
	color: '#CCC',
	marginBottom: 7
},
// END LABEL
// BUTTONS
btnGradient: {
	height: 50,
	borderRadius: 25,
	flexDirection:'row', 
	paddingLeft:35, paddingRight:35,
	minWidth: 140,
	alignItems:'center', 
	justifyContent: 'center',
},
btnTouchable: {
	borderRadius: 25,
	backgroundColor: 'transparent',

},
btnTxt: {
	fontFamily : 'Montserrat-SemiBold',
	fontSize   : 13,
	marginBottom: 1,
	color: '#fff',
},
// END BUTTONS
	fullWidthButtonDisabled: {
    backgroundColor: '#999999'
  },
	buttonReward: {
    backgroundColor: '#1abc9c'
  },
	buttonDiscount: {
    backgroundColor: '#3498db'
  },

	fullWidthButtonTextDisabled:{
		fontFamily : 'roboto_light',
		fontWeight : '100',
    fontSize   : 15,
		color			 : '#cccccc'
	},
	textInput:{
		flex			: 1,
		fontSize  : 35,
		textAlign: 'right',
		paddingRight: 25
	},
	hint:{
		textAlign:'center',
		textAlignVertical:'center',
		/* backgroundColor: '#ff00ff' */
		flex:1,
		fontSize: 10,
		paddingRight: 5
	},
});

export default styles;
