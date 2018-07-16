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

import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles/SelectAmount';
import { connect } from 'react-redux';
import Keyboard from './components/Keyboard';
import * as config from '../../constants/config';
import { iconsMap } from '../../utils/AppIcons';
import HideWithKeyboard from 'react-native-hide-with-keyboard';

class SetDiscount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount:           '0',
      bill_amount:      '0',
      percentage:       '0',
      recipient:        props.recipient,
      mode:             props.mode,
      percentage_error: ''
    };
    this.default_state = {
      min_percentage : 20,
      max_percentage : 100
    }
    this.tid = undefined;
    this.updateBillAmount   = this.updateBillAmount.bind(this)
    this.updateAmount       = this.updateAmount.bind(this)
    this.updatePercentage   = this.updatePercentage.bind(this)
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
    console.log(' ACCOUNT->SUBACCOUNT->BUSINESS', JSON.stringify(this.props.account.subaccount.business));
    let discount_schedule = this.props.account.subaccount.business.discount_schedule;
    for (var i = 0; i < discount_schedule.length; i++){
      let schedule = discount_schedule[i];
      console.log(' --- Schedules LOOP', JSON.stringify(schedule));
      if(schedule['date']==today)
      {
        console.log(' ---------------------------------- DISCOUNT FOUND:', schedule['discount']);
        discount_rate = schedule['discount'];
        break;
      }
    }
    this.setState({percentage:discount_rate.toString()})
  }

  _handleClear(){
    this.setState({
      amount:       '',
      bill_amount:  ''
    });
  }

  _handleDelete(){
    if (this.state.amount.length==0)
      return;
    let new_string = this.state.amount.substring(0, this.state.amount.length-1);
    this.setState({
      amount : new_string
    });
  }

  _handleKeyPress(key){

    if('0123456789'.indexOf(key)>=0)
    {
      if (this.state.amount=='0' && key=='0')
        return;
      if (this.state.amount=='0' && key!='0')
      {
        this.setState({
          amount : key
        });
        return;
      }
    }

    if((key==',' || key=='.') && this.state.amount.indexOf(key)>=0)
      return;

    if((key==',' || key=='.') && this.state.amount.length==0)
    {
      this.setState({
        amount : '0'+key
      });
      return;
    }
    this.setState({
      amount : this.state.amount+key
    });
  }

  percentageInValue(){
    console.log('percentageInValue()', 'perc:', this.state.percentage , 'min_perc:', this.default_state.min_percentage, 'max_perc:', this.default_state.max_percentage)
    return !isNaN(this.state.percentage) && (parseInt(this.state.percentage)>=this.default_state.min_percentage) && (parseInt(this.state.percentage)<this.default_state.max_percentage);
  }
  canCalculate(){
    let ret = !(isNaN(this.state.percentage)||isNaN(this.state.amount)||isNaN(this.state.bill_amount));
    if(ret)
      ret = ret &&  this.percentageInValue() && parseInt(this.state.bill_amount)>0;
    if(!this.percentageInValue())
    {
      console.log('El porcenteaje mínimo es de '+this.default_state.min_percentage+'% y el maximo de 100%');
      ToastAndroid.show('El porcenteaje mínimo es de '+this.default_state.min_percentage+'% y el maximo de 100%', ToastAndroid.SHORT);
      return;
    }
    console.log(' -- canCalculate():', ret, ' %:', this.state.percentage, ' DSC:', this.state.amount,' $:', this.state.bill_amount );
    return ret;

  }

  updatePercentage(value) {
    let percentage = parseInt(value) || 0;
    this.setState({ percentage: percentage.toString()  })

    clearTimeout(this.tid);
		let that = this;
		this.tid = setTimeout( () => {
      if(!that.canCalculate())
      {
        return;
      }
      if(!that.percentageInValue())
      {
        ToastAndroid.show('El porcenteaje mínimo es de '+that.default_state.min_percentage+'% y el maximo de 100%', ToastAndroid.SHORT);
        return;
      }
      that.setState({
        percentage: percentage.toString(),
        amount: Math.round(percentage * that.state.bill_amount / 100).toString()
      })
    }
		, 300);

  }


  updateBillAmount(value) {
    let bill_amount = parseInt(value) || 0;
    this.setState({ bill_amount: bill_amount.toString()  })

    clearTimeout(this.tid);
		let that = this;
		this.tid = setTimeout( () => {
      if(!that.canCalculate())
      {
        return;
      }
      that.setState({
        bill_amount: bill_amount.toString(),
        amount: Math.round(that.state.percentage * bill_amount / 100).toString()
      })
    }
		, 300);
  }

  updateAmount(value) {
    let amount = parseInt(value) || 0;
    this.setState({ amount: amount.toString()  })

    clearTimeout(this.tid);
		let that = this;
		this.tid = setTimeout( () => {
      if(!this.canCalculate())
      {
        return;
      }
      this.setState({
        amount: amount.toString(),
        percentage: Math.round(amount * 100 / this.state.bill_amount).toString()
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

    console.log(' ****************************************************** ', ' -- SetDiscount:', JSON.stringify(this.state.recipient))
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
      const iconMoney = (<Icon name="logo-usd" size={26} color="#9F9F9F" style={{textAlign:'center', textAlignVertical:'center', flex:1 }} />);
      return (
          <View style={{flex: 1, backgroundColor:'#fff', flexDirection: 'column'}}>
            {/*<ScrollView contentContainerStyle={{ flexDirection:'column', flex:1}}>*/}
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 7, flexDirection: 'column'}}>
                  {/*<Text style={styles.inputText}>
                    {this.state.bill_amount}
                  </Text>*/}
                  <TextInput
                     style={[styles.textInput]}
                     onChangeText={(text) => this.updateBillAmount(text)}
                     value={this.state.bill_amount}
                     keyboardType="numeric"

                   />
                </View>
                <View style={{flex: 1, flexDirection: 'column', backgroundColor:'#d0d0d0'}}>
                  {iconMoney}
                </View>
              </View>
              <View style={{flex: 0.25, flexDirection: 'row'}}>
                <Text style={styles.hint}>
                  MONTO DE FACTURA
                </Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row', borderTopColor: '#c0c0c0', borderTopWidth: 0.25}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: 2, flexDirection: 'row'}}>
                    {/**<Text style={styles.inputText}>
                      {this.state.amount}
                    </Text>*/}
                    <TextInput
                       style={[styles.textInput]}
                       onChangeText={(text) => this.updateAmount(text)}
                       value={this.state.amount}
                       keyboardType="numeric"
                     />
                  </View>
                  <View style={{flex: 1, alignItems:'flex-start'}}>
                    <Text style={styles.inputText}>
                      D$C
                    </Text>
                  </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row', borderLeftColor: '#c0c0c0', borderLeftWidth: 0.25}}>
                  <View style={{flex: 2, flexDirection: 'row'}}>
                    {/*<Text style={styles.inputText}>
                      {this.state.discount}
                    </Text>*/}
                    <TextInput
                       style={[styles.textInput]}
                       onChangeText={(text) => this.updatePercentage(text)}
                       value={this.state.percentage}
                       keyboardType="numeric"
                     />
                  </View>
                  <View style={{flex: 1, alignItems:'flex-start'}}>
                    <Text style={styles.inputText}>
                      %
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{flex: 0.25, flexDirection: 'row', borderBottomColor: '#c0c0c0', borderBottomWidth: 0.25}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text style={styles.hint}>
                    DISCOINS
                  </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text style={styles.hint}>
                    DESCUENTO
                  </Text>
                </View>
              </View>

              <View style={{flex: 1}}>
              </View>
              {/*<Keyboard
                  keyboardType="decimal-pad"
                  onClear={this._handleClear.bind(this)}
                  onDelete={this._handleDelete.bind(this)}
                  onKeyPress={this._handleKeyPress.bind(this)}
              />*/}
  					{/*</ScrollView>*/}
          	<HideWithKeyboard>
              <View style={{flex:1, flexDirection:'column', alignItems:'stretch', justifyContent:'flex-end' }}>
  							<TouchableHighlight
  									style={[styles.fullWidthButton, buttonColor]}
  									onPress={this._onNext.bind(this)} >
  								<Text style={styles.fullWidthButtonText}>SIGUIENTE</Text>
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

export default connect(mapStateToProps, null)(SetDiscount);
