import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
 tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    flex: 1,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  container: {
		flex: 1,
		backgroundColor: '#ffffff',
		padding: 30
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
