import React, { Component, PropTypes } from 'react';
import {
	Alert,
	Image,
	Linking,
	Text,
	ToastAndroid,
	TouchableOpacity,
	View
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import IconBadge from 'react-native-icon-badge';
import LinearGradient from 'react-native-linear-gradient';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './styles/Drawer';
import { avales }  from '../endorsement/components/static/endorsements_const'
import { iconsMap } from '../../utils/AppIcons';
import Bts2helper from '../../utils/Bts2helper';
import { AsyncStorage } from 'react-native'
import * as walletActions from '../wallet/wallet.actions';
import * as helperActions from '../../utils/Helper.js';
import * as config from '../../constants/config';

class Drawer extends Component {
	constructor(props) {
		super(props);
		this.state = {
      identicon: 	 ''
    };
		this._goToMain 								= this._goToMain.bind(this);
		this._openRecipient 					= this._openRecipient.bind(this);
		this._onFnDisabled    				= this._onFnDisabled.bind(this);
		this._onGoToWABA  						= this._onGoToWABA.bind(this);
		this._onGoToBusinesses 				= this._onGoToBusinesses.bind(this);
		this._onSettings 							= this._onSettings.bind(this);
		this._openEndorsement 				= this._openEndorsement.bind(this);
		this._onSwitchMode  				  = this._onSwitchMode.bind(this);

		this._onSwitchToUser					= this._onSwitchToUser.bind(this);
		this._onSwitchToSubAccount		= this._onSwitchToSubAccount.bind(this);
		this._onInitDailyBox  				= this._onInitDailyBox.bind(this);

		this._onRewardCustomer 				= this._onRewardCustomer.bind(this);
		this._onAcceptDiscount				= this._onAcceptDiscount.bind(this);
	}

	componentWillMount() {
		// var hash = this.props.account.identicon || 'cc65d8bb036388b414deac65a34d83e296b4c8b84f521cb059b561d0b5c0b4579495023d3dbdfb75492ff413ec0ad281f6e5263589d3a6418ba6dbce86bba6bf';
		// var data = new Identicon(hash).toString();
		// data = 'data:image/png;base64,'+data;
		let data = config.getIdenticonForHash(this.props.account.identicon);
		this.setState( {identicon:data})
	}

	_onRewardCustomer(){
		this._toggleDrawer();
		this.props.navigator.push({
			screen: 'wallet.SelectCustomer',
			title: 'Cliente'
		});
	}
	_onAcceptDiscount(){
		this._toggleDrawer();
		// this.props.navigator.push({
		// 	screen: 'wallet.SelectCustomer',
		// 	title: 'Cliente'
		// });
	}

	_onPower(){
		this._onFnDisabled();
	}

	_onSwitchMode(){
		if(config.isSubaccountMode(this.props.account.subaccount))
		{
			this._onSwitchToUser();
			return;
		}
		this._onSwitchToSubAccount();
	}

	_onSwitchToUser(){
		// if(!config.isSubaccountMode(this.props.account.subaccount))
		// {
		// 	return;
		// }

		AsyncStorage.getItem('@Store:data').then((value)=>{
			account               = JSON.parse(value);
			delete account.subaccount;

			AsyncStorage.setItem('@Store:data', JSON.stringify(account));

			this.props.actions.createAccountSuccessHACK(account);

			helperActions.launchWallet();
		});
	}

	_onInitDailyBox(){
		this.switchToSubAccountOrInitDaily();
	}

	_onSwitchToSubAccount(){
			this.switchToSubAccountOrInitDaily();
	}

	switchToSubAccountOrInitDaily(){

		this.props.navigator.showModal({
			screen : 'wallet.Sending',
			title :  'Obtendiendo información...',
			passProps: {
                  // recipient : this.state.recipient,
									// amount :    this.state.discount,
									// memo :      this.state.memo,
								  modal_type: 'claiming',
                  message:    'Modo subcuenta'
                },
			animationType: 'slide-up',
			navigatorStyle: {navBarHidden:true}
		});

		// 1.- Verificamos que tenga permiso disponible
		// 1.1.- Si tiene mas de uno que elija (AHORA NO) (ToDo)
		walletActions.getSubAccountPermissions(this.props.account.id).then( (permissions) => {
			console.log(' -- Traemos permisos del usuario:',  JSON.stringify(permissions));
			let the_perm = null;
			if(permissions && 'subaccounts' in permissions)
			{
				for(var i=0; i<permissions.subaccounts.length; i++) {
					let perm = permissions.subaccounts[i];
					console.log(' -------- perm.expiration>config.getFullUTCNow()', perm.expiration, config.getFullUTCNow());
					if (perm.expiration>config.getFullUTCNow())
					{
						the_perm = perm;
						break;
					}
				}
			}

			if(!the_perm)
			{
				this.props.navigator.dismissModal({
						animationType: 'slide-down'
				});
				Alert.alert(
					'Subcuentas',
					'No tiene configurado ningún permiso o ya ha expirado.',
					[
						{text: 'OK'},
					]
				)
				//HACK
				this._onSwitchToUser();
				return;
			}

			let business = null;
			// 2.- Nos traemos al comercio
			this.props.navigator.dismissModal({
					animationType: 'slide-down'
			});
			walletActions.getBusiness(the_perm.withdraw_from_account).then( (resp) => {
				business = resp.business;
				this._toggleDrawer();
				if( config.isSubaccountMode(this.props.account.subaccount))
				{
						this.props.navigator.push({
						screen: 'discoin.SwitchConfirm',
						title: 'INICIAR CAJA DIARIA',
						passProps: {
							permission 					: the_perm,
							business 						: business,
							is_daily_request 		: true
						}
					});
				}
				else {
					this.props.navigator.push({
		        screen: 'discoin.SwitchConfirm',
		        title: 'CONFIRMAR MODO',
		        passProps: {
							permission 					: the_perm,
							business 						: business,
							is_daily_request 		: false
						}
		    	});
				}

				return;
			}, (err) => {
				console.log('Error', JSON.stringify(err));
			})

		}, (err) => {
			// this.setState({refreshing:true});
			console.log('Error', JSON.stringify(err));
		})
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

	_onGoToBusinesses(){
		// Linking.openURL(config.MERCADOPAR_URL).catch(err => console.error('An error occurred', err));
		this._toggleDrawer();
		this.props.navigator.push({
			screen: 'discoin.Business',
			title: 'Buscar comercios'
		});
	}

	_onGoToWABA(){
		Linking.openURL(config.WABA_NETWORK_URL).catch(err => console.error('An error occurred', err));
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
		const iconRecipient = (<Icon name="ios-send" size={26} color="#ffffff" style={[styles.drawerListIcon, { paddingLeft: 2 }]} />);
		const iconPriceTag 	= (<Icon name="md-pricetag" size={26} color="#ffffff" style={[styles.drawerListIcon, { paddingLeft: 2 }]} />);
		const iconMap 			= (<Icon name="md-pin" size={26} color="#ffffff" style={[styles.drawerListIcon, { paddingLeft: 2 }]} />);
		const iconJob 			= (<Icon name="md-construct" size={26} color="#ffffff" style={[styles.drawerListIcon, { paddingLeft: 2 }]} />);
		const info 					= (<Icon name="ios-information-circle" size={26} color="#ffffff" style={[styles.drawerListIcon, { paddingLeft: 2 }]} />);
		const iconSwitch 		= (<Icon name="ios-switch" size={20} color="#ffffff" style={[styles.drawerListIcon, { paddingLeft: 2 }]} />);
		const iconCash 		  = (<Icon name="ios-cash" size={20} color="#ffffff" style={[styles.drawerListIcon, { paddingLeft: 2 }]} />);
		// const iconReceive   = (<Icon name="ios-send" size={20} color="#ffffff" style={[styles.drawerListIcon, { paddingLeft: 2 }]} />);
		// const iconSend			= (<Icon name="ios-send" size={20} color="#ffffff" style={[styles.drawerListIcon, { paddingLeft: 2 }]} />);
		const iconReceive   = (<Image source={iconsMap['ios-arrow-round-up']} style={[styles.row_arrow, {transform : [{rotate: '135 deg'}]}]}/>);
		const iconSend			= (<Image source={iconsMap['ios-arrow-round-up']} style={[styles.row_arrow, {transform : [{rotate: '-45 deg'}]}]}/>);
		let userIcon = (<Icon
			raised
			containerStyle={{backgroundColor:'#0B5F83', borderWidth: 0.5, borderColor: '#B7F072' }}
			name='md-person'
			type='ionicon'
			color='#ffffff'
			underlayColor='#415261'
			onPress={this._onPower.bind(this)}
			size={60} />);

		if(this.state.identicon!=''){
			var base64Icon = this.state.identicon;
			userIcon = (<Image style={{width: 60, height: 60, resizeMode: Image.resizeMode.contain, borderWidth: 0}} source={{uri: base64Icon}}/>)
		}

		let container_style 		= styles.container;
		let is_subaccount_text 	= false;
		let daily_withdraw 			= false;
		let subaccount_text			= 'PASAR A MODO SUBCUENTA';
		let subaccount_mode 		= config.isSubaccountMode(this.props.account.subaccount);
		if(subaccount_mode)
		{
			container_style 		= styles.container_subaccount;
			subaccount_text  		= 'PASAR A MODO USUARIO';
			is_subaccount_text 	= (<Text style={styles.subaccountText} >
					MODO SUBCUENTA ON {"\n"}
					COMERCIO: {this.props.account.subaccount.business.name}
				</Text>);

			daily_withdraw = (<TouchableOpacity onPress={this._onInitDailyBox}>
				<View style={styles.drawerListItem3}>
					{iconCash}
					<Text style={styles.drawerListItemText2}>
						INICIAR CAJA DIARIA
					</Text>
				</View>
			</TouchableOpacity>)
		}

		return (

				<View style={[container_style]}>
					<View style={{flex:3, padding:5, flexDirection:'column', justifyContent: 'center' }}>
						<View style={{flex:1, flexDirection:'row', justifyContent: 'center'}}>
							<View style={{flex:1, justifyContent: 'center', alignItems: 'flex-end', paddingRight:10, paddingTop:10}}>
								<Icon
									raised
									containerStyle={{backgroundColor:'#0B5F83', borderWidth: 0.5, borderColor: '#B7F072' }}
									name='ios-settings'
									type='ionicon'
									color='#d9d9d9'
									underlayColor='#415261'
									onPress={this._onSettings.bind(this)}
									size={25} />
							</View>
						</View>
						<View style={{flex:1, flexDirection:'row', justifyContent: 'center'}}>
							<View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
							{userIcon}
						  </View>
							<View style={{flex:3, justifyContent: 'center', alignItems:'flex-start' }}>
								<Text style={styles.usernameText} >
									{this.props.account.name}
								</Text>
								{is_subaccount_text}
							</View>
						</View>

					</View>
					{ !subaccount_mode ?
					(<View style={styles.drawerList}>
						<TouchableOpacity onPress={this._openRecipient}>
							<View style={[styles.drawerListItem, styles.drawerListItemBB]}>
								{iconRecipient}
								<Text style={styles.drawerListItemText}>
									Pagar con descuento
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={this._onGoToBusinesses}>
							<View style={styles.drawerListItem}>
								{iconMap}
								<Text style={styles.drawerListItemText}>
									Buscar comercios
								</Text>
							</View>
						</TouchableOpacity>
					</View>)
					:
					(<View style={styles.drawerList}>
						<TouchableOpacity onPress={this._onRewardCustomer}>
							<View style={[styles.drawerListItem, styles.drawerListItemBB]}>
								{iconSend}
								<Text style={styles.drawerListItemText}>
									RECOMPENSAR
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={this._onAcceptDiscount}>
							<View style={styles.drawerListItem}>
								{iconReceive}
								<Text style={styles.drawerListItemText}>
									RECIBIR PAGO
								</Text>
							</View>
						</TouchableOpacity>
					</View>)
					}
					{daily_withdraw}

					<TouchableOpacity onPress={this._onSwitchMode}>
						<View style={styles.drawerListItem3}>
							{iconSwitch}
							<Text style={styles.drawerListItemText2}>
								{subaccount_text}
							</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={this._onGoToWABA}>
						<View style={styles.drawerListItemVersion}>
							<Text style={styles._version}>
								DISCOIN ALPHA VERSION 1.1{"\n"}POWERED BY WABA.NETWORK
							</Text>
						</View>
					</TouchableOpacity>
				</View>

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

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(walletActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
