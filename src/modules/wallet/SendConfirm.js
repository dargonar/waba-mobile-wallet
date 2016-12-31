import React, { PropTypes, Component } from 'react';

import {
  Alert,
	Text, 
	TouchableHighlight,
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
      memo :   props.memo,
			tx: 		 null,
			fee:     0,
			fee_txt: 0,
			can_confirm: false,
			error:   ''
    }
		
		this._onSendingError = this._onSendingError.bind(this);
		this._buildMemo = this._buildMemo.bind(this);
  }
	
	getTotal(){
		return (Number(this.state.amount) + Number(this.state.fee_txt)).toFixed(2);
	}
	_getTx(){
		
		fetch(config.getAPIURL('/account/')+this.state.recipient.name, {
			method: 'GET',
			headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
		})
		.then((response) => response.json()
			, err => {
				this._onGetTxError(JSON.stringify(error));	
			}) 
		.then((responseJson) => {
			
			this._buildMemo(this.state.memo, responseJson.options.memo_key).then( enc_memo => {
				
// 				let amount = this.state.amount >> 0;
// 				let amount = Number(this.state.amount*config.ASSET_DIVIDER).toFixed(0); 
				let amount = Number(this.state.amount).toFixed(2); 
				console.log('----------AMOUNT------------');
				console.log(amount);
				console.log('-------------------------------------');
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
						this._onGetTxError(JSON.stringify(err));	
					}) 
				.then((responseJson) => {
					console.log('----------TX------------');
					console.log(JSON.stringify(responseJson));
					console.log('-------------------------------------');
					if (responseJson.error){
						this._onGetTxError(responseJson.error);	
// 						this.setState({
// 							can_confirm	: false,
// 							error				:	responseJson.error
// 						});				
						return;
					}
					this.setState({
						tx					:	responseJson.tx,
						fee    			: responseJson.tx.operations[0][1].fee.amount,
						fee_txt			: responseJson.tx.operations[0][1].fee.amount/config.ASSET_DIVIDER,
						can_confirm	: 	true,
						error				:	''
					});			
				}
				, err => {
					this._onGetTxError(JSON.stringify(err));	
				})
			
			}, err => {
				this._onGetTxError(JSON.stringify(error));	
			});			
			
		}, err => {
			this._onGetTxError(JSON.stringify(err));	
		})
		.catch((error) => {
			console.error(error);
			this._onGetTxError(JSON.stringify(error));	
		});

				
	}
	//'No se pudo calcular la comisión'
		
	_onGetTxError(error){
		
		this.setState({
			tx: 		 			null,
			fee:     			0,
			fee_txt: 			0,
			can_confirm: 	false,
			error:   			error
		});
		Alert.alert(
			'Error al obtener comisión',
			error,
			[
				{text: 'OK', onPress: () => this.props.navigator.pop({ animated: true }) },
			]
		)
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
		if(!this.state.can_confirm)
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
		
		console.log(' ==> this.props.balance', this.props.balance);
		let final_amount = Number(this.state.amount) + Number(this.state.fee_txt); 
		if(Number(this.props.balance)<final_amount)
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
				
				console.log('AFTER BUILD => ', JSON.stringify(enc_memo));
							
// 				let amount = this.state.amount >> 0;
// 				let amount = Number(this.state.amount*config.ASSET_DIVIDER).toFixed(0); 
				let amount = Number(this.state.amount).toFixed(2); 
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
					Bts2helper.signCompact(responseJson.to_sign, this.props.account.keys[1].privkey).then(res => {
					//UWCrypto.signHash(this.props.account.keys[1].privkey, responseJson.to_sign).then(res => {
								console.log('funciono OK =>', res);
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
									console.log('Parece que cerramos bien', responseJson);

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
		this._getTx();
  }

  componentWillUnmount() {
  }
  
  focus() {
  }

  render() {
  	let btn_style = styles.fullWidthButton2;
		let txt_style = styles.fullWidthButtonText;
		if(!this.state.can_confirm)
		{
			btn_style = styles.fullWidthButtonDisabled;
			txt_style = styles.fullWidthButtonTextDisabled;
		}
    let memo = this.state.memo;
		let memo_style = styles.data_part;
		if(!memo || memo==''){
			memo='-sin mensaje-';
			memo_style = styles.data_part_empty;
		}
		let send_disabled = !this.state.can_confirm;
		let total = this.getTotal();
		let fee = this.state.fee_txt.toFixed(2);
		return (
      <View style={styles.container}>
        <View style={{flex:5, backgroundColor:'#1f475b', padding:30}}>
          <Text style={styles.title_part}>Ud. va a enviar:</Text>
          <Text style={styles.data_part}>$ {this.state.amount}</Text>
					<Text style={styles.title_part}>Comisión:</Text>
          <Text style={styles.data_part_small}>$ {fee}</Text>
					<Text style={styles.title_part}>Total:</Text>
          <Text style={styles.data_part_small}>$ {total}</Text>
          <Text style={styles.title_part}>A:</Text>
          <Text style={styles.data_part}>{this.state.recipient.name}</Text>
          <Text style={styles.title_part}>Con mensaje:</Text>
          <Text style={memo_style}>{memo}</Text>
        </View>
				<View style={{flex:1, flexDirection:'column', alignItems:'stretch', justifyContent:'flex-end' }}>
					<TouchableHighlight
							disabled={send_disabled}
							style={[styles.fullWidthButton, btn_style]}
							onPress={this._onConfirm.bind(this)}  >
						<Text style={txt_style}>ENVIAR</Text>
					</TouchableHighlight>
				</View>
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