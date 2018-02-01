import React, { PropTypes, Component } from 'react';

import {
  Alert,
	ScrollView,
	Text,
	ToastAndroid,
	TouchableHighlight,
	View
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from '../wallet/wallet.actions';
import styles from './styles/EndorseConfirm';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import SliderEntryMicro from './components/SliderEntryMicro';
import Bts2helper from '../../utils/Bts2helper';
import { avales }  from './components/static/endorsements_const'
import * as fn_avales  from './components/static/endorsements_const';
import * as config from '../../constants/config';

class EndorseConfirm extends Component {
  
  static navigatorStyle = {
    navBarTextColor: '#ffffff',
		navBarBackgroundColor: '#2e2f3d',
    navBarButtonColor: '#ffffff',
		navBarTextFontFamily: 'roboto_thin'
  }
  
  constructor(props) {
    super(props);
  
    this.state = {
      endorsed 					: props.endorsed,
      endorse_type      : props.endorse_type,
			profile 				  : props.profile,
			tx								: null,
			fee								: 0,
			fee_txt						: 0, 	// hack
			can_confirm				: true, 	// hack
			error 						: ''
    }
		
		this._onSendingError = this._onSendingError.bind(this);
		
		this._generateUnsignedTx(this.state.endorsed, this.state.endorse_type).then( tx => {
			
			let amount = Number(tx.operations[0][1].fee.amount);
			console.log('amount1 =>', tx.operations[0][1].fee.amount);
			if(tx.operations.length > 1) {
				console.log('amount2 =>', tx.operations[1][1].fee.amount);
				amount += Number(tx.operations[1][1].fee.amount);
			}

			this.setState({fee_txt:amount/100});
		});
	
  }

  _addSignature(tx, privkey) {				
		return new Promise( (resolve, reject) => {
			Bts2helper.txDigest( JSON.stringify(tx), config.CHAIN_ID).then( digest => {
				console.log('_addSignature txDigest =>', digest);
				Bts2helper.signCompact(digest, privkey).then( signature => {
					console.log('_addSignature signCompact =>', signature);
					if(!tx.signatures) tx.signatures = [];
					tx.signatures.push(signature);
					resolve(tx);
				}, err => {
					reject(err);
				})
			}, err => {
				reject(err);
			});
		});
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
  
	getMemoKey(account_name) {

		return new Promise( (resolve, reject) => {
			
			fetch(config.getAPIURL('/account/')+account_name, {
				method: 'GET',
				headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
			})
			.then((response) => response.json()
				, err => {
					console.log(JSON.stringify(err));
				  reject(err);
				}) 
			.then((responseJson) => {
				resolve(responseJson.options.memo_key);
			}, err => {
				console.log(JSON.stringify(err));
				reject(err);
			}); 
		});
		
	}


	encryptUserData(user_data, endorse_type) {
		console.log(' -- encryptUserData #X');
		return new Promise( (resolve, reject) => {
			console.log(' -- encryptUserData #Y');
			if(endorse_type==config.AVAL1000_ID)
			{
				resolve(null);
				return;
			}
			console.log(' -- encryptUserData #1');
			this.getMemoKey('gobierno-par').then( (memo_key) => {
				console.log(' -- encryptUserData #2');
				Bts2helper.encodeMemo(this.props.account.keys[2].privkey, memo_key, JSON.stringify(user_data)).then(res => {
					resolve(config.toHex(res));
				}, err => {
					console.log(' -- encryptUserData #3');
					console.log(err);
					reject(err);
				})

			} , err => {
				console.log(' -- encryptUserData #4');
				console.log(err);
				reject(err);
			})
		});
	}
	
	_generateUnsignedTx(to, endorse_type) {				
		return new Promise( (resolve, reject) => {
			
			let user_data = this.state.profile;
			console.log(JSON.stringify(user_data));
			this.encryptUserData(user_data, endorse_type).then( (encrypted_user_data) => {
				console.log(encrypted_user_data);
				tx = {
					'expiration' : this.dateAdd(new Date(),'second',120).toISOString().substr(0, 19),
					'ref_block_num'     : this.props.blockchain.refBlockNum,
					'ref_block_prefix'  : this.props.blockchain.refBlockPrefix,
					'operations' : [
						 [
							0,
							{
								from   : this.props.account.id,
								to     : config.PROPUESTAPAR_ID, //https://www.cryptofresh.com/u/propuesta-par ID de propuesta-par
								amount : {
									amount   : 1,
									asset_id : endorse_type
								},
								memo   : {message:config.toHex(config.I_ENDORSE_PREFIX+':'+to)}
							}
						]
					]
				}
				if(encrypted_user_data){
					tx.operations.push([
																35,
																{
																	payer            : this.props.account.id,
																	data             : encrypted_user_data
																}
															]);
				}
				let ops_for_fee = [JSON.stringify(tx.operations[0])];
				if(encrypted_user_data){
					ops_for_fee.push(JSON.stringify(tx.operations[1]));
				}	
				
				Bts2helper.calcFee(JSON.stringify(this.props.fees), ops_for_fee, JSON.stringify(this.props.asset.options.core_exchange_rate)).then( res => {
					tx.operations[0][1].fee = {
						asset_id  : config.MONEDAPAR_ID,
						amount    : res[0]
					}
					if(res.length>1){
						tx.operations[1][1].fee = {
							asset_id  : config.MONEDAPAR_ID,
							amount    : res[1]
						}	
					}
					resolve(tx);
				}, err => {
					reject(err);
				});
					
					
			}, err => {
				reject(err);
			});
		}); //Promise
	}
	
	
		_onConfirm(){
// 		if(!this.state.can_confirm)
// 		{
// 			Alert.alert(
// 				'Fondos insuficientes',
// 				'No dispone de fondos suficientes para realizar la operación.',
// 				[
// 					{text: 'OK'},
// 				]
// 			)
// 			return;
// 		}		
		
// 		console.log(' ==> this.props.balance', this.props.balance);
// 		let final_amount = Number(this.state.fee_txt); 
// 		let disp = (Number(this.props.balance[config.MONEDAPAR_ID])); // - Number(this.props.balance[0])).toFixed(2);

// 		console.log(disp, final_amount);
// 		if(Number(disp) < final_amount)
// 		{
// 			Alert.alert(
// 				'Fondos insuficientes',
// 				'No dispone de fondos suficientes para realizar la operación.',
// 				[
// 					{text: 'OK'},
// 				]
// 			)
// 			return;
// 		}
		
		this.props.navigator.showModal({
			screen : 'endorsement.Sending',
			title :  'Autorizando crédito...',
			passProps: {endorsed 			: this.state.endorsed,
									endorse_type 	: this.state.endorse_type,
								  modal_type		: 'endorsing'},  // | sharing
			animationType: 'slide-up',
			navigatorStyle: {navBarHidden:true}
		});
		
// 		if(this.state.endorse_type!=config.AVAL1000_ID)
// 		{
					
// 		}
		this._generateUnsignedTx(this.state.endorsed, this.state.endorse_type).then( res => {
			this._addSignature(res, this.props.account.keys[1].privkey).then( tx => {

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
						if(responseJson && responseJson.error) {
							this._onSendingError(responseJson.error);
							return;
						}	

						this.props.navigator.dismissModal({
								animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
						});
						this.props.navigator.push({
								screen:     'endorsement.Result',
								title:      'Envío exitoso',
								passProps:  {
										endorsed 			: this.state.endorsed,
										endorse_type 	: this.state.endorse_type,
										modal_type		: 'endorsing'
								},
								navigatorStyle: {navBarHidden:true}
						});
				}, err => {
						this._onSendingError(err);
				});

			}, err => {
				this._onSendingError(err);
			});
			
		}, err => {
			this._onSendingError(err);
		})
		
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
  	console.log('EndorseConfirm => componentWillReceiveProps');
	}

  componentDidMount() {
		// this._getTx();
  }

  componentWillUnmount() {
  }
  
  focus() {
  }

  render() {
  	let title = 'Crédito a autorizar';
  	
  	let btn_style = styles.fullWidthButton2;
		let txt_style = styles.fullWidthButtonText;
		if(!this.state.can_confirm)
		{
			btn_style = styles.fullWidthButtonDisabled;
			txt_style = styles.fullWidthButtonTextDisabled;
		}
    
		let send_disabled = !this.state.can_confirm;
		// let total = this.getTotal();
		let fee = this.state.fee_txt.toFixed(2);
		return (
      <View style={[styles.container]}>
				<ScrollView style={{paddingBottom:90}} contentContainerStyle={{ flexDirection:'column'}}>
					<View style={{flex:5, backgroundColor:'#2e2f3d', paddingTop:30, paddingRight:0, paddingBottom:30}}>
						<Text style={styles.title_part}>{title}</Text>
						<View style={{alignItems:'center',paddingTop:20, justifyContent:'center'}}>
							{this._draw_endorsements()}
						</View>
						<Text style={styles.title_part}>Costo aproximado:</Text>
						<Text style={styles.data_part_small}>$ {fee}</Text>
					</View>
				</ScrollView>
				<View style={{flex:1, flexDirection:'column', alignItems:'stretch', justifyContent:'flex-end' }}>
					<TouchableHighlight
							disabled={send_disabled}
							style={[styles.fullWidthButton, btn_style]}
							onPress={this._onConfirm.bind(this)}  >
						<Text style={txt_style}>AUTORIZAR</Text>
					</TouchableHighlight>
				</View>
				<KeyboardSpacer />
			</View>
			
    );
  }


  _draw_endorsements(){
		let entry_       = fn_avales.getAvalByKey(this.state.endorse_type, avales);
// 		if(entry_ && entry_.length>0)
		if(entry_)
		{
// 			let entry = entry_[0];
			let entry = entry_;
			entry.user_name = this.state.endorsed;
			entry.quantity  = 1;
			return (	
									<SliderEntryMicro
										key={`carousel-entry-${0}`}
										{...entry}
									/>
							);
		}
		return undefined;
	}

}

function mapStateToProps(state, ownProps) {
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

export default connect(mapStateToProps, mapDispatchToProps)(EndorseConfirm);