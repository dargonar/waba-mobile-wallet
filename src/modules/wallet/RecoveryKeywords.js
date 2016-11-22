import React, { PropTypes, Component } from 'react';
import {
	View,
	Text,
	Button,
	TouchableHighlight

} from 'react-native';

import * as walletActions from './wallet.actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './styles/RecoveryKeywords';

import KeyboardSpacer from 'react-native-keyboard-spacer';

import * as helperActions from '../../utils/Helper.js';

class RecoveryKeywords extends Component {

	constructor(props) {
		super(props);
		this.state = {
			creating : false,
			name     : ''
		}
    this._onInitWallet = this._onInitWallet.bind(this);
	}
	
	static navigatorStyle = {
    navBarTextColor: '#ffffff', 
    navBarBackgroundColor: '#1f475b',
    navBarButtonColor: '#ffffff'
  }
	
	_onInitWallet() {
		helperActions.launchWallet();
	}

	render() {
		const name = this.state.name;
		return (
			<View style={styles.container}>
				
				<View style={{flex:4, justifyContent:'flex-start', margin:20, padding:15}}>
					<Text style={styles.keywordsTitle} numberOfLines={4}>
            Copie y guarde las palabras listadas a continuación.
            La única manera de recuperar su cuenta en caso de extravío de su teléfono celular es a través de ellas. 
          </Text>
          <View style={{ justifyContent:'center', marginTop:20, padding:15, backgroundColor:'#2c3f50'}}>
            <Text style={styles.keywordsText}>
              alumno meter novela tarta geranio lima asno oriente oeste parcela cromo gripe
            </Text>
          </View>
				</View>
				<View style={{flex:1, flexDirection:'column', alignItems: 'stretch', justifyContent:'flex-end' }}>
					<TouchableHighlight
							style={[styles.fullWidthButton, styles.fullWidthButton1]}
							onPress={this._onInitWallet} >
						<Text style={styles.fullWidthButtonText}>INICIAR BILLETERA</Text>
					</TouchableHighlight>
				</View>
			</View>
		);
	}
}


function mapStateToProps(state, ownProps) {
	return {
		new_keys: state.wallet.new_keys
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(walletActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(RecoveryKeywords);
