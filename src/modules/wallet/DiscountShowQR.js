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

// import QRCode from 'react-native-qrcode';
import QRCode from 'react-native-qrcode-svg';

import { Icon } from 'react-native-elements'
import styles from './styles/DiscountShowQR';
import { connect } from 'react-redux';
import Keyboard from './components/Keyboard';
import * as config from '../../constants/config';
import * as qr_helper from '../../utils/QRHelper';
import { iconsMap } from '../../utils/AppIcons';
import HideWithKeyboard from 'react-native-hide-with-keyboard';


import Prompt from 'react-native-prompt';

// import {Header, Tab, Tabs, TabHeading, Icon } from 'native-base';
// import { Button } from 'react-native-elements'

// import BarcodeScanner from 'react-native-barcode-scanner-google';
// import BarcodeType from 'react-native-barcode-scanner-google';
// import { resumeScanner, pauseScanner } from 'react-native-barcode-scanner-google';

class DiscountShowQR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      bill_amount     : props.bill_amount,
      bill_id         : props.bill_id,

      discount_rate   : props.discount_rate,
      discount_dsc    : props.discount_dsc,
      discount_ars    : props.discount_ars,

      amount_dsc      : props.amount_dsc || 0,

      text            : '',
      type            : props.type,
      promptVisible   : false,
      activeTab       :0,
      can_pop_to_root : false
    };

  }

  static navigatorStyle = {
    navBarTextColor: '#ffffff',
    navBarBackgroundColor: '#0A566B',
    navBarButtonColor: '#ffffff',
		navBarTextFontFamily: 'roboto_thin',
    topBarElevationShadowEnabled: false
  }

  componentDidMount() {
  }

  _onOkPress(){
    this.props.navigator.popToRoot({
      animated: true
    });
  }


  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.type==!config.QRSCAN_INVOICE_DISCOUNT){
      return;
    }

    let new_state = {};
    if (nextProps.new_tx !== this.props.new_tx) {
      console.log('componentWillReceiveProps: new new_tx =>', JSON.stringify(nextProps.new_tx));
      ToastAndroid.show(nextProps.new_tx.message, ToastAndroid.LONG);
      this.setState({can_pop_to_root:true});
      // let that = this;
      // setTimeout( that.props.navigator.popToRoot({animated: true }) , 1000); 
    }
  }



  componentWillUnmount() {
  }

  focus() {
  }

  renderBusinessBill(userIcon){
    // let obj = {
    //     bill_amount :   this.state.bill_amount,
    //     bill_id :       this.state.bill_id,
    //     discount_rate : this.state.discount_rate,
    //     discount_dsc :  this.state.discount_dsc,
    //     discount_ars :  this.state.discount_ars,
    //     account_id:     this.props.account.id,
    //     account_name:   this.props.account.name,
    //     business_id:    this.props.account.subaccount.business.account_id,
    //     business_name:  this.props.account.subaccount.business.name,
    //     type:           config.QRSCAN_INVOICE_DISCOUNT
    // }
    let obj = qr_helper.jsonForInvoice(this.state.bill_amount, this.state.bill_id, this.state.discount_rate, this.state.discount_dsc, this.state.discount_ars, this.props.account.id, this.props.account.name, this.props.account.subaccount.business.account_id, this.props.account.subaccount.business.name)
    
    console.log(' -------- INVOICE or REWARD', JSON.stringify(obj));

    let text = JSON.stringify(obj);
    let qr_code = this._renderQRCode(text);
    return  (
          <View style={{height:440}}>
            {qr_code}
            
            {/*<View style={{height:100, justifyContent: 'center', backgroundColor:'#ffffff'}}>
                          <Text style={[styles.amount, {textAlign:'center'}]}>$ {this.state.discount_ars} + D$C {this.state.discount_dsc}</Text>
                        </View>*/}
            
            <View style={{height:70, backgroundColor:'#ffff'}}>
              <View style={{flex:1, flexDirection:'row', justifyContent: 'center'}}>
                <View style={{flex:1, justifyContent: 'center', alignItems:'flex-end'}}>
                  <Text style={styles.discoin_amount_w}>D$C {this.state.discount_dsc}</Text>
                </View>

                <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-start'}}>
                  <Text style={styles.discoin_amount_g}>+ $ {this.state.discount_ars}</Text>
                </View>
              </View>
            </View>


            <View style={{height:60, backgroundColor:'#ffffff'}}>
              <View style={{flex:1, flexDirection:'row', justifyContent: 'center'}}>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                {userIcon}
                </View>
                <View style={{flex:3, justifyContent: 'center', alignItems:'flex-start' }}>
                  <Text style={{fontSize:25}} >
                    {this.props.account.name}
                  </Text>
                  <Text style={styles.subaccountText} >
                      Comercio: {this.props.account.subaccount.business.name}
                    </Text>
                </View>
              </View>
            </View>
          </View>
      );
  }

  _renderQRCode(qr_text){

    /*
      bgColor='black'
      fgColor='white'
    */
    return (
        <View style={{height: 300, justifyContent: 'center', alignSelf:'center',  backgroundColor:'#ffffff'}}>
          <QRCode
            value={qr_text}
            size={config.QRIMAGE_SIZE}
            
            />
        </View>
      );
  }

  render(){

    let base64Icon = config.getIdenticonForHash(this.props.account.identicon);
    let userIcon = (<Image style={{width: 60, height: 60, resizeMode: Image.resizeMode.contain, borderWidth: 0}} source={{uri: base64Icon}}/>)
    let content = this.renderBusinessBill(userIcon);
    let button = false;
    if(this.state.can_pop_to_root){
      button = (
        <View style={{height:90, flexDirection:'row', justifyContent: 'flex-end', backgroundColor:'#ffffff'}}>
          <Icon
            raised
            containerStyle={{backgroundColor:'#0A566B' }}
            name='md-checkmark'
            type='ionicon'
            color='#ffffff'
            underlayColor='#415261'
            onPress={this._onOkPress.bind(this)}
            size={30} />
        </View>);
    }

    return (

      <View style={styles.container}>
        <ScrollView  contentContainerStyle={{ paddingTop:20, paddingLeft:20, paddingRight:20, flexDirection:'column'}}>

          {content}
          {button}

        </ScrollView>

      </View>
    );
    
  }
}

function mapStateToProps(state, ownProps) {
	return {
		account: state.wallet.account,
    balance: state.wallet.balance,
    new_tx : state.wallet.new_tx
	};
}

export default connect(mapStateToProps, null)(DiscountShowQR);
