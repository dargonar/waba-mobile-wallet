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
		let addy = this.props.address?this.props.address.full_address:'...';
		
    return (
      <ScrollView keyboardShouldPersistTaps={true} style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.headerText}>EMPRESA</Text>
				</View>
				<View style={styles.inputWrapperNoBorder}>
					<Text style={styles.label}>Nombre</Text>
					<TextInput
						style={styles.textInput}
						onChangeText={(text) => this.setState( { nombre:text } ) }
						value={this.state.nombre}
						underlineColorAndroid ="transparent"
					/>
				</View>
				<View style={styles.inputWrapper}>
					<Text style={styles.label}>Rubro</Text>
					<TextInput
						style={styles.textInput}
						onChangeText={(text) => this.setState( { rubro:text } ) }
						value={this.state.rubro}
						underlineColorAndroid ="transparent"
					/>
				</View>
				<View style={styles.inputWrapper}>
					<Text style={styles.label}>Dirección</Text>
					<TouchableHighlight onPress={() => {
						this._showLocationSearch();
						}}>
						<View style={{ flex:1, flexDirection:'row', justifyContent:'center' , alignItems:'center'}}>
							<Text style={[{ flex:5, height: 40}, styles.textInputReadonly]}> {addy} </Text>
							<View style={[{ flex:1, justifyContent:'center' , alignItems:'center'}, styles.textInputReadonlyEx]}>	
								<Icon style={{color:'#999999'}} name='ios-pin-outline' size={20} />
							</View>
						</View>
					</TouchableHighlight>
				</View>
				<View style={styles.inputWrapper}>		
					<Text style={styles.label}>Sitio Web</Text>
					<TextInput
						style={styles.textInput}
						onChangeText={(text) => this.setState( { web:text } ) }
						value={this.state.web}
						underlineColorAndroid ="transparent"
						keyboardType="url"
					/>
				</View>
				<View style={styles.header}>
					<Text style={styles.headerText}>CONTACTO</Text>
				</View>
				<View style={styles.inputWrapperNoBorder}>
					<Text style={styles.label}>Correo electrónico</Text>
					<TextInput
						style={styles.textInput}
						onChangeText={(text) => this.setState( { email:text } ) }
						value={this.state.email}
						underlineColorAndroid ="transparent"
						keyboardType="email-address"
					/>
				</View>
				<View style={styles.inputWrapper}>
					<Text style={styles.label}>Teléfono</Text>
					<TextInput
						style={styles.textInput}
						onChangeText={(text) => this.setState( { phone:text } ) }
						value={this.state.phone}
						underlineColorAndroid ="transparent"
					/>
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