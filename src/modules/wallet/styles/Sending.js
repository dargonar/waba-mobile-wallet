import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
	},
	row:{flexDirection:'row', alignItems:'flex-end', marginBottom:10},
  data_part : {
    fontFamily : 'Montserrat-Regular',
    color      : '#f15d44',
    fontSize   : 25,
    lineHeight   : 25
  },
  money_part : {
    fontFamily : 'Montserrat-Regular',
    color      : '#f15d44',
    fontSize   : 40,
    lineHeight   : 40
  },

  title_part : {
    marginRight: 20,
    fontFamily : 'Montserrat-Regular',
    color       : '#a9a9a9',
    lineHeight  : 15,
    fontSize    : 15
  },
  spinner:{

  }
});

export default styles;
