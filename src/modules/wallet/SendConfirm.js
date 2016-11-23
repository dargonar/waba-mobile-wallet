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

import UWCrypto from '../../utils/Crypto';

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
    }
  }
  
  _onConfirm(){

		fetch('http://35.161.140.21:8080/api/v1/account/'+this.state.recipient.name, {
			method: 'GET',
			headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
		})
		.then((response) => response.json()) 
		.then((responseJson) => {
			
			let amount = this.state.amount >> 0;
			console.log("AMOUNT => ", amount);
			
			fetch('http://35.161.140.21:8080/api/v1/transfer', {
				method: 'POST',
				headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
				body: JSON.stringify({
    			from   : '1.2.31489',
    			to     : this.state.recipient.account_id,
					amount : amount	
  			})
			})
			.then((response) => response.json()) 
			.then((responseJson) => {
				//console.log(responseJson);
				UWCrypto.signHash('9b2f6605ce31b57201c632af7d630f7d5ba0f7789e9f24371769b0bd255b4ef2', responseJson.to_sign).then(res => {

							let tx = responseJson.tx;
							tx.signatures = [res.signature];
							
							fetch('http://35.161.140.21:8080/api/v1/push_tx', {
								method: 'POST',
								headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
								body: JSON.stringify({
									tx : tx,
								})
							})
							.then((response) => response.json()) 
							.then((responseJson) => {
								console.log('Parece que cerramos bien', responseJson);
							});
							
							//console.log(res);
				
				}, err => {
					
				});
				
			})			
			
// 			console.log(responseJson.options.memo_key);
// 			console.log(
// 				this.state.recipient,
// 				this.state.amount,
// 				this.state.memo
// 			)

		})
		.catch((error) => {
			console.error(error);
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