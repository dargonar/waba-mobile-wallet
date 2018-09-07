import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor : '#FFF'
	},
	container_subaccount: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor : '#0A566B'
	},

	row_arrow : {
    resizeMode      :'contain',
    height          :10,
    width           :10,
  },

	drawerList: {
		flex:6,
		justifyContent: 'flex-start',
		paddingLeft: 22,
		paddingRight: 25,
		marginTop: 30,
	},
	drawerListIcon: {
		width: 27,
	},
	drawerListItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingBottom: 15,
		paddingTop: 15
	},
	drawerListItemVersion: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 23,
		paddingTop: 23,
		backgroundColor: '#2c2c2c'
	},
	drawerListItem3: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingBottom: 23,
		paddingTop: 23,
		paddingLeft: 25,
		borderTopColor: 'black',
		borderTopWidth: 0.25,
		borderBottomColor: 'black',
		borderBottomWidth: 0.25,
		backgroundColor: '#000000'
	},
	drawerListItemBB: {
		borderBottomColor: '#aaaaaa',
		borderBottomWidth: 0.25
	},
	drawerListItemText2: {
		color: 'red',
		paddingLeft: 15,
		flex: 1,
		fontFamily : 'roboto_light',
		fontWeight: '100',
		fontSize: 15,
	},
	drawerListItemText: {
		color: '#666666',
		fontSize: 13,
		paddingLeft: 15,
		flex: 1,
		fontFamily : 'Montserrat-Regular',
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
		textAlign: 'center',
		color: '#a0a0a0',
		position: 'absolute',
		bottom: 10,
		marginLeft: 53,
		fontSize: 10
	},

	usernameTitle:{
    fontFamily : 'Montserrat-Medium',
		fontWeight : '100',
    fontSize   : 15,
    lineHeight : 25,
		color: 'black'
  },
	usernameText:{
    fontFamily : 'Montserrat-Medium',
		fontWeight : '100',
    fontSize   : 15,
    lineHeight : 25,
	color: 'black',
	marginLeft: 5,
	marginBottom: 5,
	color: '#666666',
  },
	subaccountText:{
    fontFamily : 'Montserrat-Medium',
		fontWeight : '100',
    fontSize   : 10,
    lineHeight : 10,
		color 		 : '#ffffff'
  },
  subaccountTextBold:{
    fontFamily : 'Montserrat-Medium',
  }
});

export default styles;
