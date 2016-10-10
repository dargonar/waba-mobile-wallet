/**
 * @providesModule UWDetail
 * @flow
 */

'use strict';

var React = require('React');
var View = require('View');
var Text = require('Text');
var TouchableOpacity = require('TouchableOpacity');

var StyleSheet = require('StyleSheet');

var UWDetail = React.createClass({

  statics : {
  
    navigatorStyle : {
      navBarNoBorder: true,
      navBarBackgroundColor: '#FF0000',
    },

  },

  getInitialState: function() {
    return {

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
      <View style={styles.sideMenu}>
        <Text style={styles.title}>Hello from Detail</Text>
      </View>
    );

  },

});

var styles = StyleSheet.create({
  sideMenu: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  title: {
    textAlign: 'center',
    marginBottom: 15
  },
  button: {
    textAlign: 'center',
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: 'grey',
    marginBottom: 10,
    marginTop:10,
    color: 'black'
  }
});

module.exports = UWDetail;
