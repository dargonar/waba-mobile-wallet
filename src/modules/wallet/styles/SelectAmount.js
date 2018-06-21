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
		flex:1,
		fontSize: 25
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
    fontSize   : 20,
		color: 'white'
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
		paddingRight: 5
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
