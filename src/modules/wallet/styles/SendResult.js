import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1f475b',
		padding: 30
	},
  title: {
    fontFamily : 'roboto_light',
    fontWeight : '100',
    color      : '#ffffff',
    fontSize   : 40,
    lineHeight : 45,
    marginBottom:20
  },
  amount:{
    fontSize   : 40,
    lineHeight : 45,
    fontFamily : 'roboto_light',
    fontWeight : '100',
    color      : '#d8ef27'
  },
  margin_bottom:{marginBottom:10},
	data_part : {
    fontFamily : 'roboto_normal',
    color      : '#d8ef27',
    fontSize   : 18
  },
  title_part : {
    fontFamily  : 'roboto_regular',
    color       : '#ffffff',
    lineHeight  : 25,
    fontSize    : 12
  },
  spinner:{
    
  }
});

export default styles;