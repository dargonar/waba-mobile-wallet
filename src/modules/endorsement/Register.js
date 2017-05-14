import React, { PropTypes, Component } from 'react';

import {
	Alert,
	ScrollView,
	StyleSheet,
	Text,
	TextInput, 
	TouchableHighlight,
	ToastAndroid,
  View
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import { iconsMap } from '../../utils/AppIcons';

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#ffffff', 
		height:200
  },
	placeholderColor:{
		color:'#bbbbbb'
	},
	inputWrapper:{
		borderTopColor: '#f0f0f0', 
		borderTopWidth: 1,
		padding: 10		
	},
	inputWrapperNoBorder:{padding: 10 },
	textInput:{
		height: 40, 
		backgroundColor: '#f0f0f0',
		borderRadius: 4,
  },
	label:{
		paddingBottom: 4,
		fontFamily      : 'roboto_regular',
    fontSize        : 16,
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
		paddingTop:12,
		paddingLeft:4,
		height: 40, 
		backgroundColor: '#f0f0f0',
		borderTopLeftRadius: 4,
		borderTopRightRadius: 0,
		borderBottomLeftRadius: 4,
		borderBottomRightRadius: 0
  },
	textInputReadonlyEx:{
		height: 40, 
		backgroundColor: '#f0f0f0',
		borderTopLeftRadius: 0,
		borderTopRightRadius: 4,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 4
  },
	header:{
		height:40,
		backgroundColor : '#DDDDDD',
		justifyContent	: 'center'
	},
	headerText:{
		fontFamily      : 'roboto_regular',
   	fontWeight 			: '100',
   	fontSize   			: 15,
		color           : '#858585',
		paddingLeft			: 10		
	},
	clearButton:{
		position: 'absolute',
    right: 10,
    bottom: 10,
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		borderTopRightRadius: 4,
		borderBottomRightRadius: 4
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
			nombre: '',
			rubro: '',
			direccion: '',
			web: '',
			email: '',
			phone: ''
		}
		
		this._showLocationSearch = this._showLocationSearch.bind(this);
		this.validators = {
			email : /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/ 
// 			,web   : new RegExp('^(https?:\\/\\/)?'+ // protocol
// 								'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
// 								'((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
// 								'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
// 								'(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
// 								'(\\#[-a-z\\d_]*)?$','i') 
			,web   : /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
		};
		//(ftp|http|https):\/\//(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
		this.validate = this.validate.bind(this);
  }
		
	validate(_type, value){
		if(!value)
			return true;
		return this.validators[_type].test(value);
	}
	componentWillMount() {
	
	}

	componentWillReceiveProps(nextProps) {
  	//console.log('Main::componentWillReceiveProps', nextProps);
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
		let addy       = this.props.address?this.props.address.full_address:'Ingrese dirección de su local';
		let addyStyle  = this.props.address?null:styles.placeholderColor;
		
		
    return (
      <ScrollView keyboardShouldPersistTaps={true} style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.headerText}>EMPRESA</Text>
				</View>
				<View style={styles.inputWrapperNoBorder}>
					<Text style={styles.label}>Nombre</Text>
					<TextInput
						autoCapitalize="words"
						style={styles.textInput}
						onChangeText={(text) => this.setState( { nombre:text } ) }
						value={this.state.nombre}
						underlineColorAndroid ="transparent"
						placeholder="Ingrese nombre de su empresa"
						placeholderTextColor="#bbbbbb"
					/>
					<TouchableHighlight underlayColor='#999999' style={styles.clearButton} onPress={() => {this.setState({nombre:''})} }>
						<Icon style={{color:'#999999'}} name='ios-close-circle-outline' size={25} />
					</TouchableHighlight>
				</View>
				<View style={styles.inputWrapper}>
					<Text style={styles.label}>Rubro</Text>
					<TextInput
						autoCapitalize="words"
						style={styles.textInput}
						onChangeText={(text) => this.setState( { rubro:text } ) }
						value={this.state.rubro}
						underlineColorAndroid ="transparent"
						placeholder="Ingrese rubro o actividad"
						placeholderTextColor="#bbbbbb"
					/>
					<TouchableHighlight underlayColor='#999999' style={styles.clearButton} onPress={() => {this.setState({rubro:''})} }>
						<Icon style={{color:'#999999'}} name='ios-close-circle-outline' size={25} />
					</TouchableHighlight>
					
				</View>
				<View style={styles.inputWrapper}>
					<Text style={styles.label}>Dirección</Text>
					<TouchableHighlight onPress={() => {
						this._showLocationSearch();
						}}>
						<View style={{ flex:1, flexDirection:'row', justifyContent:'center' , alignItems:'center'}}>
							<Text adjustsFontSizeToFit={true} numberOfLines={1} style={[{ flex:5, height: 40}, styles.textInputReadonly, addyStyle]}> {addy} </Text>
							<View style={[{ flex:1, justifyContent:'center' , alignItems:'center'}, styles.textInputReadonlyEx]}>	
								<Icon style={{color:'#999999'}} name='ios-pin-outline' size={20} />
							</View>
						</View>
					</TouchableHighlight>
				</View>
				<View style={styles.inputWrapper}>		
					<Text style={styles.label}>Sitio Web</Text>
					<View style={{height:40}}>
						<TextInput
							autoCapitalize="none"
							style={styles.textInput}
							onChangeText={(text) => this.setState( { web:text } ) }
							value={this.state.web}
							underlineColorAndroid ="transparent"
							keyboardType="url"
							placeholder="Ingrese dirección web"
							placeholderTextColor="#bbbbbb"
						/>
						<TouchableHighlight underlayColor='#999999' style={styles.clearButton} onPress={() => {this.setState({web:''})} }>
							<Icon style={{color:'#999999'}} name='ios-close-circle-outline' size={25} />
						</TouchableHighlight>
					</View>
					{ this.validate('web', this.state.web)?null:(<Text style={styles.labelError}>error papa!!!!</Text>) }
				</View>
				<View style={styles.header}>
					<Text style={styles.headerText}>CONTACTO</Text>
				</View>
				<View style={styles.inputWrapperNoBorder}>
					<Text style={styles.label}>Correo electrónico</Text>
					<View style={{height:40}}>
						<TextInput
							autoCapitalize="none"
							style={styles.textInput}
							onChangeText={(text) => this.setState( { email:text } ) }
							value={this.state.email}
							underlineColorAndroid ="transparent"
							keyboardType="email-address"
							placeholder="Ingrese correo electrónico"
							placeholderTextColor="#bbbbbb"
						/>
						<TouchableHighlight underlayColor='#999999' style={styles.clearButton} onPress={() => {this.setState({email:''})} }>
							<Icon style={{color:'#999999'}} name='ios-close-circle-outline' size={25} />
						</TouchableHighlight>
					</View>
					{ this.validate('email', this.state.email)?null:(<Text style={styles.labelError}>error papa!!!!</Text>) }
				</View>
				<View style={styles.inputWrapper}>
					<Text style={styles.label}>Teléfono</Text>
					<TextInput
						autoCapitalize="none"
						style={styles.textInput}
						onChangeText={(text) => this.setState( { phone:text } ) }
						value={this.state.phone}
						underlineColorAndroid ="transparent"
						placeholder="Ingrese teléfono de contacto"
						placeholderTextColor="#bbbbbb"
					/>
					{this.state.phone?(<TouchableHighlight underlayColor='#999999' style={styles.clearButton} onPress={() => {this.setState({phone:''})} }>
						<Icon style={{color:'#999999'}} name='ios-close-circle-outline' size={25} />
					</TouchableHighlight>):null}
					
				</View>
      </ScrollView>
    );
  }


}

function mapStateToProps(state, ownProps) {
  return {
 		address: state.wallet.address
 	};
}

function mapDispatchToProps(dispatch) {
	return {
// 		actions: bindActionCreators(walletActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);