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
    	
		this._onChangeText        = this._onChangeText.bind(this);  	
  	this.state = {
  			search_text:'',
  			search_text_posta:''
  		}

	}

	static navigatorStyle = {
    navBarButtonColor: '#000',
    navBarBackgroundColor: '#ffffff',
		topBarElevationShadowEnabled: false,
		navBarTextFontFamily: 'Montserrat-Regular'
  }

	componentWillMount() {

	}

	componentDidMount(){
	  if(this.searchTextInput)
	  	this.searchTextInput.focus()

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

	_onChangeText(text) {
    this.setState({search_text:text.trim()});
    
    clearTimeout(this.tid);
    let that = this;
    // this.tid = setTimeout( that.setBizFilter() , 700);
    // this.tid = setTimeout( that.setState( { search_text_posta:that.state.search_text } ) , 700);
		this.tid = setTimeout(() => {that.setState( { search_text_posta:that.state.search_text } )}, 700); //this starts the interval

  }

  setBizFilter(){
  	// this.setState({search_text_posta:text});
  	this.setState({search_text_posta:this.state.search_text});
  }

	// FAV Button: https://github.com/mastermoo/react-native-action-button
	// <Text style={{flex:1}}>{this.state.search_text} - {this.state.search_text_posta}</Text>
	render() {
		
		return (
		<View style={styles.container}>
      	
      	<View style={{height:60, paddingLeft:20, paddingRight:20, backgroundColor:'#fff', flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
          <View style={{width:20, marginRight:10, alignSelf:'center', flexDirection:'row', justifyContent: 'center'}}>  
            <Icon name="ios-search" size={18}  style={{color:'#cccccc'}}  />
          </View>
					<TextInput
            autoCapitalize="none"
            style={[styles.textInputPlaceholder, {flex:1}]}
            onChangeText={this._onChangeText}
            value={this.state.search_text}
            underlineColorAndroid ="transparent"
            placeholder="Buscar..."
            ref={(input) => { this.searchTextInput = input; }}
          />
        </View>
        <BusinessListWidget {...this.props} mode="search" search_text={this.state.search_text_posta} style={styles.history}/>
				
				

			</View>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		business_filter       : state.wallet.business_filter
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(walletActions, dispatch)
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(BusinessSearch);
