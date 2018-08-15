import React, { PropTypes, Component } from 'react';

import {
  View,
  Text
} from 'react-native';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from '../wallet/wallet.actions';
import styles from './styles/SendResultEx';
import { Icon } from 'react-native-elements';
import KeyboardSpacer from 'react-native-keyboard-spacer';

class SendResultEx extends Component {

  static navigatorStyle = {
    navBarTextColor: '#ffffff',
    navBarBackgroundColor: '#f15d44',
    navBarButtonColor: '#ffffff',
		navBarTextFontFamily: 'roboto_thin',
    topBarElevationShadowEnabled: false
  }


  constructor(props) {
    super(props);

    this.state = {
      recipient : props.recipient,
      amount : props.amount,
      memo : props.memo,

      refreshing : false,
      types: ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle',
              '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
      size: 100,
      color: "#B7F072",
      isVisible: true,


      bill_amount:    props.data.bill_amount,
      bill_id:        props.data.bill_id ,
      discount_rate:  props.data.discount_rate ,
      discount_dsc:   props.data.discount_dsc ,
      to_pay:         props.data.to_pay ,
      discount_ars:   props.data.discount_ars ,
      account_id:     props.data.account_id,
      business_id:    props.data.business_id ,
      account_name:   props.data.account_name,
      business_name:  props.data.business_name
      
    };

		let that = this;
    setTimeout( function() {
      that.props.actions.retrieveHistory(
				that.props.account.name,
				that.props.account.keys,
				!that.props.account.id,
        undefined,
        that.props.account.subaccount);
    }, 1500);

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

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  focus() {
  }

  render() {

		let debt    = this.state.bill_amount - this.state.to_pay;

    return (

      <View style={styles.container}>
        <View style={{flex:3, justifyContent: 'center', backgroundColor:'transparent'}}>
          <Text style={styles.title}>Pago exitoso</Text>
          <Text style={[styles.amount]}>D$C {this.state.amount}</Text>
        </View>
        <View style={{flex:4, backgroundColor:'transparent'}}>

          <Text style={styles.title_part}>DESTINATARIO</Text>
          <Text style={[styles.data_part,styles.margin_bottom]}>{this.state.account_name}</Text>
          
          <Text style={styles.title_part}>RESTAN PAGAR EN PESOS</Text>
          <Text style={[styles.data_part,styles.margin_bottom]}>${debt}</Text>


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
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
	return {
		account: state.wallet.account,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(walletActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SendResultEx);
