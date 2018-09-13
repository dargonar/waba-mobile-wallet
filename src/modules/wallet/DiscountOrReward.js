import React, { PropTypes, Component } from 'react';
import {
  Alert,
	View,
  Text,
  ToastAndroid,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TextInput
} from 'react-native';

import { Icon } from 'react-native-elements'
//import Icon from 'react-native-vector-icons/Ionicons';
//'react-native-elements'
import styles from './styles/DiscountOrReward';
import { connect } from 'react-redux';
import Keyboard from './components/Keyboard';
import * as config from '../../constants/config';
import { iconsMap } from '../../utils/AppIcons';
import HideWithKeyboard from 'react-native-hide-with-keyboard';

import Prompt from 'react-native-prompt';

class DiscountOrReward extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bill_amount:      '0',
      bill_id:          '',

      discount_rate:    '0',
      discount_dsc:     '0',
      discount_ars:     '0',

      reward_rate:      '0',
      reward_dsc:       '0',
      reward_ars:       '0',

      mode:             props.mode,
      percentage_error: '',
      promptVisible : false
    };

    this.default_state = {
      min_percentage : 20,
      max_percentage : 100
    }
    this.tid = undefined;
    this.updateBillAmount   = this.updateBillAmount.bind(this);
    this._onShowDiscountQR  = this._onShowDiscountQR.bind(this);
    this._onSendReward      = this._onSendReward.bind(this);

  }

  static navigatorStyle = {
    navBarTextColor: '#666', 
    navBarComponentAlignment: 'center',
    navBarBackgroundColor: '#ffffff',
    navBarButtonColor: '#000000',
    navBarTextFontFamily: 'Montserrat-Medium',
    topBarElevationShadowEnabled: false,
  }

  componentDidMount() {
    // Load discount
    if(!this.props.account || !this.props.account.subaccount || !this.props.account.subaccount.business)
    {
      console.log(' ----------- ERROR CANT LOAD SCHEDULE!!!!');
      return;
    }
    let today = config.getToday();
    let discount_rate = 0;
    let reward_rate = 0;
    console.log(' ACCOUNT->SUBACCOUNT->BUSINESS', JSON.stringify(this.props.account.subaccount.business));
    let discount_schedule = this.props.account.subaccount.business.discount_schedule;
    for (var i = 0; i < discount_schedule.length; i++){
      let schedule = discount_schedule[i];
      console.log(' --- Schedules LOOP', JSON.stringify(schedule));
      if(schedule['date']==today)
      {
        console.log(' ---------------------------------- DISCOUNT FOUND:', schedule['discount']);
        discount_rate = schedule['discount'];
        reward_rate = schedule['reward'];
        break;
      }
    }
    this.setState({discount_rate:discount_rate.toString(), reward_rate:reward_rate.toString()})
    console.log('**************', 'discount_rate:', discount_rate, 'reward_rate:', reward_rate);
  }

  _onShowDiscountQR(){
    if(isNaN(this.state.bill_amount) || parseInt(this.state.bill_amount)<=0) {
      ToastAndroid.show('Debe ingresar un monto total.', ToastAndroid.SHORT);
      return;
    }

    this.props.navigator.push({
        screen:     'wallet.DiscountShowQR',
        title:      'Cobrar con descuento',
        passProps:  {
          bill_amount:    this.state.bill_amount,
          bill_id:        this.state.bill_id,
          discount_rate:  this.state.discount_rate,
          discount_dsc:   this.state.discount_dsc,
          discount_ars:   this.state.discount_ars,
          type:           config.QRSCAN_INVOICE_DISCOUNT
        }
    });
    
  }
  
  _onSendReward(){
    if(isNaN(this.state.bill_amount) || parseInt(this.state.bill_amount)<=0) {
      ToastAndroid.show('Debe ingresar un monto total.', ToastAndroid.SHORT);
      return;
    }

    this.props.navigator.push({
        screen:     'wallet.RewardReceiptSelect',
        title:      'Elegir Cliente',
        passProps:  {
          bill_amount:    this.state.bill_amount,
          bill_id:        this.state.bill_id,
          reward_rate:    this.state.reward_rate,
          reward_dsc:     this.state.reward_dsc,
          reward_ars:     this.state.reward_ars,
        }
    });
  }

  showSetBillId(){
    this.setState({ promptVisible:true })
  }

  _onBillSet(value){
		this.setState({promptVisible:false, bill_id:value});
  }

  _renderPrompt(){
    if (!this.state.promptVisible)
      return null;
		let that = this;
    let inputProps = {textInputProps :{keyboardType:'default'}};
		let value = this.state.bill_id;
		// value = value.toString();
    return (
      <Prompt
        title="Ingrese Ticket o Factura"
        placeholder=""
        defaultValue={value}
        visible={ this.state.promptVisible }
        {...inputProps}
        onCancel={ () => this.setState({
          promptVisible: false
        }) }
        onSubmit={ (value) => that._onBillSet(value) }

      />
    );
  }



  updateBillAmount(value) {
    let bill_amount = parseInt(value) || 0;

    this.setState({ bill_amount: bill_amount.toString()  })
    if (bill_amount==0){
      this.setState({ bill_amount: bill_amount.toString(),
          discount_dsc:    '0',
          discount_ars:    '0',
          reward_dsc:      '0',
          reward_ars:      '0'  });
      return;
    }

    clearTimeout(this.tid);
		let that = this;
		this.tid = setTimeout( () => {
      let discount_dsc = Math.round(that.state.discount_rate * bill_amount / 100).toString();
      let reward_dsc   = Math.round(that.state.reward_rate * bill_amount / 100).toString();
      that.setState({
        bill_amount  : bill_amount.toString(),
        discount_dsc : discount_dsc,
        discount_ars : bill_amount - discount_dsc,
        reward_dsc   : reward_dsc,
        reward_ars   : bill_amount
      })
    }
		, 300);
  }
  
  
  _onNext(){
		if(Number(this.props.balance)<=Number(this.state.amount))
		{
			Alert.alert(
				'Fondos insuficientes',
				'No dispone de fondos suficientes para realizar la operación.',
				[
					{text: 'OK'},
				]
			)
			return;
		}

    this.props.navigator.push({
      screen: 'wallet.RewardConfirm',
      title: 'Confirmar recompensa',
      passProps: {
        recipient: 	  this.state.recipient,
				amount: 		  this.state.amount,
        bill_amount:  this.state.bill_amount,
        percentage:   this.state.percentage,
        recipient:    this.state.recipient,
        mode:         this.state.mode
			}
  	});
  }

	render() {
      const buttonColor = (this.state.mode=='reward')? styles.buttonReward: styles.buttonDiscount;
      const iconMoney = (<Icon name="logo-usd" type='ionicon' size={20} color="#9F9F9F" style={{alignSelf:'center', width:20}} />);
      const iconReceipt = (<Icon name="receipt" size={26} color="#9F9F9F" style={{alignSelf:'center'}} />);
      return (
          <View style={{flex: 1, backgroundColor:'#fff', flexDirection: 'column'}}>

            {this._renderPrompt()}

            <View style={{flex: 7, backgroundColor:'#fff', flexDirection: 'column'}}>

              <View style={{height: 100, flexDirection: 'row'}}>

                <View style={{flex: 6, flexDirection: 'column'}}>
                   <View style={{height: 20, flexDirection: 'row'}}>
                     <Text style={styles.hint}>
                       MONTO DE FACTURA
                     </Text>
                   </View>

                   <View style={styles.bill_amount}>
                      <TextInput
                         style={[styles.textInput, styles.textInputCenter]}
                         onChangeText={(text) => this.updateBillAmount(text)}
                         value={this.state.bill_amount}
                         keyboardType="numeric"
                         underlineColorAndroid ="transparent"
                       />
                   </View> 



                </View>
              </View>

              <View style={{height: 75, flexDirection: 'row'}}>
                <View style={{flex: 6, flexDirection: 'column', marginTop: 5}}>
                 <View style={{height: 20, flexDirection: 'row'}}>
                   <Text style={styles.hint}>
                     REFERENCIA (TICKET, FACTURA, OTRO)
                   </Text>
                 </View>
                  <TouchableHighlight style={styles.button_row} underlayColor={'#909090'} onPress={() => { this.showSetBillId() }}>
                    <Text style={[styles.textSimple2]}>{this.state.bill_id}</Text>
                   </TouchableHighlight>
                </View>
              </View>

              <View style={[{display:'flex', flexDirection: 'row', flex: 25}, styles.top_bordered]}>

                <View style={{flex: 1, flexDirection: 'column', paddingTop: 20}}>
                    <Text style={styles.hintInside}>
                      DESCUENTO
                    </Text>
                    <Text style={[styles.inputText, styles.textInputCenter, styles.discountRate]}>
                      {this.state.discount_rate} %
                    </Text>

                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingRight: 30, paddingLeft: 10}}>
                      <Text style={[styles.inputTextLeft]}>
                      $
                      </Text>
                      <Text style={[styles.inputText2]}>
                        {this.state.discount_ars}
                      </Text>
                    </View>
                    <Text style={styles.plusIcon}>
                      +
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingRight: 30, paddingLeft: 10}}>
                      <Text style={[styles.inputTextLeft]}>
                      D$C
                      </Text>
                      <Text style={[styles.inputText2]}>
                        {this.state.discount_dsc}
                      </Text>
                    </View>
                </View>

                <View style={{flex: 1, flexDirection: 'column', borderLeftColor: '#c0c0c0', borderLeftWidth: 0.75, paddingTop: 20}}>
                    <Text style={styles.hintInside}>
                      RECOMPENSA
                    </Text>
                    <Text style={[styles.inputText, styles.textInputCenter, styles.rewardRate]}>
                      {this.state.reward_rate} %
                    </Text>

                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingRight: 30, paddingLeft: 10}}>
                      <Text style={[styles.inputTextLeft]}>
                      $
                      </Text>
                      <Text style={[styles.inputText2]}>
                        {this.state.bill_amount}
                      </Text>
                    </View>
                    <Text style={styles.plusIcon}>
                      +
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingRight: 30, paddingLeft: 10}}>
                      <Text style={[styles.inputTextLeft]}>
                      D$C
                      </Text>
                      <Text style={[styles.inputText2]}>
                        {this.state.reward_dsc}
                      </Text>
                    </View>
                </View>
              </View>

            </View>

            <HideWithKeyboard>
        	  <View style={{alignSelf: 'flex-end', flexDirection:'row', alignItems:'stretch', justifyContent:'flex-end', height:70, backgroundColor: 'transparent'}}>
              <TouchableHighlight
                  style={[{flex:1, backgroundColor:'#3498db', elevation:10}, styles.buttonDiscount]}
                  onPress={this._onShowDiscountQR}>
                <Text style={styles.buttonDiscountText}>ACEPTAR DESCUENTO</Text>
              </TouchableHighlight>

              <TouchableHighlight
                  style={[{flex:1, backgroundColor:'#ff7233', elevation:10}, styles.buttonDiscount]}
                  onPress={this._onSendReward} >
                <Text style={styles.buttonDiscountText}>RECOMPENSAR</Text>
              </TouchableHighlight>
            </View>
            </HideWithKeyboard>
          </View>
      );
  }
}

function mapStateToProps(state, ownProps) {
	return {
		account: state.wallet.account,
    balance: state.wallet.balance
	};
}

export default connect(mapStateToProps, null)(DiscountOrReward);
