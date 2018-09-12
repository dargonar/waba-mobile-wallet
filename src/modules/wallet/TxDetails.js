import React, { PropTypes, Component } from 'react';
import {
  View,
  Text
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from './wallet.actions';
import styles from './styles/TxDetails';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as config from '../../constants/config';

class TxDetails extends Component {
  
  static navigatorStyle = {
    navBarTextColor: '#666', 
    navBarComponentAlignment: 'center',
    navBarBackgroundColor: '#ffffff',
    navBarButtonColor: '#000000',
    navBarTextFontFamily: 'Montserrat-Medium',
    topBarElevationShadowEnabled: false,
  }
  
  constructor(props) {
    super(props);
    
    let mapType = { TX_TYPE_UNKNOWN:     'DESCONOCIDA',
                    TX_TYPE_SENT:        'ENVIO',
                    TX_TYPE_RECEIVED:    'RECEPCION',
                    TX_TYPE_CREDIT_UP:   'INCREMENTO DE CREDITO',  
                    TX_TYPE_CREDIT_DOWN: 'DECREMENTO DE CREDITO'}

    this.state = {
      type          : props.type,
      typeText      : mapType[props.type],
      from          : props.from,
      to            : props.to,
      fee           : props.fee,
			amount        : props.amount,
      memo          : props.memo,
      block         : props.block,
      message       : '',
      discount      : 0,
      bill_amount   : 0,
      bill_id       : ''
    }
  }
  
  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  componentDidMount() {
    if(!this.state.memo || !this.state.memo.message)
      return;
    
    let msg = this.hex2a(this.state.memo.message);
    // console.log(' *** componentDidMount#2', msg)
    let info = msg.split(':')
    if(info.length<=1)
      return;
    // [ '~re', '1000', 'NA' ]

    let discount    = 0;
    let bill_amount = 0;
    if(!isNaN(info[1]))
    { 
      discount      = this.state.amount.quantity/100/ parseFloat(info[1]);
      bill_amount   = parseFloat(info[1]);
    }
    bill_id       = info[2] || 'N/D';
    
    this.setState({message:msg, discount:discount, bill_amount:bill_amount, bill_id:bill_id});
  }

  hex2a(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
  } 
  componentWillUnmount() {
  }
  
  focus() {
  }

  render() {
  	
      // {"id":"1.11.855",
      // "__typename":"Transfer",
      // "block":{"timestamp":"2018-08-27T16:13:40"},
      // "amount":{"quantity":"200","asset":{"id":"1.3.9","symbol":"THEDISCOIN.M"}}
      // ,"from":{"id":"1.2.97","name":"user1"},
      // "to":{"id":"1.2.124","name":"lucia"},
      // "memo":{"from":"BTS1111111111111111111111111111111114T1Anm","to":"BTS1111111111111111111111111111111114T1Anm","nonce":"0","message":"7e72653a313030303a4e41"},"fee":{"quantity":"0.21","asset":{"symbol":"THEDISCOIN.M","id":"1.3.9"}},"commandType":"Push"}


		return (
      
      <View style={styles.container}>
        <Text>{this.state.typeText}</Text>
        <Text>Amount en D$C: {this.state.amount.quantity}</Text>
        <Text>Fee: {this.state.fee.quantity}</Text>
        <Text>From: {this.state.from.name}</Text>
        <Text>To:   {this.state.to.name}</Text>
        <Text>Memo:   {this.state.message}</Text>
        <Text>Fecha:   {this.state.block.timestamp}</Text>
			  <Text>discount:   {this.state.discount}</Text>
        <Text>bill_amount (total de la factura):   {this.state.bill_amount}</Text>
        <Text>NroFactura/recibo/referencia:   {this.state.bill_id}</Text>     
        </View>
    );
  }
}

// function mapStateToProps(state, ownProps) {
	
// }

// function mapDispatchToProps(dispatch) {
	
// }
// export default connect(mapStateToProps, mapDispatchToProps)(TxDetails);
export default TxDetails;

