/**
 * @providesModule UWBalance
 * @flow
 */

'use strict';

var React = require('React');
var AppState = require('AppState');
var StyleSheet = require('StyleSheet');
var View = require('View');
var Text = require('Text');

var { connect } = require('react-redux');

var UWBalance = React.createClass({

  render: function() {
    // if (!this.props.isLoggedIn) {
    //   return <LoginScreen />;
    // }
    
    const {balance} = this.props;

    return (
    <View style={styles.container}>
      <Text style={styles.balance}>$10</Text>
    </View>   
    );
  },

});

var styles = StyleSheet.create({
  container: {
    flex  : 1,
    backgroundColor: '#4dbce9',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  balance:{
    textAlign: 'center',

    flex:1,
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor:'#4dbce9'
  },  
});

function select(store) {
  return {
    balance : store.balance
  };
}

module.exports = connect(select)(UWBalance);
