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
import * as config from '../../constants/config';

class EndorseConfirm extends Component {
  
  static navigatorStyle = {
    navBarTextColor: '#ffffff', 
//     navBarBackgroundColor: '#0B5F83',
		navBarBackgroundColor: '#2e2f3d',
    navBarButtonColor: '#ffffff'
  }
  
  constructor(props) {
    super(props);
  
    this.state = {
      share_or_endorse 	: props.share_or_endorse,
      endorsements 			: props.endorsements,
      endorsed 					: props.endorsed,
      endorse_type      : props.share_or_endorse=='share'?null:props.endorse_type,
			endorse_index     : props.share_or_endorse=='share'?null:props.endorse_index,
			tx								: null,
			fee								: 0,
			fee_txt						: 0.6, 		// hack
			can_confirm				: true, 	// hack
			error 						: ''
    }
		
		this._onSendingError = this._onSendingError.bind(this);

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
  
	_generateUnsignedTx(to, endorse_type) {				
		return new Promise( (resolve, reject) => {
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
							memo   : {message:config.toHex(config.ENDORSE_PREFIX+to)}
						}
					]
				]
			}

			Bts2helper.calcFee(JSON.stringify(this.props.fees), [JSON.stringify(tx.operations[0])], JSON.stringify(this.props.asset.options.core_exchange_rate)).then( res => {
				tx.operations[0][1].fee = {
					asset_id  : config.MONEDAPAR_ID,
					amount    : res[0]
				}
				resolve(tx);
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
									endorse_index : this.state.endorse_index,
								  modal_type		: 'endorsing'},  // | sharing
			animationType: 'slide-up',
			navigatorStyle: {navBarHidden:true}
		});
		
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
										endorse_index : this.state.endorse_index,
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
  	let share_or_endorse_text = 'Crédito a otorgar';
  	if (this.state.share_or_endorse=='share')
  		share_or_endorse_text = 'Avales a compartir';
  	
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
		
// 		<Text style={styles.title_part}>A:</Text>
// 		<Text style={styles.data_part}>{this.state.endorsed[0]}</Text>
					
		return (
      <View style={[styles.container]}>
				<ScrollView style={{paddingBottom:90}} contentContainerStyle={{ flexDirection:'column'}}>
					<View style={{flex:5, backgroundColor:'#2e2f3d', paddingTop:30, paddingRight:0, paddingBottom:30}}>
						<Text style={styles.title_part}>{share_or_endorse_text}</Text>
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
						<Text style={txt_style}>ENVIAR</Text>
					</TouchableHighlight>
				</View>
				<KeyboardSpacer />
			</View>
			
    );
  }


  _draw_endorsements(){
  	if(isNaN(this.state.endorse_index))
		{
			ToastAndroid.show('No Vino numero!', ToastAndroid.SHORT);
			return null;
		}
// 		if(!this.state.endorse_index)
// 		{
// 			ToastAndroid.show('Vino nada!', ToastAndroid.SHORT);
// 			return null;
// 		}
// 		ToastAndroid.show(this.state.endorse_index.toString(), ToastAndroid.SHORT);	
    let entry 			= avales[this.state.endorse_index];
		entry.user_name = this.state.endorsed;
		entry.quantity  = 1;
    return (	
                <SliderEntryMicro
                  key={`carousel-entry-${0}`}
                  {...entry}
                />
            );
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