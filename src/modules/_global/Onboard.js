import React, { Component, PropTypes } from 'react';
import {
	View,
  Text,
  Image,
  Dimensions,
	TouchableHighlight,
	ActivityIndicator,
	Button
} from 'react-native';

import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';

import styles from './styles/Onboard';
import { iconsMap } from '../../utils/AppIcons';

import { launchWallet, createKeys } from '../../utils/Helper';

class Onboard extends Component {
	
	constructor(props) {
		super(props);
		
		this._onContinue = this._onContinue.bind(this);
		this.state = {
			page : 1
		}
  }
	
  _renderDotIndicator() {
    return <PagerDotIndicator 
      dotStyle={styles.dotStyle} 
      selectedDotStyle={styles.selectedDotStyle} 
      pageCount={3} 
    />;
  }
  
	_onContinue() {
		this.button.disabled = true;
		this.setState({page:1});
		createKeys().then(res =>{
			console.log(res);
			this.setState({page:2});
		}, err => {
			//TODO: algo
		});

	}
	
	_onSkip2() {
		launchWallet();
	}
	
	render() {

		if(this.state.page == 0){
			return (
				<View style={{flex:1, backgroundColor:'#fff'}}>

				<IndicatorViewPager
						style={{flex:100, backgroundColor:'#fff'}}
						indicator={this._renderDotIndicator()}>

							<View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
								<Image source={require('./img/onboard1.png')} style={styles.image} />
								<View style={{flex:3, alignItems:'center'}}>
									<Text style={styles.line1}>Bienvenido!</Text>
									<Text style={styles.line2}>A construir economías basadas en productos de la localidad o región</Text>
								</View>
							</View>

							<View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
								<Image source={require('./img/onboard2.png')} style={styles.image} />
								<View style={{flex:3, alignItems:'center'}}>
									<Text style={styles.line1}>Jalucinante Gente</Text>
									<Text style={styles.line2}>Leo quedará por encima de Cristiano Ronaldo, Gareth Bale y Neymar</Text>
								</View>
							</View>

							<View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
								<Image source={require('./img/onboard3.png')} style={styles.image} />
								<View style={{flex:3, alignItems:'center'}}>
									<Text style={styles.line1}>Comprando local</Text>
									<Text style={styles.line2}> los productores se encuentras dentro del sistema (región) y el flujo</Text>
								</View>
							</View>


					</IndicatorViewPager>
					<Button
							ref={button => { this.button = button;}}
							style={{height:80}}
							onPress={this._onContinue}
							title="Continuar"
					/>

				</View>
			)
		}
		else if(this.state.page == 1) {
			
		}
		else if(this.state.page == 2) {
			return (
				<View style={{flex:1, justifyContent: 'center', backgroundColor:'#FFF'}}>
					<ActivityIndicator size="large" color="#333333" />
				</View>
			)
		}
		else if(this.state.page == 3) {
			return (
				<View style={{flex:1, alignItems:'center', justifyContent: 'center', backgroundColor:'#FFF'}}>
					<Text style={{textAlign:'center', marginLeft:20, marginRight:20, fontWeight:'500', fontSize:24}}>{this.state.mnemonic}</Text>
					<Button
							ref={button2 => { this.button2 = button2;}}
							style={{flex:2}}
							onPress={this._onSkip2}
							title="Continuar"
							accessibilityLabel="This sounds great!"
					/>

				</View>
			)
		}
	}
}

export default Onboard;