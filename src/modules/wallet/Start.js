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

import styles from './styles/Start';
import { FormLabel, FormInput } from 'react-native-elements'
import KeyboardSpacer from 'react-native-keyboard-spacer';

class Start extends Component {

	constructor(props) {
		super(props);
		this._onNewAccount 			= this._onNewAccount.bind(this);
		this._onChangeText        = this._onChangeText.bind(this);
		this.state = {
			account_name: 		'',
			refreshing: false,
			disabled:   true,
			error:			''
		}
	}
	
	static navigatorStyle = {
    navBarTextColor: '#ffffff', 
    navBarBackgroundColor: '#1f475b',
    navBarButtonColor: '#ffffff'
  }
	
	isValidAccountName(account_name) {
		var dot, subname, supername;
		if (!account_name) {
			return false;
		}
		if (account_name.length < 1) {
			return false;
		}
		if (account_name.length > 63) {
			return false;
		}
		if (!/^[a-z]/i.test(account_name)) {
			return false;
		}
		if (!/[a-z0-9]$/i.test(account_name)) {
			return false;
		}
		if (/[A-Z]$/.test(account_name)) {
			return false;
		}
		subname = account_name;
		supername = "";
		dot = account_name.indexOf('.');
		if (dot !== -1) {
			subname = account_name.substring(0, dot);
			supername = account_name.substring(dot + 1);
		}
		if (!(/[a-z0-9]$/i.test(subname) || /[A-Z]$/.test(subname))) {
			return false;
		}
		if (!/[a-z0-9-\.]$/i.test(subname)) {
			return false;
		}
		if (supername === "") {
			return true;
		}
		return this.isValidAccountName(supername);
	}

	_onChangeText(text) {
		
		clearTimeout(this.tid);
		
		this.setState({
			error: 						'',
			refreshing: 			true,
			disabled: 				true,
			account_name: 	  text
		});
		
		
		if(!text || text==''){
			this.setState({
			error: 			'',
			refreshing: true,
			disabled: 	true
		});
			return;
		}
		
		let that = this;
		this.tid = setTimeout( () => {
			
			let is_valid = this.isValidAccountName(text);
			if(!is_valid){
				this.setState({
					error: 			'El nombre debe contener caracteres alfanuméricos en minúsculas y guiones, debe comenzar con una letra y no puede finalizar con un guión.',
					refreshing: false,
					disabled: 	true
				});
				return;
			}
			fetch('http://35.161.140.21:8080/api/v1/account/'+text, {
				method: 'GET',
				headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
			})
			.then((response) => response.json()) 
			.then((responseJson) => {
				if(responseJson){
					this.setState({
						error: 			'Ya existe un usuario con ese nombre',
						refreshing: false,
					  disabled: 	true
					});
				}
				else
				{
					this.setState({
						error: 			'',
						refreshing: false,
					  disabled: 	false
					});
				}
//         console.log(responseJson);
// 				this.setState({
// 					error: responseJson
// 				});
// 				return resolve(responseJson);
      })
      .catch((error) => {
        console.error(error);
				this.setState({
						error: 			error,
						refreshing: false,
					  disabled: 	true
				});
      });
		}
		, 300);
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
	
	render() {
// 		<FormInput 
// 						inputStyle={{color:"#ffffff"}} 
// 						containerStyle={{borderBottomColor:"#ffffff"}} 
// 						placeholder="Nombre"
// 					/>
		let _error = this.state.error;
		let btn_style = styles.fullWidthButton2;
		if(this.state.disabled)
		{
			btn_style = styles.fullWidthButtonDisabled;
		}
		return (
			
			<View style={styles.container}>
				
				<View style={{flex:2, padding:15, flexDirection:'column', alignItems:'center', justifyContent:'flex-end' }}>
					<Image source={require('./img/logo.rc2.png')} style={{width: 100, height: 100}} />
				</View>
				<View style={{flex:3, paddingLeft:15, paddingRight:15, flexDirection:'column', alignItems:'stretch', justifyContent:'center' }}>
						<TextInput
							style={[styles.input, {fontFamily:'roboto_light', fontWeight:'100'}]}
							placeholderStyle={{fontFamily:'roboto_light', fontWeight:'100'}}
							placeholder="Ingrese nombre"
							placeholderTextColor="#aaaaaa"
							underlineColorAndroid ="#ffffff"
							onChangeText={this._onChangeText}
						/>
						<Text style={styles.textError} numberOfLines={3} >{_error}</Text>
						
				</View>
				<View style={{flex:1, flexDirection:'column', alignItems:'stretch', justifyContent:'flex-end' }}>
					<TouchableHighlight
							disabled={this.state.disabled}
							style={[styles.fullWidthButton, btn_style]}
							onPress={this._onNewAccount } >
						<Text style={styles.fullWidthButtonText}>CREAR CUENTA</Text>
					</TouchableHighlight>
				</View>
				<KeyboardSpacer />
      </View>
		);
	}
}


export default Start;
