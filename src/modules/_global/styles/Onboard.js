import { StyleSheet, Dimensions } from 'react-native';

const DOT_RADIUS = 6;
const DOT_RADIUS_2 = 8;

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		flex: 1,
  },
  
  dotStyle : {
      width: DOT_RADIUS,
      height: DOT_RADIUS,
      borderRadius: DOT_RADIUS >> 1,
      backgroundColor: '#d7dbde',
      margin: DOT_RADIUS >> 1
  }, 
  
  selectedDotStyle : {
    backgroundColor: '#9da4aa',
		width: DOT_RADIUS_2,
		height: DOT_RADIUS_2,
		borderRadius: DOT_RADIUS_2 >> 1,
		margin: DOT_RADIUS_2 >> 1

	},
	
	image : {
		flex:1, 
		marginTop:20, 
		height:width*0.9, 
		width:width*0.9
	},
	
	line1 : {
		fontFamily:'Roboto', 
		color:'#2e353d', 
		fontWeight:'700', 
		fontSize:34
	},
	
	line2: {
		fontFamily:'Roboto', 
		color:'#2b3238', 
		textAlign: 'center', 
		fontWeight:'300', 
		fontSize:18, 
		marginLeft:0.05*width, 
		marginRight:0.05*width
	},
	skip : {
		color:'#689dca', 
		textAlign:'right', 
		fontWeight:'500',
		flex: 1,
		alignSelf: 'stretch',
		
		//borderWidth: 1
	}
});

export default styles;