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

//import QRCode from 'react-native-qrcode';
import QRCode from 'react-native-qrcode-svg';
// import { Icon } from 'react-native-elements'
//import Icon from 'react-native-vector-icons/Ionicons';
//'react-native-elements'
import styles from './styles/QRShowNScan';
import { connect } from 'react-redux';
import * as config from '../../constants/config';
import { iconsMap } from '../../utils/AppIcons';
import * as qr_helper from '../../utils/QRHelper';
import HideWithKeyboard from 'react-native-hide-with-keyboard';

import Prompt from 'react-native-prompt';

import {Header, Tab, Tabs, TabHeading, Icon } from 'native-base';
import { Button } from 'react-native-elements'

// import BarcodeScanner from 'react-native-barcode-scanner-google';
// import BarcodeType from 'react-native-barcode-scanner-google';
import BarcodeScanner, {
    Exception,
    FocusMode,
    TorchMode,
    CameraFillMode,
    BarcodeType,
    pauseScanner,
    resumeScanner
} from 'react-native-barcode-scanner-google';
// import { resumeScanner, pauseScanner } from 'react-native-barcode-scanner-google';

import FacebookTabBar from './FacebookTabBar';
import ScrollableTabView from 'react-native-scrollable-tab-view';


class QRShowNScan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      bill_amount:      props.bill_amount,
      bill_id:          props.bill_id,

      discount_rate:    props.discount_rate,
      discount_dsc:     props.discount_dsc,
      discount_ars:     props.discount_ars,

      amount_required:  props.amount_required || 0,

      text :            '',

      type :            props.type,
      promptVisible :   false,
      activeTab:        0
    };

  }

  static navigatorStyle = {
    navBarTextColor: '#000',
    navBarBackgroundColor: '#FFFFFF',
    navBarButtonColor: '#666',
		navBarTextFontFamily: 'Montserrat-Regular',
    topBarElevationShadowEnabled: false
  }

  componentDidMount() {
    // setTimeout(this._tabs.goToPage.bind(this._tabs,1))
  }

  showSetAmount(){
    this.setState({ promptVisible:true })
  }

  _onAmountSet(value){
    this.setState({promptVisible:false, amount_required:value }); //, activeTab: 1
    // this._tabs.goToPage.bind(this._tabs,1)
  }

  onChangeTab(obj, that){
    console.log(' ------------- onChangeTab(i)', obj.i);
    if(obj.i==2)
    {
      this.doResumeScanner();
    }
  }
  _renderPrompt(){
    
    let that = this;
    // let inputProps = {textInputProps :{keyboardType:'default'}};
    let inputProps = {textInputProps :{keyboardType:'numeric'}}; 
    let value = 0;
    if(!isNaN(this.state.amount_required))
      value = Number(this.state.amount_required);
    return (
      <Prompt
        title="Ingrese monto a solicitar"
        placeholder=""
        defaultValue={value.toString()}
        visible={ this.state.promptVisible }
        {...inputProps}
        onCancel={ () => {
            this.setState({promptVisible: false});
            // this._tabs.goToPage.bind(this._tabs,1)
          } 
        }
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

              if (jsonData.type==config.QRSCAN_ACCOUNT_ONLY)
              {
                // send_confirm
                console.log(' ------------------------------- QRCode' , jsonData)
                this.props.navigator.push({
                  screen: 'customer.SendAmount',
                  title: 'Elija monto',
                  passProps: {recipient: [jsonData.account_name, jsonData.account_id] , pay_or_send:'send'}
                });
                return;
              }
              if (jsonData.type==config.QRSCAN_ACCOUNT_N_AMOUNT)
              {
                // send_confirm
                console.log(' ------------------------------- QRCode' , jsonData)
                this.props.navigator.push({
                  screen: 'customer.SendConfirmEx',
                  title: 'Elija monto',
                  passProps: {recipient: [jsonData.account_name, jsonData.account_id], amount:jsonData.amount_required, memo:''}
                });
                return;
              }
              if (jsonData.type==config.QRSCAN_INVOICE_DISCOUNT)
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
    /*
    bgColor='black'
    fgColor='white'
    */
    return (
        <View style={{justifyContent: 'center', backgroundColor:'transparent'}}>
          <QRCode
            value={qr_text}
            size={config.QRIMAGE_SIZE}
            />
        </View>
      );
  }

  _renderAccountName(userIcon){
    return (
      <View style={{marginTop:10, backgroundColor:'#ffffff', height:70, flexDirection:'row', justifyContent: 'center'}}>
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
    
    // let obj = {
    //     account_id:   this.props.account.id,
    //     account_name: this.props.account.name,
    //     type:         config.QRSCAN_ACCOUNT_ONLY
    // }
    let obj = qr_helper.jsonForAccountOnly(this.props.account.id, this.props.account.name);

    let text          = JSON.stringify(obj);
    let qr_code       = this._renderQRCode(text);
    let account_name  = this._renderAccountName(userIcon);

    return (
      <View style={[{height:390,  backgroundColor:'#ffffff'}, styles.tab_content]}>
        {qr_code}
        {account_name}
      </View>
    );
  }

  renderReceiveRequest(userIcon){

    // let obj = {
    //   account_id:   this.props.account.id,
    //   account_name: this.props.account.name,
    //   amount:       this.state.amount_required,
    //   type:         config.QRSCAN_ACCOUNT_N_AMOUNT
    // }
    let obj = qr_helper.jsonForAccountNAmount(this.props.account.id, this.props.account.name, this.state.amount_required);

    let text = JSON.stringify(obj);
    let qr_code = this._renderQRCode(text);
    let account_name  = this._renderAccountName(userIcon);

    
    return  (
        <View style={[{height:460,  backgroundColor:'#ffffff'}, styles.tab_content]}>
          {qr_code}
          {account_name}  
          <TouchableOpacity style={{marginTop:10, width:300, height:40, flexDirection:'row', justifyContent: 'center'}} onPress={() => { this.showSetAmount() }}>
            <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-start'}}>
              <Text style={[styles.amount_title, {textAlign:'center'}]}>D$C</Text>
            </View>
            <View style={{flex:2, justifyContent: 'center', alignItems:'flex-start' }}>
              <Text style={[styles.amount, {textAlign:'center'}]}>{this.state.amount_required}</Text>
            </View>
            <View style={{flex:1, justifyContent: 'center', alignItems:'flex-end' }}>
              <Icon
                  name='create'
                  color='#517fa4'
                  containerStyle={{backgroundColor:'#f15d44'}}
                />
                
            </View>
          </TouchableOpacity>

          
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
              cameraFillMode={
                  CameraFillMode.COVER /* could also be FIT */
              }
            />);
  }

  render(){

    let base64Icon = config.getIdenticonForHash(this.props.account.identicon);
    let userIcon = (<Image style={{width: 60, height: 60, resizeMode: Image.resizeMode.contain, borderWidth: 0}} source={{uri: base64Icon}}/>)
    
    let person_content      = this.renderAccount(userIcon); 
    let request_content     = this.renderReceiveRequest(userIcon);
    let qr_scanner_content  = this.renderQRScanner();

    if (this.state.promptVisible)
      request_content = (<View style={{flex:1, backgroundColor:'#ffffff'}}>{this._renderPrompt()}</View>);

    return <ScrollableTabView
        style={{backgroundColor:'#ffffff'}}
        initialPage={0}
        tabBarPosition="bottom"
        tabBarBackgroundColor="#1abc9c"
        tabBarActiveTextColor="#ffffff"
        renderTabBar={() => <FacebookTabBar />}
      >
        <ScrollView tabLabel="ios-person" style={styles.tabView}>
          <View style={styles.card}>
            {person_content}
          </View>
        </ScrollView>
        <ScrollView tabLabel="ios-cash" style={styles.tabView}>
          <View style={styles.card}>
            {request_content}
          </View>
        </ScrollView>
        <ScrollView tabLabel="ios-camera" style={styles.tabView} contentContainerStyle={{ flex:1}}>
          <View style={styles.card}>
            {qr_scanner_content}
          </View>
        </ScrollView>
      </ScrollableTabView>;
  }
  
  renderXXXX(){
    let base64Icon = config.getIdenticonForHash(this.props.account.identicon);
    let userIcon = (<Image style={{width: 60, height: 60, resizeMode: Image.resizeMode.contain, borderWidth: 0}} source={{uri: base64Icon}}/>)
    
    if(this.state.type==config.QRSCAN_INVOICE_DISCOUNT){
      return this.renderX(userIcon);
    }

    let request_content     = this.renderReceiveRequest(userIcon);
    let person_content      = this.renderAccount(userIcon); 
    let qr_scanner_content  = this.renderQRScanner();

    if (this.state.promptVisible)
      return (<View style={{flex:1, backgroundColor:'#ffffff'}}>{this._renderPrompt()}</View>);

    return (
        <View style={{flex:1}}>
          <Tabs ref={ t=>this._tabs = t }  onChangeTab={(i, ref, from)=> this.onChangeTab(i, this)} tabBarPosition="bottom" page={this.state.activeTab}>
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

export default connect(mapStateToProps, null)(QRShowNScan);
