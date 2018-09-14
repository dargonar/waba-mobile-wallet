import React, { PropTypes, Component } from 'react';

import {
  Image, View,
  Text
} from 'react-native';

import * as config from '../../constants/config';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from './wallet.actions';
import styles from './styles/SendResult';
import { Icon } from 'native-base';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import ActionButton from 'react-native-action-button';

class SendResult extends Component {

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
			mensaje_ui1 = (<Text style={styles.title_part}>MENSAJE</Text>);
			mensaje_ui2 = (<Text style={styles.data_part}>{mensaje}</Text>);

		}
    
    let imgData = config.getRedDiscoinIcon();
    
    let icon = (<Icon name="md-checkmark" style={{ fontSize: 30, height: 30, color: '#fff'}} />);
    
    return (

      <View style={styles.container}>
        <View style={{flex:1, justifyContent: 'flex-start', backgroundColor:'transparent', padding:30, paddingTop:50, paddingBottom:50}}>
          <Text style={styles.title}>Envío exitoso</Text>
          <View style={styles.discoinCount}>
            <Image style={{alignSelf:'flex-start', width: 15, height: 15, marginRight:10 , resizeMode: Image.resizeMode.contain, borderWidth: 0}} source={{uri: imgData}}/>
            <Text style={styles.discoinCountValue}>{this.state.amount}</Text>
          </View>
        </View>
        <View style={{flex:3, backgroundColor:'#e7f5f6', padding:30}}>
          <Text style={styles.title_part}>DESTINATARIO</Text>
          <Text style={[styles.data_part,styles.margin_bottom]}>{this.state.recipient.name}</Text>
          {mensaje_ui1}
					{mensaje_ui2}
        </View>

        <ActionButton buttonColor={'#0bbbe4'} onPress={this._onOkPress.bind(this)} icon={ icon } />

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
export default connect(mapStateToProps, mapDispatchToProps)(SendResult);
