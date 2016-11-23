import React, { PropTypes, Component } from 'react';

import {
  View,
  Text,
	Alert
} from 'react-native';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from './wallet.actions';
import styles from './styles/NewAccount';
import { Button } from 'react-native-elements';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Spinner from 'react-native-spinkit';

class NewAccount extends Component {
  
  static navigatorStyle = {
    navBarTextColor: '#ffffff', 
    navBarBackgroundColor: '#1f475b',
    navBarButtonColor: '#ffffff'
  }
  
  
  constructor(props) {
    super(props);
    this.state = {
      types:      ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', 
                   '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
      size:       100,
      color:      "#d8ef27",
      isVisible:  true
    };
    this._onCreateAccountSucces = this._onCreateAccountSucces.bind(this);
    
  }
  
  _onCreateAccountSucces(){
    this.props.navigator.resetTo({
			screen:     'wallet.RecoveryKeywords',
			title:      'Recupero de clave'
    });
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  componentDidMount() {
  	setTimeout(() => {
//       Alert.alert(
// 				'Error en envío',
// 				'No dispone de fondos suficientes',
// 				[
// 					{text: 'OK', onPress: () => this._onCreateAccountSucces() },
// 				]
// 			)
			this._onCreateAccountSucces();
    }, 3500)	;
  }

  componentWillUnmount() {
  }
  
  focus() {
  }

  render() {
  	let type = this.state.types[3];
    return (
      <View style={styles.container}>
        <View style={{flex:3, justifyContent: 'center', alignItems:'center', backgroundColor:'#1f475b'}}>
          <Spinner style={styles.spinner} isVisible={this.state.isVisible} size={this.state.size} type={type} color="#d8ef27"/>
        </View>
        <View style={{flex:4, backgroundColor:'#1f475b', paddingLeft:30, paddingRight:30}}>
					<View style={{flexDirection:'row', justifyContent:'center'}}>	
						<Text style={styles.title_part}>Creando cuenta</Text>
					</View>
        </View>
				<View style={{flex:1, backgroundColor:'#1f475b', paddingLeft:30, paddingRight:30}}>
					<View style={{flexDirection:'row', justifyContent:'center'}}>	
						<Text style={styles.title_part}>Por favor aguarde...</Text>
					</View>
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

export default NewAccount;