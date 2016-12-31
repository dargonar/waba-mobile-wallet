import React, { PropTypes, Component } from 'react';
import SettingsList from 'react-native-settings-list';
import {
  Alert,
  Image, 
  ListView,
  Text, 
  TextInput,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from './wallet.actions';
import styles from './styles/Settings';
import { Button } from 'react-native-elements';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { iconsMap } from '../../utils/AppIcons';
import * as config from '../../constants/config';

import { AsyncStorage } from 'react-native'
import UWCrypto from '../../utils/Crypto';
import * as helperActions from '../../utils/Helper.js';

class Settings extends Component {
  
  static navigatorStyle = {
    navBarTextColor: '#ffffff', 
    navBarBackgroundColor: '#1f475b',
    navBarButtonColor: '#ffffff'
  }
  
  constructor(props) {
    super(props);
//     this._onRestoreAccount        = this._onRestoreAccount.bind(this);
    
  }
  
  _onRestoreAccount() {
		this.props.navigator.push({
			screen: 'wallet.RestoreAccount',
			title: 'Restaurar cuenta'
		});
	}

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }
  
  focus() {
  }

  render() {
		// https://www.npmjs.com/package/react-native-settings-list#usage
		// <SettingsList.Header headerText='Different Grouping' headerStyle={{marginTop:50}}/>
		// <SettingsList.Item titleInfo='Some Information' hasNavArrow={false} title='Information Example'/>
          
		const iconSwap = (<Icon name="ios-swap" size={30} color="#1f475b" />);
  	return (
      <View style={styles.container}>
        <SettingsList>
        	<SettingsList.Header headerText='Cuenta'/>
          <SettingsList.Item
            icon={<View style={{height:30,marginLeft:10,alignSelf:'center'}}>
                    {iconSwap}
									</View>}
            itemWidth={50}
            title='Restaurar cuenta'
			      onPress={this._onRestoreAccount.bind(this)}
          />
          
        </SettingsList>
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
	return {
		memo: state.wallet.new_keys,
    account: state.wallet.account
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(walletActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
