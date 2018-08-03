import React, { PropTypes, Component } from 'react';
import {
	Alert,
	Image,
	Text,
	TouchableHighlight,
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
import Icon from 'react-native-vector-icons/Ionicons';
import * as config from '../../constants/config';

class Main extends Component {

	constructor(props) {
		super(props);
    this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
		this.state 					= {account:''};
		this.newTx 					= this.newTx.bind(this);
		this.rewardCustomer	= this.rewardCustomer.bind(this);
		this.receivePayment	= this.receivePayment.bind(this);

		this._onDiscountOrReward	= this._onDiscountOrReward.bind(this);
	}

	componentWillMount() {

	}

	componentWillReceiveProps(nextProps) {
  	//console.log('Main::componentWillReceiveProps', nextProps);
	}

	_onDiscountOrReward(){
		this.props.navigator.push({
			screen: 'wallet.DiscountOrReward',
			title: 'Cobrar'
		});
	}

	rewardCustomer(){

			this.props.navigator.push({
	      screen: 'wallet.SelectCustomer',
				title: 'Cliente'
			});
	}

	receivePayment(){
	}

	newTx(){
		this.props.navigator.push({
      screen: 'wallet.SelectRecipient',
			title: 'Comercio'
		});
	}
  _onNavigatorEvent(event) {

		if(event.id == 'qrCode') {
			Alert.alert(
				'No disponible',
				'Función no disponible.',
				[
					{text: 'OK'},
				]
			)
    }

  }

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
		return (
			<View style={styles.container}>
        <Balance {...this.props} style={styles.balance}/>
        <History {...this.props} style={styles.history}/>
				<View style={{flex:1, flexDirection:'column', alignItems:'stretch', justifyContent:'flex-end' }}>
					<TouchableHighlight
							style={styles.fullWidthButton}
							onPress={this._onDiscountOrReward.bind(this)} >
						<Text style={styles.fullWidthButtonText}>COBRAR</Text>
					</TouchableHighlight>
				</View>

				{ (subaccount_mode)?
					(<ActionButton buttonColor={buttonColor} offsetY={120}>
          <ActionButton.Item buttonColor='#1abc9c' title="RECOMPENSAR" onPress={() => {  this.rewardCustomer() }}>
	            <Image source={iconsMap['ios-arrow-round-up']} style={[styles.row_arrow, {transform : [{rotate: '-45 deg'}]}]}/>
						</ActionButton.Item>
	          <ActionButton.Item buttonColor='#3498db' title="RECIBIR PAGO" onPress={() => {  this.receivePayment() }}>
	            <Image source={iconsMap['ios-arrow-round-up']} style={[styles.row_arrow, {transform : [{rotate: '135 deg'}]}]}/>
	          </ActionButton.Item>
        </ActionButton>)
				: (<ActionButton buttonColor={buttonColor} style={styles.actionButton} onPress={() => {  this.newTx() }} icon={ icon } />)
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
