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
var { iconsMap } = require('./app-icons');

var {
  loadBalance,
} = require('./actions');

var { connect } = require('react-redux');

var UWOperations = React.createClass({
  getInitialState: function() {
    
    let dataSource = new ListView.DataSource({
      sectionHeaderHasChanged : this._sectionHeaderHasChanged,
      rowHasChanged           : this._rowHasChanged,
      getSectionHeaderData    : this._getSectionHeaderData
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
      console.log('componentWillReceiveProps:', data);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(data),
        refreshing: false,
      })
    }
  }, 

  _rowHasChanged: function(oldRow, newRow) {
    console.log('rowHasChanged::', oldRow, '--->', newRow);
    return true;
    return oldRow.id !== newRow.id;
  },

  _getSectionHeaderData : function(dataBlob, sectionID) {
    console.log('getSectionHeaderData::', dataBlob, '--->', sectionID);
    return sectionID;
  },
  
  _sectionHeaderHasChanged: function(prevSectionData, nextSectionData) {
    console.log('sectionHeaderHasChanged::', prevSectionData, '--->', nextSectionData);
    return prevSectionData !== nextSectionData;
    //return true;
  },

  componentDidMount: function() {
    AppState.addEventListener('change', this.handleAppStateChange);
    this.cargalo();
    
//     this.props.dispatch({ 
//         type : 'LOADED_HISTORY', 
//         history: { 
//           'pepe': [1,2,3], 
//           'pop' : [4,5,6], 
//           'apap': [7,8,9,10]
//         }
//       });

    // TODO: Make this list smaller, we basically download the whole internet
    //this.props.dispatch(loadHistory());

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
      screen: 'uw.pushed',
      title: 'Pushed Screen'
    });

  },

  cargalo : function() {
    this.props.dispatch({ 
        type : 'LOADED_HISTORY', 
        history: { 
          'Octubre'    : [
            { id: 1, type: 'out', from: 'me', to :'javi.rr', msg: 'Devolucion!', amount: '500.00'},
            { id: 2, type: 'in', from: 'RamiroRoa', to :'me', msg: 'Gracias por el flete...', amount: '156.00'},
            { id: 3, type: 'out', from: 'me', to :'Fundacion LTCN', amount: '10.00'},
            { id: 4, type: 'in', from: 'Cooperativa TUA', to :'me', amount: '10.00'},
          ], 
          'Septiembre' : [
            { id: 5, type: 'in', from: 'PedroGoyena', to :'me', msg: 'Varios', amount: '30.00'},
            { id: 6, type: 'out', from: 'me', to :'LopezOrono', msg: 'Correccion', amount: '220.00'},
            { id: 7, type: 'out', from: 'me', to :'LopezOrono', amount: '500.00'},
          ],
          'Agosto'     : [
            { id: 8,  type: 'in',  from: 'AldoPirose', to :'me', amount: '10.00'},
            { id: 9,  type: 'out', from: 'me', to :'pancho.', msg: 'Signatura rocosa!', amount: '1502.15'},
            { id: 10, type: 'in',  from: 'Treniso', to :'me', amount: '25.00'},
            { id: 11, type: 'out', from: 'me', to :'javi.rr', msg: 'Lo del dulce', amount: '1800.00'},
          ]
        }
      });
    
  },
  
  _onRefresh : function() {
    this.setState({refreshing: true});
    setTimeout(() => {
      this.cargalo();
//       this.setState({
//         refreshing: false,
//       });
    }, 3000);

    
  },
  _renderSectionHeader : function(sectionData, sectionID)  {
    //console.log()
    return (
      <View style={{
          backgroundColor: '#FFFFFF',
          height: 42,
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          borderBottomColor : '#85858544',
          borderBottomWidth : 1,
          borderTopColor : '#85858544',
          borderTopWidth : 1
      }}
      >
        <Text
          key={`${sectionID}`}
          style={{
            color: '#858585',
            paddingLeft: 13,
          }}
        > {sectionData} </Text>
      </View>
    );
    
  },
  
  _renderSeparator: function(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: 1,
          backgroundColor: '#85858544',
        }}
      />
    );
  },

  //if( rowData.__typename == 'Transfer' ) {
//     return (
//       <View>
//         <Text style={{height:20}}>Operation X</Text>
//       </View>
//     );

  _renderRow: function(rowData, sectionID, rowID) {

      // console.log('Render=>', iconsMap['ios-arrow-round-up']);
       let mapa   = {in:'recibido', 'out': 'enviado'};
       let rotato = {in:'135 deg', 'out' : '-45 deg'};
       let bg     = {in:'#8ec919', 'out':'#fcc4cb'};
       let dea    = {in:'De:', 'out':'A:'};

       let message = undefined;
       if(rowData.msg)
         message = (<Text style={{fontStyle:'italic', color:'#1f475b99'}}>{rowData.msg}</Text>);
       return (
        <TouchableHighlight underlayColor={'#ccc'} onPress={() => this._onPressButton(rowID, rowData)}>
          <View style={styles.operation}>

            <View style={[styles.avatar,{backgroundColor:bg[rowData.type], borderRadius: 50}]}>
              <Image source={iconsMap['ios-arrow-round-up']} style={{
                resizeMode:'stretch', 
                height:10, 
                width:10,
                transform : [{rotate: rotato[rowData.type]}],
                }}/>
            </View>

            <View style={{marginLeft:15, flex:5}}>            
              
              <View style={styles.line1}>
                <Text style={styles.amount}>${rowData.amount} {mapa[rowData.type]}s</Text>
              </View>

              <View style={styles.line2}>
                <Text style={{fontWeight:'500', fontSize:15, color:'#1f475b'}}>{dea[rowData.type]} </Text>
                <Text>{rowData.type == 'in' ? rowData.from : rowData.to}</Text>
              </View>

              {message}
            </View>

            <View style={{alignSelf :'center', marginRight: 10}}>
              <Text>11:20</Text>
            </View>

          </View>
        </TouchableHighlight>
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
              colors={['#8ec919', '#fcc4cb', '#d8ef27']}
            />}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            renderSeparator={this._renderSeparator}
            renderSectionHeader={this._renderSectionHeader}
         />

       </View>
    );
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 6,
    backgroundColor: '#fff'
  },
  operation: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems : 'center',
    padding: 10,
    backgroundColor: '#fff',
  },  
  avatar: {
    width : 30,
    height: 30,
    marginLeft: 3,
    flexDirection: 'column',
    alignItems : 'center',
    justifyContent: 'center',
    //backgroundColor: '#000'
  },  
  line1: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    
  },  
  amount: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    color : '#1f475b',
    fontWeight: '700'
  },  
  green: {
    //color:'green'
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
    flex: 1
  },
  line3: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1
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
