import React, { PropTypes, Component } from 'react';

import {
	Alert,
	Keyboard,
	ScrollView,
	StyleSheet,
	Text,
	TextInput, 
	TouchableHighlight,
	TouchableOpacity,
	ToastAndroid,
  View
} from 'react-native';

import Prompt from 'react-native-prompt';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from '../wallet/wallet.actions';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import Icon from 'react-native-vector-icons/Ionicons';
import { iconsMap } from '../../utils/AppIcons';

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#ffffff',  //2e2f3d
		height:200
  },
	placeholderColor:{
		color:'#999999'
	},
	inputWrapper:{
		paddingTop: 20		,
		paddingRight: 10		,
		paddingBottom: 20		,
		paddingLeft: 10		
	},
	inputWrapperNoBorder:{
		paddingTop: 20		,
		paddingRight: 10		,
		paddingBottom: 20		,
		paddingLeft: 10		
	},
	textInput:{
// 		backgroundColor:'#ffffff',
		color 							: '#1f475b',
		height							: 40, 
		borderBottomColor		: '#f0f0f0', 
		borderBottomWidth		: 1,
		fontFamily          : 'roboto_regular',
		fontSize        		: 18,
		lineHeight 					: 20
  },
	textInputPlaceholder:{
// 		backgroundColor:'#ffffff',
		color 							: '#f0f0f0',
		fontFamily          : 'roboto_thin',
		height							: 40, 
		borderBottomColor		: '#f0f0f0', 
		borderBottomWidth		: 1,
		fontSize        		: 18,
		lineHeight 					: 20
  },
	label:{
		paddingBottom: 4,
		fontFamily      : 'roboto_regular',
    fontSize        : 12,
    color           : '#858585', //1f475b
	},
	labelError:{
		paddingTop: 4,
		paddingBottom: 4,
		fontFamily      : 'roboto_regular',
    fontSize        : 12,
    color           : '#FF0000'
	},
	textInputReadonly:{
		color 							: '#1f475b',
		paddingTop:10,
		paddingLeft:1,
		height: 40, 
		//backgroundColor: '#f0f0f0',
		borderTopLeftRadius: 4,
		borderTopRightRadius: 0,
		borderBottomLeftRadius: 4,
		borderBottomRightRadius: 0,
		fontFamily          : 'roboto_regular',
		fontSize        		: 18,
		lineHeight 					: 20,		
		
  },
	textInputReadonlyPlaceHolder:{
		paddingTop:10,
		paddingLeft:1,
		height: 40, 
		borderTopLeftRadius: 4,
		borderTopRightRadius: 0,
		borderBottomLeftRadius: 4,
		borderBottomRightRadius: 0,
		fontSize        		: 18,
		lineHeight 					: 20,		
	
		color 							: '#999999',
		fontFamily          : 'roboto_thin',
	},
	textInputReadonlyEx:{
		height: 40, 
		//backgroundColor: '#f0f0f0',
		borderTopLeftRadius: 0,
		borderTopRightRadius: 4,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 4,
		flex:1, justifyContent:'center' , alignItems:'center',
		borderLeftColor		: '#999999', 
		borderLeftWidth		: 1,
  },
	header:{
		height:40,
// 		backgroundColor : '#f2f4f5',
		justifyContent	: 'center'
	},
	headerText:{
		fontFamily      : 'roboto_regular',
   	fontWeight 			: '100',
   	fontSize   			: 15,
		color           : '#2e2f3d',
		paddingLeft			: 10		
	},
	
	pseudoInputWrapper:{
		flex:1, flexDirection:'row', 
// 		backgroundColor:'#ffffff', 
		borderBottomColor		: '#f0f0f0', borderBottomWidth		: 1
	},
	clearButton:{
		position: 'absolute',
    right: 10,
    top: 0,
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		borderTopRightRadius: 4,
		borderBottomRightRadius: 4
	},
	
	fullWidthButton: {
		borderRadius: 0,
    height:100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
		backgroundColor: '#2c3f50' //'#575863'  
  },
	fullWidthButtonDisabled: {
    backgroundColor: '#999999'
  },
	fullWidthButtonText: {
    fontFamily : 'roboto_light',
		fontWeight : '100',
    fontSize   : 20,
		color: 'white'
  },
	fullWidthButtonTextDisabled:{
		fontFamily : 'roboto_light',
		fontWeight : '100',
    fontSize   : 20,
		color			 : '#cccccc'
	}
});


class Register extends Component {
  
  static navigatorStyle = {
    navBarTextColor: '#ffffff', 
    navBarTextFontFamily: 'roboto_thin', 
		navBarBackgroundColor: '#2e2f3d',
    navBarButtonColor: '#ffffff'
  }
  
  constructor(props) {
    super(props);
		
  	this.state = {
			can_accept   			: false,
			nombre			 			: '',
			rubro							: '',
			web					 			: '',
			email				 			: '',
			phone				 			: '',
			
			promptVisible 		: false,
			
			endorse_type      : props.endorse_type,
			endorsed          : props.endorsed
		}
		
		this.validators = {
			email : { regex: /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/ 
							 	, message: 'Formato válido: nombre@dominio.extension' }
			,web   : { regex: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
								, message: 'Formato válido: www.dominio.extension' }
		};
		
		this._showLocationSearch = this._showLocationSearch.bind(this);
		this._changeAddressText  = this._changeAddressText.bind(this);
		this.validate    				 = this.validate.bind(this);
		this._onRegister 				 = this._onRegister.bind(this);
		this.setAddressText 		 = this.setAddressText.bind(this);
  }
	
	_onRegister(){
		
		let ok  = true;
		let msg = '';
		if(!this.state.nombre || this.state.nombre.trim()=='')
			{ok=false; msg='nombre';}
		if(!this.state.rubro || this.state.rubro.trim()=='')
			{ok=false;msg='rubro';}
		if(!this.props.address)
			{ok=false;msg='address';}
		if(!this.state.web || this.state.web.trim()=='' || !this.validate('web', this.state.web))
			{ok=false;msg='web';}
		if(!this.state.email || this.state.email.trim()=='' || !this.validate('email', this.state.email))
			{ok=false;msg='email';}
		if(!this.state.phone || this.state.phone.trim()=='')
			{ok=false;msg='phone';}
		
		if(!ok)
		{
			Alert.alert(
				'Formulario incompleto/con errores',
				'Complete todos los campos del formulario con el formato solicitado.',
				[
					{text: 'OK'},
				]
			);
			return;
		}
		this.props.navigator.push({
        screen: 'endorsement.EndorseConfirm',
        title: 'Confirmar envío',
        passProps: {
          endorse_type      : this.state.endorse_type,
          endorsed          : this.state.endorsed,
					profile 					: {
						nombre			 			: this.state.nombre,
						rubro							: this.state.rubro,
						address					 	: this.props.address,
						web					 			: this.state.web,
						email				 			: this.state.email,
						phone				 			: this.state.phone,
					}
        }
      });
	}
	validate(_type, value){
		if(!value)
			return true;
		return this.validators[_type].regex.test(value);
	}
	componentWillMount() {
	
	}

	componentWillReceiveProps(nextProps) {
  	//console.log('Main::componentWillReceiveProps', nextProps);
	}
	
	_renderPrompt(){
    if (!this.state.promptVisible)
      return null;
	  let that = this;
    
    return (
      <Prompt
        title="Modificar texto de dirección"
        placeholder=""
        defaultValue={this.props.address.full_address}
        visible={ this.state.promptVisible }
        onCancel={ () => this.setState({ promptVisible: false }) }
        onSubmit={ (value) => {that.setAddressText(value);} }
        
      />
    );
  }
	
	setAddressText(value){
		this.setState({promptVisible: false});
		let addy = this.props.address;
		addy.full_address = value;
		this.props.actions.addressSuccess(addy);
	}
	_changeAddressText(){
		this._showLocationSearch();
// 		if(!this.props.address)
// 		{
// 			this._showLocationSearch();
// 			return;
// 		}
		
// 		this.setState({ promptVisible: true });
	}	

	_showLocationSearch(){
    //showModal
    this.props.navigator.push({
      screen: 'endorsement.LocationFull', // unique ID registered with Navigation.registerScreen
      title: 'Dirección',  								// title of the screen as appears in the nav bar (optional)
      navigatorStyle: {}, 								// override the navigator style for the screen, see "Styling the navigator" below (optional)
      animationType: 'slide-down', 				// 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
      rightButtons: [
        {
          icon: iconsMap['md-checkmark'].uri,
          id: 'selectAddress'
        }
      ]
    });
  }

  render() {
		let addy       						= this.props.address?this.props.address.full_address:'Ingrese dirección de su comercio';
		let addyStyle  						= this.props.address?styles.textInputReadonly:styles.textInputReadonlyPlaceHolder;
		let btn_style = styles.fullWidthButton2;
		let txt_style = styles.fullWidthButtonText;
// 		if(!this.state.can_accept)
// 		{
// 			btn_style = styles.fullWidthButtonDisabled;
// 			txt_style = styles.fullWidthButtonTextDisabled;
// 		}
// 		let send_disabled = !this.state.can_accept;
		let send_disabled = false;
		
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.headerText}>EMPRESA</Text>
				</View>
				<View style={styles.inputWrapperNoBorder}>
					
					<View style={{height:40}}>
						<TextInput
							autoCapitalize="words"
							style={this.state.nombre?styles.textInput:styles.textInputPlaceholder}
							onChangeText={(text) => this.setState( { nombre:text } ) }
							value={this.state.nombre}
							underlineColorAndroid ="transparent"
							placeholder="Ingrese nombre de su empresa"
							returnKeyType="next"
							onSubmitEditing={(event) => { 
								this.refs.rubro_input.focus(); 
							}}
						/>
						{this.state.nombre?
						 (<TouchableHighlight underlayColor='#999999' style={styles.clearButton} onPress={() => {this.setState({nombre:''})} }>
								<Icon style={{color:'#999999'}} name='ios-close-circle-outline' size={25} />
							</TouchableHighlight>):null}
					</View>
				</View>
				<View style={styles.inputWrapper}>
					
					<View style={{height:40}}>
						<TextInput
							autoCapitalize="words"
							style={this.state.rubro?styles.textInput:styles.textInputPlaceholder}
							onChangeText={(text) => this.setState( { rubro:text } ) }
							value={this.state.rubro}
							underlineColorAndroid ="transparent"
							placeholder="Ingrese rubro o actividad"
							ref="rubro_input"
							returnKeyType="next"
							onSubmitEditing={(event) => { 
								this._showLocationSearch();
							}}
						/>
						{this.state.rubro?
						 (<TouchableHighlight underlayColor='#999999' style={styles.clearButton} onPress={() => {this.setState({rubro:''})} }>
							<Icon style={{color:'#999999'}} name='ios-close-circle-outline' size={25} />
						</TouchableHighlight>):null}
					</View>
				</View>
				<View style={styles.inputWrapper}>
					
					<View style={styles.pseudoInputWrapper}>
						<TouchableOpacity style={{ flex:5}} onPress={() => {this._changeAddressText(); }}>
								<Text adjustsFontSizeToFit={true} numberOfLines={1} style={[{ height: 40}, addyStyle]}> {addy} </Text>
						</TouchableOpacity>	
						<TouchableOpacity style={{ flex:1}} onPress={() => {this._showLocationSearch(); }}>		
								<View style={[styles.textInputReadonlyEx]}>	
									<Icon style={{color:'#999999'}} name='ios-pin-outline' size={20} />
								</View>
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.inputWrapper}>		
					
					<View style={{height:40}}>
						<TextInput
							autoCapitalize="none"
							style={this.state.web?styles.textInput:styles.textInputPlaceholder}
							onChangeText={(text) => this.setState( { web:text } ) }
							value={this.state.web}
							underlineColorAndroid ="transparent"
							keyboardType="url"
							placeholder="Ingrese dirección web"
							returnKeyType="next"
							onSubmitEditing={(event) => { 
								this.refs.email_input.focus(); 
							}}
						/>
						{this.state.web?
						 (<TouchableHighlight underlayColor='#999999' style={styles.clearButton} onPress={() => {this.setState({web:''})} }>
								<Icon style={{color:'#999999'}} name='ios-close-circle-outline' size={25} />
							</TouchableHighlight>):null}
					</View>
					{ this.validate('web', this.state.web)?null:(<Text style={styles.labelError}>{this.validators['web'].message}</Text>) }
				</View>
				<View style={styles.header}>
					<Text style={styles.headerText}>CONTACTO</Text>
				</View>
				<View style={styles.inputWrapperNoBorder}>
					
					<View style={{height:40}}>
						<TextInput
							autoCapitalize="none"
							style={this.state.email?styles.textInput:styles.textInputPlaceholder}
							onChangeText={(text) => this.setState( { email:text } ) }
							value={this.state.email}
							underlineColorAndroid ="transparent"
							keyboardType="email-address"
							placeholder="Ingrese correo electrónico"
							ref="email_input"
							returnKeyType="next"
							onSubmitEditing={(event) => { 
								this.refs.phone_input.focus(); 
							}}
						/>
						{this.state.email?
						 (<TouchableHighlight underlayColor='#999999' style={styles.clearButton} onPress={() => {this.setState({email:''})} }>
							<Icon style={{color:'#999999'}} name='ios-close-circle-outline' size={25} />
						</TouchableHighlight>):null}
					</View>
					{ this.validate('email', this.state.email)?null:(<Text style={styles.labelError}>{this.validators['email'].message}</Text>) }
				</View>
				<View style={styles.inputWrapper}>
					
					<View style={{height:40}}>
						<TextInput
							autoCapitalize="none"
							style={this.state.phone?styles.textInput:styles.textInputPlaceholder}
							onChangeText={(text) => this.setState( { phone:text } ) }
							value={this.state.phone}
							underlineColorAndroid ="transparent"
							placeholder="Ingrese teléfono de contacto"
							ref="phone_input"
							returnKeyType="done"
							onSubmitEditing={(event) => { 
								Keyboard.dismiss();
							}}
						/>
						{this.state.phone?
						 (<TouchableHighlight underlayColor='#999999' style={styles.clearButton} onPress={() => {this.setState({phone:''})} }>
							<Icon style={{color:'#999999'}} name='ios-close-circle-outline' size={25} />
							</TouchableHighlight>):null}
					</View>
				</View>
				
				{this._renderPrompt()}

				<HideWithKeyboard>
				<View style={{flexDirection:'column', alignItems:'stretch', justifyContent:'flex-end' }}>
					<TouchableHighlight
							disabled={send_disabled}
							style={[styles.fullWidthButton, btn_style]}
							onPress={this._onRegister.bind(this)} >
						<Text style={txt_style}>CONTINUAR</Text>
					</TouchableHighlight>
				</View>
        </HideWithKeyboard>
      </ScrollView>
    );
  }

}

/*
<Text style={styles.label}>TELÉFONO</Text>
<Text style={styles.label}>NOMBRE</Text>
<Text style={styles.label}>RUBRO</Text>
<Text style={styles.label}>DIRECCIÓN</Text>
<Text style={styles.label}>SITIO WEB</Text>
<Text style={styles.label}>CORREO ELECTRÓNICO</Text>

				<View style={styles.inputWrapper}>
					<Text style={styles.label}>DIRECCIÓN</Text>
					<TouchableOpacity onPress={() => {this._showLocationSearch();}}>
						<View style={{ flex:1, flexDirection:'row', justifyContent:'center' , alignItems:'center'}}>
							<Text adjustsFontSizeToFit={true} numberOfLines={1} style={[{ flex:5, height: 40}, styles.textInputReadonly, addyStyle]}> {addy} </Text>
							<View style={[styles.textInputReadonlyEx]}>	
								<Icon style={{color:'#999999'}} name='ios-pin-outline' size={20} />
							</View>
						</View>
					</TouchableOpacity>
				</View>
*/
function mapStateToProps(state, ownProps) {
  return {
 		address: state.wallet.address
 	};
}

function mapDispatchToProps(dispatch) {
	return {
 		actions: bindActionCreators(walletActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);