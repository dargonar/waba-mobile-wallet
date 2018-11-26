import React, { PropTypes, Component } from 'react';
import {
  ToastAndroid,
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
    flex: 5
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
    backgroundColor: '#cdefff', //'#f0f4f7',
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
    color: '#fff'
  },
  fullWidthButtonText1: {
    fontFamily : 'Montserrat-Medium',
    fontWeight : '400',
    fontSize   : 14,
    color: '#555'
  },
  fullWidthButtonDisabled: {
    backgroundColor: '#bbb'
  },
  fullWidthButtonTextDisabled: {
    color: '#ddd'
  }
});


var IntroPager = require('./components/IntroPager');

// var Onboarding = React.createClass({

class Onboarding extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      storage_permission  : '',
      can_create          : false
    };

    this._onCreateAccount = this._onCreateAccount.bind(this);
    this._onRestoreAccount = this._onRestoreAccount.bind(this);
    this._onOnboardingEnd = this._onOnboardingEnd.bind(this);
  }

  componentDidMount() {
    let that = this;
    Permissions.check('storage').then(response => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      // this.setState({ camera_permission: (response=='authorized'?true:false) })
      that.setState({ storage_permission: response })
      if(response!='authorized')
      {
        that._requestPermission();
      }  
    })
  }

  // Request permission to access photos
  _requestPermission () {
    let that = this;
    Permissions.request('storage').then(response => {
      // Returns once the user has chosen to 'allow' or to 'not allow' access
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      // this.setState({ storage_permission: (response=='authorized'?true:false) })
      that.setState({ storage_permission: response })
    })
  }

  _alertForPermission(do_create) {
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

  storagePermitted(){
    if(this.state.storage_permission=='authorized')
      return true;

    setTimeout(() => {
      this._requestPermission();
    }, 0)  ;
   return false;
  }

	_onCreateAccount() {
    if(!this.storagePermitted())
    {
      return;
    }
    if(!this.state.can_create)
    {
      return;
    }
    console.log('_onCreateAccount()')
		this.props.navigator.push({
			screen : 'wallet.CreateAccount',
			title :  'Crear cuenta'
		});
	}

	_onRestoreAccount() {
		if(!this.storagePermitted())
    {
      return;
    }
    console.log('_onRestoreAccount()')
    this.props.navigator.push({
			screen: 'wallet.RestoreAccount',
			title: 'Restaurar cuenta'
		});
	}

  _onOnboardingEnd(){
    // ToastAndroid.show('Ehhhh', ToastAndroid.SHORT)
    if(!this.state.can_create)
      this.setState({can_create:true});
  }

  render() {
    let disabled_btn_style = (!this.state.can_create)?styles.fullWidthButtonDisabled:{};
    let disabled_txt_style = (!this.state.can_create)?styles.fullWidthButtonTextDisabled:{};
    
    return (
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          <IntroPager style={styles.viewpager} onEnd={() => {this._onOnboardingEnd()}} />
        </View>
        <View style={styles.buttons}>

          <TouchableHighlight
              style={[styles.fullWidthButton, styles.fullWidthButton1]}
              onPress={() => {this._onRestoreAccount()}} >
            <Text style={styles.fullWidthButtonText1}>RESTAURAR CUENTA</Text>
          </TouchableHighlight>

          <TouchableHighlight
              style={[styles.fullWidthButton, styles.fullWidthButton2, disabled_btn_style]}
              onPress={() => {this._onCreateAccount()}} >
            <Text style={[styles.fullWidthButtonText, disabled_txt_style]}>CREAR CUENTA</Text>
          </TouchableHighlight>

        </View>
      </View>
    );
  }

}


export default connect(null, null)(Onboarding);
