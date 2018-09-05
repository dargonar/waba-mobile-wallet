import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:'#FFF'

	},
  wallet_container: {
    flex: 1,
    backgroundColor:'#FFF'
  },
	actionButtonIcon: {
    fontSize: 30,
    height: 30,
    color: 'white',
  },
	actionButton: {
  },
	row_arrow : {
    resizeMode      :'contain',
    height          :20,
    width           :20,
  },

	fullWidthButton: {
		borderRadius: 0,
    height:75,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
		backgroundColor: '#0A566B'
	},
	fullWidthButtonText: {
    fontFamily : 'roboto_light',
		fontWeight : '100',
    fontSize   : 20,
		color: 'white'
  },

  actionsButton:{
      backgroundColor:'#fff', 
      borderColor: '#ff7233',
      marginLeft:10,
      elevation: 4
  },
  actionsButtonText:{
    fontSize: 15,
    fontFamily : 'Montserrat-Medium',
    color: '#58595b',
    paddingLeft:10,
    paddingRight:10,

  },
});

export default styles;
