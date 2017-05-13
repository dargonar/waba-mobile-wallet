import React, { PropTypes, Component } from 'react';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';

import {
	Alert, 
	ToastAndroid,
} from 'react-native';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class Register extends Component {
  
  static navigatorStyle = {
    navBarTextColor: '#ffffff', 
    navBarTextFontFamily: 'roboto_thin', 
// 		navBarBackgroundColor: '#2e2f3d',
    navBarButtonColor: '#ffffff'
  }
  
  constructor(props, context) {
    super(props, context);
		
    this.state = {
      form: {
        fullName: 'Marco Polo',
        tos: false,
      }
    }
  }
 
  handleValueChange(values) {
    console.log('handleValueChange', values)
    this.setState({ form: values })
  }
 
  render() {
    const { fullName, tos, gender } = this.state.form
    console.log('render', this.state.form)
    return (
      <GiftedForm
        formName='signupForm'
        openModal={(route) => { 
					          console.log(' -- route :');
										console.log(route);
										route.giftedForm = true;
										this.props.navigator.push(route) ;
					}}
        onValueChange={this.handleValueChange.bind(this)}
      >
        <GiftedForm.TextInputWidget
          name='fullName'
          title='Full name'
          placeholder='Marco Polo'
          clearButtonMode='while-editing'
          value={fullName}
        />
				<GiftedForm.ModalWidget
          title='Biography'
          displayValue='bio'

          image={require('./img/book.png')}

          scrollEnabled={true} // true by default
        >
          <GiftedForm.SeparatorWidget/>
          <GiftedForm.TextAreaWidget
            name='bio'

            autoFocus={true}

            placeholder='Something interesting about yourself'
          />
        </GiftedForm.ModalWidget>
        <GiftedForm.HiddenWidget name='tos' value={tos} />
      </GiftedForm>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);