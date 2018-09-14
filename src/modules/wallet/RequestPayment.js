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
import styles from '../customer/styles/QRShowNScan';
import { connect } from 'react-redux';
import * as config from '../../constants/config';
import { iconsMap } from '../../utils/AppIcons';
import * as qr_helper from '../../utils/QRHelper';
import HideWithKeyboard from 'react-native-hide-with-keyboard';

import Prompt from 'react-native-prompt';

import {Icon } from 'native-base';
import { Button } from 'react-native-elements'

class RequestPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      
      amount_required:  props.amount_required || 0,

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
    let _value = Number(value).toFixed(2);
    this.setState({promptVisible:false, amount_required:_value.toString() }); //, activeTab: 1
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

  
  _renderAccountName(userIcon){
    return (
      <View style={{marginTop:10, backgroundColor:'#ffffff', height:70, flexDirection:'row', justifyContent: 'flex-end', alignItems:'center'}}>
        <View style={{flex:1, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
        {userIcon}
        </View>
        <View style={{flex:3, justifyContent: 'center', alignItems:'flex-start'}}>
          <Text style={{fontSize:20, fontFamily : 'Montserrat-SemiBold'}} >
            {this.props.account.name}
          </Text>
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
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <QRCode
            value={qr_text}
            size={config.QRIMAGE_SIZE}
            />
          <Text style={{fontSize:18, color:'#ff9e5d', marginTop: 20, fontFamily : 'Montserrat-SemiBold', textAlign:'center'}} >
            Mostra tu QR {"\n"}para recibir Discoins
          </Text>
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
    let imgData = config.getRedDiscoinIcon();
    
    return  (
        <View style={[{height:460,  backgroundColor:'#ffffff'}, styles.tab_content]}>
          {qr_code}
          {account_name}  
          <TouchableOpacity style={{marginTop:10, width:300, height:40, flexDirection:'row', justifyContent: 'center'}} onPress={() => { this.showSetAmount() }}>
            <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-start'}}>
              <Image style={{alignSelf:'flex-end', width: 15, height: 15, marginRight:4 , resizeMode: Image.resizeMode.contain, borderWidth: 0}} source={{uri: imgData}}/>
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
    
    let request_content     = this.renderReceiveRequest(userIcon);
    
    if (this.state.promptVisible)
      request_content = (<View style={{flex:1, backgroundColor:'#ffffff'}}>{this._renderPrompt()}</View>);

    return ( <View style={styles.container}>
        <ScrollView style={{paddingBottom:90}} contentContainerStyle={{ flexDirection:'column'}}>

          {request_content}

        </ScrollView>

      </View>)
        ;
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

export default connect(mapStateToProps, null)(RequestPayment);
