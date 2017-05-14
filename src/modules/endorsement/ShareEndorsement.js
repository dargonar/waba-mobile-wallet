import React, { PropTypes, Component } from 'react';
import SettingsList from 'react-native-settings-list';
import {
  Alert,
  Dimensions,
  Image, 
  ScrollView,
  Text, 
  TextInput,
  ToastAndroid,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import * as walletActions from './wallet.actions';
import styles from './styles/ShareEndorsement';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { iconsMap } from '../../utils/AppIcons';
import * as config from '../../constants/config';

import { AsyncStorage } from 'react-native'
import UWCrypto from '../../utils/Crypto';
import * as helperActions from '../../utils/Helper.js';
import Prompt from 'react-native-prompt';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

import { avales }  from './components/static/endorsements_const';
import * as fn_avales  from './components/static/endorsements_const';
import { avales_colors }  from './components/static/endorsements_const'

class ShareEndorsement extends Component {
  
  static navigatorStyle = {
    navBarTextColor:        '#ffffff', 
    navBarBackgroundColor: '#2e2f3d', //0B5F83
    navBarButtonColor:      '#ffffff'
  }
  
  constructor(props) {
    super(props);
    this._onSelectEndorsementType  = this._onSelectEndorsementType.bind(this);
    this._onNext                   = this._onNext.bind(this);
    this._onQuantityChosen         = this._onQuantityChosen.bind(this);
		let _avales 									 = this._getShareableAvales(props.endorsed[0]);
    this.state = {
      endorsements  : _avales,
      endorsed      : props.endorsed,
      promptVisible : false,
      current_idx   : 0
    };
    
  }
	
	_getShareableAvales(username){
		let _avales = fn_avales.getAvales();
		_avales = _avales.filter((entry) => {
			if( !(entry.asset_id in this.props.balance))
        return false;
			entry.remaining = this.props.balance[entry.asset_id];
			if( entry.remaining<1 )
				return false;
			entry.user_name == username;
			return true;
		});
		return _avales;
	}
	
  getIndex(value, arr, prop) {
    
//     ToastAndroid.show('ARR len ' + arr.length.toString(), ToastAndroid.SHORT);
    for(var i = 0; i < arr.length; i++) {
      if(arr[i][prop] === value) {
        return i;
      }
    }
    return -1; //to handle the case where the value doesn't exist
  }

  _onSelectEndorsementType(endorsement_type) {
    let _endorsements = this.state.endorsements;
    if(!_endorsements)
		{
			ToastAndroid.show('Avales array is NULL!', ToastAndroid.SHORT);
			return null;
		}
    let idx = this.getIndex(endorsement_type, this.state.endorsements, '_key');
    if(isNaN(idx) || idx<0)
    {
			ToastAndroid.show('idx NULL o MENOR A 0!', ToastAndroid.SHORT);
			return null;
		}
    this.setState({endorsements:_endorsements, promptVisible:true, current_idx:idx})
  }
	
	showAvalError(msg){
		Alert.alert(
		    'Avales',
		    msg,
		    [
		      {text: 'OK'},
		    ]
		  );
	}
  _onNext(){
		for(var i = 0; i < this.state.endorsements.length; i++) {
			let entry = this.state.endorsements[i];
      if( !(entry.asset_id in this.props.balance) || entry.remaining<1)
			{
				this.showAvalError('No dispone de avales por '+entry.amount_txt);
				return false;
			}
			if(entry.quantity > this.props.balance[entry.asset_id])
			{
				this.showAvalError('No dispone de cantidad suficiente de avales por '+entry.amount_txt);
				return false;
			}
    }
		let _avales = this.state.endorsements.filter((entry) => {
			if( !(entry.asset_id in this.props.balance))
        return false;
			if(entry.quantity > this.props.balance[entry.asset_id])
				return false;
			if( entry.remaining<1) 
				return false;
			if(entry.quantity<1)
				return false;
			return true;
		});
		
		if(_avales.length<1)
		{
		  Alert.alert(
		    'Avales',
		    'Debe seleccionar al menos un aval. La cantidad seleccionada no debe superar sus tenencias.',
		    [
		      {text: 'OK'},
		    ]
		  );
		  return;
		}
 		// this.setState({endorsements:_avales});
		// this.state.endorsements,
		this.props.navigator.push({
			screen: 'endorsement.ShareConfirm',
			title: 'Confirmar envío',
			passProps: {
				endorsements      : _avales,
				endorsed          : this.state.endorsed
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
  
  _onQuantityChosen(value){
		this.setState({promptVisible:false});
		if(!value || isNaN(value))
		{
			return;
		}
    let _endorsements = this.state.endorsements;
		if(_endorsements[this.state.current_idx].remaining<Number(value)){
			ToastAndroid.show('No dispone de suficiente(s) avale(s).', ToastAndroid.SHORT);
			return;	
		}
    _endorsements[this.state.current_idx].quantity = parseInt(value);
    this.setState({endorsements:_endorsements, promptVisible:false});
  }

  _renderPrompt(){
    if (!this.state.promptVisible)
      return null;
		if (this.state.endorsements[this.state.current_idx].remainig<1)
		{
			ToastAndroid.show('No dispone de avales de este tipo', ToastAndroid.SHORT);
			return null;
		}
    let that = this;
    let inputProps = {textInputProps :{keyboardType:'numeric'}}; 
    return (
      <Prompt
        title="Indique cantidad"
        placeholder=""
        value="{this.state.endorsements[this.state.current_idx].quantity}"
        visible={ this.state.promptVisible }
        {...inputProps}
        onCancel={ () => this.setState({
          promptVisible: false
        }) }
        onSubmit={ (value) => that._onQuantityChosen(value) }
        
      />
    );
  }
  
  _renderAvales(){
    return this.state.endorsements.map((entry, index) => {
      const _bg = avales_colors[entry._key];
      const _bg_quantity = (entry.quantity>0)?styles.row_hour_set_white:styles.row_hour_set;
      return (
            <TouchableHighlight style={styles.button_row} underlayColor={'#909090'} key={`touch-entry-${index}`} onPress={() => { this._onSelectEndorsementType(`${entry._key}`)}}>
              <View style={styles.row_container}>
                <View style={[styles.row_card, _bg ]}>
                  <Image source={iconsMap['ios-card']} style={[styles.row_hand]}/>
                </View>
                <View style={styles.row_content}>            
                  <View style={styles.row_line1}>
                    <Text style={[styles.row_amount]}>{entry.amount_txt}</Text>
                  </View>
                  <Text style={[styles.row_amount]}>{entry.description}</Text>
                  <Text style={styles.remaining}>Disponibles: {entry.remaining}</Text>
                </View>
                <View style={[styles.row_hour, _bg_quantity]}>
                  <Text style={styles.row_hour_item}>{entry.quantity}</Text>
                </View>
              </View>
            </TouchableHighlight>
          );
      });
  }

  render() {
    //<Text style={[styles.title, styles.margin_top]}>Tipo y cantidad de avales</Text>
    return (
      <View style={styles.container}>
        <ScrollView style={{padding:16 }} contentContainerStyle={{ flexDirection:'column'}}>
          
					{ this._renderAvales()}
          
        </ScrollView>
        
        {this._renderPrompt()}
        
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
    balance : state.wallet.balance
  };
}

function mapDispatchToProps(dispatch) {
  return {
//     actions: bindActionCreators(walletActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShareEndorsement);