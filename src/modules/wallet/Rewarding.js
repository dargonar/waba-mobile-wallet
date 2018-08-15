import React, { PropTypes, Component } from 'react';

import {
  View,
  Text,
	Alert,
  Image 
} from 'react-native';

import UWCrypto from '../../utils/Crypto';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from './wallet.actions';
import styles from './styles/Sending';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Spinner from 'react-native-spinkit';
import * as config from '../../constants/config';

class Rewarding extends Component {

  static navigatorStyle = {
    navBarTextColor: '#ffffff',
    navBarBackgroundColor: '#0A566B',
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
      color:      "#0A566B",
      isVisible   :  true,
			modal_type  : props.mode,
      recipient   : props.recipient,
      amount      : props.amount,
      identicon   : ''
    };
	}


  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  componentDidMount() {
    let identicon = config.getIdenticon(this.state.recipient.name);
    this.setState({ identicon : identicon });
  }

  componentWillUnmount() {
  }

  focus() {
  }

  render() {
    let type = this.state.types[0];
		let type2 = this.state.types[8];

    let userIcon = (<Image style={{width: 50, height: 50, resizeMode: Image.resizeMode.contain, borderWidth: 0}} source={{uri: this.state.identicon}}/>)

  	return (
      <View style={styles.container}>
        <View style={{flex:3, justifyContent: 'center', alignItems:'center', backgroundColor:'transparent'}}>
          <Spinner style={styles.spinner} isVisible={this.state.isVisible} size={this.state.size} type={type2} color="#0A566B"/>
        </View>
        <View style={{flex:4, backgroundColor:'transparent', paddingLeft:30, paddingRight:30, alignItems:'flex-start'}}>
          
          <Text style={styles.title_part}>RECOMPENSANDO A:</Text>
          
          <View style={{height:100, flexDirection:'row', justifyContent: 'center'}}>
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            {userIcon}
            </View>
            <View style={{flex:3, justifyContent: 'center', alignItems:'flex-start' }}>
              <Text style={styles.data_part} >
                {this.state.recipient.name}
              </Text>
            </View>
          </View>

          <Text style={styles.title_part}>POR:</Text>
          <Text style={styles.data_part}>D$C {this.state.amount} </Text>
          

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
