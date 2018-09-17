import React, { PropTypes, Component } from 'react';
import {
	Alert,
	Image,
	Text,
	TouchableHighlight,
	ToastAndroid,
	View
} from 'react-native';

import * as walletActions from './wallet.actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './styles/Main';
// import Balance from './components/Balance';
import BalanceDiscoin from './components/BalanceDiscoin';
import BusinessListWidget from './components/BusinessListWidget';
// import History from './components/History';
import ActionButton from 'react-native-action-button';
import { iconsMap } from '../../utils/AppIcons';
// import * as subaccount_helper from '../../utils/SubAccountHelper';
// import Icon from 'react-native-vector-icons/Ionicons';
import * as config from '../../constants/config';


import { Icon, Button } from 'native-base';

const alignItemsMap = {
  center: "center",
  left: "flex-start",
  right: "flex-end"
};

class Main extends Component {

	constructor(props) {
		super(props);
    	
  	
  	this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
		// this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

		this.state 								= {account:''};
		this.newTx 								= this.newTx.bind(this);
		this._onDiscountOrReward	= this._onDiscountOrReward.bind(this);
		this.filterBusinesses 		= this.filterBusinesses.bind(this);

	}

	componentWillMount() {
		let that = this;
    setTimeout( function() {
      that.props.actions.retrieveHistory(
				that.props.account.name,
				that.props.account.keys,
				!that.props.account.id,
        undefined,
        that.props.account.subaccount);
    }, 100);

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

	}

	filterBusinesses(){
		this.props.navigator.toggleDrawer({
      to: 'open',
      side: 'right',
      animated: true
    });
	}
		


	searchBusinessPressed(){
		
		this.props.navigator.push({
        screen:     'wallet.BusinessSearch',
        title:      '',
  	});

	}

  _onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'scanQRCode') {
        this.qrButtonPressed();
        return;
      }
      if (event.id == 'searchBusiness') {
        this.searchBusinessPressed();
        return;
      }
    }
  }


	_onDiscountOrReward(){
		this.props.navigator.push({
			screen: 'wallet.DiscountOrReward',
			title: 'Cobrar'
		});
	}

	
	newTx(){
		
		this.props.navigator.push({
      screen: 'wallet.FindUser',
			title: 'Elija usuario',
			passProps:  { search_type: config.SEARCH_TYPE_SEND} //SEARCH_TYPE_CONFIRM
		});

		// this.props.navigator.push({
  //     screen: 'wallet.SelectCustomer',
		// 	title: 'Elija usuario para enviar'
		// });

	}

	//////////////////////
  // STYLESHEET GETTERS
  //////////////////////

  getOrientation() {
    return { alignItems: alignItemsMap[this.props.position] };
  }

  getOffsetXY() {
    return {
      // paddingHorizontal: this.props.offsetX,
      paddingVertical: this.props.offsetY
    };
  }

  getOverlayStyles() {
    return [
      {
		    position: "absolute",
		    bottom: 10,
		    right: 10,
		    backgroundColor: "transparent",
        // elevation: this.props.elevation,
        zIndex: this.props.zIndex,
        justifyContent: this.props.verticalOrientation === "up"
          ? "flex-end"
          : "flex-start"
      }
    ];
  }

	// FAV Button: https://github.com/mastermoo/react-native-action-button
	render() {
		let buttonColor =	(config.isSubaccountMode(this.props.account.subaccount)) ? '#0A566B':'#f15d44' ;
		let subaccount_mode 		= config.isSubaccountMode(this.props.account.subaccount);

		return (
			<View style={styles.container}>
        <BalanceDiscoin {...this.props} style={styles.balance}/>
        <BusinessListWidget {...this.props} mode="main" style={styles.history}/>
				
				<View style={[
            this.getOverlayStyles(),
            this.getOrientation(),
            this.getOffsetXY(),
            { flexDirection: 'row', padding:10}
          ]}>
        	{/*<Button iconLeft rounded bordered style={styles.actionsButton}>
        					  	<Icon name='apps' />
        					    <Text style={styles.actionsButtonText}>CATEGORIAS</Text>
        					  </Button>*/}
				  <Button iconLeft rounded light onPress={() => {  this.filterBusinesses() }}>
				  	<Icon style={{opacity:0.3, color:'#000000'}} name='funnel' />
				    <Text style={styles.actionsButtonText}>FILTROS</Text>
				  </Button>  
				</View>	
				

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

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(walletActions, dispatch)
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(Main);
