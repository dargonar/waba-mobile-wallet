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

	render() {
		const iconRecipient = (<Icon name="ios-send" size={26} color="#9F9F9F" style={[styles.drawerListIcon, { paddingLeft: 2 }]} />);
		return (
			<LinearGradient colors={['rgba(31, 71, 91, 1)', 'rgba(44, 63, 80, 1)', 'rgba(84, 105, 121, 1)']} 
											style={styles.linearGradient}>
				<View style={styles.container}>
					<View style={{flex:2, justifyContent: 'center', borderBottomColor: '#cccccc', borderBottomWidth:0.25 }}>
						<Text style={styles.usernameTitle} >
							NOMBRE
          	</Text>
						<Text style={styles.usernameText} >
							pedro.goyena
          	</Text>
					</View>													 
					<View style={styles.drawerList}>
						<TouchableOpacity onPress={this._openRecipient}>
							<View style={styles.drawerListItem}>
								{iconRecipient}
								<Text style={styles.drawerListItemText}>
									Enviar dinero
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