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

class Drawer extends Component {
	constructor(props) {
		super(props);

		this._goToMain = this._goToMain.bind(this);
		this._openRecipient = this._openRecipient.bind(this);
		this._onAmount = this._onAmount.bind(this);
		
	}

	_openRecipient() {
		this._toggleDrawer();
		this.props.navigator.push({
			screen: 'wallet.SelectRecipient',
			title: 'Elija destinatario'
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
			title: 'Elija monto'
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
						<View style={styles.drawerListItem}>
							{iconTV}
							<Text style={styles.drawerListItemText} onPress={this._onAmount}>
								TV Shows
							</Text>
						</View>
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