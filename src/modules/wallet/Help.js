import React, { PropTypes, Component } from 'react';
import {
  ToastAndroid,
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { connect } from 'react-redux';


const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff' //'#0B5F83'
  },
  subcontainer: {
    flex: 5
  },
  viewpager: {
    flex: 4,
    flexDirection: 'column'
  },
  buttons:{
    flex:2,
    paddingLeft:15,
    paddingRight:15,
    flexDirection:'column',
    alignItems: 'stretch',
    justifyContent:'center'
  },
  fullWidthButton: {
    borderRadius: 5,
    height:50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullWidthButton1: {
    backgroundColor: '#cdefff', //'#f0f4f7',
    padding: 5,
    borderRadius: 5,
    marginBottom:20,
  },
  fullWidthButton2: {
    backgroundColor: '#ff7232', //'#6bbd07',
  },

  fullWidthButtonText: {
    fontFamily : 'Montserrat-Medium',
    fontWeight : '400',
    fontSize   : 14,
    color: '#fff'
  },
  fullWidthButtonText1: {
    fontFamily : 'Montserrat-Medium',
    fontWeight : '400',
    fontSize   : 14,
    color: '#555'
  },
  fullWidthButtonDisabled: {
    backgroundColor: '#bbb'
  },
  fullWidthButtonTextDisabled: {
    color: '#ddd'
  }
});


var IntroPager = require('./components/IntroPager');

// var Onboarding = React.createClass({

class Help extends React.Component {
  
  constructor(props) {
    super(props);
   
   }

  
	render() {
    
    return (
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          <IntroPager style={styles.viewpager} />
        </View>
      </View>
    );
  }

}


export default connect(null, null)(Help);
