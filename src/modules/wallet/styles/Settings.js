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
		color: '#666',
    marginBottom: 15
  },
  	btn_container:{
  		justifyContent:'space-between', alignItems:'center' , flexDirection:'row',
  		padding: 15,
  		backgroundColor: '#f4f4f4',
  		elevation: 5,
  		marginTop: 15,
  		borderRadius: 50,
  		paddingLeft: 30, 
  		paddingRight: 20,
  	},
	button:{
		minHeight:90,
		maxHeight:130,
		flex: 1
	},
	buttonInner: {
		 flex:1, flexDirection:'column', padding:10
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
