import React, { PropTypes, Component } from 'react';

import {
  View,
  Text
} from 'react-native';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from '../wallet/wallet.actions';
import styles from './styles/SendResultEx';
import { Icon } from 'react-native-elements';
import KeyboardSpacer from 'react-native-keyboard-spacer';

class SendResultEx extends Component {

  static navigatorStyle = {
    navBarTextColor: '#ffffff',
    navBarBackgroundColor: '#f15d44',
    navBarButtonColor: '#ffffff',
		navBarTextFontFamily: 'roboto_thin',
    topBarElevationShadowEnabled: false
  }


  constructor(props) {
    super(props);

    this.state = {
      recipient : props.recipient,
      amount : props.amount,
      memo : props.memo,
      refreshing : false,
      types: ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle',
              '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
      size: 100,
      color: "#B7F072",
      isVisible: true

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

		let mensaje = this.state.memo;
		let mensaje_ui1 = undefined;
		let mensaje_ui2 = undefined;
		if(mensaje)
		{
			mensaje_ui1 = (<Text style={styles.title_part}>MENSAJE</Text>)
			mensaje_ui2 = (<Text style={styles.data_part}>{mensaje}</Text>)
		}

    return (

      <View style={styles.container}>
        <View style={{flex:3, justifyContent: 'center', backgroundColor:'transparent'}}>
          <Text style={styles.title}>Envío exitoso</Text>
          <Text style={[styles.amount]}>$ {this.state.amount}</Text>
        </View>
        <View style={{flex:4, backgroundColor:'transparent'}}>

          <Text style={styles.title_part}>DESTINATARIO</Text>
          <Text style={[styles.data_part,styles.margin_bottom]}>{this.state.recipient.name}</Text>
          {mensaje_ui1}
					{mensaje_ui2}

        </View>
        <View style={{flex:2, flexDirection:'row', justifyContent: 'flex-end', backgroundColor:'transparent'}}>
          <Icon
            raised
            containerStyle={{backgroundColor:'#f15d44', borderWidth: 0.5, borderColor: 'transparent' }}
            name='md-checkmark'
            type='ionicon'
            color='#ffffff'
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

export default connect(mapStateToProps, mapDispatchToProps)(SendResultEx);
