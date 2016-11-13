/**
 * @providesModule UWMain
 * @flow
 */

'use strict';

var React = require('React');
var AppState = require('AppState');
var View = require('View');
var StyleSheet = require('StyleSheet');
var { connect } = require('react-redux');
//var StatusBar = require('StatusBar');

var {
  loadBalance,
} = require('./actions');


var {PrivateKey, key} = require("graphenejs-lib");

//var { updateInstallation } = require('./actions/installation');
//var { connect } = require('react-redux');

//require('../shim');
//var {ChainStore} = require("graphenejs-lib");

var UWOperations = require('UWOperations');
var UWBalance = require('UWBalance');

//var { version } = require('./env.js');

var UWMain = React.createClass({

  statics : {

    navigatorButtons : {
  
      rightButtons: [
        // {
        //   title: 'Edit', // for a textual button, provide the button title (label)
        //   id: 'edit', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        //   testID: 'e2e_rules', // optional, used to locate this view in end-to-end tests
        //   disabled: true, // optional, used to disable the button (appears faded and doesn't interact)
        //   disableIconTint: true, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
        //   showAsAction: 'ifRoom' // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
        // },
        {
          icon: require('./img/ic_qrcode.png'), // for icon button, provide the local image asset name
          id: 'add' // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        }
      ],

      fab: {
        collapsedId: 'share',
        collapsedIcon: require('./img/ic_share.png'),
        expendedId: 'clear',
        expendedIcon: require('./img/ic_clear.png'),
        backgroundColor: '#4dbce9',
        actions: [
          {
            id: 'mail',
            icon: require('./img/ic_add.png'),
            backgroundColor: '#4dbce9'
          },
          {
            id: 'twitter',
            icon: require('./img/ic_archive.png'),
            backgroundColor: '#4dbce9'
          }
        ]
      }

    }    

  },

  getInitialState: function() {
    
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);

    return {

    }
  },

  onNavigatorEvent: function(event) {
    
    //console.log(JSON.stringify(event));
    console.log(event.id);
//     ChainStore.FetchChain("getAccount","elmato").then(function(r) {
//       console.log('Aca esta el FetchChain =>', JSON.stringify(r));
//     });
    
    if (event.id == 'twitter' ) {
      this.props.dispatch(loadBalance("elmato"));
    }

    if(event.id == 'mail') {
      this.props.navigator.push({
        screen: 'uw.pushed'
        //title: 'Pushed Screen'
      });

      
      
      
//       let seed = "THIS IS A TERRIBLE BRAINKEY SEED WORD SEQUENCE";
//       console.log(seed);
      
//       let pkey = PrivateKey.fromSeed( key.normalize_brainKey(seed) );
//       console.log("Private key:", pkey.toWif());
//       console.log("Public key :", pkey.toPublicKey().toString());
//       console.log('terminamos...');
    }
    
    if (event.id == "add") {
      
      this.props.navigator.push({
        screen: 'uw.barcode'
        //title: 'Pushed Screen'
      });

    }
  },

  componentWillReceiveProps: function(nextProps) {

  }, 

  componentDidMount: function() {
    // AppState.addEventListener('change', this.handleAppStateChange);
    // // TODO: Make this list smaller, we basically download the whole internet
    // this.props.dispatch(loadHistory());
    //updateInstallation({version});
    //CodePush.sync({installMode: CodePush.InstallMode.ON_NEXT_RESUME});
  },

  componentWillUnmount: function() {
    //AppState.removeEventListener('change', this.handleAppStateChange);
  },

  handleAppStateChange: function(appState) {
    // if (appState === 'active') {
    //   // this.props.dispatch(loadSessions());
    //   // this.props.dispatch(loadNotifications());
    //   // this.props.dispatch(loadSurveys());
    //   // CodePush.sync({installMode: CodePush.InstallMode.ON_NEXT_RESUME});
    // }
  },

  render: function() {
    // if (!this.props.isLoggedIn) {
    //   return <LoginScreen />;
    // }
    //const {history, balance} = this.props;
        // <StatusBar
        //   translucent={false}
        //   backgroundColor="rgba(0, 0, 0, 0.2)"
        //   barStyle="light-content"
        //  />

    return (
      <View style={styles.container}>
         <UWBalance/>
         <UWOperations {...this.props} />
      </View>
    );
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: 54
  },
});

var select = function(store) {
  return {

  }
}

module.exports = connect(select)(UWMain);

