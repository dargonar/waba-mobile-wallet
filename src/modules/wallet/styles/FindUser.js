import { Platform, StyleSheet, Dimensions } from 'react-native';
const item_width     = (Dimensions.get('window').width)-30;
const xx = item_width-40;
console.log('-------------------------------------',item_width);

const styles_x = StyleSheet.create({
  
  container:{flex:1, paddingTop:3, backgroundColor:'#fff'},
  containerEmpty : {
    flex             : 7,
    alignItems       : 'center',
    justifyContent   : 'center'
  },
  emptyListText:{
      color:"#777777", 
      textAlign:'center',
      fontFamily : 'Montserrat-Regular',
      fontWeight : '100',
      fontSize   : 15,
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
  button: {
    borderColor: '#8E8E8E',
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20
  },
  buttonText: {
    color: '#8E8E8E',
  },
  businessCard: {
    borderRadius: 7,
    marginTop: 17,
    width: undefined,
    marginLeft:11,
    marginRight:11,
    height: 60,
    elevation: 5,
    backgroundColor: '#FFF',
    borderColor: 'transparent'
  },

  businessCardInfo: {
    color: '#000', 
    flexDirection: 'column',
  },
  businesseCardTitle:{
    fontSize: 15,
    fontFamily : 'Montserrat-Medium',
    color: '#58595b',
    marginBottom: 3,
    marginTop: 3,
  },
  businessCardInfoContainer:{
    padding: 10,
    paddingTop: 5,
    paddingLeft: 8,
    flex: 1
  },
  businessCategorie:{
    fontSize: 7,
    fontFamily : 'Montserrat-Bold',
    letterSpacing: 10,
    margin: 1,
    padding: 0,
    lineHeight: 6,
    color: '#000',
    opacity: 0.25,
  },
  row: {
    margin: 5,
    width: item_width,
    height: item_width,
    backgroundColor: '#F6F6F6',
  },
  thumb: {
    width: 50,
    height: 50,
    margin: 5,
    // flex:1,
    // resizeMode: 'cover',
    borderBottomLeftRadius: 7,
    borderTopLeftRadius: 7,
  },

  name_container:{
    backgroundColor:'#000000',
    opacity: .6,  
    position: "absolute", top: xx, left: 0, right: 0, bottom: 0,
    
    // position: 'absolute',
    // bottom: 0,
    // left:0,
    // right: item_img_width
  },
  text: {
    position: 'absolute',
    bottom: 0,
    color: '#fff',
    backgroundColor:'transparent',
    alignSelf:'flex-start',
    textAlign: 'left',
    padding: 4,
    fontWeight: 'bold',
    opacity: 1,
    fontFamily : 'Montserrat-Medium',
    fontWeight: '100',
    fontSize: 15,
    lineHeight:15
  },
  discount: {
    color: '#fff',
    backgroundColor:'transparent',
    fontWeight: '100',
    borderRadius: 4,
    fontFamily : 'Montserrat-Regular',
    fontSize: 26,
    flex: 0,
    textAlign: 'right', 
  },
  reward: {
    color: '#fff',
    backgroundColor:'transparent',
    fontWeight: '100',
    borderRadius: 4,
    fontFamily : 'Montserrat-Regular',
    fontSize: 26,
    flex: 0,
    textAlign: 'right', 
  },
  rewardGradient: {
    flex: 1,
    borderRadius: 5,
    padding: 4,
    marginLeft: 4,
    marginTop: 6,
    paddingRight: 10
  },
  rewardIcon: {
    position: 'absolute',  
    color: '#FFF',
    opacity: 0.5,
  },
  discountGradient: {
    flex: 1,
    borderRadius: 5,
    padding: 4,
    marginRight: 4,
    marginTop: 6,
    paddingRight: 10
  },
  promoLabel:{
    flex: 1,
    textAlign: 'right',
    alignSelf: 'center',
    marginTop: -9,
    marginRight: 4,
    fontSize: 14,
    color: '#FFF',
    fontFamily : 'Montserrat-Light',
  },
  
  sectionTitle:{
    fontSize: 18,
    padding: 8,
    marginTop: 5,
    marginBottom: 4,
    paddingLeft: 0,
    color: '#a7a8aa',
    fontFamily : 'Montserrat-SemiBold',
  }, 
  discoinCount:{
    width: item_width,    
    alignItems: 'center',
    padding: 0,
    paddingRight: 20,
    flexDirection: 'row', 
    justifyContent: 'flex-end',
  },
  discoinCountValue:{
    fontSize: 45,
    fontFamily : 'Montserrat-Light', 
    color: '#FFF',
  },
  discoinCountGradient:{
    borderRadius: 35,
    height: 60,
  },
});



export default styles_x;