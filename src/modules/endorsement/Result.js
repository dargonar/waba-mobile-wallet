import React, { PropTypes, Component } from 'react';

import {
  View,
  Text
} from 'react-native';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './styles/Result';
import * as walletActions from '../wallet/wallet.actions';
import { Icon } from 'react-native-elements';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as fn_avales from './components/static/endorsements_const';

class Result extends Component {

  static navigatorStyle = {
    navBarTextColor: '#ffffff',
    navBarBackgroundColor: '#2e2f3d',
    navBarButtonColor: '#ffffff',
		navBarTextFontFamily: 'roboto_thin'
  }


  constructor(props) {
    super(props);

    this.state = {
      endorsed 				: props.endorsed,
// 			endorse_type 		: props.endorse_type,
// 			endorse_index		: props.endorse_index
    };

		let that = this;
    setTimeout( function() {
      that.props.actions.retrieveHistory(
				that.props.account.name,
				that.props.account.keys,
				!that.props.account.id,
        undefined,
        that.props.account.subaccount);  
    }, 1500);

  }

  _onOkPress(){
    this.props.navigator.popToRoot({
      animated: true
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

// 		let aval_txt = fn_avales.getAvalDesc(fn_avales.avales[this.state.endorse_index]);
// 		<Text style={styles.title_part}>TIPO DE CREDITO</Text>
// 		<Text style={[styles.data_part,styles.margin_bottom]}>{aval_txt}</Text>

    return (

      <View style={styles.container}>
        <View style={{flex:3, justifyContent: 'center'}}>
          <Text style={styles.title}>Envío exitoso</Text>
        </View>
        <View style={{flex:4}}>

          <Text style={styles.title_part}>DESTINATARIO</Text>
          <Text style={[styles.data_part,styles.margin_bottom]}>{this.state.endorsed}</Text>

        </View>
        <View style={{flex:2, flexDirection:'row', justifyContent: 'flex-end'}}>
          <Icon
            raised
            containerStyle={{backgroundColor:'#2e2f3d', borderWidth: 0.5, borderColor: '#B7F072' }}
            name='md-checkmark'
            type='ionicon'
            color='#B7F072'
            underlayColor='#415261'
            onPress={this._onOkPress.bind(this)}
            size={30} />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
	return {
 		account: state.wallet.account,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(walletActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Result);
