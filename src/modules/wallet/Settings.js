import React, { PropTypes, Component } from 'react';
import SettingsList from 'react-native-settings-list';
import {
  Alert,
  Image,
  ListView,
  Text,
  TextInput,
	TouchableHighlight,
	TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from './wallet.actions';
import styles from './styles/Settings';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { iconsMap } from '../../utils/AppIcons';
import * as config from '../../constants/config';

import { AsyncStorage } from 'react-native'
import UWCrypto from '../../utils/Crypto';
import * as helperActions from '../../utils/Helper.js';

class Settings extends Component {

  static navigatorStyle = {
    navBarTextColor: '#666', 
    navBarComponentAlignment: 'center',
    navBarBackgroundColor: '#ffffff',
    navBarButtonColor: '#000000',
    navBarTextFontFamily: 'Montserrat-Medium',
    topBarElevationShadowEnabled: false,
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

	_onShowWords() {
		this.props.navigator.push({
			screen:     'wallet.RecoveryKeywords',
			title:      'Palabras clave',
			passProps:  {mnemonic: this.props.account.mnemonic, hide_button:true}
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

		const iconSwap = (<Icon name="ios-swap" style={{ width:30}} size={30} color="#ababab" />);
		const iconSec  = (<Icon name="ios-key" style={{ width:30}} size={30} color="#ababab" />);

    return (<View style={styles.container}>
				<TouchableOpacity style={styles.button} onPress={() => {this._onShowWords.bind(this)}}>
					<View style={styles.buttonInner}>
						<View style={{justifyContent:'center'}}>
							<Text style={{ color:'#ababab', fontSize:12, fontFamily : 'Montserrat-Medium', textAlign: 'center'}}>Mostrar palabras para recupero de cuenta</Text>
						</View>
						<View style={styles.btn_container}>
              <Text style={{color:'#666', fontSize:15, fontFamily : 'Montserrat-SemiBold', }}>PALABRAS CLAVE</Text>
							{iconSec}
						</View>
					</View>
				</TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {this._onRestoreAccount.bind(this)}}>
          <View style={styles.buttonInner}>
            <View style={{justifyContent:'center'}}>
              <Text style={{ color:'#ababab', fontSize:12, fontFamily : 'Montserrat-Medium', textAlign: 'center'}}>Restaurar una cuenta a partir de palabras</Text>
            </View>
            <View style={styles.btn_container}>
              <Text style={{color:'#666', fontSize:15, fontFamily : 'Montserrat-SemiBold', }}>RESTAURAR CUENTA</Text>
              {iconSwap}
            </View>
          </View>
        </TouchableOpacity>

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
