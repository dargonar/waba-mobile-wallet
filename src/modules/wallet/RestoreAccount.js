import React, { PropTypes, Component } from 'react';

import {
  Alert,
	Keyboard,
  ListView,
  Text, 
  TextInput,
	TouchableHighlight,
  View
	
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from './wallet.actions';
import styles from './styles/RestoreAccount';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import * as config from '../../constants/config';

import { AsyncStorage } from 'react-native'
import UWCrypto from '../../utils/Crypto';
import * as helperActions from '../../utils/Helper.js';

class RestoreAccount extends Component {
  
  static navigatorStyle = {
    navBarTextColor: '#ffffff', 
    navBarBackgroundColor: '#3F779D',
    navBarButtonColor: '#ffffff',
		navBarTextFontFamily: 'roboto_thin'
  }
	
// 	let keyboardWillShowSub;
// 	let keyboardWillHideSub;
  
constructor(props) {
    super(props);
    this._onChangeText        = this._onChangeText.bind(this);
    this._onClearButtonPress  = this._onClearButtonPress.bind(this);
    this._onRestoreAccount    = this._onRestoreAccount.bind(this);
//     this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
		
		this.state = {
			words : '',
			keyboardOpen: false
		};
  }
  
//   _onNavigatorEvent(event) { 
//     if (event.type == 'NavBarButtonPress') { 
//       if (event.id == 'clearMemo') { 
//         console.log(this.props.actions);
// 				this.props.actions.memoSuccess('');
// 				//this.setState({memo:''});
//       }
//     }
//   }
	
	_onRestoreError(msg){
		this.props.navigator.dismissModal({
			animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
		});
		Alert.alert(
			'Restaurar cuenta',
			msg,
			[
				{text: 'OK'},
			]
		)
	}

  _onRestoreAccount() {
  	let words = this.state.words || '';
		words = words.trim();
		
		if(!words) {
			this._onRestoreError('Debe ingresar las palabras.');
			console.log('No hay words');
			return;
		}

		//console.log('words =>', words);
		
		this.props.navigator.showModal({
			screen : 'wallet.Sending',
			title :  'Restaurando cuenta...',
			passProps: {recipient : this.state.recipient,
									amount :    this.state.amount,
									memo :      this.state.memo,
								  modal_type: 'restore_account' },
			animationType: 'slide-up',
			navigatorStyle: {navBarHidden:true}
		});
		
		let that = this;
		
		UWCrypto.mnemonicToMasterKey(words).then( res => {
			
			let p = []
			Promise.all([ 
				UWCrypto.derivePrivate('', '', res.masterPrivateKey, 1),
				UWCrypto.derivePrivate('', '', res.masterPrivateKey, 2),
				UWCrypto.derivePrivate('', '', res.masterPrivateKey, 3)
			]).then(function(res2) {
				console.log('RESTORE ACCOUNT::PUBKEY', res2[0].pubkey);
				console.log('RESTORE ACCOUNT::PUBKEY', res2[1].pubkey);
				console.log('RESTORE ACCOUNT::PUBKEY', res2[2].pubkey);
				fetch( config.getAPIURL('/find_account', this.props.program), {
// 				fetch('http://35.161.140.21:8080/api/v1/find_account', {
					method: 'POST',
					headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
					body: JSON.stringify({
						key: 	res2[1].pubkey,
					})
				})
				.then((response) => response.json()
						 , err => { that._onRestoreError(JSON.stringify(err));	}
				) 
				.then((responseJson) => {
					if(responseJson.error || !responseJson.length){
						console.log(' -- no hay cuenta', responseJson.error, responseJson.length);
						that._onRestoreError('No existe una cuenta relacionada con las palabras ingresadas.');
						return;
					} else {
						
						let account = {
							mnemonic   : words,
							keys       : res2,
							name       : responseJson[0], //.name
							id         : responseJson[1] //.id
						};

						AsyncStorage.setItem('@Store:data', JSON.stringify(account)).then( () => {
							that.props.actions.createAccountSuccessHACK(account);
							helperActions.launchWallet();
							
							setTimeout( function() {
								that.props.actions.retrieveHistory(
									that.props.account.name, 
									that.props.account.keys,
									!that.props.account.id);  
							}, 1500);
							
						}, err => {
							that._onRestoreError(JSON.stringify(err));
						});
					}
				}
					, err => { that._onRestoreError(JSON.stringify(err));	}
				)
				.catch((error) => {
					console.error(error);
					that._onRestoreError(JSON.stringify(error));
					return;
				});

				
			});
		}, err => {
			that._onRestoreError(JSON.stringify(err));
		});
	}

  _onChangeText(words) {
  	this.setState({words:words});
	}
  
	_onClearButtonPress() {
  
	}
  
  _onLoadKeys(){
  // Something
  // 		this.props.navigator.pop();
  }

  _keyboardWillShow() {
    this.setState({keyboardOpen: true});
		console.log("-- _keyboardWillShow EVENT", this.state.keyboardOpen);
  }

  _keyboardWillHide() {
    this.setState({keyboardOpen: false});
		console.log("-- _keyboardWillHide EVENT", this.state.keyboardOpen);
  }

  componentWillReceiveProps(nextProps) {
  }

  componentDidMount() {
  }

  componentWillMount() {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow);
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }
  
  focus() {
  }

  render() {
  	// autoFocus={true}
    // <KeyboardSpacer />
// 		<Button buttonStyle={{flex: 1, backgroundColor:"#2c3f50", marginLeft:0, marginRight:0 }}  underlayColor="#546979"
// 					onPress={this._onRestoreAccount} title='RESTAURAR CUENTA' />
		// defaultValue="cielo encargo hurto timo rodilla triste alerta tacto paquete secta sidra víctima"
		// defaultValue="ceder tregua desfile jornada yerno sexto gajo poema lámpara mostrar talento algodón"
		// defaultValue="recaer líder alivio pecado vereda aire moneda oasis reposo haz iris altura"
		console.log("-- this.state.keyboardOpen", this.state.keyboardOpen);
		let mensaje = undefined;
		if(this.state.keyboardOpen==false)
		{
			mensaje = (<View style={{flex:2, justifyContent:'center', alignItems:'center', padding:15, backgroundColor: '#3F779D'}}>
						<Text style={styles.keywordsTitle} numberOfLines={4}>
							Para restaurar su cuenta ingrese las palabras resguardadas en el momento de la creación de su cuenta respetando 
							orden y minúscula/mayúscula. 
						</Text>
					</View>);	
		}
		return (
      <View style={styles.container}>
        	{mensaje}
				
        <TextInput
          style={{flex:4, fontSize:25}}
          editable={true}
          //maxLength={120}
          multiline={true}
          textAlignVertical='top'
					underlineColorAndroid ="transparent"
					onChangeText={this._onChangeText}
        />
         	<TouchableHighlight
							style={styles.fullWidthButton}
							onPress={this._onRestoreAccount} >
						<Text style={styles.fullWidthButtonText}>RESTAURAR CUENTA</Text>
					</TouchableHighlight>
        
			 </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
	return {
		memo: state.wallet.new_keys,
    account: state.wallet.account,
    program    : state.wallet.program
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(walletActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RestoreAccount);

