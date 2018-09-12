import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  
  container : {
    flex             : 7,
    backgroundColor  : '#FFFFFF',
  },
  
  txRow:{

    borderRadius: 7,
    marginTop: 20,
    width: undefined,
    marginLeft:13,
    marginRight:15,
    height: 80,
    elevation: 10,
    backgroundColor: '#FFF',
    borderColor: 'transparent'
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
  },
  
  section_text : {
    color              : '#cccccc',
    paddingLeft        : 15,
    fontFamily : 'Montserrat-Medium',
  },
  
  separator : {
    height             : 1,
    backgroundColor    : '#85858544',
  },
  
  row_container : {
    flexDirection   : 'row',
    justifyContent  : 'flex-start',
    alignItems      : 'center',
    flex:1,
  },

  row_avatar : {
    flex:1,
    borderBottomLeftRadius: 7,
    borderTopLeftRadius: 7,
    flexDirection   : 'row',
    justifyContent  : 'center',
    alignItems      : 'center',
  },
    
  row_arrow : {
    resizeMode      :'stretch', 
    height          :25, 
    width           :25,
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
    flex            : 1,
    justifyContent: 'center',
    padding: 4,      
    paddingTop: 10,
    paddingBottom: 3,
  },
    
  row_line1 : {
    flexDirection   : 'row',
    justifyContent  : 'flex-start',
    flex            : 1,
  },

  row_line2 : {
    flexDirection   : 'row',
    justifyContent  : 'flex-start',
    flex            : 1,
  },
    
  row_line3 : {
    flexDirection   : 'row',
    justifyContent  : 'flex-start',
    flex            : 1
  },
  col_amount : {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingRight: 15,
  },
  row_simple : {
    fontWeight      : '100', 
    fontSize        : 15, 
    color           : '#1f475b'
  },
  row_dea : {
    fontSize        : 14, 
    marginTop: -3,
    color           : '#383838',
    fontFamily      : 'Montserrat-Regular',
  },
  row_action: {
    fontFamily      : 'Montserrat-Bold',
    fontSize        : 8,
    color           : '#afafaf',
  },    
  row_amount: {
    fontFamily      : 'Montserrat-Light',
    fontSize        : 35,
    color           : '#1f475b',
  },  
  row_unknown_op: {
    fontSize        : 12,
    color           : '#2e2f3d',
    fontFamily      : 'roboto_thin',
    fontWeight      : '100',
    paddingLeft     : 57,
    paddingRight    : 8,
    paddingTop      : 8,
    paddingBottom   : 8
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
    color: '#afafaf',
    fontSize: 11,
    fontFamily      : 'Montserrat-Regular'
  },
    
  row_message : { 
    fontFamily      : 'Montserrat-Regular', 
    color           : '#1f475b99',
    fontSize: 8,

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
