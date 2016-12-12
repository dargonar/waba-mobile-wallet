/* eslint-disable new-cap */
import React, { PropTypes, Component } from 'react';
import {
	Image,
	Text,
	View
} from 'react-native';

import { connect } from 'react-redux';
import styles from './styles/Balance';
import Sound from 'react-native-sound';

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
	}

	componentWillReceiveProps(nextProps) {
    console.log('Balance::componentWillReceiveProps =>', nextProps.balance);

		if( !isNaN(Number(this.props.balance)) && Number(nextProps.balance) > Number(this.props.balance) ) {
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
		
		let b = this.props.balance;
		if(!b) b = '0';
		let parts = Number(b).toFixed(2).split('.');
		
		let p = undefined;
		if(parts[1] != '00')
			p = (<Text style={styles.dec_part}>.{parts[1]}</Text>)
		
		return (
      <Image source={require('./img/bg-dashboard.png')} style={styles.container}>
        <View style={styles.balance}> 
          <Text style={[styles.int_part,{fontWeight:'100'}]}>₱ </Text>
					<Text style={[styles.int_part,{fontWeight:'400'}]}>{parts[0]}</Text>
          {p}
        </View>
        <Text style={styles.currency}>BALANCE PAR</Text>
      </Image>      
    );
	}
}

// CardMovie.propTypes = {
// 	info: PropTypes.object.isRequired,
// 	viewMovie: PropTypes.func.isRequired
// };

function mapStateToProps(state, ownProps) {
	return {
		balance: state.wallet.balance
	};
}

export default connect(mapStateToProps, null)(Balance);
