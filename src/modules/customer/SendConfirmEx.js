import React, { PropTypes, Component } from 'react';

import {
  Alert,
	Image, 
	Text,
	TouchableHighlight,
	View,
	ScrollView

} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from '../wallet/wallet.actions';
import styles from './styles/SendConfirmEx';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Icon} from 'native-base';
import { iconsMap } from '../../utils/AppIcons';
import Bts2helper from '../../utils/Bts2helper';

import * as config from '../../constants/config';

class SendConfirmEx extends Component {

  static navigatorStyle = {
    navBarTextColor: '#666', 
    navBarTextFontSize: 14,
    navBarComponentAlignment: 'center',
    navBarBackgroundColor: '#ffffff',
    navBarButtonColor: '#000000',
    navBarTextFontFamily: 'Montserrat-Medium',
    topBarElevationShadowEnabled: false,
  }

  constructor(props) {
    super(props);

    this.state = {
      recipient : {
        name:					props.recipient[0],
        account_id:		props.recipient[1],
      },
			amount : 				props.amount,
			identicon: 			'',
			memo_key: 			props.memo_key,
      memo :   				props.memo,
			
			tx: 		 				null,
			fee:     				0,
			fee_txt: 				0,
			can_confirm: 		false,
			error:   				''
    }

		this._onSendingError = this._onSendingError.bind(this);
		this._buildMemo = this._buildMemo.bind(this);
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
				'expiration' : config.dateAdd(new Date(),'second',120).toISOString().substr(0, 19),
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
      console.log(' -- generateTX:', JSON.stringify(tx));
      console.log(' -- this.props.asset:', JSON.stringify(this.props.asset));
      console.log(' -- this.props.fees:', JSON.stringify(this.props.fees));
      console.log(' -- this.props.core_exchange_rate:', JSON.stringify(this.props.asset.options.core_exchange_rate));

      // get_fees_for_tx
      // {
      //     "fees": [
      //         {
      //             "amount": 20,
      //             "asset_id": "1.3.9"
      //         }
      //     ]
      // }
			fetch(config.getAPIURL('/get_fees_for_tx'), {
				method: 'POST',
				headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({
            tx : tx,
        })
			})
			.then((response) => response.json()
				, err => {
          this._onGetTxError('#X -- '+JSON.stringify(err));
          reject(err);
				})
			.then((responseJson) => {
        	tx.operations[0][1].fee = {
  					asset_id  : responseJson['fees'][0]['asset_id'], //params.asset.id,
  					amount    : responseJson['fees'][0]['amount']
  				}
  				resolve(tx);
			}, err => {
				this._onGetTxError('#Y -- '+JSON.stringify(err));
        reject(err);
			});

			// Bts2helper.calcFee(JSON.stringify(this.props.fees), [JSON.stringify(tx.operations[0])], JSON.stringify(this.props.asset.options.core_exchange_rate)).then( res => {
			// 	tx.operations[0][1].fee = {
			// 		asset_id  : params.asset.id,
			// 		amount    : res[0]
			// 	}
			// 	resolve(tx);
			// }, err => {
      //   console.log(' -- ERROR: Bts2helper.calcFee ERROR: ' + JSON.stringify(err));
			// 	reject(err);
			// });


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
			screen : 'customer.SendingEx',
			title :  'Enviando...',
			passProps: {recipient : this.state.recipient,
									amount :    this.state.amount,
									memo :      this.state.memo,
								  modal_type: 'sending'},
			animationType: 'slide-up',
			navigatorStyle: {navBarHidden:true}
		});
		//HACK aca tengo que poner return; para fixear la ventana sendingEX y editarla
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
							screen:     'customer.SendResultEx',
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
  	console.log('SendConfirmEx => componentWillReceiveProps');
	}

  componentDidMount() {
		let identicon = config.getIdenticon(this.state.recipient.name);
    this.setState({ identicon : identicon });
    
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
    let memo 				= this.state.memo;
		let memo_style 	= styles.data_part;
		let show_memo 	= true;
		if(!memo || memo==''){
			memo 					='-sin mensaje-';
			memo_style 		= styles.data_part_empty;
			show_memo 		= false;
		}
		let send_disabled = !this.state.can_confirm;
		let total = this.getTotal();
		let fee = this.state.fee_txt.toFixed(2);
		let otherIcon = (<Image style={{width: 40, height: 40, resizeMode: Image.resizeMode.contain, borderWidth: 0}} source={{uri: this.state.identicon}}/>)
		
		let userIcon = (<Image style={{width: 50, height: 50, resizeMode: Image.resizeMode.contain, borderWidth: 0}} source={{uri: this.state.identicon}}/>)
		const iconUser   = (<Icon name='md-person' style={{fontSize: 20, color: '#666'}}/>);

		let imgData = 'data:image/png;base64,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';
		let icon = iconUser;
		
		return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexDirection:'column', padding:20, paddingTop: 0}}>


          <View justifyContent="center" alignItems='center' flexDirection='column'>
            <View style={styles.amountQuantityView}>
              <View style={styles.amountQuantityCard}>
                <Image style={{width: 13, height: 13, resizeMode: Image.resizeMode.contain, opacity: 0.7, borderWidth: 0, marginRight: 5}} source={{uri: imgData}}/>
                <Text style={styles.amountQuantity}>{total}</Text>
              </View>
            </View>
            <View style={styles.feeView}>
              <View style={styles.feeCard}>
                <Text style={styles.label}>Comisión</Text>
                <Text>{fee}</Text>
              </View>
            </View>
          </View>

          <View flexDirection='row' justifyContent='center' alignItems='center'>  
            <View style={styles.fromToView}>
              <Text style={styles.label}>DE</Text>
              <View style={styles.fromToCard}>
                <View style={styles.fromToThumb}>
                	{userIcon}
                </View>
                <Text style={styles.text}>{this.props.account.name}</Text>
              </View>
            </View>
            <Icon name='md-arrow-round-forward' style={{color:'#CCC'}}/>
            <View style={styles.fromToView}>
              <Text style={styles.label}>A</Text>
              <View style={styles.fromToCard}>
                <View style={styles.fromToThumb}>
                	{otherIcon}
              	</View>
                <Text style={styles.text}>{this.state.recipient.name}</Text>
              </View>
            </View>
          </View>





        <View style={{marginTop:0, paddingTop:0, paddingLeft:10, paddingRight:10}}>
          <View style={{ alignSelf: 'stretch', flexDirection:'column'}}>
            <View>
              <Text style={styles.label}>MENSAJE</Text>
            </View>  
            
            <View style={{ minHeight: 160, borderRadius: 4, marginTop: 10, alignSelf: 'stretch', flexDirection:'row', backgroundColor:'#f5f9fd', padding:10, justifyContent:'flex-start'}}>
            	<Text style={[styles.memo_style, memo_style]}>{memo}</Text>
            </View>
          </View>
        </View>

		<TouchableHighlight style={styles.btnTouchable} onPress={ this._onConfirm.bind(this) } >
		  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#ff9e5d', '#ff7233']} style={styles.btnGradient}>
		    <Text style={styles.btnTxt}>CONTINUAR</Text>
		  </LinearGradient>
		</TouchableHighlight>

		</ScrollView>

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

export default connect(mapStateToProps, mapDispatchToProps)(SendConfirmEx);
