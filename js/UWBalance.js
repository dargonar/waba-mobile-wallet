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
var Image = require('Image');

var { connect } = require('react-redux');

import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager'

//var ViewPagerAndroid = require('ViewPagerAndroid')

var UWBalance = React.createClass({

  _renderDotIndicator : function() {
    const {balance} = this.props;
    return <PagerDotIndicator pageCount={balance.length} />;
  },

  render: function() {
    // if (!this.props.isLoggedIn) {
    //   return <LoginScreen />;
    // }
        // <View style={{backgroundColor:'cornflowerblue'}}>
        //     <Text>page two</Text>
        // </View>
        // <View style={{backgroundColor:'#1AA094'}}>
        //     <Text>page three</Text>
        // </View>
    // return (
    //  <ViewPagerAndroid
    //     style={{height:140}}
    //     initialPage={0}>
    //   {
    //    balance.map(function(value, i){
    //         return (
    //         <View key={i} style={styles.container}>
    //             <Text style={styles.balance}>{value.quantity} {value.asset.symbol}</Text>
    //         </View>
    //        );
    //     })
    //   }

    //   </ViewPagerAndroid>

    // );    
    const {balance} = this.props;

    console.log('LLegue hasta aca =>', JSON.stringify(balance));
    
    return (
      
        <IndicatorViewPager
          style={{height:140}}
          indicator={this._renderDotIndicator()}
        >
        {
         balance.map(function(bal, i){
              return (
              <View key={i} style={styles.container}>
                  <Text style={styles.balance}>{bal.asset.get('symbol')} {bal.amount.get('balance')}</Text>
              </View>
             );
          })
        }
      </IndicatorViewPager>
    );
  },

});
//         <Image source={require('./img/bg-dashboard.png')} style={styles.img_container}>
//         </Image>      

var styles = StyleSheet.create({
  img_container: {
    flex: 2,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
