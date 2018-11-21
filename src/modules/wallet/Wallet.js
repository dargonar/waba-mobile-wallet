import React, { PropTypes, Component } from 'react';
import {
	Alert,
	Image,
	Text,
	TouchableHighlight,
	TouchableOpacity,
	ToastAndroid,
	View
} from 'react-native';

import { connect } from 'react-redux';

import styles from './styles/Main';
import Balance from './components/Balance';
import History from './components/History';
import ActionButton from 'react-native-action-button';
import { iconsMap } from '../../utils/AppIcons';

import {Button, Icon, Fab} from 'native-base';
import * as config from '../../constants/config';

class Wallet extends Component {

	constructor(props) {
		super(props);
    	
  	
  	this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
		
		this.state 						= {account:'', fab_active:false};
		this.newTx 						= this.newTx.bind(this);
		this.requestPayment		= this.requestPayment.bind(this);
		this.doPay						= this.doPay.bind(this);
		this._onDiscountOrReward	= this._onDiscountOrReward.bind(this);

		this.state = {
			with_error : (props.with_error!==undefined && props.with_error==1)?1:0
  
		}
		
		this.disableRightDrawer();
	}

	disableRightDrawer(){
		this.props.navigator.setDrawerEnabled({
      side: 'right',
      enabled: false
    });
	}

 	componentDidAppear() {
  	this.disableRightDrawer();
  }


	componentWillReceiveProps(nextProps) {
  	let new_state = {};
		if (nextProps.history !== this.props.history) {
			this.setState({with_error:0});
		}
	}

 _onNavigatorEvent(event) {
    /*
    id: 'didAppear',
		navigatorEventID: 'screenInstanceID2_events',
		type: 'ScreenChangedEvent'
		*/
		if (event.type == 'ScreenChangedEvent') {
			if (event.id == 'didAppear') {
				this.componentDidAppear();
				return;
			}
			return;
		}

    if (event.type == 'NavBarButtonPress') {
      // if (event.id == 'scanQRCode') {
      //   this.qrButtonPressed();
      // 	return;
      // }
      
  		if (event.id == 'popToRoot') {
        this.props.navigator.popToRoot({
  				animated: true
  			});
  			return;
      }
		      
    	if (event.id == 'listBusinesses') {
        this.showBusinesses();
        return;
      }	
	 
    }
  }

  showBusinesses(){
  	this.props.navigator.push({
      screen: 'wallet.Main',
      navigatorStyle : {
       navBarButtonColor : '#000',
       drawUnderNavBar   : true,
       navBarTransparent : true,
			 navBarNoBorder 	 : true,
			 topBarElevationShadowEnabled: false
      },
      rightButtons : [
        {
          icon: iconsMap['ios-search'],
          id: 'searchBusiness' // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        },
        {
          icon: iconsMap['md-funnel'],
          id: 'filterBusiness' // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        }
      ],
      leftButtons: [
    		{
    			icon: iconsMap['md-arrow-back'],
    			id: 'popToRoot'
    		}
    	]
    });
  }

	_onDiscountOrReward(){
		this.props.navigator.push({
			screen: 'wallet.DiscountOrReward',
			title: 'Cobrar'
		});
	}

	doPay(){
		this.props.navigator.push({
      screen: 'wallet.QRScanner',
      title: 'Escanear factura',
      passProps: {mode:config.QRSCAN_INVOICE_DISCOUNT}
    });
	}

	requestPayment(){
		this.props.navigator.push({
		  screen: 'wallet.RequestPayment',
			title: 'Recibir discoins'
		});
	}
	
	newTx(){
		
		this.props.navigator.push({
      screen: 'wallet.FindUser',
			title: 'Elija discoiner',
			passProps:  { search_type: config.SEARCH_TYPE_SEND} //SEARCH_TYPE_CONFIRM
		});
	}



	// FAV Button: https://github.com/mastermoo/react-native-action-button
	// style={styles.actionButtonIcon}	

	          
	render() {
		
		let buttonColor =	(config.isSubaccountMode(this.props.account.subaccount)) ? '#0A566B':'#ff7233' ;
		let subaccount_mode 		= config.isSubaccountMode(this.props.account.subaccount);
		
		let message = 'Algo esta sucediendo :( /n Podemos tener un problema en nuestros servidores o no tenésconexión a internet';
		
    let receiveIcon  =  (<Image source={{uri:iconsMap['qrcode--big'].uri}} style={{height:20, width:20}} />);
    let walletIcon  	=  (<Image source={{uri:iconsMap['wallet'].uri}} style={{height:20, width:21}} />);
		// let icon = (<Icon name="ios-add" />);
		// <ActionButton buttonColor={buttonColor} style={styles.actionButton} onPress={() => {  this.newTx() }} icon={ icon } />
		return (
			<View style={styles.wallet_container}>
	        <Balance {...this.props} style={styles.balance}/>
		        {
		        	(this.state.with_error==1)?
		        	(<View style={styles.containerEmpty}>
								<View style={styles.bgImageWrapper}>
									<Image source={require('./components/img/pattern.png')} style={styles.bgImage} />
								</View>
								<Text style={styles.emptyListText}>{message}</Text>
								<TouchableOpacity style={styles.button} onPress={this._onRefresh.bind(this)}>
									<Text style={styles.text}>Actualizar</Text>
								</TouchableOpacity>
							</View>)
		        	:(<History {...this.props} style={styles.history}/>)
		        }

		        
				{ (subaccount_mode)?
					(<View style={styles.subaccountButtonContainer}>
						<TouchableHighlight
								style={styles.fullWidthButton}
								onPress={ this._onDiscountOrReward } >
							<Text style={styles.fullWidthButtonText}>COBRAR</Text>
						</TouchableHighlight>
						</View>) : false }
				{ (subaccount_mode)?
				false:

				(<ActionButton  shadowStyle={{elevation: 10}} buttonColor={buttonColor} bgColor="rgba(0, 0, 0, 0.5)"  degrees={0} offsetY={20} offsetX={20}>
					<ActionButton.Item hideLabelShadow buttonColor='#FFFFFF' title="ENVIAR" textStyle={styles.actionButtonText} onPress={() => {  this.newTx() }}>
						<Icon name='arrow-up' type='MaterialCommunityIcons' style={{fontSize: 20, color: '#666'}}/>
					</ActionButton.Item>
					<ActionButton.Item hideLabelShadow buttonColor='#FFFFFF' title="RECIBIR" textStyle={styles.actionButtonText} onPress={() => {  this.requestPayment() }}>
						{/*<Icon name='qrcode' type='MaterialCommunityIcons' style={{fontSize: 20, color: '#666'}}/>*/}
						{receiveIcon}
					</ActionButton.Item>
					<ActionButton.Item hideLabelShadow buttonColor='#FFFFFF' title="PAGAR" textStyle={styles.actionButtonText} titleColor='#FF0000' onPress={() => {  this.doPay() }}>
						{/*<Icon name='trending-down' type='MaterialCommunityIcons' style={{fontSize: 20, color: '#666'}}/>*/}
						{walletIcon}
					</ActionButton.Item>
				</ActionButton>)}
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


export default connect(mapStateToProps, null)(Wallet);
