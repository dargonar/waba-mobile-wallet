import React, { PropTypes, Component } from 'react';
import { SearchBar } from 'react-native-elements'

import {
  Alert,
  ListView,
  Text, 
  TextInput,
  View
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from './wallet.actions';
import styles from './styles/RestoreAccount';
import { Button } from 'react-native-elements';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import * as config from '../../constants/config';

import { AsyncStorage } from 'react-native'
import UWCrypto from '../../utils/Crypto';
import * as helperActions from '../../utils/Helper.js';

class RestoreAccount extends Component {
  
  static navigatorStyle = {
    navBarTextColor: '#ffffff', 
    navBarBackgroundColor: '#1f475b',
    navBarButtonColor: '#ffffff'
  }
  
  constructor(props) {
    super(props);
    this._onChangeText        = this._onChangeText.bind(this);
    this._onClearButtonPress  = this._onClearButtonPress.bind(this);
    this._onRestoreAccount    = this._onRestoreAccount.bind(this);
//     this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
		
		this.state = {
			words : ''
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
		if(!words) {
			this._onRestoreError('Debe ingresar las palabras.');
			console.log('No hay words');
			return;
		}
		
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
		
// 		if(words=='p')
// 			words = 'orgía balanza vereda candil batir panal separar vector rasgo rumor tobillo carbón'; // pablo
// 		if(words=='t')
// 			words = 'candil pasión talón fraude favor baño pinza farol adorno manco verbo acudir'; // tuti
// 		words = 'curioso tripa torpedo unidad asno deseo reposo batir orador tira rapaz buitre';
		
		console.log('RESTORE ACCOUNT::WORDS', words);
		
		UWCrypto.mnemonicToMasterKey(words).then( res => {
			
			let p = []
			Promise.all([ 
				UWCrypto.derivePrivate('', '', res.masterPrivateKey, 1),
				UWCrypto.derivePrivate('', '', res.masterPrivateKey, 2),
				UWCrypto.derivePrivate('', '', res.masterPrivateKey, 3)
			]).then(function(res2) {
				console.log('RESTORE ACCOUNT::PUBKEY', res2[1].pubkey);
				fetch( config.getAPIURL('/find_account'), {
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
						console.log('no hay cuenta');
						that._onRestoreError('No existe una cuenta relacionada con las palabras ingresadas.');
						return;
					} else {
						
						let account = {
							mnemonic : words,
							keys     : res2,
							name     : responseJson[0] //.name
						};

						AsyncStorage.setItem('@Store:data', JSON.stringify(account)).then( () => {
							that.props.actions.createAccountSuccessHACK(account);
							helperActions.launchWallet();
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
  	// autoFocus={true}
    // <KeyboardSpacer />
		return (
      <View style={styles.container}>
        <View style={{flex:3, justifyContent:'center', alignItems:'center', padding:15, backgroundColor: '#415261'}}>
					<Text style={styles.keywordsTitle} numberOfLines={4}>
            Para restaurar su cuenta ingrese las palabras resguardadas en el momento de la creación de su cuenta respetando 
            orden y minúscula/mayúscula. 
          </Text>
				</View>
        <TextInput
          style={{flex:6, fontSize:25}}
          editable={true}
          //maxLength={120}
          multiline={true}
          textAlignVertical='top'
					underlineColorAndroid ="transparent"
					onChangeText={this._onChangeText}
        />
        <Button buttonStyle={{flex: 1, backgroundColor:"#2c3f50", marginLeft:0, marginRight:0 }}  underlayColor="#546979"
					onPress={this._onRestoreAccount} title='RESTAURAR CUENTA' />
				<KeyboardSpacer />
        </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
	return {
		memo: state.wallet.new_keys,
    account: state.wallet.account
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(walletActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RestoreAccount);

