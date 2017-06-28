import React, { PropTypes, Component } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

import * as config from '../../constants/config'; 
	
var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF'
  },
    
  subcontainer: {
    flex: 4
  },
  
  img_bold: {
    width:  100,
    height: 100,
    marginBottom:20
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
    height:60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
    
	fullWidthButton1: {
    backgroundColor: '#4D494A'
  },
    
	fullWidthButton2: {
    backgroundColor: '#014372',
    marginBottom:20
  },
  
	fullWidthButtonText: {
    fontFamily : 'roboto_regular',
		fontWeight : '400',
    fontSize   : 15,
		color: 'white'
  },
  titleText: {
        color:"#014372", 
        textAlign:'center',
        fontFamily : 'roboto_light',
        fontWeight : '100',
        fontSize   : 30,
        lineHeight : 35,
        marginBottom:20
  },
  tagLine:{
      color:"#014372", 
      textAlign:'center',
      fontFamily : 'roboto_light',
      fontWeight : '100',
      fontSize   : 20,
      lineHeight : 20
  }  
});


class CreateOrRestoreAccount extends Component {

  constructor(props) {
    super(props);
    this._onCreateAccount   = this._onCreateAccount.bind(this);
    this._onRestoreAccount  = this._onRestoreAccount.bind(this);
    
    this.state = {program:props.program};
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
  
  render() {
    let data = config.PROGRAMS[this.props.program];

     return (
       <View style={styles.container}>
          <View style={styles.subcontainer}>
            <View style={{ flex:1, paddingTop:30, paddingBottom:30, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>
              <Image
                resizeMode='contain'
                source={data[0]}
                style={styles.img_bold}
              />
              <Text style={styles.titleText}>{data[1]}</Text>
              <Text style={styles.tagLine}>{data[2]}</Text>
            </View>
          </View>
          <View style={styles.buttons}>
            <TouchableHighlight
                style={[styles.fullWidthButton, styles.fullWidthButton2]}
                onPress={this._onCreateAccount} >
              <Text style={styles.fullWidthButtonText}>CREAR CUENTA</Text>
            </TouchableHighlight>

            <TouchableHighlight
                style={[styles.fullWidthButton, styles.fullWidthButton1]}
                onPress={this._onRestoreAccount} >
              <Text style={styles.fullWidthButtonText}>RESTAURAR CUENTA</Text>
            </TouchableHighlight>
          </View>												
      </View>
    );

  }
}


export default CreateOrRestoreAccount;