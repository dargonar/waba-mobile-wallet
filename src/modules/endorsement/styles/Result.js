import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#2e2f3d',
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
    color      : '#B7F072'
  },
  margin_bottom:{marginBottom:10},
	data_part : {
    fontFamily : 'roboto_normal',
    color      : '#B7F072',
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