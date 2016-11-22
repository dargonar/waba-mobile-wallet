import React, { PropTypes, Component } from 'react';

import {
  View,
  Text
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from './wallet.actions';
import styles from './styles/SendConfirm';
import { Button } from 'react-native-elements';
import KeyboardSpacer from 'react-native-keyboard-spacer';

class SendConfirm extends Component {
  
  static navigatorStyle = {
    navBarTextColor: '#ffffff', 
    navBarBackgroundColor: '#1f475b',
    navBarButtonColor: '#ffffff'
  }
  
  constructor(props) {
    super(props);
  
    this.state = {
      recipient : {
        name:					props.recipient[0],
        account_id:		props.recipient[1]
      },
      amount : props.amount,
      memo :   props.memo
    };
  }
  
  _onConfirm(){
		this.props.navigator.push({
			screen:     'wallet.Sending',
			title:      'Enviando...',
      passProps:  {
				recipient : this.state.recipient,
				amount :    this.state.amount,
				memo :      this.state.memo
			}
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
  	return (
      
      <View style={styles.container}>
        <View style={{flex:5, backgroundColor:'#1f475b', padding:30}}>
          <Text style={styles.title_part}>Ud. va a enviar:</Text>
          <Text style={styles.data_part}>$ {this.state.amount}</Text>
          <Text style={styles.title_part}>A:</Text>
          <Text style={styles.data_part}>{this.state.recipient.name}</Text>
          <Text style={styles.title_part}>Con mensaje:</Text>
          <Text style={styles.data_part}>{this.state.memo}</Text>
        </View>
        <Button buttonStyle={{flex: 1, backgroundColor:"#2c3f50", marginLeft:0, marginRight:0 }}  
          underlayColor="#546979"
          onPress={this._onConfirm.bind(this)} 
          title='ENVIAR' />
        <KeyboardSpacer />
                    
        </View>
    );
  }
}

// function mapDispatchToProps(dispatch) {
// 	return {
// 		actions: bindActionCreators(walletActions, dispatch)
// 	};
// }

export default SendConfirm;