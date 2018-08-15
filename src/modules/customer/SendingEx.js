import React, { PropTypes, Component } from 'react';

import {
  View,
  Text,
	Alert
} from 'react-native';

import UWCrypto from '../../utils/Crypto';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from '../wallet/wallet.actions';
import styles from './styles/SendingEx';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Spinner from 'react-native-spinkit';

class SendingEx extends Component {

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
			amount :    props.amount,
			memo :      props.memo,
			types:      ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle',
									 '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
			size:       100,
			color:      "#F64D27",
			isVisible:  true,
			modal_type: props.modal_type
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
  	let type = this.state.types[8];
		let type2 = this.state.types[0];
		let doing = 'Pagando';
    if(this.state.modal_type == 'sending')
			doing = 'Enviando';
		let mensaje = this.state.memo;
		let mensaje_ui1 = undefined;
		let mensaje_ui2 = undefined;
		if(mensaje)
		{
			mensaje_ui1 = (<Text style={styles.title_part}>con mensaje:</Text>)
			mensaje_ui2 = (<Text style={styles.data_part}>{mensaje}</Text>)
		}
		
		return (
			<View style={styles.container}>
				<View style={{flex:3, justifyContent: 'center', alignItems:'center', backgroundColor:'transparent'}}>
					<Spinner style={styles.spinner} isVisible={this.state.isVisible} size={this.state.size} type={type} color="#f15d44"/>
				</View>
				<View style={{flex:4, backgroundColor:'transparent', paddingLeft:30, paddingRight:30}}>
					<Text style={styles.title_part}>{doing}:</Text>
					<Text style={styles.data_part}>$ {this.state.amount}</Text>
					<Text style={styles.title_part}>A:</Text>
					<Text style={styles.data_part}>{this.state.recipient.name}</Text>
					{mensaje_ui1}
					{mensaje_ui2}
				</View>
			</View>
		);
	}
}

export default SendingEx;
