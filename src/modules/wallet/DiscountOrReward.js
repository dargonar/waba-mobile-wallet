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
      bill_id:          '1114',
      // percentage:       '10',

      discount_rate:    '0',
      discount_dsc:    '0',
      discount_ars:    '0',

      reward_rate:      '0',
      reward_dsc:    '0',
      reward_ars:    '0',

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
    navBarTextColor: '#ffffff',
    navBarBackgroundColor: '#1abc9c',
    navBarButtonColor: '#ffffff',
		navBarTextFontFamily: 'roboto_thin',
    topBarElevationShadowEnabled: false
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
    if(isNaN(this.state.bill_amount) || parseInt(this.state.bill_amount)<0) {
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
        }
    });
  }
  _onSendReward(){
    if(isNaN(this.state.bill_amount) || parseInt(this.state.bill_amount)<0) {
      ToastAndroid.show('Debe ingresar un monto total.', ToastAndroid.SHORT);
      return;
    }
    this.props.navigator.push({
        // screen:     'wallet.QRScanner',
        screen:     'wallet.RewardReceiptSelect',
        title:      'Elegir Usuario',
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
		// if(!value || isNaN(value))
		// {
		// 	return;
		// }
    // let _endorsements = this.state.endorsements;
		// if(_endorsements[this.state.current_idx].remaining<Number(value)){
		// 	ToastAndroid.show('No dispone de suficiente(s) avale(s).', ToastAndroid.SHORT);
		// 	return;
		// }
    // _endorsements[this.state.current_idx].quantity = parseInt(value);
    // this.setState({endorsements:_endorsements, promptVisible:false});
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


  // percentageInValue(){
  //   console.log('percentageInValue()', 'perc:', this.state.percentage , 'min_perc:', this.default_state.min_percentage, 'max_perc:', this.default_state.max_percentage)
  //   return !isNaN(this.state.percentage) && (parseInt(this.state.percentage)>=this.default_state.min_percentage) && (parseInt(this.state.percentage)<this.default_state.max_percentage);
  // }

  // ROJITO #F35B42
  // azulcito #365E97

  // canCalculate(){
  //   let ret = !(isNaN(this.state.discount_rate)||isNaN(this.state.reward_rate)||isNaN(this.state.amount)||isNaN(this.state.bill_amount));
  //   if(ret)
  //     ret = ret &&  this.percentageInValue() && parseInt(this.state.bill_amount)>0;
  //   if(!this.percentageInValue())
  //   {
  //     console.log('El porcenteaje mínimo es de '+this.default_state.min_percentage+'% y el maximo de 100%');
  //     ToastAndroid.show('El porcenteaje mínimo es de '+this.default_state.min_percentage+'% y el maximo de 100%', ToastAndroid.SHORT);
  //     return;
  //   }
  //   console.log(' -- canCalculate():', ret, ' %:', this.state.percentage, ' DSC:', this.state.amount,' $:', this.state.bill_amount );
  //   return ret;
  //
  // }

  // updatePercentage(value) {
  //   let percentage = parseInt(value) || 0;
  //   this.setState({ percentage: percentage.toString()  })
  //
  //   clearTimeout(this.tid);
	// 	let that = this;
	// 	this.tid = setTimeout( () => {
  //     if(!that.canCalculate())
  //     {
  //       return;
  //     }
  //     if(!that.percentageInValue())
  //     {
  //       ToastAndroid.show('El porcenteaje mínimo es de '+that.default_state.min_percentage+'% y el maximo de 100%', ToastAndroid.SHORT);
  //       return;
  //     }
  //     that.setState({
  //       percentage: percentage.toString(),
  //       amount: Math.round(percentage * that.state.bill_amount / 100).toString()
  //     })
  //   }
	// 	, 300);
  //
  // }

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
        reward_ars   : bill_amount - reward_dsc,
      })
    }
		, 300);
  }
  //
  // updateAmount(value) {
  //   let amount = parseInt(value) || 0;
  //   this.setState({ amount: amount.toString()  })
  //
  //   clearTimeout(this.tid);
	// 	let that = this;
	// 	this.tid = setTimeout( () => {
  //     if(!this.canCalculate())
  //     {
  //       return;
  //     }
  //     this.setState({
  //       amount: amount.toString(),
  //       percentage: Math.round(amount * 100 / this.state.bill_amount).toString()
  //     })
  //   }
	// 	, 300);
  //
  // }

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
      const iconMoney = (<Icon name="logo-usd" type='ionicon' size={26} color="#9F9F9F" style={{alignSelf:'center'}} />);
      const iconReceipt = (<Icon name="receipt" size={26} color="#9F9F9F" style={{alignSelf:'center'}} />);
      return (
          <View style={{flex: 1, backgroundColor:'#fff', flexDirection: 'column'}}>

            {this._renderPrompt()}

            <View style={{flex: 7, backgroundColor:'#fff', flexDirection: 'column'}}>

              <View style={{height: 100, flexDirection: 'row'}}>
                <View style={{flex: 1, alignItems:'center', justifyContent: 'center', flexDirection: 'column', backgroundColor:'#d0d0d0'}}>
                  {iconMoney}
                </View>
                <View style={{flex: 6, flexDirection: 'column'}}>
                  <TextInput
                     style={[styles.textInput, styles.textInputCenter]}
                     onChangeText={(text) => this.updateBillAmount(text)}
                     value={this.state.bill_amount}
                     keyboardType="numeric"
                     underlineColorAndroid ="transparent"
                   />
                   <View style={{height: 20, flexDirection: 'row'}}>
                     <Text style={styles.hint}>
                       MONTO DE FACTURA
                     </Text>
                   </View>
                </View>
              </View>

              <View style={[{height: 75, flexDirection: 'row'}, styles.top_bordered]}>
                <View style={{flex: 1, flexDirection: 'column', backgroundColor:'#d0d0d0', justifyContent: 'center'}}>
                  {iconReceipt}
                </View>
                <View style={{flex: 6, flexDirection: 'column'}}>
                  <TouchableHighlight style={styles.button_row} underlayColor={'#909090'} onPress={() => { this.showSetBillId() }}>
                    <Text style={[styles.textSimple2]}>{this.state.bill_id}</Text>
                   </TouchableHighlight>
                   <View style={{height: 20, flexDirection: 'row'}}>
                     <Text style={styles.hint}>
                       TICKET / FACTURA
                     </Text>
                   </View>
                </View>
              </View>

              <View style={[{height:200, display:'flex', flexDirection: 'row', paddingTop:50}, styles.top_bordered]}>

                <View style={{flex: 1, flexDirection: 'column'}}>
                    <Text style={[styles.inputText, styles.textInputCenter]}>
                      {this.state.reward_rate} %
                    </Text>
                    <Text style={styles.hintInside}>
                      DESCUENTO
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={[styles.inputTextLeft]}>
                      $
                      </Text>
                      <Text style={[styles.inputText2]}>
                        {this.state.reward_ars}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={[styles.inputTextLeft]}>
                      D$C
                      </Text>
                      <Text style={[styles.inputText2]}>
                        {this.state.reward_dsc}
                      </Text>
                    </View>
                </View>

                <View style={{flex: 1, flexDirection: 'column', borderLeftColor: '#c0c0c0', borderLeftWidth: 0.75}}>
                    <Text style={[styles.inputText, styles.textInputCenter]}>
                      {this.state.discount_rate} %
                    </Text>
                    <Text style={styles.hintInside}>
                      RECOMPENSA
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={[styles.inputTextLeft]}>
                      $
                      </Text>
                      <Text style={[styles.inputText2]}>
                        {this.state.discount_ars}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={[styles.inputTextLeft]}>
                      D$C
                      </Text>
                      <Text style={[styles.inputText2]}>
                        {this.state.discount_dsc}
                      </Text>
                    </View>
                </View>
              </View>

            </View>

            <HideWithKeyboard>
        	  <View style={{alignSelf: 'flex-end', flexDirection:'row', alignItems:'stretch', justifyContent:'flex-end' }}>
              <TouchableHighlight
                  style={[{flex:1}, styles.fullWidthButton, buttonColor]}
                  onPress={this._onShowDiscountQR} >
                <Text style={styles.fullWidthButtonText}>ACEPTAR DESCUENTO</Text>
              </TouchableHighlight>

              <TouchableHighlight
                  style={[{flex:1, borderLeftColor:'#ffffff', borderLeftWidth:0.5}, styles.fullWidthButton, buttonColor]}
                  onPress={this._onSendReward} >
                <Text style={styles.fullWidthButtonText}>RECOMPENSAR</Text>
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
