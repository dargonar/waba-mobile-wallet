import React, { Component, PropTypes } from 'react';
import {
	Alert, 
	Linking,
	Text,
	ToastAndroid,
	TouchableOpacity,
	View
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import IconBadge from 'react-native-icon-badge';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import styles from './styles/Drawer';
import { avales }  from '../endorsement/components/static/endorsements_const'
import { iconsMap } from '../../utils/AppIcons';
import Bts2helper from '../../utils/Bts2helper';

import * as config from '../../constants/config';

class Drawer extends Component {
	constructor(props) {
		super(props);

		this._goToMain 								= this._goToMain.bind(this);
		this._openRecipient 					= this._openRecipient.bind(this);
		this._onFnDisabled    				= this._onFnDisabled.bind(this);
		this._onGoToMercadoPar  			= this._onGoToMercadoPar.bind(this);
		this._onGoToMercadoParEmpleos = this._onGoToMercadoParEmpleos.bind(this);
		this._onSettings 							= this._onSettings.bind(this);
		this._openEndorsement 				= this._openEndorsement.bind(this);
	}
	
	_onPower(){
		this._onFnDisabled();	
	}
	
	_openEndorsement(){
		
		this._toggleDrawer();
		this.props.navigator.push({
			screen: 'endorsement.Endorsement',
			//screen: 'endorsement.SelectEndorseType',
			title: 'Avales'
		});		
	}

	_onSettings(){
		
		this._toggleDrawer();
		this.props.navigator.push({
			screen: 'wallet.Settings',
			title: 'Configuración'
		});		
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
			'Función no disponible.',
			[
				{text: 'OK'},
			]
		)
	}
	
	_onGoToMercadoPar(){
		Linking.openURL(config.MERCADOPAR_URL).catch(err => console.error('An error occurred', err));
		//IntentAndroid.openURL();
	}
	
	_onGoToMercadoParEmpleos(){
		Linking.openURL(config.EMPLEOSPAR_URL).catch(err => console.error('An error occurred', err));
		//IntentAndroid.openURL();
	}
	
	_toggleDrawer() {
		this.props.navigator.toggleDrawer({
			to: 'closed',
			side: 'left',
			animated: true
		});
	}
	
	componentWillReceiveProps(nextProps) {
		console.log('DRAWER WILL RECEIVE =>', nextProps);
	}
	
	render() {
// 						<TouchableOpacity onPress={this._onFnDisabled}>
// 							<View style={[styles.drawerListItem, styles.drawerListItemBB]}>
// 								{iconPriceTag}
// 								<Text style={styles.drawerListItemText}>
// 									Requerir pago
// 								</Text>
// 							</View>
// 						</TouchableOpacity>
		const iconRecipient = (<Icon name="ios-send" size={26} color="#B7F072" style={[styles.drawerListIcon, { paddingLeft: 2 }]} />);
		const iconPriceTag 	= (<Icon name="md-pricetag" size={26} color="#B7F072" style={[styles.drawerListIcon, { paddingLeft: 2 }]} />);
		const iconMap 			= (<Icon name="md-pin" size={26} color="#B7F072" style={[styles.drawerListIcon, { paddingLeft: 2 }]} />);
		const iconJob 			= (<Icon name="md-construct" size={26} color="#B7F072" style={[styles.drawerListIcon, { paddingLeft: 2 }]} />);
		const info 					= (<Icon name="ios-information-circle" size={26} color="#B7F072" style={[styles.drawerListIcon, { paddingLeft: 2 }]} />);

		// const iconEndorsement = (<Icon name="md-ribbon" size={26} color="#B7F072" style={[styles.drawerListIcon, { paddingLeft: 2 }]} />);
 		const iconEndorsement = (<Icon name="md-thumbs-up" size={26} color="#B7F072" style={[styles.drawerListIcon, { paddingLeft: 2 }]} />);
		// https://www.npmjs.com/package/react-native-icon-badge		
		let iconEndorsementEx = iconEndorsement;
    let available_credit = config.readyToRequestCredit(this.props.balance, this.props.credit_ready);
		if(available_credit!==false)
			iconEndorsementEx = (<IconBadge
						MainElement={iconEndorsement}
						BadgeElement={
							<Text style={{color:'#FFFFFF', fontFamily : 'roboto_normal',fontWeight : '100',fontSize:10}}>1</Text>
						}
						IconBadgeStyle={
							{width:14,
							height:14,
							top:-6,
							right:-6,													 
							backgroundColor: '#CF2E08'}
						}
					/>);												 
													 
		return (
			<LinearGradient colors={['rgba(31, 71, 91, 1)', 'rgba(44, 63, 80, 1)', 'rgba(84, 105, 121, 1)']} style={styles.linearGradient}>
				<View style={styles.container}>
					<View style={{flex:3, padding:5, flexDirection:'column', justifyContent: 'center' }}>
						<View style={{flex:3, flexDirection:'row', justifyContent: 'center'}}>
							<View style={{flex:1, justifyContent: 'center', alignItems: 'flex-end'}}>
								<Icon
									raised
									containerStyle={{backgroundColor:'#0B5F83', borderWidth: 0.5, borderColor: '#B7F072' }}
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
									containerStyle={{backgroundColor:'#0B5F83', borderWidth: 0.5, borderColor: '#B7F072' }}
									name='md-person'
									type='ionicon'
									color='#B7F072'
									underlayColor='#415261'
									onPress={this._onPower.bind(this)} 
									size={60} />	
						  </View>
							<View style={{flex:1, justifyContent: 'center', alignItems: 'flex-start'}}>
								<Icon
									raised
									containerStyle={{backgroundColor:'#0B5F83', borderWidth: 0.5, borderColor: '#B7F072' }}
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
								{this.props.account.name}
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
						<TouchableOpacity onPress={this._openEndorsement}>
							<View style={[styles.drawerListItem, styles.drawerListItemBB]}>
								{iconEndorsementEx}
								<Text style={styles.drawerListItemText}>
									Avales
								</Text>
							</View>
						</TouchableOpacity>
					 	<TouchableOpacity onPress={this._onGoToMercadoParEmpleos}>
							<View style={[styles.drawerListItem, styles.drawerListItemBB]}>
								{iconJob}
								<Text style={styles.drawerListItemText}>
									Bolsa de trabajo
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={this._onGoToMercadoPar}>
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

function mapStateToProps(state, ownProps) {
	//console.log('DRAWER->mapStateToProps', state.wallet.fees, state.wallet.asset);
	return {
		account: state.wallet.account,
		balance: state.wallet.balance,
		credit_ready : state.wallet.credit_ready
	};
}

export default connect(mapStateToProps, null)(Drawer);
