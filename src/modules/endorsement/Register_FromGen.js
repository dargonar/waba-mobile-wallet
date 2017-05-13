import React, { PropTypes, Component } from 'react';

import {
  
  StyleSheet,
  Text,
  View,ScrollView,TouchableHighlight, Modal
} from 'react-native';


import Icon from 'react-native-vector-icons/Ionicons';
  
import { Form,
  Separator,InputField, LinkField,
  SwitchField, PickerField,DatePickerField,TimePickerField
} from 'react-native-form-generator';

import {
	Alert, 
	ToastAndroid,
} from 'react-native';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


const styles = StyleSheet.create({
	inputContainer: {
		paddingLeft:10, 
    paddingTop:10, 
    borderBottomColor: '#aaaaaa', 
    borderBottomWidth: 0.25
	},
  inputContainerNoborder: {
		paddingLeft:10, 
    paddingTop:10, 
	},
});




class CustomModal extends React.Component{
  handleClose(){
    this.props.onHidePicker && this.props.onHidePicker();
  }
  render(){
    return <Modal transparent={true}>
    <View style={{padding:20, flex:1, justifyContent:'center', backgroundColor:'rgba(43, 48, 62, 0.57)'}}>
    <View
      style={{
        backgroundColor:'white',
        borderRadius: 8,
        flexDirection:'column',

    }}
      >
      <Text style={{
        textAlign: 'center',
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        fontSize:18
      }}>A Custom Wrapper for your picker</Text>
      {this.props.children}

    <TouchableHighlight
      onPress={this.handleClose.bind(this)}
      underlayColor='#78ac05'>
    <View style={{
        flex:1, alignItems:'center'
      }}><Text style={{fontSize:19,padding:15,}}>Close</Text></View></TouchableHighlight>
      </View>
      </View>
    </Modal>
  }
}

class WrappedIcon extends React.Component {
  render() {
    return (
      <Icon {...this.props} />
    );
  }
}







class Register3 extends Component {
  
  static navigatorStyle = {
    navBarTextColor: '#ffffff', 
    navBarTextFontFamily: 'roboto_thin', 
 		navBarBackgroundColor: '#2e2f3d', //
    navBarButtonColor: '#ffffff'
  }
  
  constructor(props){
    super(props);
    this.state = {
      formData:{}
    }
  }
  handleFormChange(formData){
    /*
    formData will contain all the values of the form,
    in this example.
    formData = {
    first_name:"",
    last_name:"",
    gender: '',
    birthday: Date,
    has_accepted_conditions: bool
    }
    */

    this.setState({formData:formData})
    this.props.onFormChange && this.props.onFormChange(formData);
  }
  handleFormFocus(e, component){
    //console.log(e, component);
  }

  openTermsAndConditionsURL(){

  }

  resetForm(){

    this.refs.registrationForm.refs.empresa_name.setValue("");
    this.refs.registrationForm.refs.empresa_rubro.setValue("");
    this.refs.registrationForm.refs.empresa_sub_rubro.setValue("");
    this.refs.registrationForm.refs.has_accepted_conditions.setValue(false);
    
  }
  
  render(){
    return (<ScrollView keyboardShouldPersistTaps={true} style={{backgroundColor:'#ffffff', height:200}}>
      <Form
        ref='registrationForm'
        onFocus={this.handleFormFocus.bind(this)}
        onChange={this.handleFormChange.bind(this)}
        label=""
         >
        <Text style={{backgroundColor:'#dddddd', padding:5}}>EMPRESA</Text>
        <View style={[styles.inputContainer]}>
          <InputField
            ref='empresa_name'
            label='Nombre'
            placeholder='Nombre'
            value=''
            />
        </View>
        <View style={[styles.inputContainer]}>
          <PickerField ref='empresa_rubro'
          label='Rubro'
          value=''
          options={{
            _1:    'Cultivos agrícolas',
            _2:    'Cría de animales',
            otros: 'Otros',
          }}
          />
        </View>
        <View style={[styles.inputContainer]}>
          <PickerField ref='empresa_sub_rubro'
            label='Sub Rubro'
            value=''
            options={{
              _1 : 'ARROZ',
              _2 : 'TRIGO',
              _3 : 'CEREALES EXCEPTO LOS FORRAJEROS Y LAS SEMILLAS N.C.P.',
              _4 : 'MAÍZ',
              _5 : 'SORGO GRANÍFERO',
              _6 : 'CEREALES FORRAJEROS N.C.P.',
              _7 : 'SOJA',
              _8 : 'GIRASOL',
              _9 : 'OLEAGINOSAS N.C.P.',
              _10 : 'PASTOS FORRAJEROS',
              _11 : 'PAPA, BATATA Y MANDIOCA',
              _12 : 'TOMATE',
              _13 : 'BULBOS, BROTES, RAÍCES Y HORTALIZAS DE FRUTOS N.C.P.',
              otros: 'OTROS'
            }}
            />
        </View>
        <View style={[styles.inputContainerNoborder]}>
          <LinkField
          label="Dirección" onPress={()=>{}}
          iconLeft={<Icon style={{marginLeft:10, alignSelf:'center', color:'#969696'}} name='ios-pin-outline' size={15} />}
          iconRight={<Icon style={{alignSelf:'center',marginRight:10, color:'#969696'}} name='ios-arrow-forward' size={15} />}
          />
        </View>
        <View style={[styles.inputContainer]}>
          <InputField
            ref='empresa_website'
            label='Sitio Web'
            placeholder='Sitio web'/>
        </View>
        <Text style={{backgroundColor:'#dddddd', padding:5}}>CONTACTO</Text>
        <View style={[styles.inputContainer]}>
          <InputField
            ref='contacto_email'
            label='Correo electrónico'
            keyboardType='email-address'
            placeholder='Correo electrónico'/>
        </View>
        <View style={[styles.inputContainer]}>
          <InputField
            ref='contacto_telefono'
            label='Teléfono'
            placeholder='Teléfono'/>
        </View>
        <View style={[styles.inputContainer]}>
          <LinkField
            label="Términos y condiciones" onPress={()=>{}}
            iconLeft={<Icon style={{marginLeft:10, alignSelf:'center', color:'#969696'}} name='ios-list-box-outline' size={15} />}
            iconRight={<Icon style={{alignSelf:'center',marginRight:10, color:'#969696'}} name='ios-arrow-forward' size={15} />}
            />
        </View>
        <View style={{paddingLeft:10, paddingTop:10, justifyContent: 'center' }}>
          <SwitchField label='Acepto los términos y condiciones'
            ref="has_accepted_conditions"/>
        </View>
    </Form>
      
    <TouchableHighlight
      disabled={!this.state.formData.has_accepted_conditions}
      onPress={()=>this.refs.registrationForm.refs.empresa_name.focus()}
      underlayColor='#78ac05'>
      <View style={[{
          flex:1, alignItems:'center',
          borderColor:(this.state.formData.has_accepted_conditions)?'#2398c9':'grey',
          borderWidth:5
        },
      ]}><Text style={{fontSize:19,padding:15,}}>Foco en nombre</Text></View>
    </TouchableHighlight>
    </ScrollView>);
    }
}


function mapStateToProps(state, ownProps) {
  return {
// 		account    : state.wallet.account,
// 		balance    : state.wallet.balance,
// 		fees       : state.wallet.fees,
// 		asset      : state.wallet.asset,
// 		blockchain : state.wallet.blockchain
 	};
}

function mapDispatchToProps(dispatch) {
	return {
// 		actions: bindActionCreators(walletActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Register3);