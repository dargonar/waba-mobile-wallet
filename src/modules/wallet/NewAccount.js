import React, { PropTypes, Component } from 'react';

import {
  Image, 
  Alert,
	AsyncStorage,
	Text,
	View
} from 'react-native';


import * as config from '../../constants/config';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from './wallet.actions';

import styles from './styles/NewAccount';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Spinner from 'react-native-spinkit';

class NewAccount extends Component {

  static navigatorStyle = {
    navBarTextColor: '#ffffff',
    navBarBackgroundColor: '#0B5F83',
    navBarButtonColor: '#ffffff',
		navBarTextFontFamily: 'roboto_thin',
    topBarElevationShadowEnabled: false
  }

  constructor(props) {
    super(props);
    this.state = {
      types:      	['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle',
                   	'9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
      size:       	100,
      color:      	"#B7F072",
      isVisible:  	true,
			account_name: props.account_name
    };
    this._onCreateAccount = this._onCreateAccount.bind(this);
		this._back 						= this._back.bind(this);
	}

  _onCreateAccount(){

		walletActions.createAccount(this.state.account_name).then( (data) => {
      console.log(' --- _onCreateAccount()', JSON.stringify(data));
      AsyncStorage.setItem('@Store:data', JSON.stringify(data));

			this.props.actions.createAccountSuccessHACK(data);

			this.props.navigator.dismissModal({
				animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
			});
			this.props.navigator.resetTo({
				screen:     'wallet.RecoveryKeywords',
				title:      'Recupero de clave',
				passProps:  {mnemonic: data.mnemonic}
			});
		}, (err) => {
			Alert.alert(
				'Error',
				err,
				[
					{text: 'OK', onPress: () => this._back  }
				]
			)
			console.log('Error');
		})

  }

  _back(){
// 		this.props.navigator.pop({animated: true});
		this.props.navigator.dismissModal({
			animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
		});
	}
  
  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  componentDidMount() {
  	// HACKED!
    setTimeout(() => {
			this._onCreateAccount();
    }, 0)	;
  }

  componentWillUnmount() {
  }

  
  render(){
    let userIcon = (<Image style={{width: 50, height: 50, resizeMode: Image.resizeMode.contain, borderWidth: 0}} source={{uri: config.getIdenticon(this.state.account_name) }}/>);
    // let type2 = this.state.types[0];
    let type2 = this.state.types[3];
    return  (
      <View style={styles.container}>
        <View style={{padding: 20, flex:1, backgroundColor:'transparent', paddingLeft:30, paddingRight:30, alignItems:'center', flexDirection:'column', justifyContent:'center'}}>
          <View style={{}}>
            <Text style={styles.title_part}>Creando cuenta</Text>
          </View>
          <View style={styles.userRecipient}>
            <View style={{justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginRight: 10}}>
            {userIcon}
            </View>
            <View style={{justifyContent: 'flex-start', alignItems:'flex-start' }}>
              <Text style={styles.data_part} >
                {this.state.account_name}
              </Text>
            </View>
          </View>

          <View style={{justifyContent: 'center', alignItems:'center', backgroundColor:'transparent', height:250}}>
            <Spinner style={styles.spinner} isVisible={this.state.isVisible} size={this.state.size} type={type2} color="#ff9e5d"/>
          </View>
        </View>
      </View>);
  }
}

  // renderOLD() {
  // 	let type = this.state.types[3];
  //   return (
  //     <View style={styles.container}>
  //       <View style={{flex:3, justifyContent: 'center', alignItems:'center'}}>
  //         <Spinner style={styles.spinner} isVisible={this.state.isVisible} size={this.state.size} type={type} color="#1e3695"/>
  //       </View>
  //       <View style={{flex:4, paddingLeft:30, paddingRight:30}}>
		// 			<View style={{flexDirection:'row', justifyContent:'center'}}>
		// 				<Text style={styles.title_part}>Creando cuenta {this.state.account_name}</Text>
		// 			</View>
  //       </View>
		// 		<View style={{flex:1, paddingLeft:30, paddingRight:30}}>
		// 			<View style={{flexDirection:'row', justifyContent:'center'}}>
		// 				<Text style={styles.title_part}>Por favor aguarde...</Text>
		// 			</View>
  //       </View>
  //     </View>
  //   );
  // }


function mapStateToProps(state, ownProps) {
	return {

	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(walletActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(NewAccount);
