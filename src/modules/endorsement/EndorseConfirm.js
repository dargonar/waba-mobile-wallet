import React, { PropTypes, Component } from 'react';

import {
  Alert,
	Text, 
	TouchableHighlight,
	View
  
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from '../wallet/wallet.actions';
import styles from './styles/EndorseConfirm';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import SliderEntryMicro from './components/SliderEntryMicro';
import Bts2helper from '../../utils/Bts2helper';

import * as config from '../../constants/config';

class EndorseConfirm extends Component {
  
  static navigatorStyle = {
    navBarTextColor: '#ffffff', 
    navBarBackgroundColor: '#0B5F83',
    navBarButtonColor: '#ffffff'
  }
  
  constructor(props) {
    super(props);
  
    this.state = {
      share_or_endorse 	: props.share_or_endorse
      endorsements 			: props.endorsements,
      endorsed 					: props.endorsed,
      endorsed_index    : props.endorsed_index,
			// memo 							: props.memo,
			tx								: null,
			fee								: 0,
			fee_txt						: 0,
			can_confirm				: false,
			error 						: ''
    }
		
		this._onSendingError = this._onSendingError.bind(this);
		this._buildMemo = this._buildMemo.bind(this);
  }


  dateAdd(date, interval, units) {
		var ret = new Date(date); //don't change original date
		switch(interval.toLowerCase()) {
			case 'year'   :  ret.setFullYear(ret.getFullYear() + units);  break;
			case 'quarter':  ret.setMonth(ret.getMonth() + 3*units);  break;
			case 'month'  :  ret.setMonth(ret.getMonth() + units);  break;
			case 'week'   :  ret.setDate(ret.getDate() + 7*units);  break;
			case 'day'    :  ret.setDate(ret.getDate() + units);  break;
			case 'hour'   :  ret.setTime(ret.getTime() + units*3600000);  break;
			case 'minute' :  ret.setTime(ret.getTime() + units*60000);  break;
			case 'second' :  ret.setTime(ret.getTime() + units*1000);  break;
			default       :  ret = undefined;  break;
		}
		return ret;
	}

  _onConfirm(){
		
		Alert.alert(
			'Fondos insuficientes',
			'No dispone de fondos suficientes para realizar la operación.',
			[
				{text: 'OK'},
			]
		)
		return;
		
	}

	_onSendingError(error){
		this.props.navigator.dismissModal({
			animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
		});
		
		console.log('----------_onSendingError------------');
		console.log(JSON.stringify(error));
		console.log('-------------------------------------');
		
		Alert.alert(
			'Error en envío',
			JSON.stringify(error),
			[
				{text: 'OK', onPress: () => this.props.navigator.pop({ animated: true }) },
			]
		)

		
	}

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
  	console.log('EndorseConfirm => componentWillReceiveProps');
	}

  componentDidMount() {
		// this._getTx();
  }

  componentWillUnmount() {
  }
  
  focus() {
  }

  render() {
  	let share_or_endorse_text = 'otorgar crédito';
  	if (this.state.share_or_endorse=='share')
  		share_or_endorse_text = 'compartir avales';
  	
  	let btn_style = styles.fullWidthButton2;
		let txt_style = styles.fullWidthButtonText;
		if(!this.state.can_confirm)
		{
			btn_style = styles.fullWidthButtonDisabled;
			txt_style = styles.fullWidthButtonTextDisabled;
		}
    
  //   let memo = this.state.memo;
		// let memo_style = styles.data_part;
		// if(!memo || memo==''){
		// 	memo='-sin mensaje-';
		// 	memo_style = styles.data_part_empty;
		// }
		let send_disabled = !this.state.can_confirm;
		// let total = this.getTotal();
		let fee = this.state.fee_txt.toFixed(2);
		
		return (
      <View style={styles.container}>
        <View style={{flex:5, backgroundColor:'#0B5F83', paddingLeft:30, paddingTop:30, paddingRight:0, paddingBottom:30}}>
          <Text style={styles.title_part}>Ud. va a {share_or_endorse}: </Text>
          {this._draw_endorsements()}
          <Text style={styles.data_part}>$ ({fee} de comisión)</Text></Text>
          <Text style={styles.title_part}>A:</Text>
          <Text style={styles.data_part}>{this.state.recipient.name}</Text>
        </View>
				<View style={{flex:1, flexDirection:'column', alignItems:'stretch', justifyContent:'flex-end' }}>
					<TouchableHighlight
							disabled={send_disabled}
							style={[styles.fullWidthButton, btn_style]}
							onPress={this._onConfirm.bind(this)}  >
						<Text style={txt_style}>ENVIAR</Text>
					</TouchableHighlight>
				</View>
				<KeyboardSpacer />
                    
        </View>
    );
  }


  _draw_endorsements(){
  	if(this.state.share_or_endorse=='share')
      return this.state.endorsements.map((entry, index) => {
              return (
                  <SliderEntryMicro
                    key={`carousel-entry-${index}`}
                    {...entry}
                  />
              );
          });
    
    let entry = avales[this.state.endorsed_index];
    return (
                <SliderEntryMicro
                  key={`carousel-entry-${index}`}
                  {...entry}
                />
            );
  }

}

function mapStateToProps(state, ownProps) {
	console.log(' -- SEND CONFIRM -> mapStateToProps');
	return {
		
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(walletActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(EndorseConfirm);