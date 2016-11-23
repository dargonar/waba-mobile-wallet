import React, { Component, PropTypes } from 'react';
import {
	Alert, 
	Text,
	ToastAndroid,
	TouchableOpacity,
	View
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
		this._onFnDisabled    = this._onFnDisabled.bind(this);
	}
	
	_onPower(){
		this._onFnDisabled();	
	}
	
	_onSettings(){
		this._onFnDisabled();	
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
	
	_onFnDisabled(){
		Alert.alert(
			'No disponible',
			'Función no disponible en versión DEMO.',
			[
				{text: 'OK'},
			]
		)
	}
	
	_toggleDrawer() {
		this.props.navigator.toggleDrawer({
			to: 'closed',
			side: 'left',
			animated: true
		});
	}

	render() {
		const iconRecipient = (<Icon name="ios-send" size={26} color="#d8ef27" style={[styles.drawerListIcon, { paddingLeft: 2 }]} />);
		const iconPriceTag 	= (<Icon name="md-pricetag" size={26} color="#d8ef27" style={[styles.drawerListIcon, { paddingLeft: 2 }]} />);
		const iconMap 			= (<Icon name="md-pin" size={26} color="#d8ef27" style={[styles.drawerListIcon, { paddingLeft: 2 }]} />);
		return (
			<LinearGradient colors={['rgba(31, 71, 91, 1)', 'rgba(44, 63, 80, 1)', 'rgba(84, 105, 121, 1)']} 
											style={styles.linearGradient}>
				<View style={styles.container}>
					<View style={{flex:3, padding:5, flexDirection:'column', justifyContent: 'center' }}>
						<View style={{flex:3, flexDirection:'row', justifyContent: 'center'}}>
							<View style={{flex:1, justifyContent: 'center', alignItems: 'flex-end'}}>
								<Icon
									raised
									containerStyle={{backgroundColor:'#1f475b', borderWidth: 0.5, borderColor: '#d8ef27' }}
									name='ios-power'
									type='ionicon'
									color='#cccccc'
									underlayColor='#415261'
									onPress={this._onPower.bind(this)} 
									size={30} />
						  </View>
							<View style={{flex:2, justifyContent: 'center', alignItems: 'center'}}>
								<Icon
									raised
									containerStyle={{backgroundColor:'#1f475b', borderWidth: 0.5, borderColor: '#d8ef27' }}
									name='md-person'
									type='ionicon'
									color='#d8ef27'
									underlayColor='#415261'
									onPress={this._onPower.bind(this)} 
									size={60} />	
						  </View>
							<View style={{flex:1, justifyContent: 'center', alignItems: 'flex-start'}}>
								<Icon
									raised
									containerStyle={{backgroundColor:'#1f475b', borderWidth: 0.5, borderColor: '#d8ef27' }}
									name='ios-settings'
									type='ionicon'
									color='#cccccc'
									underlayColor='#415261'
									onPress={this._onSettings.bind(this)} 
									size={30} />
						  </View>
						</View> 
						<View style={{flex:1, justifyContent: 'flex-start', alignItems:'center' }}>
							<Text style={styles.usernameText} >
								pedro.goyena
							</Text>
						</View>					
					</View>													 
					<View style={styles.drawerList}>
						<TouchableOpacity onPress={this._openRecipient}>
							<View style={[styles.drawerListItem, styles.drawerListItemBB]}>
								{iconRecipient}
								<Text style={styles.drawerListItemText}>
									Enviar dinero
								</Text>
							</View>
						</TouchableOpacity>
					 <TouchableOpacity onPress={this._onFnDisabled}>
							<View style={[styles.drawerListItem, styles.drawerListItemBB]}>
								{iconPriceTag}
								<Text style={styles.drawerListItemText}>
									Requerir pago
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={this._onFnDisabled}>
							<View style={styles.drawerListItem}>
								{iconMap}
								<Text style={styles.drawerListItemText}>
									Ver comercios
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