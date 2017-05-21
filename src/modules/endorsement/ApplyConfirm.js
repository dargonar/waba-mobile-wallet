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

class ApplyConfirm extends Component {
  
  static navigatorStyle = {
    navBarTextColor: '#ffffff', 
		navBarBackgroundColor: '#2e2f3d',
    navBarButtonColor: '#ffffff',
		navBarTextFontFamily: 'roboto_thin'
  }
  
  constructor(props) {
    super(props);
  	
		let _avales = fn_avales.getAvales().filter((entry) => {
			if( entry.asset_id in this.props.balance) 
				if( this.props.balance[entry.asset_id] > 0 )
				return true;
			return false;
		});
		
		this.state = {
			can_confirm				: true,
			error 						: '',
			endorse_type      : _avales[0].asset_id,
			entry 					  : _avales[0]
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

	_onConfirm(){
		
		this.props.navigator.showModal({
			screen : 'endorsement.Sending',
			title :  'Solicitando autorización de crédito...',
			passProps: {endorsed 			: this.props.account.name,
									endorse_type 	: this.state.endorse_type,
								  modal_type		: 'applying'},  // | endorsing | sharing
			animationType: 'slide-up',
			navigatorStyle: {navBarHidden:true}
		});
		
		
		walletActions.endorseApply(this.props.account.name, this.state.endorse_type).then( (res) => {
			console.log('endorseApply =>', JSON.stringify(res.tx));
			this._addSignature(res.tx, this.props.account.keys[1].privkey).then( tx => {
		
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
								title:      'SOLICITUD DE CREDITO ENVIADA',
								passProps:  {
										endorsed 			: this.props.account.name,
										endorse_type 	: this.state.endorse_type,
										modal_type		: 'apply'
								},
								navigatorStyle: {navBarHidden:true}
						});
				}, err => {
						this._onSendingError(err);
				});

			}, err => {
				this._onSendingError(err);
			});

			//this.setState({can_confirm:true, tx:res.tx, fee_txt:res.tx.operations[0][1].fee.amount/config.ASSET_DIVIDER});
		}, err => {
			console.log('createEndorsement ERR =>', JSON.stringify(err));
			//this.setState({can_confirm:false, tx:null});
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
  	console.log('ApplyConfirm => componentWillReceiveProps');
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
					
		return (
      <View style={[styles.container]}>
				<ScrollView style={{paddingBottom:90}} contentContainerStyle={{ flexDirection:'column'}}>
					<View style={{flex:5, backgroundColor:'#2e2f3d', paddingTop:30, paddingRight:0, paddingBottom:30}}>
						<Text style={styles.title_part}>Tienes un crédito preacordado</Text>
						<View style={{alignItems:'center',paddingTop:20, justifyContent:'center'}}>
							{this._draw_endorsements()}
						</View>
					</View>
				</ScrollView>
				<View style={{flex:1, flexDirection:'column', alignItems:'stretch', justifyContent:'flex-end' }}>
					<TouchableHighlight
							disabled={send_disabled}
							style={[styles.fullWidthButton, btn_style]}
							onPress={this._onConfirm.bind(this)}  >
						<Text style={txt_style}>ACEPTAR CREDITO</Text>
					</TouchableHighlight>
				</View>
				<KeyboardSpacer />
			</View>
			
    );
  }


  _draw_endorsements(){
//   	if(isNaN(this.state.endorse_index))
// 		{
// 			ToastAndroid.show('No Vino numero!', ToastAndroid.SHORT);
// 			return null;
// 		}

    let entry = this.state.entry;
		entry.user_name = this.props.account.name;
		entry.quantity = 1;
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
		account : state.wallet.account,
		balance : state.wallet.balance,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(walletActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplyConfirm);