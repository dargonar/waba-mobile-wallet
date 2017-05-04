import React, { PropTypes, Component } from 'react';
import SettingsList from 'react-native-settings-list';
import {
  Alert,
  Image, 
  ListView,
  Text, 
  TextInput,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import * as walletActions from './wallet.actions';
import styles from './styles/Endorsement';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { iconsMap } from '../../utils/AppIcons';
import * as config from '../../constants/config';

import { AsyncStorage } from 'react-native'
import UWCrypto from '../../utils/Crypto';
import * as helperActions from '../../utils/Helper.js';

class Endorsement extends Component {
  
  static navigatorStyle = {
    navBarTextColor: '#ffffff', 
    navBarBackgroundColor: '#2e2f3d', //0B5F83
    navBarButtonColor: '#ffffff'
  }
  
  constructor(props) {
    super(props);
    this._onShareEndorsement        = this._onShareEndorsement.bind(this);
    this._onSendOverdraft          = this._onSendOverdraft.bind(this);
    this._onApplyEndorsement       = this._onApplyEndorsement.bind(this);
  }
  
  _onApplyEndorsement(){
    this.props.navigator.push({
      screen: 'endorsement.ApplyConfirm',
      title: 'Aceptar crédito'
      
    });

  }

  _onSendOverdraft() {
    this.props.navigator.push({
      screen: 'endorsement.SelectEndorsed',
      title: 'Seleccione destinatario',
      passProps: {next_screen: 'endorsement.SelectEndorseType'}
    });
  }


  _onShareEndorsement() {
    this.props.navigator.push({
      screen: 'endorsement.SelectEndorsed',
      title: 'Seleccione destinatario',
      passProps: {next_screen: 'endorsement.ShareEndorsement'}
    });
  }

//   _onShowWords() {
//     this.props.navigator.push({
//       screen:     'wallet.RecoveryKeywords',
//       title:      'Palabras clave',
//       passProps:  {mnemonic: this.props.account.mnemonic, hide_button:true}
//     });
//   }

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
    // <SettingsList.Header headerText='Different Grouping' headerStyle={{marginTop:50}}/>
    // <SettingsList.Item titleInfo='Some Information' hasNavArrow={false} title='Information Example'/>
          
    const iconShare = (<Icon name="md-share-alt" size={30} color="#1f475b" />);
    const iconCard  = (<Icon name="ios-card" size={30} color="#1f475b" />);
    const iconBuffer  = (<Icon name="logo-buffer" size={30} color="#1f475b" />);
    const iconThumbsUp  = (<Icon name="md-thumbs-up" size={30} color="#CF2E08" />);
    
    let applyForCreditItem = null;
    if(this.props.credit_ready){
      applyForCreditItem = (<SettingsList.Item
            icon={<View style={{height:30,marginLeft:10,alignSelf:'center'}}>
                    {iconThumbsUp}
                  </View>}
            itemWidth={50}
            title='Solicitar mi crédito preacordado'
            onPress={this._onApplyEndorsement.bind(this)}
          />);
    }

    return (
      <View style={styles.container}>
        <SettingsList>
          {applyForCreditItem}
          <SettingsList.Header headerText='Créditos'/>
          <SettingsList.Item
            icon={<View style={{height:30,marginLeft:10,alignSelf:'center'}}>
                    {iconCard}
                  </View>}
            itemWidth={50}
            title='Otorgar crédito'
            onPress={this._onSendOverdraft.bind(this)}
          />
          
          <SettingsList.Header headerText='Avales'/>
          <SettingsList.Item
            icon={<View style={{height:30,marginLeft:10,alignSelf:'center'}}>
                    {iconShare}
                  </View>}
            itemWidth={50}
            title='Enviar avales para otorgar créditos'
            onPress={this._onShareEndorsement.bind(this)}
          />
          
        </SettingsList>
      </View>
    );
  }
}

/*
    <SettingsList.Item
            icon={<View style={{height:30,marginLeft:10,alignSelf:'center'}}>
                    {iconBuffer}
                  </View>}
            itemWidth={50}
            title='Créditos otorgados'
            onPress={this._onSendOverdraft.bind(this)}
     /> 
     <SettingsList.Item
            icon={<View style={{height:30,marginLeft:10,alignSelf:'center'}}>
                    {iconBuffer}
                  </View>}
            itemWidth={50}
            title='Avales enviados'
            onPress={this._onShareEndorsement.bind(this)}
     />
*/

function mapStateToProps(state, ownProps) {
  return {
     credit_ready : state.wallet.credit_ready
  };
}

export default connect(mapStateToProps, null)(Endorsement);