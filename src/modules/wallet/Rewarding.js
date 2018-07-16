import React, { PropTypes, Component } from 'react';

import {
  View,
  Text,
	Alert
} from 'react-native';

import UWCrypto from '../../utils/Crypto';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from './wallet.actions';
import styles from './styles/Sending';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Spinner from 'react-native-spinkit';

class Rewarding extends Component {

  static navigatorStyle = {
    navBarTextColor: '#ffffff',
    navBarBackgroundColor: '#1abc9c',
    navBarButtonColor: '#ffffff',
		navBarTextFontFamily: 'roboto_thin',
    topBarElevationShadowEnabled: false
  }


  constructor(props) {
    super(props);

		this.state = {
      types:      ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle',
                   '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
      size:       100,
      color:      "#1abc9c",
      isVisible   :  true,
			modal_type  : props.mode,
      recipient   : props.recipient,
      amount      : props.amount
    };
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
    let type = this.state.types[0];
		let type2 = this.state.types[8];
  	return (
      <View style={styles.container}>
        <View style={{flex:3, justifyContent: 'center', alignItems:'center', backgroundColor:'transparent'}}>
          <Spinner style={styles.spinner} isVisible={this.state.isVisible} size={this.state.size} type={type2} color="#1abc9c"/>
        </View>
        <View style={{flex:4, backgroundColor:'transparent', paddingLeft:30, paddingRight:30, alignItems:'center'}}>
          <Text style={styles.data_part}>Recompensando a {this.state.recipient.name}</Text>
        </View>
      </View>
    );
  }
}

// function mapDispatchToProps(dispatch) {
// 	return {
// 		actions: bindActionCreators(walletActions, dispatch)
// 	};
// }

export default Rewarding;
