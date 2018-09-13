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
	actionButtonText: {
    color: '#666666',
    fontSize: 13,
    paddingLeft: 15,
    flex: 1,
    fontFamily : 'Montserrat-Regular',
    fontWeight: '100'
  
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
      marginLeft:10,
      elevation: 4
  },
  actionsButtonText:{ 
    fontSize: 12,
    fontFamily : 'Montserrat-Bold',
    color: '#58595b',
    paddingLeft:10,
    paddingRight:10,
    marginBottom: 1,
    opacity: 0.5,
  },
});

export default styles;
