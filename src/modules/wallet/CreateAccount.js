import React, { PropTypes, Component } from 'react';
import {
	Alert,
	Button,
	Image,
	Text,
	TextInput,
	TouchableHighlight,
	View
} from 'react-native';

import styles from './styles/CreateAccount';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import * as config from '../../constants/config';
import Bts2helper from '../../utils/Bts2helper';
import HideWithKeyboard from 'react-native-hide-with-keyboard';

class Start extends Component {

	constructor(props) {
		super(props);
		this._onNewAccount 			= this._onNewAccount.bind(this);
		this._onChangeText      = this._onChangeText.bind(this);
		this._onFocusText 			= this._onFocusText.bind(this);
		this._onBlurText 				= this._onBlurText.bind(this);
		this.state = {
			account_name: 		'',
			refreshing: false,
			disabled:   true,
			error:			'',
			input_focused: false
		}
	}

	static navigatorStyle = {
    navBarTextColor: '#666',
    navBarBackgroundColor: '#ffffff',
    navBarButtonColor: '#666',
		navBarTextFontFamily: 'Montserrat-Regular',
		topBarElevationShadowEnabled: false
  }
	/*
	isValidAccountName(account_name) {
		var dot, subname, supername;
		if (!account_name) {
// 			console.log('1');
			return false;
		}
		if (account_name.length < 1) {
// 			console.log('2');
			return false;
		}
		if (account_name.length > 63) {
// 			console.log('3');
			return false;
		}

		//if (!(/^[a-z]/i.test(account_name))) {
		if (!(/^[a-z]/.test(account_name))) {
// 			console.log('4');
			return false;
		}
		//if (!(/[a-z0-9]$/i.test(account_name))) {
		if (!(/[a-z0-9]$/.test(account_name))) {
// 			console.log('5');
			return false;
		}
		if (/[A-Z]$/.test(account_name)) {
// 			console.log('6');
			return false;
		}
		subname = account_name;
		supername = "";
		dot = account_name.indexOf('.');
		if (dot !== -1) {
			subname = account_name.substring(0, dot);
			supername = account_name.substring(dot + 1);
		}
		//if (!(/[a-z0-9]$/i.test(subname) || /[A-Z]$/.test(subname))) {
		if (!(/[a-z0-9]$/.test(subname) || /[A-Z]$/.test(subname))) {
// 			console.log('7');
			return false;
		}
		//if (!(/[a-z0-9-\.]$/i.test(subname))) {
		if (!(/[a-z0-9-\.]$/.test(subname))) {
// 			console.log('8');
			return false;
		}
		if (supername === "") {
// 			console.log('9');
			return true;
		}
		return this.isValidAccountName(supername);
	}
  */
	_onFocusText(){
		this.setState({input_focused:true});
	}
	_onBlurText(){
		this.setState({input_focused:false});
	}
	_onChangeText(text) {

		clearTimeout(this.tid);

		this.setState({
			error: 						'',
			refreshing: 			true,
			disabled: 				true,
			account_name: 	  text
		});

		console.log('CreateAccount::_onChangeText::#1');
		console.log(text);
		if(!text || text==''){
			this.setState({
				error: 			'',
				refreshing: false,
				disabled: 	true
			});
			return;
		}

		console.log('CreateAccount::_onChangeText::#2');
		let that = this;
		this.tid = setTimeout( () => {
			console.log('CreateAccount::_onChangeText::#3');
			
			if(text.startsWith('discoin.')){
					that.setState({
						error: 			'El nombre de cuenta no puede comenzar con "discoin."',
						refreshing: false,
						disabled: 	true
					});
					return;
				}
			Bts2helper.isValidName(text).then( is_valid => {
				console.log('CreateAccount::_onChangeText::#4', is_valid);
				if(!is_valid){
					that.setState({
						error: 			'El nombre de cuenta debe estar compuesto de letras minúsculas, números, puntos y guiones, debe comenzar con una letra y finalizar con letra o número. Longitud mayor a 2 caracteres.',
						refreshing: false,
						disabled: 	true
					});
					return;
				}
				// fetch('http://35.161.140.21:8080/api/v1/account/'+text, {
				fetch(config.getAPIURL('/account/by_name/')+text, {
					method: 'GET',
					headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
				})
				.then((response) => response.json()
					, (err) => {
						this.setState({
							error: 			'Error de red!',
							refreshing: false,
							disabled: 	true
						});
					}
				)
				.then((responseJson) => {
					console.log('CreateAccount::_onChangeText::#4');
					console.log(JSON.stringify(responseJson));
					if(responseJson && !responseJson['error'] ){
						console.log('CreateAccount::_onChangeText::#5');
						this.setState({
							error: 			'Ya existe un discoiner con ese nombre',
							refreshing: false,
							disabled: 	true
						});
					}
					else
					if(responseJson && responseJson['error'] && responseJson['res'] && responseJson['res']=='account_not_found' )
					// {"error":1,"res":"account_not_found"}
					{
						console.log('CreateAccount::_onChangeText::#6');
						this.setState({
							error: 			'',
							refreshing: false,
							disabled: 	false
						});
					}
				}, (err) => {
						this.setState({
							error: 			'Error de red!',
							refreshing: false,
							disabled: 	true
						});
					}
				)
				.catch((error) => {
					console.error(error);
					this.setState({
							error: 			error,
							refreshing: false,
							disabled: 	true
					});
				});
			}, error => {
					console.error(error);
					this.setState({
							error: 			error,
							refreshing: false,
							disabled: 	true
					});
			}); //Bts2helper.isValidName
		}
		, 400);
		//console.log(text);
	}

	_onNewAccount() {
		if(!this.state.account_name)
		{
			Alert.alert(
				'Atención',
				'Debe indicar un nombre para continuar.',
				[
					{text: 'OK'},
				]
			);
			return;
		}
		this.props.navigator.showModal({
			screen : 'wallet.NewAccount',
			title :  'Creando cuenta',
			passProps: {account_name: this.state.account_name},
			animationType: 'slide-up',
			navigatorStyle: {navBarHidden:true}
		});
	}

	_handleKeyDown(e) {
    if(e.nativeEvent.key == "Enter"){
        dismissKeyboard();
    }
	}

	render() {
		let _error = this.state.error;
		let showLogo = !this.state.input_focused;
		let btn_style = styles.fullWidthButton2;
		let txt_style = styles.fullWidthButtonText;
		if(this.state.disabled)
		{
			btn_style = styles.fullWidthButtonDisabled;
			txt_style = styles.fullWidthButtonTextDisabled;
		}
		return (

			<View style={styles.container}>
				{
					(showLogo)?
					(
							<View style={{flex:2, padding:15, flexDirection:'column', alignItems:'center', justifyContent:'flex-end' }}>
								<Image source={require('./img/logo.png')} style={{width: 150, height: 140}} />
							</View>
						):false
				}
				
				<View style={{flex:3, paddingLeft:15, paddingRight:15, flexDirection:'column', alignItems:'stretch', justifyContent:'center' }}>
						<TextInput
							autoCorrect={false}
							autoCapitalize='none'
							style={[styles.input, {fontFamily:'Montserrat-Regular', fontWeight:'100', paddingBottom:20}]}
							placeholderStyle={{fontFamily:'Montserrat-Regular', fontWeight:'100'}}
							placeholder="Ingrese su nombre"
							placeholderTextColor="#aaaaaa"
							underlineColorAndroid ="#ff7232"
							onChangeText={this._onChangeText}
							onFocus={this._onFocusText}
							onBlur={this._onBlurText}
						/>
						<Text style={styles.textError} numberOfLines={3} >{_error}</Text>

				</View>
				<View style={{flex:1, flexDirection:'column', alignItems:'stretch', justifyContent:'flex-end' }}>
					<TouchableHighlight
							disabled={this.state.disabled}
							style={[styles.fullWidthButton, btn_style]}
							onPress={ this._onNewAccount } >
						<Text style={txt_style}>CREAR CUENTA</Text>
					</TouchableHighlight>
				</View>
				<KeyboardSpacer />
      </View>
		);
	}
}


export default Start;
