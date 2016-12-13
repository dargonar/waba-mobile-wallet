import React, { PropTypes, Component } from 'react';
import { SearchBar } from 'react-native-elements'

import {
  Alert,
  ListView,
  Text, 
  TextInput,
  View
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from './wallet.actions';
import styles from './styles/RestoreAccount';
import { Button } from 'react-native-elements';
import KeyboardSpacer from 'react-native-keyboard-spacer';

class RestoreAccount extends Component {
  
  static navigatorStyle = {
    navBarTextColor: '#ffffff', 
    navBarBackgroundColor: '#1f475b',
    navBarButtonColor: '#ffffff'
  }
  
  constructor(props) {
    super(props);
    this._onChangeText        = this._onChangeText.bind(this);
    this._onClearButtonPress  = this._onClearButtonPress.bind(this);
    this._onRestoreAccount    = this._onRestoreAccount.bind(this);
//     this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
  }
  
//   _onNavigatorEvent(event) { 
//     if (event.type == 'NavBarButtonPress') { 
//       if (event.id == 'clearMemo') { 
//         console.log(this.props.actions);
// 				this.props.actions.memoSuccess('');
// 				//this.setState({memo:''});
//       }
//     }
//   }

  _onRestoreAccount() {
  
	}

  _onChangeText() {
  
	}
  
	_onClearButtonPress() {
  
	}
  
  _onLoadKeys(){
  // Something
  // 		this.props.navigator.pop();
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
  	// autoFocus={true}
    // <KeyboardSpacer />
		return (
      <View style={styles.container}>
        <View style={{flex:3, justifyContent:'center', alignItems:'center', padding:15, backgroundColor: '#415261'}}>
					<Text style={styles.keywordsTitle} numberOfLines={4}>
            Para recuperar su cuenta ingrese las palabras resguardadas en el momento de la creación de su cuenta respetando 
            orden y minúscula/mayúscula. 
          </Text>
				</View>
        <TextInput
          style={{flex:6, fontSize:25}}
          editable={true}
          maxLength={60}
          multiline={true}
          textAlignVertical='top'
					underlineColorAndroid ="transparent"
        />
        <Button buttonStyle={{flex: 1, backgroundColor:"#2c3f50", marginLeft:0, marginRight:0 }}  underlayColor="#546979"
					onPress={this._onRestoreAccount} title='RESTAURAR CUENTA' />
        
                    
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

export default connect(mapStateToProps, mapDispatchToProps)(RestoreAccount);

