'use strict';

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

var IntroPager = require('./components/IntroPager');

var Onboarding = React.createClass({

	_onCreateAccount: function() {
		this.props.navigator.push({
			screen : 'wallet.CreateAccount',
			title :  'Crear cuenta'
		});
	},

	_onRestoreAccount: function() {
		this.props.navigator.push({
			screen: 'wallet.RestoreAccount',
			title: 'Restaurar cuenta'
		});
	},

  /*

  */
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          <IntroPager style={styles.viewpager}/>
        </View>
        <View style={styles.buttons}>
          <TouchableHighlight
              style={[styles.fullWidthButton, styles.fullWidthButton2]}
              onPress={this._onCreateAccount} >
            <Text style={styles.fullWidthButtonText}>CREAR CUENTA</Text>
          </TouchableHighlight>

          <TouchableHighlight
              style={[styles.fullWidthButton, styles.fullWidthButton1]}
              onPress={this._onRestoreAccount} >
            <Text style={styles.fullWidthButtonText}>RESTAURAR CUENTA</Text>
          </TouchableHighlight>

        </View>
      </View>
    );
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  	backgroundColor: '#ffffff' //'#0B5F83'
	},
  subcontainer: {
    flex: 4
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
    height:60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
	fullWidthButton1: {
    backgroundColor: '#f15d44' //'#1e759b'
  },
	fullWidthButton2: {
    backgroundColor: '#f15d44', //'#6bbd07',
    marginBottom:20
  },

	fullWidthButtonText: {
    fontFamily : 'roboto_regular',
		fontWeight : '400',
    fontSize   : 15,
		color: 'white'
  },
  welcomeTitle:{
    fontFamily : 'roboto_light',
		fontWeight : '100',
    fontSize   : 30,
    lineHeight : 40,
		color      : 'white',
    textAlign  : 'center'
  },
	welcomeTitle2:{
    fontFamily : 'roboto_light',
		fontWeight : '100',
    fontSize   : 20,
    lineHeight : 30,
		color      : 'white',
    textAlign  : 'center'
  }
});

module.exports = Onboarding;
