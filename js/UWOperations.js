/**
 * @providesModule UWOperations
 * @flow
 */

'use strict';

var React = require('React');
var AppState = require('AppState');
var StyleSheet = require('StyleSheet');
var View = require('View');
var Text = require('Text');
var Image = require('Image');
var ListView = require('ListView')
var TouchableHighlight = require('TouchableHighlight');
var RefreshControl = require('RefreshControl');

var UWCrypto = require('UWCrypto');

//import {Actions} from 'react-native-router-flux'

//var InfiniteScrollView = require('react-native-infinite-scroll-view');

var {
  loadHistory,
} = require('./actions');

var { connect } = require('react-redux');

var UWOperations = React.createClass({
  getInitialState: function() {
    
    let dataSource = new ListView.DataSource({
      //sectionHeaderHasChanged: this._sectionHeaderHasChanged,
      rowHasChanged: this._rowHasChanged,
    });

    //this.testCrypto();

    return {
      dataSource : dataSource,
      refreshing : false
    }
  },

  testCrypto : function() {
    UWCrypto.newAccount().then((r)=> {
      console.log(JSON.stringify(r));
    });
  },

  componentWillReceiveProps: function(nextProps) {

    if (nextProps.history !== this.props.history) {
      let data = nextProps.history;
      this.setState({
        //dataSource: this.state.dataSource.cloneWithRowsAndSections(data, sectionIds)
        dataSource: this.state.dataSource.cloneWithRows(data),
        refreshing: false,
      })
    }
  }, 

  _rowHasChanged: function(oldRow, newRow) {
    return oldRow.id !== newRow.id;
  },

  componentDidMount: function() {
    AppState.addEventListener('change', this.handleAppStateChange);

    // TODO: Make this list smaller, we basically download the whole internet
    this.props.dispatch(loadHistory());

    //updateInstallation({version});
    //Co dePush.sync({installMode: CodePush.InstallMode.ON_NEXT_RESUME});
  },

  componentWillUnmount: function() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  },

  handleAppStateChange: function(appState) {
    if (appState === 'active') {
      // this.props.dispatch(loadSessions());
      // this.props.dispatch(loadNotifications());
      // this.props.dispatch(loadSurveys());
      // CodePush.sync({installMode: CodePush.InstallMode.ON_NEXT_RESUME});
    }
  },
  
  _onPressButton: function(rowID, rowData) {
    //this.props.dispatch(loadHistory());
    //Actions.detail({direction:'horizontal'});

    this.props.navigator.push({
      screen: 'uw.detail',
      title: 'Pushed Screen'
    });

  },

  _onRefresh : function() {
    this.setState({refreshing: true});
    this.props.dispatch(loadHistory());
    // setTimeout(() => {
    //   this.setState({
    //     refreshing: false,
    //   });
    // }, 3000);
  },

  _renderSeparator: function(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: 1,
          backgroundColor: '#CCCCCC',
        }}
      />
    );
  },

  _renderRow: function(rowData, sectionID, rowID) {
    
    if( rowData.__typename == 'Transfer' ) {
      return (
        <TouchableHighlight underlayColor={'#ccc'} onPress={() => this._onPressButton(rowID, rowData)}>
          <View style={styles.operation}>

            <View style={styles.avatar}>
              <Image source={require('./img/avatar-50.png')} />
            </View>

            <View>            
              <View style={styles.line1}>
                <Text style={[styles.amount, rowData.type == 'received'?styles.green:styles.black]}>{rowData.amount.quantity} </Text>
                <Text style={[styles.symbol, , rowData.type == 'received'?styles.green:styles.black]}>{rowData.amount.asset.symbol}</Text>
              </View>

              <View style={styles.line2}>
                <Text style={styles.description}>{rowData.type} {rowData.type == 'received' ? 'from' : 'to'} {rowData.type == 'received' ? rowData.from.name : rowData.to.name}</Text>
              </View>
            
            </View>

          </View>
        </TouchableHighlight>
      );
    }

    return (
      <View>
        <Text style={styles.text}>Nononono</Text>
      </View>
    );


  },

  render: function() {
    // if (!this.props.isLoggedIn) {
    //   return <LoginScreen />;
    // }
    
    //const {history, balance} = this.props;
    //<View style={styles.container}>
    //</View>   
         // <ActionButton
         //  buttonColor="green"
         //  offsetY={4} 
         // />
    return (
        <View style={styles.container}>
         <ListView
            refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            renderSeparator={this._renderSeparator}
         />

       </View>
    );
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: '#fff'
  },
  operation: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor: '#fff',
  },  
  avatar: {
    width : 60,
    height: 60
  },  
  line1: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },  
  amount: {
    fontSize: 20,
    //fontWeight: 'bold',
  },  
  green: {
    color:'green'
  },  
  black: {
    color:'black'
  },  
  symbol: {
    fontSize: 20,
    fontWeight: 'bold',
  },  
  line2: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  description : {
    fontSize: 15,
    //fontWeight: 'bold',
  }  
});

function select(store) {
  //console.log('Llama a select');
  return {
    history : store.history,
    //balance : store.balance
  };
}

module.exports = connect(select)(UWOperations);
