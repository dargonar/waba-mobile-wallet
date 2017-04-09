import React, { PropTypes, Component } from 'react';
import { SearchBar } from 'react-native-elements'
import { List, ListItem } from 'react-native-elements'
import { ActivityIndicator } from 'react-native';

import {
  Alert, Stylesheet, Text, TouchableHighlight, View
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

	  const avales = [
      {
          title: 'Descubierto por $1.000,00',
          subtitle: 'Aval para individuos',
          illustration: 'http://i.imgur.com/UYiroysl.jpg'
      },
      {
          title: 'Descubierto por $10.000,00',
          subtitle: 'Aval para productores y cuentapropiestas',
          illustration: 'http://i.imgur.com/UYiroysl.jpg'
      },
      {
          title: 'Descubierto por $30.000,00',
          subtitle: 'Aval para empresas',
          illustration: 'http://i.imgur.com/UYiroysl.jpg'
      }
    ]
    
    getSlides (entries) {
        if (!entries) {
            return false;
        }

        return entries.map((entry, index) => {
            return (
                <SliderEntry
                  key={`carousel-entry-${index}`}
                  even={(index + 1) % 2 === 0}
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
                { this.getSlides(this.avales) }
            </Carousel>
        );
    }

    render() {
        const iconMoney = (<Icon name="logo-usd" size={26} color="#9F9F9F" style={{textAlign:'center', textAlignVertical:'center', flex:1 }} />);
        return (
            <View style={{flex: 1, backgroundColor:'#fff', flexDirection: 'column'}}>
              <ScrollView
                  style={styles.scrollview}
                  indicatorStyle={'white'}
                  scrollEventThrottle={200}
                >
                    <Text style={styles.title}>Example 1</Text>
                    <Text style={styles.subtitle}>No momentum | Scale | Opacity</Text>
                    { this.example1 }
                </ScrollView>
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
