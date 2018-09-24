import React, { PropTypes, Component } from 'react';
import {
  Alert,
	View,
  Image,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

// import Icon from 'react-native-vector-icons/Ionicons';
import { Icon} from 'native-base';
import styles from './styles/SelectAmount';
import { connect } from 'react-redux';
import Keyboard from './components/Keyboard';
import LinearGradient from 'react-native-linear-gradient';
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
      pay_or_send : props.pay_or_send,

    };


//     Icon.getImageSource('ios-attach', 30).then((source) => { homeIcon = source});
    this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
  }

  static navigatorStyle = {
    navBarTextColor: '#666', 
    navBarTextFontSize: 14,
    navBarComponentAlignment: 'center',
    navBarBackgroundColor: '#ffffff',
    navBarButtonColor: '#000000',
    navBarTextFontFamily: 'Montserrat-Medium',
    topBarElevationShadowEnabled: false,
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

    let identicon = config.getIdenticon(this.state.recipient[0]);
    console.log(' --------------- identicon', identicon);
    this.setState({ identicon : identicon });
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
          title: 'Vas a enviar',
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
        const userIcon = (<Image style={{width: 40, height: 40, resizeMode: Image.resizeMode.contain, borderWidth: 0}} source={{uri: this.state.identicon}}/>)
        const iconMoney = (<Icon name="logo-usd" style={{color:'#c0c0c0', fontSize: 24, textAlign:'center', textAlignVertical:'center', flex:1 }} />);

        // const iconUser   = (<Icon name='user-circle' type='FontAwesome' style={{fontSize: 20, color: '#666'}}/>);
        // const iconBiz    = (<Icon name='store' type='MaterialCommunityIcons' style={{fontSize: 20, color: '#666'}}/>);
        const iconUser   = (<Icon name='md-person' style={{fontSize: 20, color: '#666'}}/>);
        // const iconBiz    = (<Icon name='store' style={{fontSize: 20, color: '#666'}}/>);
        const iconBiz    = (<Image source={iconsMap['store']} style={{resizeMode:'contain', height:20,width:20}} />);
        let iconNext = (<Icon name='ios-arrow-forward' type='MaterialIcons' style={{fontSize: 20, color: '#fff', marginLeft:50}}/>);
        let imgData = 'data:image/png;base64,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';
        // HACK
        let icon = iconUser;
        if(Math.random()>0.5)
          icon = iconBiz;


        return (
            <View style={{flex: 1, backgroundColor:'#fff', flexDirection: 'column'}}>

              <View style={{height:80, paddingTop:0, paddingBottom:10, paddingLeft:20, paddingRight:20, backgroundColor:'#fff', alignSelf: 'stretch', flexDirection:'column', justifyContent: 'flex-start'}}>
                <View style={{ alignSelf: 'stretch', flexDirection:'column'}}>
                  <View style={{ alignSelf: 'stretch', flexDirection:'row', justifyContent: 'flex-start'}}>
                    <Text style={styles.label} >
                      DESTINATARIOS
                    </Text>
                  </View>  
                  
                  <View style={{ borderRadius: 4, flexDirection:'row', backgroundColor:'#fff', padding:5, justifyContent:'flex-start', paddingRight: 15, elevation:4}}>
                    <View style={{flex:0, justifyContent:'center', alignItems: 'flex-start'}}>
                      {userIcon}
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems:'flex-start' }}>
                      <Text style={{fontSize:16, lineHeight:18, fontFamily : 'Montserrat-Medium', paddingRight:10, paddingLeft: 15}} >
                        {this.state.recipient[0]}
                      </Text>
                    </View>
                    <View style={{flex:0, justifyContent: 'center', alignItems:'center'}}>
                      {icon}
                    </View>
                  </View>
                </View>
              </View>

              <View style={{height:60, marginBottom: 10, flexDirection: 'row', backgroundColor:'#f5f9fd', marginTop:15, paddingRight:20, paddingLeft:20, borderRadius: 30, marginRight: 20, marginLeft: 20}}>
                <View style={{flex: 7, flexDirection: 'column'}}>
                  <Text style={styles.inputText}>
                    {this.state.amount}
                  </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'column', alignItems:'center', justifyContent:'center'}}>
                  <Image style={{width: 20, height: 20, resizeMode: Image.resizeMode.contain, borderWidth: 0, opacity: 0.25, marginRight: 5, }} source={{uri: imgData}}/>
                </View>
              </View>
              <Keyboard
                  keyboardType="decimal-pad"
                  onClear={this._handleClear.bind(this)}
                  onDelete={this._handleDelete.bind(this)}
                  onKeyPress={this._handleKeyPress.bind(this)}
              />
              
  							<View style={{height:90, flexDirection:'column', alignItems:'flex-end', paddingRight:20, justifyContent:'center' }}>
                  <TouchableHighlight style={styles.btnTouchable} onPress={this._onNext.bind(this)} >
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#ff9e5d', '#ff7233']} style={styles.btnGradient}>
                      <Text style={styles.btnTxt}>CONTINUAR</Text>
                    </LinearGradient>
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
