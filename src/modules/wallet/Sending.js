import React, { PropTypes, Component } from 'react';

import {
  View,
  Text,
	Alert
} from 'react-native';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from './wallet.actions';
import styles from './styles/Sending';
import { Button } from 'react-native-elements';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Spinner from 'react-native-spinkit';

class Sending extends Component {
  
  static navigatorStyle = {
    navBarTextColor: '#ffffff', 
    navBarBackgroundColor: '#1f475b',
    navBarButtonColor: '#ffffff'
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
      color:      "#d8ef27",
      isVisible:  true
    };
    console.log(' -- this.state.recipient => ', this.state.recipient);
    this._onSent = this._onSent.bind(this);
    
  }
  
  _onSent(){
    this.props.navigator.push({
			screen:     'wallet.SendResult',
			title:      'Envío exitoso',
		  passProps:  {
        recipient : this.state.recipient,
        amount :    this.state.amount,
        memo :      this.state.memo
      }
    });
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  componentDidMount() {
  	setTimeout(() => {
      Alert.alert(
				'Error en envío',
				'No dispone de fondos suficientes',
				[
					{text: 'OK', onPress: () => this._onSent() },
				]
			)
    }, 3500)	;
  }

  componentWillUnmount() {
  }
  
  focus() {
  }

  render() {
  	let type = this.state.types[8];
    return (
      <View style={styles.container}>
        <View style={{flex:3, justifyContent: 'center', alignItems:'center', backgroundColor:'#1f475b'}}>
          <Spinner style={styles.spinner} isVisible={this.state.isVisible} size={this.state.size} type={type} color="#d8ef27"/>
        </View>
        <View style={{flex:4, backgroundColor:'#1f475b', paddingLeft:30, paddingRight:30}}>
          <Text style={styles.title_part}>Enviando:</Text>
          <Text style={styles.data_part}>$ {this.state.amount}</Text>
          <Text style={styles.title_part}>A:</Text>
          <Text style={styles.data_part}>{this.state.recipient.name}</Text>
          <Text style={styles.title_part}>con mensaje:</Text>
          <Text style={styles.data_part}>{this.state.memo}</Text>
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