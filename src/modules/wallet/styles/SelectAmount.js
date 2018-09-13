import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f0f0f0'
	},
	inputText:{
		textAlign:'right',
		textAlignVertical:'center',
		/* backgroundColor: '#ff00ff' */
		fontFamily : 'Montserrat-Medium',
		flex:1,
		fontSize: 25
	},
	fullWidthButton: {
		borderRadius: 4,
    height:50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
		backgroundColor: '#ff7233'
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
    fontFamily : 'Montserrat-Medium',
		fontSize   : 15,
		color: '#fff',
		marginRight:50
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
