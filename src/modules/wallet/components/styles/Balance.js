import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
    width           : undefined,
    height          : undefined,
    backgroundColor : 'transparent',
    justifyContent  : 'center',
    alignItems      : 'center',
		flex            : 3
	},
  balance : {
    flexDirection : 'row'
  },
  int_part : {
    fontFamily : 'roboto_light',
    color      : '#B7F072',
		fontWeight : '100',
    fontSize   : 32,
		lineHeight : 35		
  },
  dec_part : {
    fontFamily  : 'roboto_regular',
    color       : '#B7F072',
    lineHeight  : 35,
    fontSize    : 16
  },
  currency : {
    fontFamily  : 'roboto_thin',
    color       : '#ccc',
    fontSize    : 16
  }
});

export default styles;
