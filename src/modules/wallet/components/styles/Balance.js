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
    fontFamily : 'roboto_normal',
    color      : '#d8ef27',
    fontSize   : 32
  },
  dec_part : {
    fontFamily  : 'roboto_regular',
    color       : '#d8ef27',
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
