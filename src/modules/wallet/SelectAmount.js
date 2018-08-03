import React, { PropTypes, Component } from 'react';
import {
  Alert,
	View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles/SelectAmount';
import { connect } from 'react-redux';
import Keyboard from './components/Keyboard';
import * as config from '../../constants/config';
import { iconsMap } from '../../utils/AppIcons';

var homeIcon;

class SelectAmount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 	 '',
			recipient: props.recipient,
			memo_key: undefined,
      pay_or_send : props.pay_or_send
    };


//     Icon.getImageSource('ios-attach', 30).then((source) => { homeIcon = source});
    this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
  }

  static navigatorStyle = {
    navBarTextColor: '#ffffff',
    navBarBackgroundColor: '#f15d44',
    navBarButtonColor: '#ffffff',
		navBarTextFontFamily: 'roboto_thin',
    topBarElevationShadowEnabled: false
  }

//   static navigatorButtons = { rightButtons : [
//     {
//       //disableIconTint: true,
//       //title: 'Memo',
//       icon: iconsMap['ios-attach'],
//       id: 'attachMemo' // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
//     }
//   ]}

  _showMemo(){
    //showModal
    this.props.navigator.push({
      screen: "wallet.Memo", // unique ID registered with Navigation.registerScreen
      title: "Mensaje", // title of the screen as appears in the nav bar (optional)
      navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
      animationType: 'slide-down', // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
      rightButtons: [
        {
          icon: iconsMap['ios-trash-outline'],
          id: 'clearMemo'
        }
      ]
    });
  }

  _onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'attachMemo') {
//         AlertIOS.alert('NavBar', 'Edit button pressed');
        this._showMemo();
      }
    }
  }


    componentDidMount() {

			if(!this.state.memo_key) {
				fetch(config.getAPIURL('/account/')+this.props.recipient[0], {
					method: 'GET',
					headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
				})
				.then((response) => response.json(), err => {})
				.then((responseJson) => {
					this.setState({memo_key:responseJson.options.memo_key});
				}, err => {
				});
			}



			//         model.onChange((model) => {
//             this.setState({text: model.getKeys().join('')});
//         });
    }

    _handleClear(){
      this.setState({
        amount : ''
      });
    }

    _handleDelete(){
      if (this.state.amount.length==0)
        return;
      let new_string = this.state.amount.substring(0, this.state.amount.length-1);
      this.setState({
        amount : new_string
      });
    }

    _handleKeyPress(key){

      if('0123456789'.indexOf(key)>=0)
      {
        if (this.state.amount=='0' && key=='0')
          return;
        if (this.state.amount=='0' && key!='0')
        {
          this.setState({
            amount : key
          });
          return;
        }
      }

//       if (this.state.text.length==1 && key=='0')
//         return;

      if((key==',' || key=='.') && this.state.amount.indexOf(key)>=0)
        return;

      if((key==',' || key=='.') && this.state.amount.length==0)
      {
        this.setState({
          amount : '0'+key
        });
        return;
      }
      this.setState({
        amount : this.state.amount+key
      });
    }

    _onNext(){
			if(Number(this.props.balance)<=Number(this.state.amount))
			{
				Alert.alert(
					'Fondos insuficientes',
					'No dispone de fondos suficientes para realizar la operación.',
					[
						{text: 'OK'},
					]
				)
				return;
			}
      if(this.state.pay_or_send=='pay')
      {
        this.props.navigator.push({
          screen: 'wallet.PayConfirm',
          title: 'Confirmar pago',
          passProps: {
            recipient: 	this.state.recipient,
            memo_key:   this.state.memo_key,
            memo: 			this.props.memo,
            amount: 		this.state.amount
          }
        });

      }
      else {
        this.props.navigator.push({
          screen: 'wallet.SendConfirm',
          title: 'Confirmar envío',
          passProps: {
            recipient: 	this.state.recipient,
  					memo_key:   this.state.memo_key,
  					memo: 			this.props.memo,
  					amount: 		this.state.amount
  				}
      	});

      }
    }

		render() {
        const iconMoney = (<Icon name="logo-usd" size={26} color="#9F9F9F" style={{textAlign:'center', textAlignVertical:'center', flex:1 }} />);
        return (
            <View style={{flex: 1, backgroundColor:'#fff', flexDirection: 'column'}}>

              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 7, flexDirection: 'column'}}>
                  <Text style={styles.inputText}>
                    {this.state.amount}
                  </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'column'}}>
                  {iconMoney}
                </View>
              </View>
              <Keyboard
                  keyboardType="decimal-pad"
                  onClear={this._handleClear.bind(this)}
                  onDelete={this._handleDelete.bind(this)}
                  onKeyPress={this._handleKeyPress.bind(this)}
              />
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
		memo: state.wallet.memo,
		balance: state.wallet.balance
	};
}

export default connect(mapStateToProps, null)(SelectAmount);
