import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#3F779D'
	},
	drawerList: {
		flex:6,
		justifyContent: 'center',
		paddingLeft: 25,
		paddingRight: 25
	},
	drawerListIcon: {
		width: 27
	},
	drawerListItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingBottom: 23,
		paddingTop: 23
	},
	drawerListItemBB: {	
		borderBottomColor: '#aaaaaa', 
		borderBottomWidth: 0.25
	},
	drawerListItemText: {
		color: 'white',
		fontSize: 20,
		paddingLeft: 15,
		flex: 1,
		fontFamily : 'roboto_light',
		fontWeight: '100'
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
    lineHeight : 30,
		color: 'white'
  }
});

export default styles;