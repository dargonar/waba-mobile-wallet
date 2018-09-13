import React, { PropTypes, Component } from 'react';
import {
  Alert,
	Image,
  View,
  Text,
  ToastAndroid,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TextInput
} from 'react-native';

// import BarcodeScanner from 'react-native-barcodescanner';
import { Icon } from 'react-native-elements'
//import Icon from 'react-native-vector-icons/Ionicons';
//'react-native-elements'
// import styles from './styles/QRScanner';
import { connect } from 'react-redux';
import Keyboard from './components/Keyboard';
import * as config from '../../constants/config';
import { iconsMap } from '../../utils/AppIcons';
import HideWithKeyboard from 'react-native-hide-with-keyboard';

import BarcodeScanner from 'react-native-barcode-scanner-google';
import BarcodeType from 'react-native-barcode-scanner-google';
import { resumeScanner, pauseScanner } from 'react-native-barcode-scanner-google';
import * as qr_helper from '../../utils/QRHelper';

import Prompt from 'react-native-prompt';

class QRScanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  static navigatorStyle = {
    navBarTextColor: '#000',
    navBarBackgroundColor: 'transparent',
    navBarButtonColor: '#000',
		navBarTextFontFamily: 'Montserrat-Bold',
    drawUnderNavBar   : true,
    navBarTransparent : true,
    topBarElevationShadowEnabled: false
  }

  componentDidMount() {
    // let obj = {
    //   bill_amount : this.state.bill_amount,
    //   bill_id : this.state.bill_id,
    //   reward_rate : this.state.reward_rate,
    //   reward_dsc : this.state.reward_dsc,
    //   reward_ars : this.state.reward_ars,
    //   account_id: this.props.account.id,
    //   business_id: this.props.account.subaccount.business.account_id
    // }
    // this.setState( {text : JSON.stringify(obj)});

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
                return;
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
                return;
              }
            }
            this.doResumeScanner();
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


  render() {

    return (

      <View style={{ flex: 1 }}>
        <BarcodeScanner
              style={{ flex: 1 }}
              onBarcodeRead={({ data, type }) => {
                  this._onBarcodeScanned(data, type);
                  // console.log(
                  //     `##### '${type}' - '${data}'`
                  // );
              }}
              barcodeType={BarcodeType.QR_CODE }
            />

      </View>
    );
    //<KeyboardSpacer />
  }
}

function mapStateToProps(state, ownProps) {
	return {
		account: state.wallet.account,
    balance: state.wallet.balance
	};
}

export default connect(mapStateToProps, null)(QRScanner);
