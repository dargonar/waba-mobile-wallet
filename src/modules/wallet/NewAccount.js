import React, { PropTypes, Component } from 'react';
import {
	View,
	Text,
	Button,
  TextInput
} from 'react-native';

import * as walletActions from './wallet.actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './styles/NewAccount';

import KeyboardSpacer from 'react-native-keyboard-spacer';

class NewAccount extends Component {

	constructor(props) {
		super(props);
		this.state = {
			creating : false,
			name     : ''
		}
	}
	
	_onCreate() {
		this.setState({creating:true});
		this.props.actions.createKeys();
	}

	render() {
		const name = this.state.name;
		return (
			<View style={styles.container}>
				
				<View style={{flex:1, justifyContent:'flex-start'}}>
					<Text>Ingrese el nombre de la cuenta</Text>
					<TextInput
						autoFocus={true}
						style={{height: 40, borderColor: 'gray', borderWidth: 1}}
						onChangeText={(name) => this.setState({name:name})}
						value={name}
					/>
				</View>
				<View style={{flex:1, justifyContent:'flex-end'}}>
					<Button
						ref={(button) => this.button = button}
						disabled={this.state.creating}
						onPress={() => { this._onCreate(); }}
						title="Crear"
					/>
				</View>
				<KeyboardSpacer/>
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
export default connect(mapStateToProps, mapDispatchToProps)(NewAccount);
