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
    color: '#ccc',
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
  subaccountButtonContainer: { 
    height:75, 
    position: 'absolute', 
    bottom: 0,
    left: 0,
    padding:20,
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
	fullWidthButton: {
		borderRadius: 0,
    padding: 15,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
		backgroundColor: '#1e3695',
    width: '100%',
    position: 'absolute',
    elevation: 10
	},
	fullWidthButtonText: {
    fontFamily : 'Montserrat-Regular',
		fontWeight : '100',
    fontSize   : 15,
		color: 'white',
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
