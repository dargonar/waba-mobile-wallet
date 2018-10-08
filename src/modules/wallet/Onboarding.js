import React, { PropTypes, Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import Permissions from 'react-native-permissions'

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff' //'#0B5F83'
  },
  subcontainer: {
    flex: 4
  },
  viewpager: {
    flex: 4,
    flexDirection: 'column'
  },
  buttons:{
    flex:2,
    paddingLeft:15,
    paddingRight:15,
    flexDirection:'column',
    alignItems: 'stretch',
    justifyContent:'center'
  },
  fullWidthButton: {
    borderRadius: 5,
    height:50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullWidthButton1: {
    backgroundColor: '#f0f4f7',
    padding: 5,
    borderRadius: 5,
    marginBottom:20,
  },
  fullWidthButton2: {
    backgroundColor: '#ff7232', //'#6bbd07',
  },

  fullWidthButtonText: {
    fontFamily : 'Montserrat-Medium',
    fontWeight : '400',
    fontSize   : 14,
    color: 'white'
  },
  fullWidthButtonText1: {
    fontFamily : 'Montserrat-Medium',
    fontWeight : '400',
    fontSize   : 14,
    color: '#666'
  },
  welcomeTitle:{
    fontFamily : 'Montserrat-Regular',
    fontWeight : '100',
    fontSize   : 30,
    lineHeight : 40,
    color      : 'white',
    textAlign  : 'center'
  },
  welcomeTitle2:{
    fontFamily : 'Montserrat-Regular',
    fontWeight : '100',
    fontSize   : 20,
    lineHeight : 30,
    color      : 'white',
    textAlign  : 'center'
  }
});


var IntroPager = require('./components/IntroPager');

// var Onboarding = React.createClass({

class Onboarding extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      storage_permission : ''
    };

    this._onCreateAccount = this._onCreateAccount.bind(this);
    this._onRestoreAccount = this._onRestoreAccount.bind(this);
  }

  componentDidMount() {
    Permissions.check('storage').then(response => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      // this.setState({ camera_permission: (response=='authorized'?true:false) })
      this.setState({ storage_permission: response })
    })
  }

  // Request permission to access photos
  _requestPermission () {
    Permissions.request('storage').then(response => {
      // Returns once the user has chosen to 'allow' or to 'not allow' access
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      // this.setState({ storage_permission: (response=='authorized'?true:false) })
      this.setState({ storage_permission: response })
    })
  }

  _alertForPermission() {
    Alert.alert(
      'Podemos acceder a tu almacenamiento?',
      'Necesitamos guardar tu cuenta y credenciales de discoiner',
      [
        {
          text: 'No',
          onPress: () => console.log('Permission denied'),
          style: 'cancel',
        },
        this.state.storage_permission == 'undetermined'
          ? { text: 'OK', onPress: this._requestPermission }
          : { text: 'Configurar', onPress: Permissions.openSettings },
      ],
    )
  }

	_onCreateAccount() {
		this.props.navigator.push({
			screen : 'wallet.CreateAccount',
			title :  'Crear cuenta'
		});
	}

	_onRestoreAccount() {
		this.props.navigator.push({
			screen: 'wallet.RestoreAccount',
			title: 'Restaurar cuenta'
		});
	}

  /*

  */
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          <IntroPager style={styles.viewpager}/>
        </View>
        <View style={styles.buttons}>

          <TouchableHighlight
              style={[styles.fullWidthButton, styles.fullWidthButton1]}
              onPress={() => {this._onRestoreAccount}} >
            <Text style={styles.fullWidthButtonText1}>RESTAURAR CUENTA</Text>
          </TouchableHighlight>

          <TouchableHighlight
              style={[styles.fullWidthButton, styles.fullWidthButton2]}
              onPress={() => {this._onCreateAccount}} >
            <Text style={styles.fullWidthButtonText}>CREAR CUENTA</Text>
          </TouchableHighlight>

        </View>
      </View>
    );
  }

}


export default connect(null, null)(Onboarding);
