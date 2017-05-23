import React, { PropTypes, Component } from 'react';
import SettingsList from 'react-native-settings-list';
import {
  Alert,
  Image, 
  ListView,
	StyleSheet,
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
// import styles from './styles/Endorsement';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { iconsMap } from '../../utils/AppIcons';
import * as config from '../../constants/config';
import { avales }  from './components/static/endorsements_const'
import { AsyncStorage } from 'react-native'
import UWCrypto from '../../utils/Crypto';
import * as helperActions from '../../utils/Helper.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e2f3d',
		padding: 10
  },
  keywordsTitle:{
    fontFamily : 'roboto_light',
    fontWeight : '100',
    fontSize   : 15,
    lineHeight : 25,
    color: 'white',
    marginBottom: 15
  },
	button:{
		marginBottom:5,
		minHeight:100,
		maxHeight:150,
		flex: 1
	},
	buttonInner: {
		 flex:1, flexDirection:'row', height:80, padding:10,
		 borderTopLeftRadius: 4,
		 borderTopRightRadius: 4,
		 borderBottomLeftRadius: 4,
		 borderBottomRightRadius: 4
	},
	buttonInnerDisabled: {
		backgroundColor:'#c0c0c0'
	}
		
});

class Endorsement extends Component {
  
  static navigatorStyle = {
    navBarTextColor: '#ffffff',
		navBarTextFontFamily: 'roboto_thin',
    navBarBackgroundColor: '#2e2f3d', //0B5F83
    navBarButtonColor: '#ffffff'
  }
  
  constructor(props) {
    super(props);
    this._onShareEndorsement       = this._onShareEndorsement.bind(this);
    this._onSendOverdraft          = this._onSendOverdraft.bind(this);
    this._onApplyEndorsement       = this._onApplyEndorsement.bind(this);
		this._onRegister       				 = this._onRegister.bind(this);
  }
  
	_onRegister(){
		this.props.navigator.push({
      screen: 'endorsement.Register',
      title: 'Aceptar crédito'      
    });
	}

  _onApplyEndorsement(){
    this.props.navigator.push({
      screen: 'endorsement.ApplyConfirm',
      title: 'Aceptar crédito'      
    });
  }

  _onSendOverdraft() {
    if(!config.hasOverdraft(this.props.balance)){
			ToastAndroid.show('Para poder autorizar crédito debe estar autorizado', ToastAndroid.SHORT);
			return;
		}
		if(!config.hasEndorsements(this.props.balance)){
			ToastAndroid.show('No dispone de avales', ToastAndroid.SHORT);
			return;
		}
    this.props.navigator.push({
      screen: 'endorsement.SelectEndorsed',
      title: 'Seleccione destinatario',
      passProps: {next_screen: 'endorsement.SelectEndorseType', with_no_credit: true}
    });
  }

  _onShareEndorsement() {
		if(!config.hasOverdraft(this.props.balance)){
			ToastAndroid.show('Para poder enviar avales debe estar autorizado', ToastAndroid.SHORT);
			return;
		}
    if(!config.hasEndorsements(this.props.balance)){
			ToastAndroid.show('No dispone de avales', ToastAndroid.SHORT);
			return;
		}
		
    this.props.navigator.push({
      screen: 'endorsement.SelectEndorsed',
      title: 'Seleccione destinatario',
      passProps: {next_screen: 'endorsement.ShareEndorsement', with_no_credit: false}
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

  render(){
    const iconShare 		= (<Icon name="md-share-alt" size={30} color="white" />);
    const iconCard  		= (<Icon name="ios-card" size={30} 	color="white" />);
    const iconThumbsUp  = (<Icon name="md-thumbs-up" size={30} color="white" />);
    const iconPerson    = (<Icon name="ios-person" size={30} color="white" />);
		
    let applyForCreditItem = null;
		let available_credit 	 = config.readyToRequestCredit(this.props.balance, this.props.credit_ready);
		let buttonInnerDisabled = null;
		if(available_credit!==false)
		{
			buttonInnerDisabled = styles.buttonInnerDisabled;
			applyForCreditItem = (<TouchableOpacity style={styles.button} onPress={this._onApplyEndorsement.bind(this)}>
					<View style={[styles.buttonInner, {  backgroundColor	: '#CF2E08' }]}>
						<View style={{ flex:4 , flexDirection:'column', justifyContent:'center'}}>
							<Text style={{ flex:1, color:'white', fontSize:10, fontFamily : 'roboto_light', fontWeight: '100' }}>Solicitar mi crédito preacordado</Text>
							<Text style={{ flex:1, color:'white', fontSize:16, fontFamily : 'roboto_normal', }}>SOLICITAR CREDITO</Text>
						</View>	
						<View style={{flex:1, justifyContent:'center', alignItems:'center' }}>
							{iconThumbsUp}		
						</View>
					</View>
				</TouchableOpacity>);
  	}	
		
		return (
      <View style={styles.container}>
        {applyForCreditItem}
				<TouchableOpacity style={styles.button} onPress={this._onSendOverdraft.bind(this)}>
					<View style={[styles.buttonInner, {  backgroundColor	: '#575863' }, buttonInnerDisabled]}>
						<View style={{ flex:4 , flexDirection:'column', justifyContent:'center'}}>
							<Text style={{ flex:1, color:'white', fontSize:10, fontFamily : 'roboto_light', fontWeight: '100' }}>Enviar autorización de solicitud de crédito</Text>
							<Text style={{ flex:1, color:'white', fontSize:16, fontFamily : 'roboto_normal', }}>DAR CREDITO</Text>
						</View>	
						<View style={{flex:1, justifyContent:'center', alignItems:'center' }}>
							{iconCard}		
						</View>
					</View>
				</TouchableOpacity>
			      
				<TouchableOpacity style={styles.button} onPress={this._onShareEndorsement.bind(this)}>
					<View style={[styles.buttonInner, {  backgroundColor	: '#575863' }, buttonInnerDisabled]}>
						<View style={{ flex:4 , flexDirection:'column', justifyContent:'center'}}>
							<Text style={{ flex:1, color:'white', fontSize:10, fontFamily : 'roboto_light', fontWeight: '100' }}>Enviar avales para autorizar créditos</Text>
							<Text style={{ flex:1, color:'white', fontSize:16, fontFamily : 'roboto_normal', }}>ENVIAR AVALES</Text>
						</View>	
						<View style={{flex:1, justifyContent:'center', alignItems:'center' }}>
							{iconShare}		
						</View>
					</View>
				</TouchableOpacity>
			</View>
    );
	}

		/*
		<TouchableOpacity style={styles.button} onPress={this._onRegister.bind(this)}>
					<View style={[styles.buttonInner, {  backgroundColor	: '#575863' }, buttonInnerDisabled]}>
						<View style={{ flex:4 , flexDirection:'column', justifyContent:'center'}}>
							<Text style={{ flex:1, color:'white', fontSize:10, fontFamily : 'roboto_light', fontWeight: '100' }}>Data</Text>
							<Text style={{ flex:1, color:'white', fontSize:16, fontFamily : 'roboto_normal', }}>TEST REGISTRO</Text>
						</View>	
						<View style={{flex:1, justifyContent:'center', alignItems:'center' }}>
							{iconPerson}		
						</View>
					</View>
				</TouchableOpacity>
		*/
 
}

function mapStateToProps(state, ownProps) {
  return {
    credit_ready : state.wallet.credit_ready,
    balance : state.wallet.balance
  };
}

export default connect(mapStateToProps, null)(Endorsement);