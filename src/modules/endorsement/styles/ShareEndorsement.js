import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  row_container : {
    flexDirection   : 'row',
    justifyContent  : 'flex-start',
    alignItems      : 'center',
    padding         : 10,
    backgroundColor : '#fff',
  },
  row_avatar : {
    width           : 30,
    height          : 30,
    marginLeft      : 3,
    flexDirection   : 'column',
    alignItems      : 'center',
    justifyContent  : 'center',
    borderRadius    : 50
  },
  row_hand : {
    resizeMode      :'contain', 
    height          :15, 
    width           :15,
  },
  row_content : {
    marginLeft      : 15,
    flex            : 5      
  },
    
  row_line1 : {
    flexDirection   : 'row',
    justifyContent  : 'flex-start',
    flex            : 1 
  },

  row_line2 : {
    flexDirection   : 'row',
    justifyContent  : 'flex-start',
    flex            : 1
  },
  row_amount: {
    fontFamily      : 'roboto_regular',
    fontSize        : 16,
    color           : '#1f475b',
  },  
    
  row_hour : {
    alignSelf       : 'center', 
    marginRight     : 5,
    
    width           : 50,
    height          : 50,
    borderRadius    : 50,
//     backgroundColor : '#eee',
    flexDirection   : 'column',
    alignItems      : 'center',
    justifyContent  : 'center',
  },

  title: {
    backgroundColor: 'transparent',
    fontFamily : 'roboto',
    fontWeight : '700',
    fontSize: 15,
  },

  fullWidthButton: {
    borderRadius: 0,
    height:100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#044967' 
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
  fullWidthButtonTextDisabled:{
    fontFamily : 'roboto_light',
    fontWeight : '100',
        fontSize   : 15,
    color      : '#cccccc'
  },
});

export default styles;