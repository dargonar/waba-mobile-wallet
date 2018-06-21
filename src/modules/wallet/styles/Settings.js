import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
		// backgroundColor: '#2e2f3d',
		padding: 10
	},
  keywordsTitle:{
    fontFamily : 'roboto_light',
		fontWeight : '100',
    fontSize   : 15,
    lineHeight : 25,
		color: 'white',
    marginBottom: 15
  },

	button:{
		marginBottom:5,
		minHeight:100,
		maxHeight:150,
		flex: 1
	},
	buttonInner: {
		 flex:1, flexDirection:'row', height:80, padding:10
		 // borderTopLeftRadius: 4,
		 // borderTopRightRadius: 4,
		 // borderBottomLeftRadius: 4,
		 // borderBottomRightRadius: 4,
	},
	buttonInnerDisabled: {
		backgroundColor:'#c0c0c0'
	}

});

export default styles;
