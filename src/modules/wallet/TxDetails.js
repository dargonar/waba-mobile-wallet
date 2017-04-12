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
    navBarTextColor: '#ffffff', 
    navBarBackgroundColor: '#0B5F83',
    navBarButtonColor: '#ffffff'
  }
  
  constructor(props) {
    super(props);
    
    let mapType = { TX_TYPE_UNKNOWN:     'DESCONOCIDA',
                    TX_TYPE_SENT:        'ENVIO',
                    TX_TYPE_RECEIVED:    'RECEPCION',
                    TX_TYPE_CREDIT_UP:   'INCREMENTO DE CREDITO',  
                    TX_TYPE_CREDIT_DOWN: 'DECREMENTO DE CREDITO'}

    this.state = {
      type:     props.type,
      typeText: mapType[props.type],
      from : {
        name:					props.from.name,
        account_id:		props.from.account_id,
      },
      to : {
        name:					props.to.name,
        account_id:		props.to.account_id,
      },
      fee :    props.fee,
			amount : props.amount,
      memo :   props.memo,
      date :   props.date,
      title :  props.title
    }
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
  	
		return (
      
      <View style={styles.container}>
        <Text>{this.state.title}</Text>
        <Text>Amount: {this.state.amount}</Text>
        <Text>Fee: {this.state.fee}</Text>
        <Text>From: {this.state.from.name}</Text>
        <Text>To:   {this.state.to.name}</Text>
        <Text>Memo:   {this.state.memo}</Text>
        <Text>Fecha:   {this.state.date}</Text>
				     
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

