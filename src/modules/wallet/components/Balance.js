/* eslint-disable new-cap */
import React, { PropTypes, Component } from 'react';
import {
	Alert, 
	Image,
	Text,
	TouchableHighlight, 
	View
} from 'react-native';

import { connect } from 'react-redux';
import styles from './styles/Balance';
import Sound from 'react-native-sound';
import * as config from '../../../constants/config';
import Icon from 'react-native-vector-icons/Ionicons';
import { iconsMap } from '../../../utils/AppIcons';
import { avales }  from '../../endorsement/components/static/endorsements_const';
import { avales_colors }  from '../../endorsement/components/static/endorsements_const';
import * as fn_avales  from '../../endorsement/components/static/endorsements_const'
class Balance extends Component {

	constructor(props) {
		super(props);

		this.whoosh = new Sound('coins_received.wav', Sound.MAIN_BUNDLE, (error) => {
			if (error) {
				console.log('failed to load the sound', error);
			} else { // loaded successfully
				console.log('duration in seconds: ' + this.whoosh.getDuration() +
						'number of channels: ' + this.whoosh.getNumberOfChannels());
			}
		});
		this._onAcceptCredit = this._onAcceptCredit.bind(this);
	}
	
	_onAcceptCredit(){
		this.props.navigator.push({
      screen: 'endorsement.ApplyConfirm',
      title: 'Aceptar crédito'
    });		
  }
	
	componentWillReceiveProps(nextProps) {
    console.log('Balance::componentWillReceiveProps =>', nextProps.balance);

		if( this.props.balance && !isNaN(Number(this.props.balance[0])) && Number(nextProps.balance[0]) > Number(this.props.balance[0]) ) {
			this.whoosh.play((success) => {
				if (success) {
					console.log('successfully finished playing');
				} else {
					console.log('playback failed due to audio decoding errors');
				}
			});			
		}
  }

	render() {
		//const { info, viewMovie } = this.props;
		
		//const int_part = 0;
		//const dec_part = 0;
		
		let r = 0;
		if(this.props.balance) r = this.props.balance[config.MONEDAPAR_ID] | 0;
		let d = 0;
		if(this.props.balance) d = this.props.balance[config.DESCUBIERTO_ID] | 0;
		
		b = r - d;
		//b = 32510.75;
		//b = 31.1;
		if(!b) b = '0';
		let parts = Number(b).toFixed(2).split('.');
		let amountColorStyle = styles.bold_color;
// 		if(b<0) amountColorStyle = styles.red_color;
		let p = undefined;
		if(parts[1] != '00')
			p = (<Text style={[styles.dec_part, amountColorStyle]}>{parts[1]}</Text>)
		
		let asset_symbol = config.ASSET_SYMBOL;
		
		let balanceStyle = styles.balance_wrapperNoCredit;
    let j = undefined;
	  if(d>0)
	  {
			let entry = fn_avales.getAvalByAmount(d, avales);
// 			if(entry && entry.length>0)
			if(entry)
			{
// 				const _bg = avales_colors[entry[0]._key];
				const _bg = avales_colors[entry._key];
				j = (
					<View style={[styles.credit_card_container ]}>
						<View style={[styles.row_card, _bg ]}>
							<Image source={iconsMap['ios-card']} style={[styles.row_hand]}/>
							<Text style={[styles.credit_card_amount, styles.white_color]}>{asset_symbol}{d}</Text>
						</View>
					</View>);	
				balanceStyle = styles.balance_wrapper;
			}
		 else{
				j = (<View style={styles.credit_wrapper}><Text style={[styles.gray_color, styles.credit_title]}>Crédito <Text style={[styles.credit_amount, styles.bold_color]}>{asset_symbol}{d}</Text> </Text></View>);	
				balanceStyle = styles.balance_wrapper;
			}
		}
		let available_credit = config.readyToRequestCredit(this.props.balance, this.props.credit_ready);
		if(available_credit!==false)
		{				
			j = (
				<TouchableHighlight style={styles.credit_available_wrapper} onPress={ this._onAcceptCredit }>
					<View style={styles.credit_available}>
						<Icon name="ios-checkmark-circle" size={18} color="#ef5030" style={[{paddingRight:10}]} />
						<Text style={[styles.gray_color, styles.credit_title2]}>Tienes un crédito preacordado por {config.ALL_AVALS_DESC[available_credit]}</Text>
					</View>
				</TouchableHighlight>
				);	
		}
		return (
      <View style={styles.container}>
        <View style={styles.wrapper}> 
					<View style={balanceStyle}> 
						<View style={styles.balance}> 
								<Text style={[styles.bold_color, styles.symbol_part]}>{asset_symbol} </Text>
								<Text style={[amountColorStyle, styles.int_part]}>{parts[0]}</Text>
								
								<View style={styles.balanceAmountWrapper}> 
									{p}
									<Text style={[styles.gray_color, styles.par_part]}> AQUA</Text>
								</View>
						</View>
						
					</View>
					{j}
      	</View>
			</View>      
    );
	}
}

// CardMovie.propTypes = {
// 	info: PropTypes.object.isRequired,
// 	viewMovie: PropTypes.func.isRequired
// };

function mapStateToProps(state, ownProps) {
	return {
		balance: state.wallet.balance,
		credit_ready : state.wallet.credit_ready
	};
}

export default connect(mapStateToProps, null)(Balance);
