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
//import Svg, {Path} from 'react-native-svg';

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

  onPressed(){
  	this.props.navigator.push({
      screen: 'wallet.Wallet',
      navigatorStyle : {
       navBarButtonColor : '#fff',
       drawUnderNavBar   : true,
       navBarTransparent : true,
			 navBarNoBorder 	 : true,
			 topBarElevationShadowEnabled: false
      },
      rightButtons : [
        {
          icon: iconsMap['qrcode--active'],
          id: 'scanQRCode' // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        }
      ],
			leftButtons: [
    		{
    			icon: iconsMap['ios-menu'],
    			title: '',
    			id: 'sideMenu'
    		}
    	]
    });
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


		// let data = config.getDiscoinIcon()
		
		let imgData = 'data:image/png;base64,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';
		
		return (
			<View style={[styles.container_discoin, styles.container_discoin_wrapper]}>
				<Text style={styles.sectionTitle}>Tus Discoins</Text>
				{/*<TouchableHighlight style={[styles.container_discoin_wrapper, {backgroundColor:'#fff' }]} onPress={this.onPressed.bind(this)} underlayColor='#FFF'>
				        	<LinearGradient start={{x: 0, y: 0}} end={{x: 0.75, y: 2}} colors={['#ff7233', '#ff9e5d']} style={styles.discoinCountGradient}>
							    	<View style={styles.discoinCount}>
							      	<Image style={{width: 15, height: 15, marginRight:10 , resizeMode: Image.resizeMode.contain, borderWidth: 0}} source={{uri: data}}/>
											<Text style={styles.discoinCountValue}>{parts[0]}{p}</Text>
											<Icon name="md-arrow-dropright" style={{color: '#FFF', opacity: 0.4, fontSize: 35, marginLeft: 20}}/>
					          </View>
					        </LinearGradient>
				    		</TouchableHighlight>*/}

				<TouchableHighlight style={[styles.container_discoin_wrapper, {activeOpacity:0, underlayColor:'#fff', backgroundColor:'#fff' }]} onPress={this.onPressed.bind(this)}>
	          <LinearGradient start={{x: 0, y: 0}} end={{x: 0.75, y: 2}} colors={['#ff7233', '#ff9e5d']} style={styles.discoinCountGradient}>
		          <View style={styles.discoinCount}>
		            <Image style={{width: 15, height: 15, marginRight:10 , resizeMode: Image.resizeMode.contain, borderWidth: 0}} source={{uri: imgData}}/>
								<Text style={styles.discoinCountValue}>{parts[0]}{p}</Text>
								<Icon name="md-arrow-dropright" style={{color: '#FFF', opacity: 0.4, fontSize: 35, marginLeft: 20}}/>
		          </View>
		        </LinearGradient>
	        
        </TouchableHighlight>
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
