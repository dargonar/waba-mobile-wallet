import React, { PropTypes, Component } from 'react';

import {
  View,
  ListView,
  Text, 
	TextInput,
  TouchableHighlight,
  Alert
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from './wallet.actions';
import styles from './styles/Memo';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import HideWithKeyboard from 'react-native-hide-with-keyboard';

class Memo extends Component {
  
  static navigatorStyle = {
    navBarTextColor: '#ffffff', 
    navBarBackgroundColor: '#0B5F83',
    navBarButtonColor: '#ffffff',
		navBarTextFontFamily: 'roboto_thin'
  }
  
  constructor(props) {
    super(props);
    this._onChangeText        = this._onChangeText.bind(this);
    this._onClearButtonPress  = this._onClearButtonPress.bind(this);
    this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
  }
  
  _onNavigatorEvent(event) { 
    if (event.type == 'NavBarButtonPress') { 
      if (event.id == 'clearMemo') { 
        //console.log(this.props.actions);
				this.props.actions.memoSuccess('');
				//this.setState({memo:''});
      }
    }
  }

  _onChangeText() {
  
	}
  
	_onClearButtonPress() {
  
	}
  
  _onApplyMemo(){
    // Something
		this.props.navigator.pop();
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
  	
		const memo = this.props.memo;
		
		return (
      
      <View style={styles.container}>
        <TextInput
					autoFocus={true}
					onChangeText={(text) => this.props.actions.memoSuccess(text)}
          style={{flex:6, fontSize:25}}
          value={memo}
          editable={true}
          maxLength={60}
          multiline={true}
          textAlignVertical='top'
					underlineColorAndroid ="transparent"
        />
				<HideWithKeyboard>
				<View style={{flex:1, flexDirection:'column', alignItems:'stretch', justifyContent:'flex-end' }}>
					<TouchableHighlight
							style={styles.fullWidthButton}
							onPress={this._onApplyMemo.bind(this)} >
						<Text style={styles.fullWidthButtonText}>AGREGAR MENSAJE</Text>
					</TouchableHighlight>
				</View>
        </HideWithKeyboard>
                    
        </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
	return {
		memo: state.wallet.memo
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(walletActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Memo);

