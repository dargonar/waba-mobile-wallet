import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
		
	},


  discoinCount:{
    width: '100%',
    alignItems: 'flex-start',
    padding: 0,
    flexDirection: 'row', 
    justifyContent: 'flex-start'
  },

  discoinCountValue:{
    fontSize: 45,
    lineHeight: 45,
    fontFamily : 'Montserrat-Regular', 
    color: '#f15d44',
  },

  actionButtonIcon: {
    fontSize: 50,
    height: 40,
    color: '#fff',
  },


  title: {
    fontFamily : 'Montserrat-Light',
    fontWeight : '100',
    color      : '#000',
    fontSize   : 20,
    lineHeight : 20,
    marginBottom:20
  },
  amount:{
    fontSize   : 40,
    lineHeight : 45,
    fontFamily : 'roboto_light',
    fontWeight : '100',
    color      : '#f15d44'
  },
  margin_bottom:{marginBottom:10},
	data_part : {
    fontSize:25, 
    lineHeight:35, 
    fontFamily : 'Montserrat-Medium',
    color      : '#f15d44'
  },
  title_part : {
    color       : '#a9a9a9',
    fontSize:12, 
    lineHeight:17, 
    paddingBottom:3, 
    fontFamily : 'Montserrat-Regular'
  },
	title_part_2 : {
    fontFamily  : 'roboto_regular',
    color       : '#a9a9a9',
    fontSize    : 12
  },
  spinner:{

  }
});

export default styles;
