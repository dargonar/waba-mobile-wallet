import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingLeft: 25,
		justifyContent: 'center'
	},
	drawerList: {
		flex:5
	},
	drawerListIcon: {
		width: 27
	},
	drawerListItem: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 23
	},
	drawerListItemText: {
		color: 'white',
		fontSize: 23,
		paddingLeft: 15,
		flex: 1
	},
	linearGradient: {
		// top: 0,
		// left: 0,
		// right: 0,
		// height: 248,
		// position: 'absolute'
		flex: 1
	},
	_version: {
		color: '#3c3c3c',
		position: 'absolute',
		bottom: 25,
		marginLeft: 53
	},
	
	usernameTitle:{
    fontFamily : 'roboto_light',
		fontWeight : '100',
    fontSize   : 15,
    lineHeight : 25,
		color: 'white'
  },
	usernameText:{
    fontFamily : 'roboto_light',
		fontWeight : '100',
    fontSize   : 25,
    lineHeight : 35,
		color: 'white'
  }
});

export default styles;