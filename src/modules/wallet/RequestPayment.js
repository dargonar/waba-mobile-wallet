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
      <View style={{flex:0, flexDirection:'column', justifyContent: 'flex-end', alignItems:'flex-start', paddingLeft:20, paddingRight: 20}}>
        <Text style={{fontSize:12, color:'#666', marginBottom: 10, fontFamily : 'Montserrat-Medium', textAlign:'left', paddingLeft:54}} >
          Mostra tu QR para recibir Discoins
        </Text>
        <View style={styles.userView}>
          <View style={{flex:1, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
            {userIcon}
          </View>
          <View style={{flex:3, justifyContent: 'center', alignItems:'flex-start'}}>
            <Text style={{fontSize:18, fontFamily : 'Montserrat-Medium',marginTop: 19}} >
              {this.props.account.name}
            </Text>
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
        <View style={{justifyContent: 'center', alignItems: 'center', marginTop:20, marginBottom: 20}}>

          <QRCode
            value={qr_text}
            size={config.QRIMAGE_SIZE}
            />
        </View>
      );
  }


  renderReceiveRequest(userIcon){

    let obj = qr_helper.jsonForAccountOnly(this.props.account.id, this.props.account.name);
    if(!isNaN(this.state.amount_required) && parseInt(this.state.amount_required)>0)
      obj = qr_helper.jsonForAccountNAmount(this.props.account.id, this.props.account.name, this.state.amount_required);

    let text = JSON.stringify(obj);
    let qr_code = this._renderQRCode(text);
    let account_name  = this._renderAccountName(userIcon);
    let imgData = config.getRedDiscoinIcon();
    
    return  (
        <View style={[{backgroundColor:'#ffffff'}, styles.tab_content]}>

          {account_name}  
          {qr_code}
          <TouchableOpacity style={{width:300, flexDirection:'column', justifyContent: 'center', paddingLeft:10, paddingRight:10}} onPress={() => { this.showSetAmount() }}>
            <View flexDirection='row' style={{borderBottomWidth: 1, borderColor: '#eee'}}>
              <View style={{flex:1, justifyContent: 'flex-start', alignItems: 'center', flexDirection:'row'}}>
                <Image style={{width: 15, height: 15, marginRight:4 , resizeMode: Image.resizeMode.contain, borderWidth: 0}} source={{uri: imgData}}/>
                <Text style={[styles.amount, {textAlign:'center'}]}>{this.state.amount_required}</Text>
              </View>
              <View style={{flex:1, justifyContent: 'center', alignItems:'flex-end' }}>
                <Icon style={{color:'#666', fontSize:23}} name='create'/>
              </View>        
            </View>
            <Text style={{fontSize:10, color:'#999', marginTop : 10, fontFamily : 'Montserrat-Bold', textAlign:'right', paddingLeft:54}} >
              ESPECIFICAR CANTIDAD
            </Text>

          </TouchableOpacity>

          
        </View>
      );
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
  

}

function mapStateToProps(state, ownProps) {
	return {
		account: state.wallet.account,
    balance: state.wallet.balance
	};
}

export default connect(mapStateToProps, null)(RequestPayment);
