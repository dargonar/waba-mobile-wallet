import React, { PropTypes, Component } from 'react';

import {
  View,
  Text,
  Image
} from 'react-native';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from '../wallet/wallet.actions';
import styles from './styles/SendResultEx';
import { Icon } from 'react-native-elements';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as config from '../../constants/config';

class SendResultEx extends Component {

  static navigatorStyle = {
    navBarTextColor: '#666', 
    navBarTextFontSize: 14,
    navBarComponentAlignment: 'center',
    navBarBackgroundColor: '#ffffff',
    navBarButtonColor: '#000000',
    navBarTextFontFamily: 'Montserrat-Medium',
    topBarElevationShadowEnabled: false,
  }


  constructor(props) {
    super(props);

    this.state = {
      recipient : props.recipient,
      amount : props.amount,
      memo : props.memo,

      refreshing : false,
      types: ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle',
              '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
      size: 100,
      color: "#B7F072",
      isVisible: true,


      bill_amount:    props.data.bill_amount,
      bill_id:        props.data.bill_id ,
      discount_rate:  props.data.discount_rate ,
      discount_dsc:   props.data.discount_dsc ,
      to_pay:         props.data.to_pay ,
      discount_ars:   props.data.discount_ars ,
      account_id:     props.data.account_id,
      business_id:    props.data.business_id ,
      account_name:   props.data.account_name,
      business_name:  props.data.business_name,
      
      identicon   : ''      
    };

		let that = this;
    setTimeout( function() {
      that.props.actions.retrieveHistory(
				that.props.account.name,
				that.props.account.keys,
				!that.props.account.id,
        undefined,
        that.props.account.subaccount);
    }, 1500);

  }

  _onOkPress(){
    this.props.navigator.popToRoot({
      animated: true
    });
  }


  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  componentDidMount() {
    let identicon = config.getIdenticon(this.state.recipient.name);
    this.setState({ identicon : identicon });
    
  }

  componentWillUnmount() {
  }

  focus() {
  }

  render() {

		let debt    = this.state.bill_amount - this.state.to_pay;
    const userIcon = (<Image style={{width: 40, height: 40, resizeMode: Image.resizeMode.contain, borderWidth: 0}} source={{uri: this.state.identicon}}/>)
    let imgData = config.getRedDiscoinIcon();

    return (

      <View style={styles.container}>
        <View style={{padding: 20, flex:1, backgroundColor:'transparent', paddingLeft:30, paddingRight:30, alignItems:'center', flexDirection:'column', justifyContent:'center'}}>
          <View style={{}}>
            <Text style={styles.title_part}>SE ENVIO A:</Text>
          </View>
          <View style={styles.userRecipient}>
            <View style={{justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginRight: 10}}>
            {userIcon}
            </View>
            <View style={{justifyContent: 'flex-start', alignItems:'flex-start' }}>
              <Text style={styles.data_part} >
                {this.state.recipient.name}
              </Text>
            </View>
          </View>

          <View style={{flexDirection:'row', alignItems: 'center', marginTop: 40}}>
            <Image style={{width: 16, height: 16, resizeMode: Image.resizeMode.contain, opacity: 0.7, borderWidth: 0, marginRight: 15, marginTop: 10}} source={{uri: imgData}}/>
            <Text style={styles.money_part}>{this.state.amount} </Text>
          </View>
          <View style={{position:'absolute', right:10, bottom: 10, elevation: 10, flexDirection:'row', justifyContent: 'flex-end', backgroundColor:'transparent'}}>
            <Icon
              raised
              containerStyle={{backgroundColor:'#3233aa', borderWidth: 0.5, borderColor: 'transparent' }}
              name='md-checkmark'
              type='ionicon'
              color='#ffffff'
              underlayColor='#1c228e'
              onPress={() => {this._onOkPress.bind(this)}}
              size={30} />
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
	return {
		account: state.wallet.account,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(walletActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SendResultEx);
