import React, { PropTypes, Component } from 'react';

import {
  Alert,
	Text,
	TouchableHighlight,
	View

} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from '../wallet/wallet.actions';
import styles from './styles/SwitchConfirm';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import Bts2helper from '../../utils/Bts2helper';
import * as helperActions from '../../utils/Helper.js';
import * as config from '../../constants/config';
import { AsyncStorage } from 'react-native'

class SwitchConfirm extends Component {

  static navigatorStyle = {
    navBarTextColor: '#ffffff',
    navBarBackgroundColor: '#f15d44',
    navBarButtonColor: '#ffffff',
		navBarTextFontFamily: 'roboto_thin',
    topBarElevationShadowEnabled: false
  }

  constructor(props) {
    super(props);

    this.state = {
      permission:         props.permission,
      business:           props.business,
      is_daily_request:   props.is_daily_request,
      can_confirm:        true,
			error:               ''
    }

		this._onSendingError = this._onSendingError.bind(this);

  }

	_addSignature(tx, privkey) {
		return new Promise( (resolve, reject) => {
			Bts2helper.txDigest( JSON.stringify(tx), config.CHAIN_ID).then( digest => {
				console.log('_addSignature txDigest =>', digest);
				Bts2helper.signCompact(digest, privkey).then( signature => {
					console.log('_addSignature signCompact =>', signature);
					// tx.signatures = [signature];
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

	_getUnsignedTx(perm) {
		console.log('_getUnsignedTx', perm);
    return new Promise((resolve, reject) => {
  		fetch(config.getAPIURL('/business/subaccount/withdraw/daily'), {
  			method: 'POST',
  			headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({
            business_id   : perm.withdraw_from_account,
            subaccount_id : perm.authorized_account
        })
  		})
  		.then((response) => response.json())
  		.then((responseJson) => {
        console.log(' -- wallet.actions:: call _getUnsignedTx: ')
        console.log(JSON.stringify(responseJson));
        resolve(responseJson);
        return;
      })
      .catch((error) => {
        console.error(error);
        this._onGetTxError('#X -- '+JSON.stringify(err));
        reject(error);
        return;
      });
    });
	}

	_onGetTxError(error){

		this.setState({
			tx: 		 			null,
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

	_onConfirm(){

    // It means user is just changing MODE.
    if (!this.state.is_daily_request)
    {
      // Confirm switch
      // Nos guardamos al comercio
      // Actualizamos local storage
      // Actualizamos local state
      AsyncStorage.getItem('@Store:data').then((value)=>{
        account               = JSON.parse(value);
        let subaccount        = {
          wallet_mode:  'subaccount',
          business:     this.state.business,
          permission:   this.state.permission
        }
        account['subaccount'] = subaccount;

        AsyncStorage.setItem('@Store:data', JSON.stringify(account));
        console.log(' *** SwitchConfirm');
        console.log(' saved account');
  			console.log(JSON.stringify(account));

        this.props.actions.createAccountSuccessHACK(account);

  			helperActions.launchWallet();
      });
    }

    // User is requesting/withdrawing daily budget.

    if(!this.state.is_daily_request)
		{
			return;
		}

		this.props.navigator.showModal({
			screen : 'wallet.Sending',
			title :  'Solicitando monto diario...',
			passProps: {
                  // recipient : this.state.recipient,
									// amount :    this.state.discount,
									// memo :      this.state.memo,
								  modal_type: 'claiming',
                  message:    'Solicitando monto'
                },
			animationType: 'slide-up',
			navigatorStyle: {navBarHidden:true}
		});

    this._getUnsignedTx(this.state.permission).then((tx) => {
      if('error' in tx)
      {
        console.log('-- CLAIMING DAILY - ERROR #1')
        this._onSendingError(tx.error);
        return;
      }
      console.log('-- CLAIMING DAILY - #1', JSON.stringify(tx));
      let my_tx = tx.tx

      /* --- */
      this._addSignature(my_tx, this.props.account.keys[1].privkey).then( signed_tx => {
        console.log('-- CLAIMING DAILY - ADDING SIG', JSON.stringify(signed_tx));

        fetch(config.getAPIURL('/push_tx'), {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({
                tx : signed_tx,
            })
        })
        .then((response) => response.json()
          , err => {
            console.log('-- CLAIMING DAILY - ERROR #2', err)
              this._onSendingError(err);
              return;
        })
        .then((responseJson) => {
            //console.log('Parece que cerramos bien', responseJson);
            if(responseJson && responseJson.error) {
              console.log('-- CLAIMING DAILY - ERROR #3', responseJson.error);
              this._onSendingError(responseJson.error);
              return;
            }

            this.props.navigator.dismissModal({
                animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
            });

            this.props.navigator.push({
                screen:     'wallet.SwitchResult',
                title:      'Solicitud exitosa',
                passProps:  {
                  permission: this.state.permission,
                  business:   this.state.business
                },
                navigatorStyle: {navBarHidden:true}
            });


        }, err => {
            this._onSendingError(err);
        });

      }, err => {
        this._onSendingError(err);
      })
      /* --- */
    }
    , err => {
      console.error('ERR1: ', err);
      this._onGetTxError('#1 -- '+JSON.stringify(err));
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
  	console.log('SwitchConfirm => componentWillReceiveProps');
	}

  componentDidMount() {
		// this._getUnsignedTx(this.state.permission).then((tx) => {
    // }
    // , err => {
    // });
  }

  componentWillUnmount() {
  }

  focus() {
  }

  renderDailyRequest() {

  }
  render() {
    let btn_style = styles.fullWidthButton2;
		let txt_style = styles.fullWidthButtonText;
		if(!this.state.can_confirm)
		{
			btn_style = styles.fullWidthButtonDisabled;
			txt_style = styles.fullWidthButtonTextDisabled;
		}
    let send_disabled = !this.state.can_confirm;
		let total = this.state.permission.withdrawal_limit.amount/config.ASSET_DIVIDER;

		let button_text = 'CONFIRMAR MODO';
    let title_text = 'Switch a modo subcuenta'
    if(this.state.is_daily_request)
    {
      button_text = 'INICIAR CAJA DIARIA'
      title_text = 'Solicitar monto diario'
    }
    return (
      <View style={styles.container}>
        <View style={{flex:5, backgroundColor:'#ffffff', paddingLeft:30, paddingTop:30, paddingRight:0, paddingBottom:30}}>
          <Text style={styles.title_part_big}>{title_text}</Text>
          <Text style={styles.title_part}>Comercio:</Text>
          <Text style={styles.data_part}>{this.state.business.name}</Text>
          <Text style={styles.title_part}>ID de Comercio:</Text>
          <Text style={styles.data_part}><Text style={styles.data_part_small}>{this.state.business.account}</Text></Text>
          <Text style={styles.title_part}>Monto diario:</Text>
          <Text style={styles.data_part}>D$C {total}</Text>

        </View>
				<View style={{flex:1, flexDirection:'column', alignItems:'stretch', justifyContent:'flex-end' }}>
					<TouchableHighlight
							disabled={send_disabled}
							style={[styles.fullWidthButton, btn_style]}
							onPress={this._onConfirm.bind(this)}  >
						<Text style={txt_style}>{button_text}</Text>
					</TouchableHighlight>
				</View>
				<KeyboardSpacer />

        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(SwitchConfirm);
