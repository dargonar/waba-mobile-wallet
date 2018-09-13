import React, { PropTypes, Component } from 'react';
import {
	Alert,
	Image,
	Text,
	TextInput,
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

class BusinessSearch extends Component {

	constructor(props) {
		super(props);
    	
  	
  	// this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
		// this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

		this.state 								= {account:''};
		// this.filterBusinesses 		= this.filterBusinesses.bind(this);

	}

	static navigatorStyle = {
    navBarButtonColor: '#000',
    navBarBackgroundColor: '#ffffff',
		topBarElevationShadowEnabled: false,
		navBarTextFontFamily: 'Montserrat-Regular'
  }

	componentWillMount() {

	}

	componentWillReceiveProps(nextProps) {
  	//console.log('Main::componentWillReceiveProps', nextProps);
	}


	searchBusinessPressed(){
		this.props.navigator.push({
      screen: 'wallet.BusinessProfile',
      title: rowData['name'],
      passProps: { business_data: rowData}
    });

	}

	

	// FAV Button: https://github.com/mastermoo/react-native-action-button
	render() {
		let buttonColor =	(config.isSubaccountMode(this.props.account.subaccount)) ? '#0A566B':'#f15d44' ;
		let subaccount_mode 		= config.isSubaccountMode(this.props.account.subaccount);

		return (
		<View style={styles.container}>
      	
      	<View style={{height:60, paddingLeft:20, paddingRight:20, backgroundColor:'#fff', flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
          <View style={{width:20, marginRight:10, alignSelf:'center', flexDirection:'row', justifyContent: 'center'}}>  
            <Icon name="ios-search" size={18}  style={{color:'#cccccc'}}  />
          </View>
          <TextInput
            autoCapitalize="words"
            style={[styles.textInputPlaceholder, {flex:1}]}
            onChangeText={(text) => this.setState( { searchText:text } ) }
            value={this.state.searchText}
            underlineColorAndroid ="transparent"
            placeholder="Buscar..."
          />
        </View>
        <BusinessListWidget {...this.props} mode="search" style={styles.history}/>
				
				

			</View>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		account: state.wallet.account,
		history: state.wallet.history
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(walletActions, dispatch)
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(BusinessSearch);
