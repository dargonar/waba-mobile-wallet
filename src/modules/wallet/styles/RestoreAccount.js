import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	keywordsBG:{flex:2,
		justifyContent:'center',
		alignItems:'center',
		padding:15,
		backgroundColor: '#DFE2CF'
	},
	keywordsTitle:{
    fontFamily : 'roboto_light',
		fontWeight : '100',
    fontSize   : 15,
    lineHeight : 25,
		color: '#0a0a0a',
    marginBottom: 15
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

});

export default styles;
