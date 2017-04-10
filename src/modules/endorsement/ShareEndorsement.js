import React, { PropTypes, Component } from 'react';
import SettingsList from 'react-native-settings-list';
import {
  Alert,
  Image, 
  Text, 
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import * as walletActions from './wallet.actions';
import styles from './styles/ShareEndorsement';
import { Button } from 'react-native-elements';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { iconsMap } from '../../utils/AppIcons';
import * as config from '../../constants/config';

import { AsyncStorage } from 'react-native'
import UWCrypto from '../../utils/Crypto';
import * as helperActions from '../../utils/Helper.js';

class ShareEndorsement extends Component {
  
  static navigatorStyle = {
    navBarTextColor:        '#ffffff', 
    navBarBackgroundColor:  '#0B5F83',
    navBarButtonColor:      '#ffffff'
  }
  
  constructor(props) {
    super(props);
    this._onSelectRecipient        = this._onSelectRecipient.bind(this);
    this._onSelectEndorsementType  = this._onSelectEndorsementType.bind(this);
    this._onNext                   = this._onNext.bind(this);
    
    this.state = {
      endorsements:   {}, 
      recipient:      undefined
    };
    // this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
  }
  
  _onSelectRecipient(){
    this.props.navigator.showModal({
      screen : 'wallet.NewAccount',
      title :  'Creando cuenta',
      passProps: {account_name: this.state.account_name},
      animationType: 'slide-up',
      navigatorStyle: {navBarHidden:true}
    });
  }

  _onSelectEndorsementType(endorsement_type) {
    
  }

  // _onSendEndorsement() {
  //   this.props.navigator.push({
  //     screen: 'wallet.SendEndorsement',
  //     title: 'Enviar avales'
  //   });
  // }

  _onNext(){
      // if(Number(this.props.balance)<=Number(this.state.amount))
      // {
      //   Alert.alert(
      //     'Fondos insuficientes',
      //     'No dispone de fondos suficientes para realizar la operación.',
      //     [
      //       {text: 'OK'},
      //     ]
      //   )
      //   return;
      // }
      this.props.navigator.push({
        screen: 'wallet.SendConfirm',
        title: 'Confirmar envío',
        passProps: {
          endorse_type:   1,
          endorse_member: 1
        }
      });
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
    // https://www.npmjs.com/package/react-native-settings-list#usage
          
    let content = undefined;

    
    // '#EF8B8A'
    // '#6E75AC'
    // '#5CD59E'
    return (
      <View style={styles.container}>
        <View style={{flex:6, flexDirection:'column', padding:16 }}>
          <Text style={styles.title}>Seleccionar destinatario</Text>
          <TouchableHighlight style={styles.button_row} underlayColor={'#044967'} onPress={() => { this._onSelectEndorsementType('I')}}>
            <View style={styles.row_container}>
              <View style={[styles.row_avatar2, {backgroundColor:'#FFFFFF' }]}>
                <Image source={iconsMap['ios-person']} style={[styles.row_hand]}/>
              </View>
              <View style={styles.row_content}>            
                <View style={styles.row_line1}>
                  <Text style={styles.row_amount}>Destinatario</Text>
                </View>
              </View>
              <View style={styles.row_hour}>
                <Image source={iconsMap['ios-add-circle-outline']} style={[styles.row_plus]}/>
              </View>
            </View>
          </TouchableHighlight>

          
          <Text style={[styles.title, styles.margin_top]}>Tipo y cantidad de avales</Text>
          <TouchableHighlight style={styles.button_row} underlayColor={'#044967'} onPress={() => { this._onSelectEndorsementType('I')}}>
            <View style={styles.row_container}>
              <View style={[styles.row_card, {backgroundColor:'#EF8B8A'}]}>
                <Image source={iconsMap['handshake-o']} style={[styles.row_hand]}/>
              </View>
              <View style={styles.row_content}>            
                <View style={styles.row_line1}>
                  <Text style={[styles.row_amount]}>$1.000 - Invidividuo</Text>
                </View>
                <Text style={styles.remaining}>Disponibles: 5</Text>
              </View>
              <View style={styles.row_hour}>
                <Image source={iconsMap['ios-add-circle-outline']} style={[styles.row_plus]}/>
              </View>
            </View>
          </TouchableHighlight>
          
          <TouchableHighlight style={styles.button_row} underlayColor={'#044967'} onPress={() => { this._onSelectEndorsementType('X')}}>
            <View style={styles.row_container}>
              <View style={[styles.row_card, {backgroundColor:'#6E75AC'}]}>
                <Image source={iconsMap['handshake-o']} style={[styles.row_hand]}/>
              </View>
              <View style={styles.row_content}>            
                <View style={styles.row_line1}>
                  <Text style={[styles.row_amount]}>$10.000 - Cuentapropista</Text>
                </View>
                <Text style={styles.remaining}>Disponibles: 5</Text>
              </View>
              <View style={[styles.row_hour, styles.row_hour_set]}>
                <Text style={styles.row_hour_item}>3</Text>
              </View>
            </View>
          </TouchableHighlight>
                
          <TouchableHighlight style={styles.button_row} underlayColor={'#044967'} onPress={() => { this._onSelectEndorsementType('XXX')}}>
            <View style={styles.row_container}>
              <View style={[styles.row_card, {backgroundColor:'#5CD59E'}]}>
                <Image source={iconsMap['handshake-o']} style={[styles.row_hand]}/>
              </View>
              <View style={styles.row_content}>            
                <View style={styles.row_line1}>
                  <Text style={[styles.row_amount]}>$30.000 - Empresa</Text>
                </View>
                <Text style={styles.remaining}>Disponibles: 2</Text>
                
              </View>
              <View style={styles.row_hour}>
                <Image source={iconsMap['ios-add-circle-outline']} style={[styles.row_plus]}/>
              </View>
            </View>
          </TouchableHighlight>
                
          
        </View>

        <View style={{flex:1, flexDirection:'column', alignItems:'stretch', justifyContent:'flex-end' }}>
          <TouchableHighlight
              style={styles.fullWidthButton}
              onPress={this._onNext.bind(this)} >
            <Text style={styles.fullWidthButtonText}>SIGUIENTE</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
    endorsements: state.wallet.endorsements,
    endorsed: state.wallet.endorsed
  };
}

function mapDispatchToProps(dispatch) {
  return {
//     actions: bindActionCreators(walletActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShareEndorsement);