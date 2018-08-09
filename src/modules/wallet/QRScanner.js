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
// import { BarcodeType, FocusMode, TorchMode, CameraFillMode } from 'react-native-barcode-scanner-google';
import BarcodeType from 'react-native-barcode-scanner-google';
import Prompt from 'react-native-prompt';

class QRScanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bill_amount:    props.bill_amount,
      bill_id:        props.bill_id,

      discount_rate:  props.discount_rate,
      discount_dsc:   props.discount_dsc,
      discount_ars:   props.discount_ars,

      torchMode: 'off',
      cameraType: 'back',

    };

  }

  static navigatorStyle = {
    navBarTextColor: '#ffffff',
    navBarBackgroundColor: '#1abc9c',
    navBarButtonColor: '#ffffff',
		navBarTextFontFamily: 'roboto_thin',
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

  _onOkPress(){
    this.props.navigator.popToRoot({
      animated: true
    });
  }


  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillUnmount() {
  }

  focus() {
  }

  barcodeReceived(e) {
    console.log('Barcode: ' + e.data);
    console.log('Type: ' + e.type);
  }


  render() {

    //<Text style={styles.title}>Envío exitoso</Text>
    // <BarcodeScanner
    //     onBarCodeRead={this.barcodeReceived}
    //     style={{ flex: 1 }}
    //     torchMode={this.state.torchMode}
    //     cameraType={this.state.cameraType}
    //   />
    /*
    onException={exceptionKey => {
                        // check instructions on Github for a more detailed overview of these exceptions.
                        switch (exceptionKey) {
                            case Exception.NO_PLAY_SERVICES:
                            // tell the user they need to update Google Play Services
                              ToastAndroid.show('tell the user they need to update Google Play Services', ToastAndroid.SHORT)
                            
                            case Exception.LOW_STORAGE:
                            // tell the user their device doesn't have enough storage to fit the barcode scanning magic
                              ToastAndroid.show('tell the user their device doesnt have enough storage to fit the barcode scanning magic', ToastAndroid.SHORT)
                            case Exception.NOT_OPERATIONAL:
                            // Google's barcode magic is being downloaded, but is not yet operational.
                              ToastAndroid.show('Googles barcode magic is being downloaded, but is not yet operational.', ToastAndroid.SHORT)
                            default:
                                break;
                        }
                    }}
                    focusMode={FocusMode.AUTO }
                    torchMode={TorchMode.ON }
                    cameraFillMode={CameraFillMode.COVER }
                    barcodeType={BarcodeType.QR_CODE }
                    */
    return (

      <View style={{ flex: 1 }}>
        <BarcodeScanner
                    style={{ flex: 1 }}
                    onBarcodeRead={({ data, type }) => {
                        // handle your scanned barcodes here!
                        // as an example, we show an alert:
                        console.log(
                            `Barcode '${data}' of type '${type}' was scanned.`
                        );
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
