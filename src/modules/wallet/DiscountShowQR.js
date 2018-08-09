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

import QRCode from 'react-native-qrcode';
// import { Icon } from 'react-native-elements'
//import Icon from 'react-native-vector-icons/Ionicons';
//'react-native-elements'
import styles from './styles/DiscountShowQR';
import { connect } from 'react-redux';
import Keyboard from './components/Keyboard';
import * as config from '../../constants/config';
import { iconsMap } from '../../utils/AppIcons';
import HideWithKeyboard from 'react-native-hide-with-keyboard';

import Prompt from 'react-native-prompt';

import {Header, Tab, Tabs, TabHeading, Icon } from 'native-base';
import { Button } from 'react-native-elements'

// import { BarcodeType, FocusMode, TorchMode, CameraFillMode } from 'react-native-barcode-scanner-google';
import BarcodeScanner from 'react-native-barcode-scanner-google';
import BarcodeType from 'react-native-barcode-scanner-google';
import { resumeScanner, pauseScanner } from 'react-native-barcode-scanner-google';

class DiscountShowQR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      bill_amount:    props.bill_amount,
      bill_id:        props.bill_id,

      discount_rate:  props.discount_rate,
      discount_dsc:   props.discount_dsc,
      discount_ars:   props.discount_ars,

      amount_dsc:     props.amount_dsc || 0,

      text :          '',

      type :          props.type,
      promptVisible : false,
      activeTab:0
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
    // let obj = {};
    // if(this.state.type==config.QRSCAN_NAME_ONLY)
    //   obj = {
    //     account_id:   this.props.account.id,
    //     account_name: this.props.account.name,
    //   }
    // else
    //   if(this.state.type==config.QRSCAN_NAME_AND_AMOUNT) 
    //     obj = {
    //       account_id:   this.props.account.id,
    //       account_name: this.props.account.name,
    //       amount_dsc:   this.state.amount_dsc
    //     }
    //     else
    //       obj = {
    //         bill_amount : this.state.bill_amount,
    //         bill_id : this.state.bill_id,
    //         discount_rate : this.state.discount_rate,
    //         discount_dsc : this.state.discount_dsc,
    //         discount_ars : this.state.discount_ars,
    //         account_id: this.props.account.id,
    //         business_id: this.props.account.subaccount.business.account_id
    //       }
    // this.setState( {text : JSON.stringify(obj)});

  }

  showSetAmount(){
    this.setState({ promptVisible:true })
  }

  _onAmountSet(value){
    this.setState({promptVisible:false, amount_dsc:value, activeTab: 1 });
  }

  _renderPrompt(){
    if (!this.state.promptVisible)
      return null;
    let that = this;
    // let inputProps = {textInputProps :{keyboardType:'default'}};
    let inputProps = {textInputProps :{keyboardType:'numeric'}}; 
    let value = this.state.amount_dsc || 0;
    return (
      <Prompt
        title="Ingrese monto a solicitar"
        placeholder=""
        defaultValue={value.toString()}
        visible={ this.state.promptVisible }
        {...inputProps}
        onCancel={ () => this.setState({
          promptVisible: false
        }) }
        onSubmit={ (value) => that._onAmountSet(value) }

      />
    );
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

  _onBarcodeScanned(data, type){
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
              let jsonData = JSON.parse(data);
              if (jsonData.type==config.QRSCAN_NAME_AND_AMOUNT)
              {
                // send_confirm
              }
              if (jsonData.type==config.QRSCAN_INVOICE_DISCOUNT)
              {
                // pay_confirm
              }
              
            }
        })
        .catch(e => {
          ToastAndroid.show('Ha ocurrido un error scaneando el QR: ' + e, ToastAndroid.SHORT);    
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
  
  renderBusinessBill(userIcon){
    let obj = {
        bill_amount :   this.state.bill_amount,
        bill_id :       this.state.bill_id,
        discount_rate : this.state.discount_rate,
        discount_dsc :  this.state.discount_dsc,
        discount_ars :  this.state.discount_ars,
        account_id:     this.props.account.id,
        business_id:    this.props.account.subaccount.business.account_id,
        type:           config.QRSCAN_INVOICE_DISCOUNT
    }
    let text = JSON.stringify(obj);
    let qr_code = this._renderQRCode(text);
    return  (
          <View style={{height:550}}>
            {qr_code}
            <View style={{height:100, justifyContent: 'center', backgroundColor:'#ffffff'}}>
              <Text style={[styles.amount, {textAlign:'center'}]}>$ {this.state.discount_ars} + D$C {this.state.discount_dsc}</Text>
            </View>

            <View style={{height:70, backgroundColor:'#ffffff'}}>
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

    return (
        <View style={{height: 300, justifyContent: 'center', backgroundColor:'#ffffff'}}>
          <QRCode
            value={qr_text}
            size={300}
            bgColor='black'
            fgColor='white'/>
        </View>
      );
  }

  _renderAccountName(userIcon){
    return (
      <View style={{marginTop:10, backgroundColor:'#ffffff', width:300, height:70, flexDirection:'row', justifyContent: 'center'}}>
        <View style={{flex:1, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
        {userIcon}
        </View>
        <View style={{flex:3, justifyContent: 'center', alignItems:'flex-start' }}>
          <Text style={{fontSize:25}} >
            {this.props.account.name}
          </Text>
        </View>
      </View>
    );
  }

  renderAccount(userIcon){
    
    let obj = {
        account_id:   this.props.account.id,
        account_name: this.props.account.name,
        type:         'account_only'
    }

    let text          = JSON.stringify(obj);
    let qr_code       = this._renderQRCode(text);
    let account_name  = this._renderAccountName(userIcon);

    return (
      <View style={[{height:370,  backgroundColor:'#ffffff'}, styles.tab_content]}>
        {qr_code}
        {account_name}
      </View>
    );
  }

  renderReceiveRequest(userIcon){

    let obj = {
      account_id:   this.props.account.id,
      account_name: this.props.account.name,
      amount_dsc:   this.state.amount_dsc,
      type:         'account_amount'
    }
    let text = JSON.stringify(obj);
    let qr_code = this._renderQRCode(text);
    let account_name  = this._renderAccountName(userIcon);

    /*
    <View style={{height:160}}>
            <View style={{height:50, justifyContent: 'center', backgroundColor:'#ffffff', marginTop:10}}>
              <Text style={[styles.amount, {textAlign:'center'}]}>D$C {this.state.amount_dsc}</Text>
            </View>
            {account_name}
          </View>
    */
    return  (
        <View style={[{height:460,  backgroundColor:'#ffffff'}, styles.tab_content]}>
          {qr_code}
          {account_name}  
          <View style={{marginTop:10, width:300, height:40, flexDirection:'row', justifyContent: 'center'}}>
            <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-start'}}>
              <Text style={[styles.amount_title, {textAlign:'center'}]}>D$C</Text>
            </View>
            <View style={{flex:2, justifyContent: 'center', alignItems:'flex-start' }}>
              <Text style={[styles.amount, {textAlign:'center'}]}>{this.state.amount_dsc}</Text>
            </View>
            <View style={{flex:1, justifyContent: 'center', alignItems:'flex-end' }}>
              <Button
                title='...'
                borderRadius={4}
                backgroundColor={'#1abc9c'}
                onPress={() => { this.showSetAmount() }}
                 />
            </View>
          </View>

          
        </View>
      );
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

  render(){

    let base64Icon = config.getIdenticonForHash(this.props.account.identicon);
    let userIcon = (<Image style={{width: 60, height: 60, resizeMode: Image.resizeMode.contain, borderWidth: 0}} source={{uri: base64Icon}}/>)
    
    if(this.state.type==config.QRSCAN_INVOICE_DISCOUNT){
      return this.renderX(userIcon);
      
    }

    let request_content     = this.renderReceiveRequest(userIcon);
    let person_content      = this.renderAccount(userIcon); 
    let qr_scanner_content  = this.renderQRScanner();

    return (
        <View style={{flex:1}}>
          {this._renderPrompt()}
          <Tabs tabBarPosition="bottom" page={this.state.activeTab}>
            <Tab heading={ <TabHeading style={{backgroundColor:'#1abc9c'}}><Icon style={{color:'#ffffff'}} name="person" /></TabHeading>}>
              {person_content}
            </Tab>
            <Tab heading={ <TabHeading style={{backgroundColor:'#1abc9c'}}><Icon style={{color:'#ffffff'}} name="cash" /></TabHeading>}>
              {request_content}
            </Tab>
            <Tab style={{backgroundColor:'#ffffff'}} heading={ <TabHeading style={{backgroundColor:'#1abc9c'}}><Icon style={{color:'#ffffff'}} name="camera" /></TabHeading>}>
              {qr_scanner_content}
            </Tab>
          </Tabs>
        </View>
      );
  }
  

  renderX(userIcon) {

    let content = this.renderBusinessBill(userIcon);
    /*
    <View style={{height:80, flexDirection:'row', justifyContent: 'flex-end', backgroundColor:'#ffffff'}}>
            <Icon
              raised
              containerStyle={{backgroundColor:'#f15d44', borderWidth: 0.5, borderColor: '#ffffff' }}
              name='md-checkmark'
              type='ionicon'
              color='#ffffff'
              underlayColor='#415261'
              onPress={this._onOkPress.bind(this)}
              size={30} />
          </View>
          */    
    return (

      <View style={styles.container}>
        <ScrollView style={{paddingBottom:90}} contentContainerStyle={{ flexDirection:'column'}}>

          {content}

        </ScrollView>

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

export default connect(mapStateToProps, null)(DiscountShowQR);
