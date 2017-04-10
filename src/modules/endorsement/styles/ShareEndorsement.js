import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const width75 = wp(75);
const width12_5 = wp(12.5);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e2f3d'
  },
  bg_container:{
    backgroundColor: '#fff'
  },
  row_container : {
    flexDirection   : 'row',
    justifyContent  : 'flex-start',
    alignItems      : 'center',
    padding         : 10,
//     backgroundColor : '#fff',
    borderBottomColor: '#575863',
    borderBottomWidth: 1,
  },
  row_card:{
    borderTopLeftRadius     : 6,
    borderTopRightRadius    : 6,
    borderBottomLeftRadius  : 6,
    borderBottomRightRadius : 6,
    width                   : 45,
    height                  : 30,
    alignItems      : 'center',
    justifyContent  : 'center',
    marginLeft      : 3,
  },
  row_avatar : {
    width           : 45,
    height          : 30,
    marginLeft      : 3,
    flexDirection   : 'column',
    alignItems      : 'center',
    justifyContent  : 'center',
    borderRadius    : 50
  },
  row_avatar2 : {
    width           : 30,
    height          : 30,
    marginLeft      : 10,
    marginRight      : 8,
    flexDirection   : 'column',
    alignItems      : 'center',
    justifyContent  : 'center',
    borderRadius    : 50
  },
  row_hand : {
    resizeMode      :'contain', 
    height          :20, 
    width           :20,
  },
  row_plus : {
    resizeMode      :'contain', 
    height          :25, 
    width           :25,
  },
  row_content : {
    marginLeft      : 15,
    flex            : 1      
  },
    
  row_line1 : {
    flexDirection   : 'row',
    justifyContent  : 'flex-start'
  },

  row_line2 : {
    flexDirection   : 'row',
    justifyContent  : 'flex-start',
    flex            : 1
  },
  row_amount: {
    fontFamily      : 'roboto_regular',
    fontSize        : 16,
    color           : '#ffffff',
  },
  
  
//   line:{
//     position: 'absolute',
//     left: width12_5,
//     top: 5,
//     height: 1,
//     width: width75,
//     backgroundColor: '#DDDDDD'
//   },
  remaining:{
      color: '#82828b',
			fontSize: 10,
			fontFamily : 'roboto_light',
			fontWeight : '100'  
    },
  row_hour : {
    alignSelf       : 'center', 
    marginRight     : 5,
    
    width           : 30,
    height          : 30,
    borderRadius    : 30,
//     backgroundColor : '#eee',
    flexDirection   : 'column',
    alignItems      : 'center',
    justifyContent  : 'center',
    
  },
  row_hour_set:{
    backgroundColor: '#DDDDDD'
  },
  row_hour_item : {
    fontFamily : 'roboto_light',
    fontWeight : '100',
    textAlign: 'center',
    fontSize: 20
  },
  
  button_row:{
    backgroundColor: '#575863',
    marginTop: 4,
    marginBottom: 4,
  },
  
  title: {
    backgroundColor: 'transparent',
    fontFamily : 'roboto',
    fontWeight : '100',
    fontSize: 15,
    color: '#fff'
  },
  margin_top:{
    marginTop: 15,
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