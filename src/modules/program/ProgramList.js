import React, { PropTypes, Component } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import * as walletActions from '../wallet/wallet.actions';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native'
import { bindActionCreators } from 'redux';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f0f0f0'
    /* 0B5F83 
       4D494A*/
  },
  img_bold: {
    width:  100,
    height: 100,
    marginBottom:20
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

class ProgramList extends React.Component {
  constructor(props) {
    super(props);
  }
  
  static navigatorStyle = {
    navBarTextColor: '#ffffff', 
    navBarBackgroundColor: '#3F779D',
    navBarButtonColor: '#ffffff',
		navBarTextFontFamily: 'roboto_thin'
  }
  
  
  _onSelectProgram(program) {
    AsyncStorage.setItem('@Store:program', program).then( () => {
      this.props.actions.programSuccess(program);
      this.props.navigator.push({
        screen    : 'program.CreateOrRestoreAccount',
        title     : 'Bienvenido',
        passProps : { program : program}
      });
    }, err => {
      that._onSelectError(JSON.stringify(err));
    });
  }

  _onSelectError(msg){
    this.props.navigator.dismissModal({
      animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
    });
    Alert.alert(
      'Seleccionar programa',
      msg,
      [
        {text: 'OK'},
      ]
    )
  }

	render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexDirection:'column'}}>
          <TouchableOpacity style={{padding:20, }} onPress={(e) => {  this._onSelectProgram('aqua')}}>
            <View style={{backgroundColor:'#ffffff', flex:5, paddingTop:30, paddingBottom:30, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>
              <Image
                resizeMode='contain'
                source={require('./img/aqua.png')}
                style={styles.img_bold}
              />
              <Text style={styles.titleText}>Aqua</Text>
              <Text style={styles.tagLine}>Moeda Ambiental de São Paulo</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{padding:20, }} onPress={(e) => {  this._onSelectProgram('ecoin')}}>
            <View style={{backgroundColor:'#ffffff', flex:5, paddingTop:30, paddingBottom:30, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>
              <Image
                resizeMode='contain'
                source={require('./img/ecoin.png')}
                style={styles.img_bold}
              />
              <Text style={styles.titleText}>eCOin</Text>
              <Text style={styles.tagLine}>Moneda Complementaria - UOC</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
	return {
		program: state.wallet.program
	};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(walletActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgramList);
