import React, { PropTypes, Component } from 'react';
import {
	View,
  Button,
	Image,
	TextInput,
	TouchableHighlight,
	Text
} from 'react-native';

import styles from './styles/Start';
import { FormLabel, FormInput } from 'react-native-elements'
import KeyboardSpacer from 'react-native-keyboard-spacer';

class Start extends Component {

	constructor(props) {
		super(props);
		this._onNewAccount 			= this._onNewAccount.bind(this);
		//this._onRestoreAccount 	= this._onRestoreAccount.bind(this);
	}
  
	_onNewAccount() {
		this.props.navigator.push({
			screen : 'wallet.NewAccount',
			title :  'Creando cuenta'
		});
	}
	
	render() {
// 		<FormInput 
// 						inputStyle={{color:"#ffffff"}} 
// 						containerStyle={{borderBottomColor:"#ffffff"}} 
// 						placeholder="Nombre"
// 					/>
		return (
			<View style={styles.container}>
				
				<View style={{flex:2, padding:15, flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
					<Image source={require('./img/logo.rc2.png')} style={{width: 100, height: 100}} />
				</View>
				<View style={{flex:2, paddingLeft:15, paddingRight:15, flexDirection:'column', alignItems:'stretch', justifyContent:'center' }}>
					<View style={{flexDirection:'row', justifyContent:'center', marginBottom:25  }}>	
						<TextInput
							style={styles.input} 
							placeholderStyle={styles.input}
							placeholder="Ingrese nombre"
							placeholderTextColor="#aaaaaa"
							underlineColorAndroid ="#ffffff"
						/>
					</View>  
					<KeyboardSpacer />
					<TouchableHighlight
							style={[styles.fullWidthButton, styles.fullWidthButton2]}
							onPress={this._onNewAccount } >
						<Text style={styles.fullWidthButtonText}>CREAR CUENTA</Text>
					</TouchableHighlight>
						
				</View>
      </View>
		);
	}
}


export default Start;