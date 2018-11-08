/* eslint-disable new-cap */
import React, { PropTypes, Component } from 'react';
import {
	Alert,
	Image,
	Text,
	TouchableOpacity,
	View
} from 'react-native';

import { connect } from 'react-redux';
import styles from './styles/Balance';
import Sound from 'react-native-sound';
import * as config from '../../../constants/config';
import Icon from 'react-native-vector-icons/Ionicons';
import { iconsMap } from '../../../utils/AppIcons';
import LinearGradient from 'react-native-linear-gradient';

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
		
		this.switchPrecision = this.switchPrecision.bind(this);
		this.state = {
			precision : 2		
		};
	}

	switchPrecision(){
		this.setState({precision: (this.state.precision==2?config.ASSET_PRECISION:2)})
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
		
		let balance = '';
		if(this.props.balance) 
			balance = this.props.balance[config.ASSET_ID] || 0;
		// let parts = Number(balance).toFixed(this.state.precision).split('.');
		let parts = config.forBalance(balance, this.state.precision).split('.');
		
		let p = undefined;
		let amountColorStyle = styles.bold_color;
		if(parseInt(parts[1]) > 0)
		{
			p = (<Text style={[styles.dec_part, amountColorStyle]}>{"."}{parts[1]}</Text>)
		}

		let balanceStyle = styles.balance_wrapperNoCredit;
    
		let grdcolor1 = '#ff7233'; 
		let grdcolor2 = '#ffa66b';
		let container_style = styles.container;
		if(config.isSubaccountMode(this.props.account.subaccount))
		{
			container_style = styles.container_subaccount;
			grdcolor1 = '#7029eb';
			grdcolor2 = '#1e3695';
		}
		
		let imgData = 'data:image/png;base64,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';
		/*
			<Text>{Number(this.props.balance[config.ASSET_ID]).toFixed(5).split('.')[1]}</Text>
			<Text>{this.props.balance[config.ASSET_ID]}</Text>
			<Text>{Number(this.props.balance[config.ASSET_ID])}</Text>
			<Text>{Number(this.props.balance[config.ASSET_ID]).toFixed(5)}</Text>
		*/
		return (
			<View style={[container_style]}>
				<LinearGradient start={{x: 0, y: 0}} end={{x: 0.75, y: 2}} colors={[grdcolor1, grdcolor2]} style={{flex:1, alignSelf: 'stretch', justifyContent:'center', alignItems:'center', borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}>
					<TouchableOpacity style={styles.wrapper} onPress={this.switchPrecision}>
						<View style={balanceStyle}>
							<View style={styles.balance}>
								<Image style={{width: 20, height: 20, marginRight:10, marginTop:10 , resizeMode: Image.resizeMode.contain, borderWidth: 0}} source={{uri: imgData}}/>
								<Text style={[amountColorStyle, styles.int_part]}>{parts[0]}{p}</Text>
							</View>
						</View>
					</TouchableOpacity>
				</LinearGradient>
			</View>
    );
	// Abreviatura de la moneda en palabras *comentado por omitido en nuevo diseño, va dentro de <View style={styles.balance}>_
	// <View style={styles.balanceAmountWrapper}>
	// 	<Text style={[styles.gray_color, styles.par_part]}> DSC</Text>
	// </View>

		// return (
    //   <Image source={require('./img/bg-dashboard3.png')} style={styles.container}>
    //     <View style={styles.wrapper}>
		// 			<View style={balanceStyle}>
		// 				<View style={styles.balance}>
		// 						<Text style={[styles.bold_color, styles.symbol_part]}>{asset_symbol} </Text>
		// 						<Text style={[amountColorStyle, styles.int_part]}>{parts[0]}</Text>
		//
		// 						<View style={styles.balanceAmountWrapper}>
		// 							{p}
		// 							<Text style={[styles.gray_color, styles.par_part]}> DSC</Text>
		// 						</View>
		// 				</View>
		//
		// 			</View>
		// 			{j}
    //   	</View>
		// 	</Image>
    // );
	}
}

// CardMovie.propTypes = {
// 	info: PropTypes.object.isRequired,
// 	viewMovie: PropTypes.func.isRequired
// };

function mapStateToProps(state, ownProps) {
	return {
		balance: state.wallet.balance,
		account: state.wallet.account,
		credit_ready : state.wallet.credit_ready
	};
}

export default connect(mapStateToProps, null)(Balance);
