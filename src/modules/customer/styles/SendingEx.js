import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  row:{flexDirection:'row', alignItems:'flex-end', marginBottom:10},
  data_part : {
    fontFamily : 'Montserrat-Medium',
    color      : '#666',
    fontSize   : 17,
    lineHeight   : 25,
    paddingLeft: 7,
    paddingRight: 15,
  },
  money_part : {
    fontFamily : 'Montserrat-Light',
    color      : '#666',
    fontSize   : 60,
    lineHeight   : 60,
  },

  title_part : {
    fontFamily : 'Montserrat-SemiBold',
    color       : '#ccc',
    lineHeight  : 15,
    fontSize    : 13
  },
  spinner:{
    height: 100,
    width: 400,
  },
  userRecipient:{
    flexDirection:'row', justifyContent: 'flex-start', flex:0, alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 4,
    paddingLeft: 0,
    marginTop: 25,
  }
});

export default styles;
