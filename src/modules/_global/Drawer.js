import React, { Component, PropTypes } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles/Drawer';

import { iconsMap } from '../../utils/AppIcons';

class Drawer extends Component {
	constructor(props) {
		super(props);

		this._goToMain 				= this._goToMain.bind(this);
		this._openRecipient 	= this._openRecipient.bind(this);
		this._onAmount 				= this._onAmount.bind(this);
		this._onConfirm 			= this._onConfirm.bind(this);
		this._onSending 			= this._onSending.bind(this);
		this._onSendResult 	  = this._onSendResult.bind(this);
	}

	_openRecipient() {
		this._toggleDrawer();
		this.props.navigator.push({
			screen: 'wallet.SelectRecipient',
			title: 'Seleccione destinatario'
		});		
	}

	_goToMain() {
		this._toggleDrawer();
		this.props.navigator.popToRoot();
	}

	_toggleDrawer() {
		this.props.navigator.toggleDrawer({
			to: 'closed',
			side: 'left',
			animated: true
		});
	}

	_onAmount() {
		this._toggleDrawer();
		this.props.navigator.push({
			screen: 'wallet.SelectAmount',
			title: 'Indique monto',
			rightButtons: [
					{
						icon: iconsMap['ios-attach'],
						id: 'attachMemo'
					}
				]
		});		
	}
	
	_onConfirm(){
		this._toggleDrawer();
		this.props.navigator.push({
			screen: 'wallet.SendConfirm',
			title: 'Confirmar envío'
		});
	}
	
	_onSending(){
		this._toggleDrawer();
		this.props.navigator.push({
			screen: 'wallet.Sending',
			title: 'Enviando...'
		});
	}
	
	_onSendResult(){
		this._toggleDrawer();
		this.props.navigator.push({
			screen: 'wallet.SendResult',
			title: 'Envío exitoso'
		});
	}
	render() {
		const iconRecipient = (<Icon name="md-search" size={26} color="#9F9F9F" style={[styles.drawerListIcon, { paddingLeft: 2 }]} />);
		const iconTV = (<Icon name="md-film" size={26} color="#9F9F9F" style={[styles.drawerListIcon, { paddingLeft: 3 }]} />);
		const iconAmount = (<Icon name="logo-usd" size={26} color="#9F9F9F" style={styles.drawerListIcon} />);
		// lime:       #d8ef27,
    // received:   #8ec919,
    // sent:       #fcc4cb,

		return (
			<LinearGradient colors={['rgba(216, 239, 39, 0.7)', 'rgba(142,201,25, 0.9)', 'rgba(252,196,203, 1)']} style={styles.linearGradient}>
				<View style={styles.container}>
					<View style={styles.drawerList}>
						<TouchableOpacity onPress={this._openRecipient}>
							<View style={styles.drawerListItem}>
								{iconRecipient}
								<Text style={styles.drawerListItemText}>
									Recipient
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={this._onAmount}>
							<View style={styles.drawerListItem}>
								{iconAmount}
								<Text style={styles.drawerListItemText}>
									Amount
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={this._onConfirm}>
							<View style={styles.drawerListItem}>
								{iconTV}
								<Text style={styles.drawerListItemText}>
									Confirm
								</Text>
							</View>
						</TouchableOpacity>
					  <TouchableOpacity onPress={this._onSending}>
							<View style={styles.drawerListItem}>
								{iconTV}
								<Text style={styles.drawerListItemText}>
									Sending
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={this._onSendResult}>
							<View style={styles.drawerListItem}>
								{iconTV}
								<Text style={styles.drawerListItemText}>
									SendResult
								</Text>
							</View>
						</TouchableOpacity>
					</View>
					<Text style={styles._version}>
						{/* 'v1.0.0' */}
					</Text>
				</View>
			</LinearGradient>
		);
	}
}

Drawer.propTypes = {
	navigator: PropTypes.object
};

export default Drawer;