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
// import LinearGradient from 'react-native-linear-gradient';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './styles/Drawer';
import { avales }  from '../endorsement/components/static/endorsements_const'
import { iconsMap } from '../../utils/AppIcons';

import UWCrypto from '../../utils/Crypto';
import Bts2helper from '../../utils/Bts2helper';

import { AsyncStorage } from 'react-native'
import * as walletActions from '../wallet/wallet.actions';
import * as helperActions from '../../utils/Helper.js';
import * as config from '../../constants/config';
import * as subaccount_helper from '../../utils/SubAccountHelper';

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
		// this._onAcceptDiscount				= this._onAcceptDiscount.bind(this);
		this.onSendExtraBalance 			= this.onSendExtraBalance.bind(this);
		this.onResetBalance 					= this.onResetBalance.bind(this);
		this.onRefreshSubAccountPermissions 					= this.onRefreshSubAccountPermissions.bind(this);
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
			screen: 'wallet.DiscountOrReward',
			title: 'Cobrar'
		});
	}

	onResetBalance(){
		this.doSendExtraOrResetBalance(true);	
	}

	onSendExtraBalance(){
		this.doSendExtraOrResetBalance(false);	
	}

	doSendExtraOrResetBalance(reset){
		
		let tx_data = {};
		let balance = this.props.balance[config.ASSET_ID];
		let account = this.props.account;
		let title = reset?'Volver saldo a 0 D$C' :'Enviar balance excedente';
		try {
			tx_data = subaccount_helper.prepareResetBalance(reset, account, balance);
		} catch (error) {
			console.log('Error!!!!', error);
			Alert.alert(
				title,
		  	error.toString(),
				[
					{text: 'OK'},
				]
			);
			return;
		
		}

		this._toggleDrawer();
		this.props.navigator.push({
      screen: 'wallet.ResetBalanceConfirm',
			title: title,
			passProps:  {
        ...tx_data	
    	}
		});
	}

	onRefreshSubAccountPermissions(){
		
		this.props.navigator.showModal({
			screen : 'wallet.Sending',
			title :  'Modo subcuenta',
			passProps: {
        modal_type: 'claiming',
        message:    'Obtendiendo información de subcuenta...'
      },
			animationType: 'slide-up',
			navigatorStyle: {navBarHidden:true}
		});

		subaccount_helper.getAccountWithdrawPermission(account).then( (the_perm) => {
			if(!the_perm)
			{
				Alert.alert(
					'Subcuentas',
					'No se pudo obtener el permiso del comercio.',
					[
						{text: 'OK'}
					]
				);	
			}

			AsyncStorage.getItem('@Store:data').then((value)=>{
        account               							= JSON.parse(value);
        account['subaccount']['permission'] = the_perm;

        AsyncStorage.setItem('@Store:data', JSON.stringify(account));
        
        // this.props.actions.createAccountSuccessHACK(account);
  			// helperActions.launchWallet(account);

  			ToastAndroid.show('Permisos actualizados correctamente!', ToastAndroid.SHORT);

  			this.props.navigator.dismissModal({
						animationType: 'slide-down'
				});	
      });

		}, (err) => {
			this.props.navigator.dismissModal({
					animationType: 'slide-down'
			});
			Alert.alert(
				'Subcuentas',
				JSON.stringify(err),
				[
					{text: 'OK'}
				]
			);

		});
	}

	
	_onPower(){
		this._onFnDisabled();
	}

	_onSwitchMode(){
		console.log(' --- DRAWER::_onSwitchMode()');
		console.log(JSON.stringify(this.props.account));

		if(config.isSubaccountMode(this.props.account.subaccount))
		{
			console.log(' ********************* LLAMO A this._onSwitchToUser();')
			this._onSwitchToUser();
			return;
		}
		console.log(' ********************* LLAMO A this._onSwitchToSubAccount();')
		this._onSwitchToSubAccount();
	}

	_onSwitchToUser(){
		// if(!config.isSubaccountMode(this.props.account.subaccount))
		// {
		// 	return;
		// }

		AsyncStorage.getItem('@Store:data').then((value)=>{

			console.log(' *** _onSwitchToUser()');
			console.log(' account before deleting subaccount');
			console.log(JSON.stringify(account));

			account               = JSON.parse(value);
			delete account.subaccount;

			console.log(' about to save account');
			console.log(JSON.stringify(account));

			AsyncStorage.setItem('@Store:data', JSON.stringify(account));

			this.props.actions.createAccountSuccessHACK(account);

			helperActions.launchWallet(account);
		});
	}

	_onInitDailyBox(){
		this.switchToSubAccountOrInitDaily();
	}

	_onSwitchToSubAccount(){
			this.switchToSubAccountOrInitDaily();
	}

	switchToSubAccountOrInitDaily(){

		console.log(' *********************** switchToSubAccountOrInitDaily()');

		this.props.navigator.showModal({
			screen : 'wallet.Sending',
			title :  'Modo subcuenta',
			passProps: {
        modal_type: 'claiming',
        message:    'Obtendiendo información de subcuenta...'
      },
			animationType: 'slide-up',
			navigatorStyle: {navBarHidden:true}
		});


		// 1.- Verificamos que tenga permiso disponible
		// 1.1.- Si tiene mas de uno que elija (AHORA NO) (ToDo)
		console.log(' --- switchToSubAccountOrInitDaily() :: this.props.account.id')
		console.log('this.props.account.id:', this.props.account.id)

		subaccount_helper.getAccountWithdrawPermission(account).then( (the_perm) => {
			
			let business = null;
			
			// 2.- Nos traemos al comercio
			walletActions.getBusiness(the_perm.withdraw_from_account).then( (resp) => {
				business = resp.business;
				this.props.navigator.dismissModal({
						animationType: 'slide-down'
				});
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
				this.props.navigator.dismissModal({
						animationType: 'slide-down'
				});
				Alert.alert(
					'Subcuentas',
					JSON.stringify(err),
					[
						{text: 'OK', onPress: () => this._onSwitchToUser()  }
					]
				);
				console.log('Error', JSON.stringify(err));
			})
		}, (err) => {

				this.props.navigator.dismissModal({
						animationType: 'slide-down'
				});
				Alert.alert(
					'Subcuentas',
					err.toString(),
					[
						{text: 'OK', onPress: () => this._onSwitchToUser()  }
					]
				);
		} );


		// walletActions.getSubAccountPermissions(this.props.account.id).then( (permissions) => {
		// 	console.log(' -- Traemos permisos del usuario:',  JSON.stringify(permissions));
		// 	let the_perm = null;
		// 	if(permissions && 'subaccounts' in permissions)
		// 	{
		// 		for(var i=0; i<permissions.subaccounts.length; i++) {
		// 			let perm = permissions.subaccounts[i];
		// 			console.log(' -------- perm.expiration>config.getFullUTCNow()', perm.expiration, config.getFullUTCNow());
		// 			if (perm.expiration>config.getFullUTCNow())
		// 			{
		// 				the_perm = perm;
		// 				break;
		// 			}
		// 		}
		// 	}

		// 	if(!the_perm)
		// 	{
		// 		this.props.navigator.dismissModal({
		// 				animationType: 'slide-down'
		// 		});
		// 		Alert.alert(
		// 			'Subcuentas',
		// 			'No tiene configurado ningún permiso o ya ha expirado.',
		// 			[
		// 				{text: 'OK', onPress: () => this._onSwitchToUser()  }
		// 			]
		// 		);

		// 		//this._onSwitchToUser();
		// 		return;
		// 	}

		// 	let business = null;
		// 	// 2.- Nos traemos al comercio
		// 	walletActions.getBusiness(the_perm.withdraw_from_account).then( (resp) => {
		// 		business = resp.business;
		// 		this.props.navigator.dismissModal({
		// 				animationType: 'slide-down'
		// 		});
		// 		this._toggleDrawer();
		// 		if( config.isSubaccountMode(this.props.account.subaccount))
		// 		{
		// 				this.props.navigator.push({
		// 				screen: 'discoin.SwitchConfirm',
		// 				title: 'INICIAR CAJA DIARIA',
		// 				passProps: {
		// 					permission 					: the_perm,
		// 					business 						: business,
		// 					is_daily_request 		: true
		// 				}
		// 			});
		// 		}
		// 		else {
		// 			this.props.navigator.push({
		//         screen: 'discoin.SwitchConfirm',
		//         title: 'CONFIRMAR MODO',
		//         passProps: {
		// 					permission 					: the_perm,
		// 					business 						: business,
		// 					is_daily_request 		: false
		// 				}
		//     	});
		// 		}

		// 		return;
		// 	}, (err) => {
		// 		console.log('Error', JSON.stringify(err));
		// 	})

		// }, (err) => {
		// 	// this.setState({refreshing:true});
		// 	console.log('Error', JSON.stringify(err));
		// })
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
		// this._onPower();
		// return;
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
			screen: 			'discoin.Business',
			title: 				'Comercios',
			rightButtons : [
        {
          icon: iconsMap['ios-options'],
          id: 'filterBusinesses' // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        }
      ]
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
		// if(nextProps.account)
		// {
		// 	console.log(' *** Drawer received props');
		// 	console.log(JSON.stringify(nextProps.account));
		// }

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
		
		// const iconCard 		  = (<Image source={iconsMap['ios-thumbs-up']} style={[styles.row_arrow]}/>);
		const iconCard 		  = (<Icon name="ios-thumbs-up" size={15} color="#ffffff"  />);
		// const iconReceive   = (<Icon name="ios-send" size={20} color="#ffffff" style={[styles.drawerListIcon, { paddingLeft: 2 }]} />);
		// const iconSend			= (<Icon name="ios-send" size={20} color="#ffffff" style={[styles.drawerListIcon, { paddingLeft: 2 }]} />);
		const iconReceive   = (<Image source={iconsMap['ios-remove']} style={[styles.row_arrow]}/>);
		const iconPlus   		= (<Image source={iconsMap['ios-add']} style={[styles.row_arrow]}/>);
		const iconSend			= (<Image source={iconsMap['ios-send']} style={[styles.row_arrow]}/>);
		// const iconSend			= (<Image source={iconsMap['ios-arrow-round-up']} style={[styles.row_arrow, {transform : [{rotate: '-45 deg'}]}]}/>);
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
			withdrawl_limit 		= subaccount_helper.getPermissionWithdrawlLimit(this.props.account.subaccount.permission);
			is_subaccount_text 	= (<Text style={styles.subaccountText} >
					MODO SUBCUENTA <Text style={[styles.subaccountText, styles.subaccountTextBold]}>ENCENDIDO</Text> {"\n"}
					COMERCIO: {this.props.account.subaccount.business.name} {"\n"}
					LIMITE DIARIO: D$C {withdrawl_limit}
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
								{iconPlus}
								<Text style={styles.drawerListItemText}>
									COBRAR
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={this.onResetBalance}>
							<View style={styles.drawerListItem}>
								{iconReceive}
								<Text style={styles.drawerListItemText}>
									VOLVER SALDO A 0 D$C
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={this.onSendExtraBalance}>
							<View style={[styles.drawerListItem, styles.drawerListItemBB]}>
								{iconSend}
								<Text style={styles.drawerListItemText}>
									ENVIAR EXCEDENTE
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={this.onRefreshSubAccountPermissions}>
							<View style={styles.drawerListItem}>
								{iconCard}
								<Text style={styles.drawerListItemText}>
									REFRESCAR LIMITES DIARIOS
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
								DISCOIN BETA VERSION 1.5{"\n"}POWERED BY WABA.NETWORK
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
