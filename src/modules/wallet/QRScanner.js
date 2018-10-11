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
  TouchableOpacity,
  TextInput
} from 'react-native';

import { Icon } from 'native-base';

import { connect } from 'react-redux';
import Keyboard from './components/Keyboard';
import * as config from '../../constants/config';
import { iconsMap } from '../../utils/AppIcons';
import HideWithKeyboard from 'react-native-hide-with-keyboard';

import BarcodeScanner from 'react-native-barcode-scanner-google';
import BarcodeType from 'react-native-barcode-scanner-google';
import { resumeScanner, pauseScanner } from 'react-native-barcode-scanner-google';
import * as qr_helper from '../../utils/QRHelper';

import styles from './styles/NewAccount';

import Prompt from 'react-native-prompt';

import Permissions from 'react-native-permissions'

class QRScanner extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      mode              : props.mode||'',
      reward_info       : props.reward_info||null,
      camera_permission : ''
    };

    this._requestPermission = this._requestPermission.bind(this);
  }

  // static navigatorStyle = {
  //   navBarTextColor: '#000',
  //   navBarBackgroundColor: 'transparent',
  //   navBarButtonColor: '#000',
		// navBarTextFontFamily: 'Montserrat-Bold',
  //   drawUnderNavBar   : true,
  //   navBarTransparent : true,
  //   topBarElevationShadowEnabled: false
  // }

  static navigatorStyle = {
    navBarButtonColor: '#000',
    navBarBackgroundColor: '#fff',
    topBarElevationShadowEnabled: false,
    navBarTextFontFamily: 'Montserrat-Regular'
  }

  componentDidMount() {
    this._requestPermission ();
  }

  // Request permission to access photos
  _requestPermission (){
    let that = this;
    
    Permissions.request('camera').then(response => {
      // Returns once the user has chosen to 'allow' or to 'not allow' access
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      // this.setState({ camera_permission: (response=='authorized'?true:false) })
      // ToastAndroid.show(response, ToastAndroid.LONG);
      that.setState({ camera_permission: response })
    }).catch(e => {
      // Print error if scanner stream could not be resumed.
      ToastAndroid.show('Ha ocurrido un error: ' + e, ToastAndroid.LONG);
      console.log(e);
    });
  }

  _alertForPermission() {
    Alert.alert(
      'Podemos acceder a tu cámara?',
      'Es para que peudas escanear códigos QR.',
      [
        {
          text: 'No quiero',
          onPress: () => console.log('Permission denied'),
          style: 'cancel',
        },
        this.state.camera_permission == 'undetermined'
          ? { text: 'OK', onPress: this._requestPermission }
          : { text: 'Configurar', onPress: Permissions.openSettings },
      ],
    )
  }

  _onBarcodeScanned(data, type){

    console.log(' **************************** BARCODE: ' + JSON.stringify(data) + ' ####### TYPE:'+ type);
    
    if(type=='QR_CODE')
    {
      pauseScanner()
        .then(() => {
            // ToastAndroid.show(type + ' :: ' + JSON.stringify(data), ToastAndroid.SHORT);
            // console.log(' **************************** BARCODE: ' + JSON.stringify(data) + ' ####### TYPE:'+ type);
            // BARCODE: "{\"account_id\":\"1.2.97\",\"account_name\":\"user1\",\"type\":\"account_only\"}" 
            // TYPE:QR_CODE
            if(type=='QR_CODE')
            {
              let jsonData = qr_helper.expandJSONForQR(data);

              console.log('--------------- QRScanner:')
              console.log('---------------------------------------- this.state.mode:', this.state.mode)
              console.log('---------------------------------------- jsonData.type:', jsonData.type)
              if(jsonData.type==config.QRSCAN_ACCOUNT_ONLY && this.state.mode==config.QRSCAN_FOR_REWARD)
              {
                this.props.navigator.push({
                  screen: 'wallet.RewardConfirm',
                  title: 'Confirmar recompensa',
                  passProps: {
                      recipient: [jsonData.account_name, jsonData.account_id],
                      ...this.state.reward_info
                  }

                });
                return;
              }
              if (jsonData.type==config.QRSCAN_ACCOUNT_ONLY && this.state.mode!=config.QRSCAN_FOR_REWARD)
              {
                // send_confirm
                console.log(' ------------------------------- QRCode' , jsonData)
                this.props.navigator.push({
                  screen: 'wallet.SelectAmount',
                  title: 'Cuánto quieres enviar?',
                  passProps: {recipient: [jsonData.account_name, jsonData.account_id] , pay_or_send:'send'}
                });
                return;
              }
              if (jsonData.type==config.QRSCAN_ACCOUNT_N_AMOUNT && this.state.mode!=config.QRSCAN_FOR_REWARD)
              {
                // send_confirm
                console.log(' ------------------------------- QRCode' , jsonData)
                this.props.navigator.push({
                  screen: 'customer.SendConfirmEx',
                  title: 'Confirmar envío',
                  passProps: {recipient: [jsonData.account_name, jsonData.account_id], amount:jsonData.amount_required, memo:''}
                });
                return;
              }
              if (jsonData.type==config.QRSCAN_INVOICE_DISCOUNT && this.state.mode!=config.QRSCAN_FOR_REWARD)
              {
                // pay_confirm
                console.log(' ------------------------------- QRCode' , jsonData)
                this.props.navigator.push({
                  screen:     'customer.InvoiceConfirm',
                  title:      'Pagar',
                  passProps:  jsonData
                });
                return;
              }

              setTimeout(
                this.doResumeScanner(),
                100
              );
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


  render() {

    if(this.state.camera_permission!='authorized')
    {
      return  (
        <View style={styles.container}>
          <View style={{padding: 20, flex:1, backgroundColor:'transparent', paddingLeft:30, paddingRight:30, alignItems:'center', flexDirection:'column', justifyContent:'center'}}>
            <View style={{}}>
              <Text style={[styles.title_part, {textAlign:'center'}]}>Para escanear códigos QR debe dar permiso de cámara a la aplicación.</Text>
            </View>
            <TouchableOpacity onPress={this._requestPermission}>
              <View style={styles.userRecipient} >
                <View style={{justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginRight: 10}}>
                <Icon name="ios-camera"  style={{color:'#fff', fontSize: 25}} />
                </View>
                <View style={{justifyContent: 'flex-start', alignItems:'flex-start' }}>
                  <Text style={styles.data_part} >
                    Permitir uso de cámara
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

          </View>
        </View>);
    }
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
