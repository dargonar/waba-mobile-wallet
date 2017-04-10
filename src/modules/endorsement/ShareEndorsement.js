import React, { PropTypes, Component } from 'react';
import SettingsList from 'react-native-settings-list';
import {
  Alert,
  Dimensions,
  Image, 
  ScrollView,
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

import SliderEntry from './components/SliderEntryMin';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

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
      endorsements          : { I:{shown:false, amount:0}, X:{shown:false, amount:0}, XXX:{shown:false, amount:0}} ,
      recipient             : undefined
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
    let _endorsements = this.state.endorsements;
    _endorsements[endorsement_type].shown = !_endorsements[endorsement_type].shown;
    this.setState({endorsements:_endorsements})
  }

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
  
  _render_entry(entry_type){
    if(!this.state.endorsements[entry_type].shown)
      return null;
    const avales = {
              'I': {
                        title: '$1.000',
                        subtitle: 'Individuos',
                        bgcolor: 'I'
                    },
              'X': {
                        title: '$10.000',
                        subtitle: 'Productores y cuentapropistas',
                        bgcolor: 'X',
                   },
              'XXX': {
                        title: '$30.000',
                        subtitle: 'Empresas',
                        bgcolor: 'XXX'
                    }
    }
    return (
            <View style={[styles.button_row_card]}>
              <SliderEntry
                  key={`carousel-entry-${entry_type}`}
                  {...avales[entry_type]}
                />
            </View>
            )
  }
  //minHeight:viewportHeight, 
  render() {
    
    return (
      <View style={styles.container}>
        <ScrollView style={{padding:16 }} contentContainerStyle={{ flexDirection:'column'}}>
          <Text style={[styles.title, styles.margin_top]}>Tipo y cantidad de avales</Text>
          <TouchableHighlight style={styles.button_row} underlayColor={'#909090'} onPress={() => { this._onSelectEndorsementType('I')}}>
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
                <Image source={iconsMap['ios-arrow-down-outline']} style={[styles.row_plus]}/>
              </View>
            </View>
          </TouchableHighlight>
          { this._render_entry('I') }
          
          <TouchableHighlight style={styles.button_row} underlayColor={'#909090'} onPress={() => { this._onSelectEndorsementType('X')}}>
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
          { this._render_entry('X') }

          <TouchableHighlight style={styles.button_row} underlayColor={'#909090'} onPress={() => { this._onSelectEndorsementType('XXX')}}>
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
                <Image source={iconsMap['ios-arrow-down-outline']} style={[styles.row_plus]}/>
              </View>
            </View>
          </TouchableHighlight>
          { this._render_entry('XXX') }
          
        </ScrollView>

        <KeyboardSpacer />
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