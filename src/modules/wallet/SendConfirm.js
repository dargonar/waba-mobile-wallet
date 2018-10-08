import React, { PropTypes, Component } from 'react';

import {
  Image,
  Alert,
	Text,
	TouchableHighlight,
	View,
	ScrollView

} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from './wallet.actions';
import styles from './styles/SendConfirm';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Icon} from 'native-base';
import Bts2helper from '../../utils/Bts2helper';
import { iconsMap } from '../../utils/AppIcons';
import * as config from '../../constants/config';

class SendConfirm extends Component {

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
        account_id:		props.recipient[1]
      },
      identicon 	: '',
			memo_key 		: props.memo_key,
      amount 			: props.amount,
      memo 				: props.memo,
			tx 					: null,
			fee 				: 0,
			fee_txt 		: 0,
			can_confirm : false,
			error 			:   ''

    }
    console.log(' --- SendConfirm::');
    console.log(props.amount);
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
		// console.log(' ---------------- _generateUnsignedTx', params);
		// console.log((Number(params.amount)*Math.pow(10,params.asset.precision))>>0);
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
      // console.log(' -- this.props.asset:', JSON.stringify(this.props.asset));
      // console.log(' -- this.props.fees:', JSON.stringify(this.props.fees));
      // console.log(' -- this.props.core_exchange_rate:', JSON.stringify(this.props.asset.options.core_exchange_rate));

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
					console.log('## get_fees_for_tx -- '+JSON.stringify(responseJson));
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

		// console.log(' ---- SendConfirm._getTx()')
		// console.log(this.props.account.id, this.state.recipient.account_id, this.state.amount);
		// return;
		console.log(' ---- SendConfirm._getTx()')
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

		let total_amount = this.getTotal();
		this.props.navigator.showModal({
			screen : 'wallet.Sending',
			title :  'Enviando...',
			passProps: {recipient : this.state.recipient,
									amount :    total_amount,
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
									amount :    total_amount,
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
		
		let disabled_btn_style = (!this.state.can_confirm)?styles.fullWidthButtonDisabled:{};

  	let memo = this.state.memo;
		let memo_style = null;
		if(!memo || memo==''){
			memo='-sin mensaje-';
			memo_style = styles.memo_empty;
		}
		let send_disabled = !this.state.can_confirm;
		let total = this.getTotal();
		let fee = this.state.fee_txt.toFixed(2);
		let otherIcon = (<Image style={{width: 40, height: 40, resizeMode: Image.resizeMode.contain, borderWidth: 0}} source={{uri: this.state.identicon}}/>)
		let imgData = config.getRedDiscoinIcon();
		const userIcon = (<Image style={{width: 40, height: 40, resizeMode: Image.resizeMode.contain, borderWidth: 0}} source={{uri: this.state.identicon}}/>)
		// const iconUser   = (<Icon name='user-circle' type='FontAwesome' style={{fontSize: 20, color: '#666'}}/>);
    // const iconBiz    = (<Icon name='store' type='MaterialCommunityIcons' style={{fontSize: 20, color: '#666'}}/>);
    const iconUser   = (<Icon name='md-person' style={{fontSize: 20, color: '#666'}}/>);
    // const iconBiz    = (<Icon name='store' style={{fontSize: 20, color: '#666'}}/>);
    const iconBiz    = (<Image source={iconsMap['store']} style={{resizeMode:'contain', height:20,width:20}} />);
		// let iconNext = (<Icon name='keyboard-arrow-right' type='MaterialIcons' style={{fontSize: 20, color: '#fff'}}/>);
		let iconNext = (<Icon name='ios-arrow-forward' type='MaterialIcons' style={{fontSize: 20, color: '#fff'}}/>);
    // HACK
    let icon = iconUser;
    if(Math.random()>0.5)
      icon = iconBiz;
    

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

        {/*<View style={{marginTop:0, paddingTop:0, paddingLeft:10, paddingRight:10}}>
          <View style={{ alignSelf: 'stretch', flexDirection:'column'}}>
            <View>
              <Text style={styles.label}>MENSAJE</Text>
            </View>  
            
            <View style={{ minHeight: 160, borderRadius: 4, marginTop: 10, alignSelf: 'stretch', flexDirection:'row', backgroundColor:'#f5f9fd', padding:10, justifyContent:'flex-start'}}>
            	<Text style={[styles.memo_style, memo_style]}>{memo}</Text>
            </View>
          </View>
        </View>*/}

			<TouchableHighlight style={[styles.btnTouchable, disabled_btn_style]} onPress={() => {this._onConfirm.bind(this)}} >
			  
			  { (this.state.can_confirm)?
					  (<LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#ff9e5d', '#ff7233']} style={styles.btnGradient}>
  					    <Text style={styles.btnTxt}>CONTINUAR</Text>
  					  </LinearGradient>)
					  :

			    (<Text style={styles.btnTxt}>CONTINUAR</Text>)
			  }
			  
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

export default connect(mapStateToProps, mapDispatchToProps)(SendConfirm);
