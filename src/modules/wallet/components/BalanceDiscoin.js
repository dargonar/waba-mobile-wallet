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
import LinearGradient from 'react-native-linear-gradient';

class BalanceDiscoin extends Component {

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

		let r = 0;
		if(this.props.balance) r = this.props.balance[config.ASSET_ID] | 0;
		let d = 0;
		if(this.props.balance) d = this.props.balance[config.DESCUBIERTO_ID] | 0;

		b = r - d;
		
		if(!b) b = '0';
		let parts = Number(b).toFixed(2).split('.');
		let amountColorStyle = styles.bold_color;
		let p = undefined;
		if(parts[1] != '00')
			p = (<Text style={[styles.dec_part, amountColorStyle]}>{parts[1]}</Text>)

		return (
			<View style={styles.container_discoin}>
        <Text style={styles.sectionTitle}>Tus Discoins</Text>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 0.75, y: 2}} colors={['#ff7233', '#ff9e5d']} style={styles.discoinCountGradient}>
          <View style={styles.discoinCount}>
            <Text style={styles.discoinCountValue}>{parts[0]}{p}</Text>

            <Icon name="md-arrow-dropright" style={{color: '#FFF', opacity: 0.4, fontSize: 35, marginLeft: 20}}/>
          </View>
        </LinearGradient>
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
		account: state.wallet.account
	};
}

export default connect(mapStateToProps, null)(BalanceDiscoin);
