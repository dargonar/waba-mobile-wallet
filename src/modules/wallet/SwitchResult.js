import React, { PropTypes, Component } from 'react';

import {
  View,
  Text
} from 'react-native';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from './wallet.actions';
import styles from './styles/SendResult';
import { Icon } from 'react-native-elements';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as config from '../../constants/config';

class SwitchResult extends Component {

  static navigatorStyle = {
    navBarTextColor: '#ffffff',
    navBarBackgroundColor: '#f15d44',
    navBarButtonColor: '#ffffff',
		navBarTextFontFamily: 'roboto_thin',
    topBarElevationShadowEnabled: false
  }


  constructor(props) {
    super(props);

    this.state = {
      permission : props.permission,
      business   : props.business,
      refreshing : false,
      types: ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle',
              '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
      size: 100,
      color: "#B7F072",
      isVisible: true

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
  }

  componentWillUnmount() {
  }

  focus() {
  }

  render() {
    let total = this.state.permission.withdrawal_limit.amount/config.ASSET_DIVIDER;
		return (

      <View style={styles.container}>
        <View style={{flex:3, justifyContent: 'center', backgroundColor:'transparent'}}>
          <Text style={styles.title}>Solicitud exitosa</Text>
          <Text style={[styles.amount]}>$ {total} <Text style={styles.title_part_2}>MONTO DIARIO</Text></Text>

        </View>
        <View style={{flex:4, backgroundColor:'transparent'}}>

          <Text style={styles.title_part}>COMERCIO</Text>
          <Text style={[styles.data_part,styles.margin_bottom]}>{this.state.business.name}</Text>
        </View>
        <View style={{flex:2, flexDirection:'row', justifyContent: 'flex-end', backgroundColor:'transparent'}}>
          <Icon
            raised
            containerStyle={{backgroundColor:'#f15d44', borderWidth: 0.5, borderColor: 'transparent' }}
            name='md-checkmark'
            type='ionicon'
            color='#ffffff'
            underlayColor='#415261'
            onPress={() => {this._onOkPress.bind(this) }}
            size={30} />
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
export default connect(mapStateToProps, mapDispatchToProps)(SwitchResult);
