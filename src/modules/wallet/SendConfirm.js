import React, { PropTypes, Component } from 'react';

import {
  Alert,
	Text, 
	View
  
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from './wallet.actions';
import styles from './styles/SendConfirm';
import { Button } from 'react-native-elements';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import UWCrypto from '../../utils/Crypto';
import Bts2helper from '../../utils/Bts2helper';

import * as config from '../../constants/config';

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
		
		this._onSendingError = this._onSendingError.bind(this);
		this._buildMemo = this._buildMemo.bind(this);
  }
  
	_buildMemo(message, destPubkey) {
		return new Promise( (resolve, reject) => {
			if(!message)	{
				resolve();
				return;
			}
			
			UWCrypto.createMemo(this.props.account.keys[1].privkey, destPubkey, message, '').then(res => {

				resolve({
					from     : this.props.account.keys[1].pubkey,
					to       : destPubkey,
					nonce    : res.nonce,
					message  : res.encrypted_memo
				});

			}, err => {
				reject(err);
			})
		});
	}

  _onConfirm(){
		console.log(' ==> this.props.balance', this.props.balance);
		if(Number(this.props.balance)<Number(this.state.amount))
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
		this.props.navigator.showModal({
			screen : 'wallet.Sending',
			title :  'Enviando...',
			passProps: {recipient : this.state.recipient,
									amount :    this.state.amount,
									memo :      this.state.memo,
								  modal_type: 'sending'},
			animationType: 'slide-up',
			navigatorStyle: {navBarHidden:true}
		});
		
		
		//fetch('http://35.161.140.21:8080/api/v1/account/'+this.state.recipient.name, {
		fetch(config.getAPIURL('/account/')+this.state.recipient.name, {
			method: 'GET',
			headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
		})
		.then((response) => response.json()
			, err => {
				this._onSendingError(err);	
			}) 
		.then((responseJson) => {
			
			this._buildMemo(this.state.memo, responseJson.options.memo_key).then( enc_memo => {
				
				//console.log('AFTER BUILD => ', JSON.stringify(enc_memo));
							
				let amount = this.state.amount >> 0;
				console.log("AMOUNT => ", amount);
			
				//fetch('http://35.161.140.21:8080/api/v1/transfer', {
				fetch(config.getAPIURL('/transfer'), {
					method: 'POST',
					headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
					body: JSON.stringify({
						from   : this.props.account.name,
						to     : this.state.recipient.account_id,
						amount : amount,
						memo   : enc_memo
					})
				})
				.then((response) => response.json()
					, err => {
						this._onSendingError(err);	
					}) 
				.then((responseJson) => {
					
					Bts2helper.txDigest(JSON.stringify(responseJson.tx), config.CHAIN_ID).then( digest=> {
						
						console.log('txDigest =>', digest, ' ', responseJson.to_sign);
						
						if ( responseJson.to_sign != digest ) {
							console.log('txDigest => ERRORRR');
							this._onSendingError('wrong digest');
							return;
						} 
						
						Bts2helper.signCompact(responseJson.to_sign, this.props.account.keys[1].privkey).then(res => {
						//UWCrypto.signHash(this.props.account.keys[1].privkey, responseJson.to_sign).then(res => {
									//console.log('funciono OK =>', res);
									let tx = responseJson.tx;
									//tx.signatures = [res.signature];
									tx.signatures = [res];

									//fetch('http://35.161.140.21:8080/api/v1/push_tx', {
									fetch(config.getAPIURL('/push_tx'), {
										method: 'POST',
										headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
										body: JSON.stringify({
											tx : tx,
										})
									})
									.then((response) => response.json()
										, err => {
											this._onSendingError(err);	
										}, 
											err => {
												this._onSendingError(err);	
											}) 
									.then((responseJson) => {
										//console.log('Parece que cerramos bien', responseJson);

										this.props.navigator.dismissModal({
											animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
										});
										this.props.navigator.push({
											screen:     'wallet.SendResult',
											title:      'Envío exitoso',
											passProps:  {
												recipient : this.state.recipient,
												amount :    this.state.amount,
												memo :      this.state.memo
											},
											navigatorStyle: {navBarHidden:true}
										});
									}, err => {
										this._onSendingError(err);	
									});

						}, err => {
							console.log('signCompact => ERRORRR');
							this._onSendingError(err);	
						});						
					
					});
					

				}
				, err => {
					this._onSendingError(err);	
				})
			
			}, err => {
				this._onSendingError(err);
			});			
			
		}, err => {
			this._onSendingError(err);	
		})
		.catch((error) => {
			console.error(error);
			this._onSendingError(error);	
		});

	}

	_onSendingError(error){
		this.props.navigator.dismissModal({
			animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
		});
		
		console.log('----------_onSendingError------------');
		console.log(JSON.stringify(error));
		console.log('-------------------------------------');
		
		Alert.alert(
			'Error en envío',
			JSON.stringify(error),
			[
				{text: 'OK', onPress: () => this.props.navigator.pop({ animated: true }) },
			]
		)

		
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

function mapStateToProps(state, ownProps) {
	console.log(' -- DRAWER -> mapStateToProps');
	return {
		account: state.wallet.account,
		balance: state.wallet.balance
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(walletActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SendConfirm);