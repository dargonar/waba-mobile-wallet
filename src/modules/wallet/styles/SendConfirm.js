import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 0,
    paddingTop: 10,
  },
  fullWidthButtonTextDisabled:{
    fontFamily : 'Montserrat-Medium',
    fontWeight : '100',
      fontSize   : 15,
    color      : '#cccccc'
  },
  amountQuantityView:{
    justifyContent: 'center',
    flexDirection: 'row',
  },
  amountQuantityCard:{
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ff7233', 
    padding: 0,
    minWidth: 100,
    paddingRight: 25,
    justifyContent: 'center',
    paddingLeft: 25,
    paddingBottom: 10,
    margin: 5,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  feeView:{
    marginBottom: 20,
    alignItems: 'center',
  },
  fromToView:{
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 20,
    flex: 1,
    height: 150,
  },
  feeCard:{
    minWidth: 100,
    alignItems: 'center',
    marginTop: -6,
    borderWidth: 1,
    // borderColor: '#DCDCDC',
    // borderRadius: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderColor: '#ccc',
    zIndex: -1,
    paddingTop: 5,
    paddingBottom: 8
  },
  fromToThumb:{
    backgroundColor:'#ccc', 
    height:40, 
    width:40, 
    borderRadius:7, 
    marginTop:5, 
    marginBottom:10
  },
  fromToCard:{
    flexDirection: 'column',
    flex: 1,
    borderWidth: 3,
    borderColor: '#FFF', 
    elevation: 5,
    padding: 0,
    paddingRight: 5,
    paddingLeft: 5,
    margin: 5,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 130,
    backgroundColor: '#FFFFFF',
    
  },
  amountQuantity:{
    fontSize: 55,
    fontFamily : 'Montserrat-ExtraLight',
  },
  text:{
    fontFamily : 'Montserrat-Medium',
  },
  label:{
    fontFamily : 'Montserrat-Bold',
    fontSize: 12,
    color: '#CCC',
  },
  labelTitle:{
    fontFamily : 'Montserrat-Medium',
    fontSize: 21,
    color: '#999',
  },
  billAmount:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 21,
    color: '#666',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#CCC',
    marginBottom: 10,
  },
  detailsView:{
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#ededed',
    marginBottom: 30,
  },

  detailsView2:{
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#ededed',
    marginBottom: 0,
  },

btnGradient: {
  height: 50,
  borderRadius: 25,
  flexDirection:'row', 
  paddingLeft:35, paddingRight:35,
  width: 200,
  alignItems:'center', 
  justifyContent: 'center',
},
btnTouchable: {
  margin: 10,
  marginTop: 30,
  borderRadius: 25,
  backgroundColor: 'transparent',
  alignSelf: 'flex-end'
},
fullWidthButtonDisabled: {
  backgroundColor: '#bbb',

  height: 50,
  borderRadius: 25,
  flexDirection:'row', 
  paddingLeft:35, paddingRight:35,
  width: 200,
  alignItems:'center', 
  justifyContent: 'center',

  },
btnTxt: {
  fontFamily : 'Montserrat-SemiBold',
  fontSize   : 13,
  marginBottom: 1,
  color: '#fff',
},


});

export default styles;
