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
		textAlign:'center',
		textAlignVertical:'center',
		/* backgroundColor: '#ff00ff' */
		flex:3,
		fontSize: 25
	},
	inputTextLeft:{
		textAlign:'left',
		textAlignVertical:'center',
		paddingLeft:10,
		flex:1,
		fontSize: 15
	},
	top_bordered:{
		borderTopColor: '#c0c0c0', borderTopWidth: 1
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
		fontSize  : 25,
		textAlign: 'right',
		paddingRight: 5,
		paddingTop: 10
	},
	textInput:{
		flex			: 1,
		fontSize  : 35,
		textAlign: 'right',
		paddingRight: 5
	},
	textInputCenter:{
		textAlign: 'center'
	},
	hint:{
		textAlign:'center',
		textAlignVertical:'center',
		/* backgroundColor: '#ff00ff' */
		flex:1,
		fontSize: 10,
		paddingRight: 5
	},
	hintInside:{
		textAlign:'center',
		textAlignVertical:'center',
		/* backgroundColor: '#ff00ff' */
		height:15,
		fontSize: 10,
		paddingRight: 5
	}
});

export default styles;
