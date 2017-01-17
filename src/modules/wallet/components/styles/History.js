import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  
  container : {
    flex             : 7,
    backgroundColor  : '#FFFFFF',
  },
  
  containerEmpty : {
    flex             : 7,
    alignItems       : 'center',
    justifyContent   : 'center'
  },
  emptyListText:{
      color:"#777777", 
      textAlign:'center',
      fontFamily : 'roboto_regular',
      fontWeight : '100',
      fontSize   : 20,
      lineHeight : 20
  },
  bgImageWrapper: {
      position: 'absolute',
      top: 0, bottom: 0, left: 0, right: 0
  },
  bgImage: {
      flex: 1,
      opacity : 0.2 
      //resizeMode:'center'
  },
  section_container : {
      backgroundColor    : '#FFFFFF',
      height             : 42,
      flex               : 1,
      flexDirection      : 'column',
      justifyContent     : 'center',
      alignItems         : 'flex-start',
      borderBottomColor  : '#85858544',
      borderBottomWidth  : 1,
      borderTopColor     : '#85858544',
      borderTopWidth     : 1
  },
  
  section_text : {
    color              : '#858585',
    paddingLeft        : 13,
  },
  
  separator : {
    height             : 1,
    backgroundColor    : '#85858544',
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
    
  row_arrow : {
    resizeMode      :'stretch', 
    height          :10, 
    width           :10,
  },
  
  row_arrowXX : {
    resizeMode      :'contain', 
    height          :10, 
    width           :10,
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
    
  row_line3 : {
    flexDirection   : 'row',
    justifyContent  : 'flex-start',
    flex            : 1
  },

  row_dea : {
    fontWeight      : '500', 
    fontSize        : 15, 
    color           : '#1f475b'
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
  row_hour_item : {
    textAlign: 'center',
    fontSize: 11
  },
    
  row_message : { 
    fontFamily      : 'roboto_light_italic', 
    color           : '#1f475b99'
  },
  
  button: {
    borderColor: '#8E8E8E',
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20
  },
  text: {
    color: '#8E8E8E',
  },
});

export default styles;
