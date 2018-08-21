import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
		
	},


  discoin_amount_w: {
    fontFamily : 'roboto_bold',
    color      : '#ffffff',
    fontSize   : 32, 
    backgroundColor:'#f15d44',
    paddingLeft:10,
    paddingRight:10,
    textAlign:'center'
  },
  discoin_amount_small : {
    fontFamily : 'roboto_normal',
    color      : '#f15d44',
    fontSize   : 20,
    lineHeight : 32
  },
  discoin_amount_g : {
    fontFamily  : 'roboto_regular',
    color       : '#a9a9a9',
    lineHeight  : 32,
    fontSize    : 24,
    paddingLeft:10
  },

  title: {
    fontFamily : 'roboto_light',
    fontWeight : '100',
    color      : '#a9a9a9',
    fontSize   : 40,
    lineHeight : 45,
    marginBottom:20
  },
  amount:{
    fontSize   : 30,
    lineHeight : 30,
    fontFamily : 'roboto_bold',
    fontWeight : '100',
    color      : '#f15d44'
  },
  amount_title:{
    fontSize   : 30,
    lineHeight : 30,
    fontFamily : 'roboto_bold',
    fontWeight : '100'
  },
  margin_bottom:{marginBottom:10},
	data_part : {
    fontFamily : 'roboto_normal',
    color      : '#f15d44',
    fontSize   : 18
  },
  title_part : {
    fontFamily  : 'roboto_regular',
    color       : '#a9a9a9',
    lineHeight  : 25,
    fontSize    : 12
  },
	title_part_2 : {
    fontFamily  : 'roboto_regular',
    color       : '#a9a9a9',
    fontSize    : 12
  },
  spinner:{

  },
  tab_content:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding:20
  }
});

export default styles;
