import React, { PropTypes, Component } from 'react';

import {
  View,
  Text,
	Alert
} from 'react-native';

import UWCrypto from '../../utils/Crypto';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './styles/Sending';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Spinner from 'react-native-spinkit';
import { avales }  from './components/static/endorsements_const';
// import getAvalByKey from './components/static/endorsements_const';
// import getAvalDesc from './components/static/endorsements_const';
import * as fn_avales from './components/static/endorsements_const';

class Sending extends Component {
  
  static navigatorStyle = {
    navBarTextColor: '#ffffff', 
    navBarBackgroundColor: '#2e2f3d',
    navBarButtonColor: '#ffffff',
		navBarTextFontFamily: 'roboto_thin'
  }
  
  
  constructor(props) {
    super(props);
		
		if(props.modal_type=='applying')
		{
			this.state = {
					types:      ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
					endorsed 				: props.endorsed,
					endorse_type 		: props.endorse_type,
					modal_type			: props.modal_type
			}
		}
		else
			if(props.modal_type == 'endorsing')
			{
				this.state = {
					endorsed 				: props.endorsed,
					endorse_type 		: props.endorse_type,
					types:      ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
					size						: 100,
					color						: "#F64D27",
					isVisible				: true,
					modal_type			: props.modal_type
				};
			}
			else{
				// sharing
				this.state = {
					types:      ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
					size:       100,
					color:      "#F64D27",
					isVisible:  true,
					modal_type: props.modal_type
				};
			}
		
//     console.log(' -- this.state.recipient => ', this.state.recipient);
    
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
  	let type = this.state.types[8];
		let type2 = this.state.types[0];
 		let aval = fn_avales.getAvalByKey(this.state.endorse_type , avales);
		
		let aval_txt = '';
		if(aval)
			aval_txt = fn_avales.getAvalDesc(aval);
		
    if(this.state.modal_type == 'applying')
		{
			return (
				<View style={styles.container}>
					<View style={{flex:3, justifyContent: 'center', alignItems:'center', backgroundColor:'#2e2f3d'}}>
						<Spinner style={styles.spinner} isVisible={this.state.isVisible} size={this.state.size} type={type} color="#B7F072"/>
					</View>
					<View style={{flex:4, backgroundColor:'#2e2f3d', paddingLeft:30, paddingRight:30, alignItems:'center'}}>
						<Text style={styles.data_part}>Aceptando crédito</Text>
					</View>
				</View>
			);
		}
		else
			if(this.state.modal_type == 'endorsing')
			{
				return (
					<View style={styles.container}>
						<View style={{flex:3, justifyContent: 'center', alignItems:'center', backgroundColor:'#2e2f3d'}}>
							<Spinner style={styles.spinner} isVisible={this.state.isVisible} size={this.state.size} type={type} color="#B7F072"/>
						</View>
						<View style={{flex:4, backgroundColor:'#2e2f3d', paddingLeft:30, paddingRight:30}}>
							<Text style={styles.title_part}>Autorizando a:</Text>
							<Text style={styles.data_part}>{this.state.endorsed}</Text>
							<Text style={styles.title_part}>Tipo de crédito:</Text>
							<Text style={styles.data_part}>{aval_txt}</Text>
						</View>
					</View>
				);
			}
			else
				return (
				<View style={styles.container}>
					<View style={{flex:3, justifyContent: 'center', alignItems:'center', backgroundColor:'#2e2f3d'}}>
						<Spinner style={styles.spinner} isVisible={this.state.isVisible} size={this.state.size} type={type} color="#B7F072"/>
					</View>
					<View style={{flex:4, backgroundColor:'#2e2f3d', paddingLeft:30, paddingRight:30, alignItems:'center'}}>
						<Text style={styles.data_part}>Enviando avales</Text>
					</View>
				</View>
			);
  	}
}

// function mapDispatchToProps(dispatch) {
// 	return {
// 		actions: bindActionCreators(walletActions, dispatch)
// 	};
// }

export default Sending;