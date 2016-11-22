import React, { PropTypes, Component } from 'react';
import { SearchBar } from 'react-native-elements'

import {
  View,
  ListView,
  TextInput, 
  Alert
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from './wallet.actions';
import styles from './styles/Memo';
import { Button } from 'react-native-elements';
import KeyboardSpacer from 'react-native-keyboard-spacer';

class Memo extends Component {
  
  static navigatorStyle = {
    navBarTextColor: '#ffffff', 
    navBarBackgroundColor: '#1f475b',
    navBarButtonColor: '#ffffff'
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
        console.log(this.props.actions);
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
        />
        <Button buttonStyle={{flex: 1, backgroundColor:"#2c3f50", marginLeft:0, marginRight:0 }}  underlayColor="#546979"
					onPress={this._onApplyMemo.bind(this)} title='APLICAR' />
        <KeyboardSpacer />
                    
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

