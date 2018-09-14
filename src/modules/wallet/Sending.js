import React, { PropTypes, Component } from 'react';

import {
  Image, 
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
import * as config from '../../constants/config';

class Sending extends Component {

  static navigatorStyle = {
    navBarTextColor: '#ffffff',
    navBarBackgroundColor: '#f15d44',
    navBarButtonColor: '#ffffff',
		navBarTextFontFamily: 'roboto_thin',
    topBarElevationShadowEnabled: false
  }


  constructor(props) {
    super(props);
		if(props.modal_type == 'sending')
		{
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
		else{
			this.state = {
      types:      ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle',
                   '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
      size:       100,
      color:      "#F64D27",
      isVisible:  true,
			modal_type: props.modal_type,
      message   : props.message
    };
	}

//     console.log(' -- this.state.recipient => ', this.state.recipient);

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
    if(this.state.modal_type == 'sending')
		{
			let mensaje = this.state.memo;
			let mensaje_ui1 = undefined;
			let mensaje_ui2 = undefined;
			if(mensaje)
			{
				mensaje_ui1 = (<Text style={styles.title_part}>con mensaje</Text>);
				mensaje_ui2 = (<Text style={styles.data_part}>{mensaje}</Text>);
			}

			let imgData = config.getRedDiscoinIcon();

			return (
				<View style={styles.container}>
					<View style={{flex:3, justifyContent: 'center', alignItems:'center', backgroundColor:'transparent'}}>
						<Spinner style={styles.spinner} isVisible={this.state.isVisible} size={this.state.size} type={type} color="#f15d44"/>
					</View>

					<View style={{flex:2, backgroundColor:'transparent', flexDirection:'column', justifyContent:'flex-start', alignItems:'center' }}>
						<View style={styles.row}>
							<Text style={styles.title_part}>enviando</Text>
							<Image style={{alignSelf:'flex-start', width: 15, height: 15, marginRight:2 , resizeMode: Image.resizeMode.contain, borderWidth: 0}} source={{uri: imgData}}/>
							<Text style={styles.money_part}>{this.state.amount}</Text>	
						</View>
						
						<View style={{flexDirection:'row', alignItems:'flex-end'}}>
							<Text style={styles.title_part}>a</Text>
							<Text style={styles.data_part}>{this.state.recipient.name}</Text>
						</View>
						<View style={{flexDirection:'row', alignItems:'flex-end'}}>
							{mensaje_ui1}
							{mensaje_ui2}
						</View>
					</View>
						
					
				</View>
			);
		}
		else
			return (
      <View style={styles.container}>
        <View style={{flex:3, justifyContent: 'center', alignItems:'center', backgroundColor:'transparent'}}>
          <Spinner style={styles.spinner} isVisible={this.state.isVisible} size={this.state.size} type={type2} color="#f15d44"/>
        </View>
        <View style={{flex:4, backgroundColor:'transparent', paddingLeft:30, paddingRight:30, alignItems:'center'}}>
          <Text style={styles.data_part}>{this.state.message}</Text>
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

export default Sending;
