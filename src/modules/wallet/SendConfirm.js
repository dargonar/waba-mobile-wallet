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
        account_id:		props.recipient[1],
      },
			memo_key: props.memo_key,
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


  dateAdd(date, interval, units) {
		var ret = new Date(date); //don't change original date
		switch(interval.toLowerCase()) {
			case 'year'   :  ret.setFullYear(ret.getFullYear() + units);  break;
			case 'quarter':  ret.setMonth(ret.getMonth() + 3*units);  break;
			case 'month'  :  ret.setMonth(ret.getMonth() + units);  break;
			case 'week'   :  ret.setDate(ret.getDate() + 7*units);  break;
			case 'day'    :  ret.setDate(ret.getDate() + units);  break;
			case 'hour'   :  ret.setTime(ret.getTime() + units*3600000);  break;
			case 'minute' :  ret.setTime(ret.getTime() + units*60000);  break;
			case 'second' :  ret.setTime(ret.getTime() + units*1000);  break;
			default       :  ret = undefined;  break;
		}
		return ret;
	}

	_addSignature(tx, privkey) {				
		return new Promise( (resolve, reject) => {
			Bts2helper.txDigest( JSON.stringify(tx), config.CHAIN_ID).then( digest => {
				console.log('_addSignature txDigest =>', digest);
				Bts2helper.signCompact(digest, privkey).then( signature => {
					console.log('_addSignature signCompact =>', signature);
					tx.signatures = [signature];
					resolve(tx);
				}, err => {
					reject(err);
				})
			}, err => {
				reject(err);						
			});
		});
	}
			
	_generateUnsignedTx(params) {				
		//console.log('_generateUnsignedTx', params);
		return new Promise( (resolve, reject) => {
			tx = {
				'expiration' : this.dateAdd(new Date(),'second',120).toISOString().substr(0, 19),
				'ref_block_num'     : this.props.blockchain.refBlockNum,
				'ref_block_prefix'  : this.props.blockchain.refBlockPrefix,
				'operations' : [
					 [
						0,
						{
							from   : params.from,
							to     : params.to,
							amount : {
								amount   : (Number(params.amount)*Math.pow(10,params.asset.precision))>>0,
								asset_id : params.asset.id
							},
							memo   : params.memo
						}
					]
				]
			}

			Bts2helper.calcFee(JSON.stringify(this.props.fees), [JSON.stringify(tx.operations[0])], JSON.stringify(this.props.asset.options.core_exchange_rate)).then( res => {
				tx.operations[0][1].fee = {
					asset_id  : params.asset.id,
					amount    : res[0]
				}
				resolve(tx);
			}, err => {
				reject(err);
			});
		}); //Promise
	}
		
	getTotal(){
		return (Number(this.state.amount) + Number(this.state.fee_txt)).toFixed(2);
	}

_getRecipientInfo(recipient) {

		return new Promise( (resolve, reject) => {
			if(this.state.memo_key) {
				resolve();
				return;
			}
			
			fetch(config.getAPIURL('/account/')+this.state.recipient.name, {
				method: 'GET',
				headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
			})
			.then((response) => response.json()
				, err => {
					this._onGetTxError(JSON.stringify(err));	
				}) 
			.then((responseJson) => {
				this.setState({memo_key:responseJson.options.memo_key});
				resolve();
			}, err => {
				this._onGetTxError(JSON.stringify(err));
			}); 
		});
		
	}

	_getTx() {

		this._buildMemo(this.state.memo, this.state.memo_key).then( enc_memo => {
			let amount = Number(this.state.amount).toFixed(2); 
			this._generateUnsignedTx({
					from   : this.props.account.id,
					to     : this.state.recipient.account_id,
					amount : amount,
					memo   : enc_memo,
					asset  : this.props.asset
			})
			.then((tx) => {
				console.log('----------TX------------');
				console.log(JSON.stringify(tx));
				console.log('------------------------');
				this.setState({
					tx					:	tx,
					fee    			: tx.operations[0][1].fee.amount,
					fee_txt			: tx.operations[0][1].fee.amount/config.ASSET_DIVIDER,
					can_confirm	: true,
					error				:	''
				});			
			}
			, err => {
				console.error('ERR1: ', err);
				this._onGetTxError(JSON.stringify(err));	
			})

		}, err => {
			console.error('ERR2: ', err);
			this._onGetTxError(JSON.stringify(err));	
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

	_buildMemo(message) {
		return new Promise( (resolve, reject) => {
			
			if(!message)	{
				resolve();
				return;
			}
			
			this._getRecipientInfo(this.state.recipient).then( () => {

				Bts2helper.encodeMemo(this.props.account.keys[2].privkey, this.state.memo_key, message).then(res => {
					res = JSON.parse(res);
					//res.message = '010203';
					//console.log('Para mi para ovs', res);
					resolve(res);
				}, err => {
					console.log('DA ERRORRRR');
					console.log(err);
					reject(err);
				})

			} , err => {
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
		let disp = (Number(this.props.balance[0])); // - Number(this.props.balance[0])).toFixed(2);
		console.log(disp, final_amount);
		if(Number(disp) < final_amount)
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
		
		this._addSignature(this.state.tx, this.props.account.keys[1].privkey).then( tx => {
		
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
			})
			.then((responseJson) => {
					//console.log('Parece que cerramos bien', responseJson);
					if(responseJson && responseJson.error) {
						this._onSendingError(responseJson.error);
						return;
					}	

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
			this._onSendingError(err);
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
  	console.log('SendConfirm => componentWillReceiveProps');
	}

  componentDidMount() {
		this._getTx();
		//this._generateUnsignedTx()
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
	console.log(' -- SEND CONFIRM -> mapStateToProps');
	return {
		account    : state.wallet.account,
		balance    : state.wallet.balance,
		fees       : state.wallet.fees,
		asset      : state.wallet.asset,
		blockchain : state.wallet.blockchain
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(walletActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SendConfirm);