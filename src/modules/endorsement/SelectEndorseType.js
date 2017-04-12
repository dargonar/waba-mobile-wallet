import React, { PropTypes, Component } from 'react';
import { ActivityIndicator } from 'react-native';

import {
  Alert, ScrollView, Stylesheet, Text, ToastAndroid, TouchableHighlight, View
} from 'react-native';

import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Ionicons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from '../wallet/wallet.actions';
import { iconsMap } from '../../utils/AppIcons';
import * as config from '../../constants/config';
import styles from './styles/SelectEndorseType';
import { avales }  from './components/static/endorsements_const'
import { sliderWidth, itemWidth } from './components/styles/SliderEntry';
import SliderEntry from './components/SliderEntry';

class SelectEndorseType extends Component {
  
  static navigatorStyle = {
    navBarTextColor: '#ffffff', 
    navBarBackgroundColor: '#2e2f3d',
    navBarButtonColor: '#ffffff'
  }
  
  constructor(props) {
    super(props);
		this.tid = undefined;
		
    this.state = {
			avales 					: avales,
      endorsed      	: props.endorsed,
      endorsed_index  : 0
    };
	}
  
  
  componentWillMount() {
    
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
        screen: 'endorsement.EndorseConfirm',
        title: 'Confirmar envío',
        passProps: {
          endorsed_index    : this.state.endorsed_index,
          endorsed          : this.state.endorsed,
          share_or_endorse  : 'endorse'
        }
      });
    }

		_currentEntry(selected_aval){
// 			this.setState({endorsed_index:selected_aval});
//       ToastAndroid.show(selected_aval.toString(), ToastAndroid.SHORT);
    }
		
		_onEntryTap(_key){
			let avales = this.state.avales.map((entry, index) => {
				entry.checked = false;
				if(entry._key==_key)
				{
					entry.checked = true;
					this.setState({endorsed_index:index});
				}
				return entry;
			});
			this.setState({avales:avales});
		}

	  getSlides () {
			if(!this.state.avales)
				return null;
			return this.state.avales.map((entry, index) => {
					entry.user_name = this.state.endorsed[0];			
					return (
              <SliderEntry
                key={`carousel-entry-${index}`}
                {...entry}
								onTap={(_key) => { this._onEntryTap(_key); }}
              />
          );
      });
    }
    
//

    get avalesCarousel () {
        return (
            <Carousel
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              firstItem={0}
              inactiveSlideScale={0.94}
              inactiveSlideOpacity={0.6}
              enableMomentum={false}
              containerCustomStyle={styles.slider}
              contentContainerCustomStyle={styles.sliderContainer}
              showsHorizontalScrollIndicator={false}
              snapOnAndroid={true}
              removeClippedSubviews={false}
  						onSnapToItem={(slideIndex) => { this._currentEntry(slideIndex); }}            
            >
                { this.getSlides() }
            </Carousel>
        );
    }

    render() {
        const iconMoney = (<Icon name="logo-usd" size={26} color="#9F9F9F" style={{textAlign:'center', textAlignVertical:'center', flex:1 }} />);
        return (
            <View style={{flex: 1, backgroundColor:'#2e2f3d', flexDirection: 'column'}}>
							<View
                  style={[styles.scrollview]}
                  indicatorStyle={'white'}
                >
									  { this.avalesCarousel }
              </View>
							<View style={{flex: 1, flexDirection: 'column', paddingLeft:15, paddingRight:15}}>
								<Text style={styles.title}>A tener en cuenta</Text>
								<Text style={styles.subtitle}>Confianza: Dale invitaciones solo a individuos que conoces y con quienes compartes valores colaborativos.</Text>
								<Text style={styles.subtitle}>Privacidad: Guardamos la lista de a quien has invitado.</Text>
								<Text style={styles.subtitle}>Abuso: Eres responsable solidario con aquéllos que avales.</Text>
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
