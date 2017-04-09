import React, { PropTypes, Component } from 'react';
import { SearchBar } from 'react-native-elements'
import { List, ListItem } from 'react-native-elements'
import { ActivityIndicator } from 'react-native';

import {
  View,
  ListView
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from '../wallet/wallet.actions';
import { iconsMap } from '../../utils/AppIcons';
import * as config from '../../constants/config';

import styles from './styles/SelectEndorseType';

class SelectEndorseType extends Component {
  
  static navigatorStyle = {
    navBarTextColor: '#ffffff', 
    navBarBackgroundColor: '#0B5F83',
    navBarButtonColor: '#ffffff'
  }
  
  constructor(props) {
    super(props);
    this.tid = undefined;
	}
  
  
  componentWillMount() {
    // this.setState({recipient_selected:false}); 
  }

  componentWillReceiveProps(nextProps) {
  }

  componentDidMount() {
	}

  componentWillUnmount() {
//     AppState.removeEventListener('change', this.handleAppStateChange);
  }
  	
	_onNext(){
      // if(Number(this.props.balance)<=Number(this.state.amount))
      // {
      //   Alert.alert(
      //     'Fondos insuficientes',
      //     'No dispone de fondos suficientes para realizar la operación.',
      //     [
      //       {text: 'OK'},
      //     ]
      //   )
      //   return;
      // }
      this.props.navigator.push({
        screen: 'wallet.SendConfirm',
        title: 'Confirmar envío',
        passProps: {
          endorse_type:   1,
          endorse_member: 1
        }
      });
    }

				
  render() {
    render() {
        const iconMoney = (<Icon name="logo-usd" size={26} color="#9F9F9F" style={{textAlign:'center', textAlignVertical:'center', flex:1 }} />);
        return (
            <View style={{flex: 1, backgroundColor:'#fff', flexDirection: 'column'}}>
              <View style={{flex:1, flexDirection:'column', alignItems:'stretch', justifyContent:'flex-end' }}>
                <TouchableHighlight
                    style={styles.fullWidthButton}
                    onPress={this._onNext.bind(this)} >
                  <Text style={styles.fullWidthButtonText}>SIGUIENTE</Text>
                </TouchableHighlight>
              </View>
            </View>
        );
    }
		
		
    
  }
}

function mapStateToProps(state, ownProps) {
	return {
		// memo: state.wallet.memo
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(walletActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(SelectEndorseType);
