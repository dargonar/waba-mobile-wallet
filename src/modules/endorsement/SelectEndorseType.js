import React, { PropTypes, Component } from 'react';
import { SearchBar } from 'react-native-elements'
import { List, ListItem } from 'react-native-elements'
import { ActivityIndicator } from 'react-native';

import {
  Alert, ScrollView, Stylesheet, Text, TouchableHighlight, View
} from 'react-native';

import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Ionicons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from '../wallet/wallet.actions';
import { iconsMap } from '../../utils/AppIcons';
import * as config from '../../constants/config';

import styles from './styles/SelectEndorseType';

import { sliderWidth, itemWidth } from './components/styles/SliderEntry';
import SliderEntry from './components/SliderEntry';
//import { ENTRIES1, ENTRIES2 } from 'example/src/static/entries';

class SelectEndorseType extends Component {
  
  static navigatorStyle = {
    navBarTextColor: '#ffffff', 
    navBarBackgroundColor: '#0B5F83',
    navBarButtonColor: '#ffffff'
  }
  
  constructor(props) {
    super(props);
		this.tid = undefined;
		
	}
  
  
  componentWillMount() {
    // this.setState({recipient_selected:false}); 
  }

  componentWillReceiveProps(nextProps) {
  }

  componentDidMount() {
	}

  componentWillUnmount() {
//     AppState.removeEventListener('change', this.handleAppStateChange);
  }
  	
	_onNext(){
      // if(Number(this.props.balance)<=Number(this.state.amount))
      // {
      //   Alert.alert(
      //     'Fondos insuficientes',
      //     'No dispone de fondos suficientes para realizar la operación.',
      //     [
      //       {text: 'OK'},
      //     ]
      //   )
      //   return;
      // }
      this.props.navigator.push({
        screen: 'wallet.SendConfirm',
        title: 'Confirmar envío',
        passProps: {
          endorse_type:   1,
          endorse_member: 1
        }
      });
    }

	  getSlides () {
        const avales = [
				{
						title: 'Descubierto por $1.000,00',
						subtitle: 'Aval para individuos',
						illustration: 'http://i.imgur.com/UYiroysl.jpg',
						bgcolor: 'I'
				},
				{
						title: 'Descubierto por $10.000,00',
						subtitle: 'Aval para productores y cuentapropiestas',
						illustration: 'http://i.imgur.com/UYiroysl.jpg',
						bgcolor: 'X'
				},
				{
						title: 'Descubierto por $30.000,00',
						subtitle: 'Aval para empresas',
						illustration: 'http://i.imgur.com/UYiroysl.jpg',
						bgcolor: 'XXX'
				}
			]

					//even={(index + 1) % 2 === 0}
        return avales.map((entry, index) => {
            return (
                <SliderEntry
                  key={`carousel-entry-${index}`}
                  {...entry}
                />
            );
        });
    }

    get avalesCarousel () {
        return (
            <Carousel
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              firstItem={1}
              inactiveSlideScale={0.94}
              inactiveSlideOpacity={0.6}
              enableMomentum={false}
              containerCustomStyle={styles.slider}
              contentContainerCustomStyle={styles.sliderContainer}
              showsHorizontalScrollIndicator={false}
              snapOnAndroid={true}
              removeClippedSubviews={false}
            >
                { this.getSlides() }
            </Carousel>
        );
    }

    render() {
        const iconMoney = (<Icon name="logo-usd" size={26} color="#9F9F9F" style={{textAlign:'center', textAlignVertical:'center', flex:1 }} />);
        return (
            <View style={{flex: 1, backgroundColor:'#fff', flexDirection: 'column'}}>
							<View style={{flex: 2, backgroundColor:'#fff', flexDirection: 'column', padding:15}}>
								<Text style={styles.title}>A tener en cuenta</Text>
								<Text style={styles.subtitle}>Confianza: Dale invitaciones solo a individuos que conoces y con quienes compartes valores colaborativos.</Text>
								<Text style={styles.subtitle}>Privacidad: Guardamos la lista de a quien has invitado.</Text>
								<Text style={styles.subtitle}>Abuso: Eres responsable solidario con aquéllos que avales.</Text>
							</View>
              <View
                  style={styles.scrollview}
                  indicatorStyle={'white'}
                >
									  { this.avalesCarousel }
                </View>
              <View style={{flex:1, flexDirection:'column', alignItems:'stretch', justifyContent:'flex-end' }}>
                <TouchableHighlight
                    style={styles.fullWidthButton}
                    onPress={this._onNext.bind(this)} >
                  <Text style={styles.fullWidthButtonText}>SIGUIENTE</Text>
                </TouchableHighlight>
              </View>
            </View>
        );
  }
}

function mapStateToProps(state, ownProps) {
	return {
		// memo: state.wallet.memo
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(walletActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(SelectEndorseType);
