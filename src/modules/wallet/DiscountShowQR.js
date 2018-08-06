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
import { Icon } from 'react-native-elements'
//import Icon from 'react-native-vector-icons/Ionicons';
//'react-native-elements'
import styles from './styles/DiscountShowQR';
import { connect } from 'react-redux';
import Keyboard from './components/Keyboard';
import * as config from '../../constants/config';
import { iconsMap } from '../../utils/AppIcons';
import HideWithKeyboard from 'react-native-hide-with-keyboard';

import Prompt from 'react-native-prompt';

class DiscountShowQR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bill_amount:    props.bill_amount,
      bill_id:        props.bill_id,

      discount_rate:  props.discount_rate,
      discount_dsc:   props.discount_dsc,
      discount_ars:   props.discount_ars,

      text : ''
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
    let obj = {
      bill_amount : this.state.bill_amount,
      bill_id : this.state.bill_id,
      discount_rate : this.state.discount_rate,
      discount_dsc : this.state.discount_dsc,
      discount_ars : this.state.discount_ars,
      account_id: this.props.account.id,
      business_id: this.props.account.subaccount.business.account_id
    }
    this.setState( {text : JSON.stringify(obj)});

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

  render() {

    // if(this.state.identicon!=''){
			// var base64Icon = this.props.account.identicon;
      let base64Icon = config.getIdenticonForHash(this.props.account.identicon);
			userIcon = (<Image style={{width: 60, height: 60, resizeMode: Image.resizeMode.contain, borderWidth: 0}} source={{uri: base64Icon}}/>)
		// }

		//<Text style={styles.title}>Envío exitoso</Text>
    return (

      <View style={styles.container}>
        <ScrollView style={{paddingBottom:90}} contentContainerStyle={{ flexDirection:'column'}}>

          <View style={{height: 300, justifyContent: 'center', backgroundColor:'transparent'}}>
            <QRCode
              value={this.state.text}
              size={300}
              bgColor='black'
              fgColor='white'/>
          </View>

          <View style={{height:100, justifyContent: 'center', backgroundColor:'transparent'}}>
            <Text style={[styles.amount, {textAlign:'center'}]}>$ {this.state.discount_ars} + D$C {this.state.discount_dsc}</Text>
          </View>

          <View style={{height:150, backgroundColor:'transparent'}}>
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
          <View style={{flex:2, flexDirection:'row', justifyContent: 'flex-end', backgroundColor:'transparent'}}>
            <Icon
              raised
              containerStyle={{backgroundColor:'#f15d44', borderWidth: 0.5, borderColor: 'transparent' }}
              name='md-checkmark'
              type='ionicon'
              color='#ffffff'
              underlayColor='#415261'
              onPress={this._onOkPress.bind(this)}
              size={30} />
          </View>
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
