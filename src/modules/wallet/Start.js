import React, { PropTypes, Component } from 'react';
import {
	View,
  Button
} from 'react-native';

import styles from './styles/Start';

class Start extends Component {

	constructor(props) {
		super(props);
	}
  
	_onNewAccount() {
		this.props.navigator.push({
			screen : 'wallet.NewAccount',
			title : 'Nueva cuenta'
		});
	}
	
	_onRestoreAccount() {
		this.props.navigator.push({
			screen : 'wallet.RestoreAccount'
		}); 		
	}
	
	render() {
		return (
			<View style={styles.container}>

        <View style={{flex:1, padding:15, flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
          <Button
            color="#841584"
            onPress={() => { this._onNewAccount(); }}
            title="Crear Cuenta"
          />
          <Button
            onPress={() => { this._onRestoreAccount(); }}
            title="Restaurar Cuenta"
          />
        </View>
      
      </View>
		);
	}
}


export default Start;