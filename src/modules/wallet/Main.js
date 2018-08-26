import React, { PropTypes, Component } from 'react';
import {
	Alert,
	Image,
	Text,
	TouchableHighlight,
	ToastAndroid,
	View
} from 'react-native';

// import * as walletActions from './wallet.actions';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './styles/Main';
import Balance from './components/Balance';
import History from './components/History';
import ActionButton from 'react-native-action-button';
import { iconsMap } from '../../utils/AppIcons';
// import * as subaccount_helper from '../../utils/SubAccountHelper';
import Icon from 'react-native-vector-icons/Ionicons';
import * as config from '../../constants/config';

class Main extends Component {

	constructor(props) {
		super(props);
    	
  	
  	this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
		// this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

		this.state 						= {account:''};
		this.newTx 						= this.newTx.bind(this);
		// this.onPay 						= this.onPay.bind(this);
		// this.resetBalance			= this.resetBalance.bind(this);
		// this.sendExtraBalance	= this.sendExtraBalance.bind(this);
		this.applyCredit			= this.applyCredit.bind(this);
		this._onDiscountOrReward	= this._onDiscountOrReward.bind(this);


	}

	componentWillMount() {

	}

	componentWillReceiveProps(nextProps) {
  	//console.log('Main::componentWillReceiveProps', nextProps);
	}


	/* ******************************************************* */
	/* QR CODE *********************************************** */
  	
	qrButtonPressed(){
		
		this.props.navigator.push({
        screen:     'customer.QRShowNScan',
        title:      'QR',
  	});

  	// this.props.navigator.toggleDrawer({
   //    to: 'open',
   //    side: 'right',
   //    animated: true
   //  });

	}

  _onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'scanQRCode') {
        this.qrButtonPressed();
      }
    }
  }


	_onDiscountOrReward(){
		this.props.navigator.push({
			screen: 'wallet.DiscountOrReward',
			title: 'Cobrar'
		});
	}

	// doSendExtraOrResetBalance(reset){
		
	// 	let tx_data = {};
	// 	let balance = this.props.balance[config.ASSET_ID];
	// 	let account = this.props.account;
	// 	let title = reset?'Volver saldo a 0 D$C' :'Enviar balance excedente';
	// 	try {

	// 		tx_data = subaccount_helper.prepareResetBalance(reset, account, balance);

	// 	} catch (error) {
			
	// 		console.log('Error!!!!');
			
	// 		Alert.alert(
	// 			title,
	// 	  	error,
	// 			[
	// 				{text: 'OK'},
	// 			]
	// 		)
	// 		return;
		
	// 	}

	// 	this.props.navigator.push({
 //      screen: 'wallet.ResetBalanceConfirm',
	// 		title: title,
	// 		passProps:  {
 //        ...tx_data	
 //    	}
	// 	});
	// }

	// sendExtraBalance(){
	// 	this.doSendExtraOrResetBalance(false);	
	// }

	// resetBalance(){
	// 	this.doSendExtraOrResetBalance(true);	
	// }

	applyCredit(){
		this.props.navigator.toggleDrawer({
			to: 'open',
			side: 'left',
			animated: true
		});
	}

	newTx(){
		
		this.props.navigator.push({
      screen: 'wallet.FindUser',
			title: 'Elija usuario'
		});

		// this.props.navigator.push({
  //     screen: 'wallet.SelectCustomer',
		// 	title: 'Elija usuario para enviar'
		// });

	}

	// onPay(){
	// 	this.props.navigator.push({
 //      screen: 'wallet.SelectRecipient',
	// 		title: 'Pagar - Seleccione Comercio'
	// 	});
	// }


	/*
		USER MODE
		<ActionButton buttonColor={buttonColor} bgColor="rgba(52, 52, 52, 0.40)" >
					<ActionButton.Item buttonColor={buttonColor} title="ENVIAR" onPress={() => {  this.newTx() }}>
						<Image source={iconsMap['ios-send']} style={[styles.row_arrow]}/>
					</ActionButton.Item>
					<ActionButton.Item buttonColor={buttonColor} title="PAGAR" onPress={() => {  this.onPay() }}>
						<Image source={iconsMap['ios-cash']} style={[styles.row_arrow]}/>
					</ActionButton.Item>
					</ActionButton>
	*/
	// 	<ActionButton buttonColor={buttonColor} style={styles.actionButton} onPress={() => {  this.newTx() }} icon={ icon } />
	/*
			<ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
				<Icon name="md-create" style={styles.actionButtonIcon} />
			</ActionButton.Item>
	*/

	// FAV Button: https://github.com/mastermoo/react-native-action-button
	render() {
		let icon = (<Icon name="ios-add" style={styles.actionButtonIcon} />);
		let buttonColor =	(config.isSubaccountMode(this.props.account.subaccount)) ? '#0A566B':'#f15d44' ;
		let subaccount_mode 		= config.isSubaccountMode(this.props.account.subaccount);
		// {/*<Icon name="md-notifications-off" style={styles.actionButtonIcon} />*/}
		// <ActionButton buttonColor={buttonColor} style={styles.actionButton} onPress={() => {  this.newTx() }} icon={ icon } />
		return (
			<View style={styles.container}>
        <Balance {...this.props} style={styles.balance}/>
        <History {...this.props} style={styles.history}/>
				{ (subaccount_mode)?
					(<View style={{height:75, flexDirection:'column', alignItems:'stretch', justifyContent:'flex-end' }}>
							<TouchableHighlight
									style={styles.fullWidthButton}
									onPress={this._onDiscountOrReward.bind(this)} >
								<Text style={styles.fullWidthButtonText}>COBRAR</Text>
							</TouchableHighlight>
						</View>) : false }

				{ (subaccount_mode)?false
					/*(<ActionButton buttonColor={buttonColor} bgColor="rgba(52, 52, 52, 0.40)" offsetY={95}>
          <ActionButton.Item buttonColor='#1abc9c' title="VOLVER SALDO A 0 D$C" onPress={() => {  this.resetBalance() }}>
	            <Image source={iconsMap['ios-remove']} style={[styles.row_arrow]}/>
						</ActionButton.Item>
	          <ActionButton.Item buttonColor='#3498db' title="ENVIAR EXCEDENTE" onPress={() => {  this.sendExtraBalance() }}>
	            <Image source={iconsMap['ios-send']} style={[styles.row_arrow]}/>
	          </ActionButton.Item>
						<ActionButton.Item buttonColor='#3498db' title="INICIAR CAJA DIARIA" onPress={() => {  this.applyCredit() }}>
	            <Image source={iconsMap['ios-cash']} style={[styles.row_arrow]}/>
						</ActionButton.Item>
        </ActionButton>)*/
				: (
					<ActionButton buttonColor={buttonColor} style={styles.actionButton} onPress={() => {  this.newTx() }} icon={ icon } />
					
				)
			}
      </View>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		account: state.wallet.account,
		history: state.wallet.history,
		balance: state.wallet.balance
	}
}

// function mapDispatchToProps(dispatch) {
// 	return {
// 		actions: bindActionCreators(walletActions, dispatch)
// 	};
// }


export default connect(mapStateToProps, null)(Main);
