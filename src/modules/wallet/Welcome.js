import React, { PropTypes, Component } from 'react';
import {
	Alert, 
	Button,
	Image,
	Text,
	ToastAndroid,
	TouchableHighlight,
	View
} from 'react-native';

import styles from './styles/Welcome';
import { FormLabel, FormInput } from 'react-native-elements'
import KeyboardSpacer from 'react-native-keyboard-spacer';

class Welcome extends Component {

	constructor(props) {
		super(props);
		this._onCreateAccount 			= this._onCreateAccount.bind(this);
		this._onRestoreAccount 	= this._onRestoreAccount.bind(this);
	}
  
	_onCreateAccount() {
		this.props.navigator.push({
			screen : 'wallet.Start',
			title :  'Crear cuenta'
		});
	}
	
	_onRestoreAccount() {
// 		this.props.navigator.push({
// 			screen : 'wallet.RestoreAccount'
// 		}); 
// 		ToastAndroid.showWithGravity('Función no disponible en versión DEMO'
// 																 , ToastAndroid.LONG
// 																 , ToastAndroid.CENTER );
		Alert.alert(
			'No disponible',
			'Función no disponible en versión DEMO.',
			[
				{text: 'OK'},
			]
		)
	}
	
	render() {
// 		<FormInput 
// 						inputStyle={{color:"#ffffff"}} 
// 						containerStyle={{borderBottomColor:"#ffffff"}} 
// 						placeholder="Nombre"
// 					/>
		return (
			<View style={styles.container}>
				
				<View style={{flex:2, padding:15, flexDirection:'column', alignItems:'center', justifyContent:'flex-end' }}>
					<Image source={require('./img/logo.rc2.png')} style={{width: 100, height: 100}} />
				</View>
				<View style={{flex:2, paddingLeft:15, paddingRight:15, flexDirection:'column', alignItems:'stretch', justifyContent:'center' }}>
					<View style={{flexDirection:'column', justifyContent:'center', marginBottom:25  }}>	
						<Text style={styles.welcomeTitle}>
              PAR
            </Text>
            <Text style={styles.welcomeTitle2}>
              La Billetera
            </Text>
					</View>  
					
						
				</View>
				<View style={{flex:2, paddingLeft:15,paddingRight:15, flexDirection:'column', alignItems: 'stretch', justifyContent:'center' }}>
          <TouchableHighlight
							style={[styles.fullWidthButton, styles.fullWidthButton2]}
							onPress={this._onCreateAccount} >
						<Text style={styles.fullWidthButtonText}>CREAR CUENTA</Text>
					</TouchableHighlight>
					
					<TouchableHighlight
							style={[styles.fullWidthButton, styles.fullWidthButton1]}
							onPress={this._onRestoreAccount} >
						<Text style={styles.fullWidthButtonText}>RESTAURAR CUENTA</Text>
					</TouchableHighlight>
				</View>
      
      </View>
		);
	}
}


export default Welcome;