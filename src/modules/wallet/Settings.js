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
    navBarTextColor: '#ffffff', 
    navBarBackgroundColor: '#3F779D',
    navBarButtonColor: '#ffffff',
		navBarTextFontFamily: 'roboto_thin'
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
          
		const iconSwap = (<Icon name="ios-swap" style={{paddingTop:25}}  size={30} color="#ffffff" />);
		const iconSec  = (<Icon name="ios-key" style={{paddingTop:25}} size={30} color="#ffffff" />);
		
		return (<View style={styles.container}>
				<TouchableOpacity style={styles.button} onPress={this._onShowWords.bind(this)}>
					<View style={[styles.buttonInner, {  backgroundColor	: '#044967' }]}>
						<View style={{ flex:4 , flexDirection:'column', justifyContent:'center'}}>
							<Text style={{ flex:1, color:'white', fontSize:12, fontFamily : 'roboto_light', fontWeight: '100' }}>Mostrar palabras para recupero de cuenta</Text>
							<Text style={{ flex:1, color:'white', fontSize:18, fontFamily : 'roboto_normal', }}>PALABRAS CLAVE</Text>
						</View>	
						<View style={{flex:1, justifyContent:'center', alignItems:'center' }}>
							{iconSec}		
						</View>
					</View>
				</TouchableOpacity>
						
				<TouchableOpacity style={styles.button} onPress={this._onRestoreAccount.bind(this)}>
					<View style={[styles.buttonInner, {  backgroundColor	: '#044967' }]}>
						<View style={{ flex:4 , flexDirection:'column', justifyContent:'center'}}>
							<Text style={{ flex:1, color:'white', fontSize:12, fontFamily : 'roboto_light', fontWeight: '100' }}>Restaurar una cuenta a partir de palabras</Text>
							<Text style={{ flex:1, color:'white', fontSize:18, fontFamily : 'roboto_normal', }}>RESTAURAR CUENTA</Text>
						</View>	
						<View style={{flex:1, justifyContent:'center', alignItems:'center' }}>
							{iconSwap}		
						</View>
					</View>
				</TouchableOpacity>
			  
			</View>
    );

//   	return (
//       <View style={styles.container}>
//         <SettingsList>
//         	<SettingsList.Header headerText='Cuenta'/>
//           <SettingsList.Item
//             icon={<View style={{height:30,marginLeft:10,alignSelf:'center'}}>
//                     {iconSwap}
// 									</View>}
//             itemWidth={50}
//             title='Restaurar cuenta'
// 			      onPress={this._onRestoreAccount.bind(this)}
//           />
//           <SettingsList.Item
//             icon={<View style={{height:30,marginLeft:10,alignSelf:'center'}}>
//                     {iconSec}
// 									</View>}
//             itemWidth={50}
//             title='Mostrar palabras clave'
// 			      onPress={this._onShowWords.bind(this)}
//           />
          
//         </SettingsList>
//       </View>
//     );
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

