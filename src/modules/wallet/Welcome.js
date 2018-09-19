import React, { PropTypes, Component } from 'react';
import {
	Alert, 
	Button,
	Image,
	Text,
	ToastAndroid,
	TouchableHighlight,
	View
} from 'react-native';
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import { iconsMap } from '../../utils/AppIcons';

import styles from './styles/Welcome';
import KeyboardSpacer from 'react-native-keyboard-spacer';

class Welcome extends Component {

	constructor(props) {
		super(props);
		this._onCreateAccount 			= this._onCreateAccount.bind(this);
		this._onRestoreAccount 	= this._onRestoreAccount.bind(this);
	}
  
	_onCreateAccount() {
		this.props.navigator.push({
			screen : 'wallet.CreateAccount',
			title :  'Crear cuenta'
		});
	}
	
	_onRestoreAccount() {
		this.props.navigator.push({
			screen: 'wallet.RestoreAccount',
			title: 'Restaurar cuenta'
		});
	}
	
	_renderTitleIndicator() {
			return <PagerTitleIndicator titles={['one', 'two', 'three']} />;
	}

	_renderDotIndicator() {
			return <PagerDotIndicator pageCount={4} />;
	}

	_renderTabIndicator() {
			let tabs = [{
							text: 'Home',
							iconSource: iconsMap['ios-arrow-round-up'],
							selectedIconSource: iconsMap['ios-arrow-round-up']
					},{
							text: 'Message',
							iconSource: iconsMap['ios-arrow-round-up'],
							selectedIconSource: iconsMap['ios-arrow-round-up']
					},{
							text: 'Profile',
							iconSource: iconsMap['ios-arrow-round-up'],
							selectedIconSource: iconsMap['ios-arrow-round-up']
			}];
			return <PagerTabIndicator tabs={tabs} />;
	}
	render() {

		 return (
            <View style={styles.container}>
                <IndicatorViewPager
                    style={{flex:4}}
                    indicator={this._renderDotIndicator()}
                >
                    <View style={{justifyContent:'center', alignItems:'center', paddingLeft:20, paddingRight:20 }}>
                      	<Image source={require('./img/logo.rc2.png')} style={{width: 150, height: 150, marginBottom:20}} />
												<Text
														style={{color:"#ffffff", 
																		textAlign:'center',
																		fontFamily : 'Montserrat-Regular',
																		fontWeight : '100',
																		fontSize   : 30,
																		lineHeight : 35,
																	  marginBottom:20}}
															>Bienvenido a PAR</Text>
												<Text
														style={{color:"#ffffff", 
																		textAlign:'center',
																		fontFamily : 'Montserrat-Regular',
																		fontWeight : '100',
																		fontSize   : 15,
																		lineHeight : 20}}
															>Una nueva forma de dinero</Text>
                    </View>
                    <View style={{justifyContent:'center', alignItems:'center', paddingLeft:20, paddingRight:20 }}>
                      	<Image source={require('./img/bank.png')} style={{width: 150, height: 150, marginBottom:20}} />
												<Text
														style={{color:"#ffffff", 
																		textAlign:'center',
																		fontFamily : 'Montserrat-Regular',
																		fontWeight : '100',
																		fontSize   : 30,
																		lineHeight : 35,
																	  marginBottom:20}}
															>Simple, desde tu teléfono</Text>
												<Text
														style={{color:"#ffffff", 
																		textAlign:'center',
																		fontFamily : 'Montserrat-Regular',
																		fontWeight : '100',
																		fontSize   : 15,
																		lineHeight : 20}}
															>Disponible, seguro y accesible desde tu teléfono, sin cuenta de banco</Text>
                    </View>
                    <View style={{justifyContent:'center', alignItems:'center', paddingLeft:20, paddingRight:20 }}>
                      	<Image source={require('./img/shop.png')} style={{width: 150, height: 150, marginBottom:20}} />
												<Text
														style={{color:"#ffffff", 
																		textAlign:'center',
																		fontFamily : 'Montserrat-Regular',
																		fontWeight : '100',
																		fontSize   : 30,
																		lineHeight : 35,
																	  marginBottom:20}}
															>Red MercadoPAR</Text>
												<Text
														style={{color:"#ffffff", 
																		textAlign:'center',
																		fontFamily : 'roboto_light',
																		fontWeight : '100',
																		fontSize   : 15,
																		lineHeight : 20}}
															>Localizá los miles de productos y servicios ofrecidos en la red</Text>
                    </View>
										<View style={{justifyContent:'center', alignItems:'center', paddingLeft:20, paddingRight:20 }}>
                      	<Image source={require('./img/discover.png')} style={{width: 150, height: 150, marginBottom:20}} />
												<Text
														style={{color:"#ffffff", 
																		textAlign:'center',
																		fontFamily : 'Montserrat-Regular',
																		fontWeight : '100',
																		fontSize   : 30,
																		lineHeight : 35,
																	  marginBottom:20}}
															>Empleos</Text>
												<Text
														style={{color:"#ffffff", 
																		textAlign:'center',
																		fontFamily : 'Montserrat-Regular',
																		fontWeight : '100',
																		fontSize   : 15,
																		lineHeight : 20}}
															>Descubre la oferta de empleos de la red y ofrece tus servicios</Text>
                    </View>
								</IndicatorViewPager>
								<View style={{flex:2, paddingLeft:15,paddingRight:15, flexDirection:'column', alignItems: 'stretch', justifyContent:'center' }}>
									<TouchableHighlight
											style={[styles.fullWidthButton, styles.fullWidthButton2]}
											onPress={this._onCreateAccount} >
										<Text style={styles.fullWidthButtonText}>CREAR CUENTAS</Text>
									</TouchableHighlight>

									<TouchableHighlight
											style={[styles.fullWidthButton, styles.fullWidthButton1]}
											onPress={this._onRestoreAccount} >
										<Text style={styles.fullWidthButtonText}>RESTAURAR CUENTA</Text>
									</TouchableHighlight>
								</View>												
            </View>
        );

	}
}


export default Welcome;