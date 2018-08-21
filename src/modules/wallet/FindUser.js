import React, { PropTypes, Component } from 'react';
import { SearchBar } from 'react-native-elements'
import { List, ListItem } from 'react-native-elements'
import { ActivityIndicator } from 'react-native';

import {
  View,
  ListView
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from './wallet.actions';
import { iconsMap } from '../../utils/AppIcons';
import * as config from '../../constants/config';

import styles from './styles/SelectRecipient';

import Prompt from 'react-native-prompt';

import {Header, Tab, Tabs, TabHeading, Icon } from 'native-base';
import { Button } from 'react-native-elements'
import BarcodeScanner from 'react-native-barcode-scanner-google';
import BarcodeType from 'react-native-barcode-scanner-google';
import { resumeScanner, pauseScanner } from 'react-native-barcode-scanner-google';
import * as qr_helper from '../../utils/QRHelper';

class FindUser extends Component {

  static navigatorStyle = {
    navBarTextColor: '#ffffff',
    navBarBackgroundColor: '#f15d44',
    navBarButtonColor: '#ffffff',
    navBarTextFontFamily: 'roboto_thin',
    topBarElevationShadowEnabled: false
  }

  constructor(props) {
    super(props);

    this._onChangeText        = this._onChangeText.bind(this);

    let dataSource = new ListView.DataSource({
      rowHasChanged : this._rowHasChanged.bind(this)
    });

    this.state = {
      dataSource :          dataSource,
      refreshing :          false,
      recipient_selected :  false,
      error:                false,

      search_type:          props.search_type

    };

    this.tid = undefined;
  }


  onChangeTab(i){
    if(i==2)
    {
      this.resumeScanner();
    }
  }

  _onBarcodeScanned(data, type){

    console.log(' **************************** BARCODE: ' + JSON.stringify(data) + ' ####### TYPE:'+ type);
    
    if(type=='QR_CODE')
    {
      pauseScanner()
        .then(() => {
            if(type=='QR_CODE')
            {
              // let jsonData = JSON.parse(data);
              let jsonData = qr_helper.expandJSONForQR(data)
              if (jsonData.type==config.QRSCAN_ACCOUNT_ONLY)
              {
                // send_confirm
                console.log(' ------------------------------- QRCode' , jsonData)
                this.props.navigator.push({
                  screen: 'wallet.SelectAmount',
                  title: 'Elija monto a enviar',
                  passProps: {recipient: [jsonData.account_name, jsonData.account_id] , pay_or_send:'send'}
                });
              }
              if (jsonData.type==config.QRSCAN_INVOICE_DISCOUNT)
              {
                // pay_confirm
                console.log(' ------------------------------- QRCode' , jsonData)
                this.props.navigator.push({
                  screen:     'wallet.InvoicePayConfirm',
                  title:      'Pagar',
                  passProps:  jsonData
                });
              }
            }
        })
        .catch(e => {
          ToastAndroid.show('Ha ocurrido un error scaneando el QR: ' + e, ToastAndroid.SHORT);    
          // setTimeout(
          //   this.doResumeScanner(),
          //   1000
          // );
        });
    }
  }

  doResumeScanner(){
    resumeScanner()
    .then(() => {
        // do something after the scanner (camera) stream was resumed.
    })
    .catch(e => {
        // Print error if scanner stream could not be resumed.
        ToastAndroid.show('Ha ocurrido un error scaneando el QR: ' + e, ToastAndroid.SHORT);
        console.log(e);
    });
  }

  _onChangeText(text) {
    clearTimeout(this.tid);
    let that = this;
    this.tid = setTimeout( () => {
      that.pedir(text);
    }
    , 300);
    //console.log(text);
  }

  _rowHasChanged(oldRow, newRow) {
    //console.log('rowHasChanged::', oldRow, '--->', newRow);
    //return true;
    return oldRow.id !== newRow.id;
  }

  componentWillMount() {
    this.setState({recipient_selected:false});
  }

  componentWillReceiveProps(nextProps) {
//     if (nextProps.users !== this.props.users) {
//       let data = nextProps.users;
//       //console.log('componentWillReceiveProps:', data);
//       this.setState({
//         dataSource: this.state.dataSource.cloneWithRows(data),
//         refreshing: false,
//       })
//     }
  }

  pedir(search) {
    console.log('Pedimos');
    this.setState({refreshing:true});
    walletActions.retrieveUsers(search, '1').then( (users) => {
      console.log('Traemos');
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(users['res']),
        refreshing: false,
        error:      false
      })

    }, (err) => {
      this.setState({refreshing:true});
      console.log('Error');
    })
  }

  componentDidMount() {
//     AppState.addEventListener('change', this.handleAppStateChange);
    this.pedir('');
  }

  componentWillUnmount() {
//     AppState.removeEventListener('change', this.handleAppStateChange);
  }

  focus() {
  }

  _onRecipientSelected(data){
//    if(this.state.recipient_selected)
//      return;

    //data.push(undefined);

    this.setState({recipient_selected:true});
    this.props.actions.memoSuccess('');
    this.props.navigator.push({
      screen: 'wallet.SelectAmount',
      title: 'Elija monto a enviar',
      passProps: {recipient: data, pay_or_send:'send'}
      // ,rightButtons: [
      //  {
      //    icon: iconsMap['ios-attach'],
      //    id: 'attachMemo'
      //  }
      // ]
    });

  }

  renderRow (rowData, sectionID) {

    return (
      <ListItem
        onPress={this._onRecipientSelected.bind(this, rowData)}
        underlayColor='#cccccc'
        key={sectionID}
        title={rowData[0]}
        titleStyle={styles.rowText}
        fontFamily={'roboto_thin'}
        hideChevron={true}
        chevronColor={'transparent'}
      />
    )
  }

  renderQRScanner(){

    return (<BarcodeScanner
              style={{ flex: 1 }}
              onBarcodeRead={({ data, type }) => {
                  this._onBarcodeScanned(data, type);
                  // console.log(
                  //     `##### '${type}' - '${data}'`
                  // );
              }}
              barcodeType={BarcodeType.QR_CODE }
            />);
  }

  render() {
    // console.log(this.state.dataSource);
    console.log(' -- SelectRecipient::render()');
    let content = undefined;
    if ( this.state.refreshing )
      content = (
        <View style={{ flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#0B5F83" />
        </View>
      )
    else
      content = (
        <List>
          <ListView
            renderRow={(rowData, sectionID) => <ListItem
                                      onPress={this._onRecipientSelected.bind(this, rowData)}
                                      underlayColor='#cccccc'
                                      key={sectionID}
                                      title={rowData[0]}
                                    />}
            dataSource={this.state.dataSource}
            enableEmptySections={true}
          />
        </List>
      )

    let finduser_content =  (

      <View style={styles.container}>
        <SearchBar
          lightTheme
          onChangeText={this._onChangeText}
          autoFocus={true}
          ref={(searchBar) => this.searchBar = searchBar}
          placeholder='Buscar comercio...'
          placeholderStyle={{}}
          inputStyle={{color:'#000000', textDecorationLine :'none'}}
          placeholderTextColor="#999999"
          underlineColorAndroid ="transparent"
        />
        {content}
      </View>
    );

    let qr_scanner_content  = this.renderQRScanner();

    return (
        <View style={{flex:1}}>
          <Tabs onChangeTab={(i, ref)=> this.onChangeTab(i)} tabBarPosition="bottom">
            <Tab style={{backgroundColor:'#ffffff'}} heading={ <TabHeading style={{backgroundColor:'#f15d44'}}><Icon style={{color:'#ffffff'}} name="camera" /></TabHeading>}>
              {qr_scanner_content}
            </Tab>
            <Tab heading={ <TabHeading style={{backgroundColor:'#f15d44'}}><Icon style={{color:'#ffffff'}} name="person" /></TabHeading>}>
              {finduser_content}
            </Tab>
            
          </Tabs>
        </View>
      );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    memo: state.wallet.memo
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(walletActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(FindUser);
