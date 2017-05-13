import React, { PropTypes, Component } from 'react';
import { SearchBar } from 'react-native-elements'
import { List, ListItem } from 'react-native-elements'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geocoder from 'react-native-geocoder';

import {
	ActivityIndicator,
  View,
  ListView,
  StyleSheet,
  ToastAndroid,
  Dimensions 
} from 'react-native';

import ActionButton from 'react-native-action-button';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from '../wallet/wallet.actions';
// import { iconsMap } from '../../utils/AppIcons';
import * as config from '../../constants/config';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const map_height = height - 58;

const styles = StyleSheet.create({
  container: {
    flex:1,
    
    backgroundColor: '#ff00ff'
  },
  map: {
		height: map_height
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
// 		flex:8
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
//...StyleSheet.absoluteFillObject,


class LocationFull extends Component {
  
  static navigatorStyle = {
    navBarTextFontFamily: 'roboto_thin',
    navBarTextColor: '#ffffff', 
    navBarBackgroundColor: '#2e2f3d', //0B5F83
    navBarButtonColor: '#ffffff'
  }
  
  constructor(props) {
    super(props);
		
		this.state = {
      refreshing          : false,
      recipient_selected  : false,
      next_screen         : props.next_screen,
      with_no_credit      : props.with_no_credit,
			can_search 				  : true,
			searchText					: '',
			locked : false,
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      marker:  {
        latitude: 0,
        longitude: 0
      }
    };
    
		Geocoder.fallbackToGoogle('AIzaSyCRitgO50RXR78GlCqGunpz-Siz38N1abE');
		
//   	this.state = {
//       locked : false,
//       region: {
//         latitude: props.position.lat,
//         longitude: props.position.lng,
//         latitudeDelta: LATITUDE_DELTA,
//         longitudeDelta: LONGITUDE_DELTA
//       },
//       marker:  {
//         latitude: props.position.lat,
//         longitude: props.position.lng
//       }
//     };
    
    this.tid = undefined;
    this.onRegionChange = this.onRegionChange.bind(this);
    this.onLockMap      = this.onLockMap.bind(this);
		this.geoSearch			= this.geoSearch.bind(this);
    this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
  }
  
	_onChangeText(text, that) {
		if(!this.state.can_search)
			return;
		clearTimeout(this.tid);
    this.tid = setTimeout( () => {
      that.geoSearch(text);       
		}
    , 500);
  }
  
	_onNavigatorEvent(event) { 
    if (event.id == 'selectAddress') { 
      // this.props.actions.memoSuccess('');
    }
//     if(event.id=='lockMap')
//      {
//        let locked = !this.state.locked;
//        this.setState({locked: locked });
//      }
  }
	
  onLockMap(value){
    let locked = value; //!this.state.locked;
    this.setState({locked: value });
    if(value){
      this.setState({ marker : this.state.region });
    }
  }
  
  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  componentDidMount() {
//     AppState.addEventListener('change', this.handleAppStateChange);
    
  }

  componentWillUnmount() {
//     AppState.removeEventListener('change', this.handleAppStateChange);
  }
  
  focus() {
  }
  
	geoSearch(search) {
    console.log(' ---------- Pedimos......');
		console.log(search);
    this.setState({refreshing:true});
		Geocoder.geocodeAddress(search).then(res => {
			console.log(' ---------- Pedimos......');
			console.log(JSON.stringify(res));
//     	let region = JSON.stringify(this.state.region);
			if(!res || res.length==0){
				this.setState({
					refreshing: false,
				});
				return;
			}
			let res_item = res[0];
			this.map.animateToRegion({
					latitude  : res_item.position.lat, 
					longitude  : res_item.position.lng,
					latitudeDelta: LATITUDE_DELTA,
        	longitudeDelta: LONGITUDE_DELTA
				}, 100);
			this.setState({
        refreshing: false,
				marker: {	
									latitude  : res_item.position.lat, 
									longitude  : res_item.position.lng
								}
      });
// 				region : {
// 					latitude  : res_item.position.lat, 
// 					longitude  : res_item.position.lng
// 					},
		})
		.catch((err) => {
			this.setState({refreshing:false});
      console.log(' GEO SEARCH Error');
			console.log(JSON.stringify(err));
		});
	}

  onRegionChange(region) {
//     this.setState({ region : region });
//     if(!this.state.locked)
//       return;
//     clearTimeout(this.tid);
//     let that = this;
//     this.tid = setTimeout( () => {
//       this.setState({ marker : region });
//     }
//     , 200);
  }

  render() {
    let buttonColor = '#1abc9c';
    if(this.state.locked)
      buttonColor = '#3498db';
    return (
      <View style={styles.container}>
				<View style={{height:58}}>
					<SearchBar
						lightTheme
						onChangeText={(value) => {
							this.setState({ searchText:value }); 
							this._onChangeText(value, this); }
						}
  					value={this.state.searchText}
						autoFocus={true}
						textInputRef={(param)=> this.searchText = param}
						ref={(searchBar) => this.searchBar = searchBar} 
						placeholderStyle={{}}
						inputStyle={{color:'#000000', textDecorationLine :'none'}}
						placeholder='Ingrese dirección...' 
						placeholderTextColor="#999999"
						underlineColorAndroid ="transparent"
						clearIconX ={{ color: '#86939e', name: 'clear' }}
					/>
				</View>
        <MapView 
					ref={ref => { this.map = ref; }}
          style={styles.map} 
					initialRegion={this.state.region}
          provider={this.props.provider}
          onRegionChange={this.onRegionChange}
          >
          <MapView.Marker draggable
            coordinate={this.state.marker}
            onDragEnd={(e) => {	
											 	this.setState({ marker: e.nativeEvent.coordinate, can_search:false }); 
												Geocoder.geocodePosition({
														lat: e.nativeEvent.coordinate.latitude,
														lng: e.nativeEvent.coordinate.longitude
													}).then(res => {
													console.log(' ---------- REV GEOCODE ......');
													console.log(JSON.stringify(res));
													if(!res || res.length==0)
													{
														this.setState({can_search:true});
														return;
													}
// 													console.log(' ---- A', res[0].formattedAddress);
// 													this.searchText.value = res[0].formattedAddress;
// 													console.log(' ---- B');
													this.setState({searchText: res[0].formattedAddress, can_search:true});
												})
												.catch(err => {
													console.log(' --- DRAG END ERR');
													console.log(JSON.stringify(err));
													this.setState({can_search:true});
												});						
										} }
          />
        </MapView>
        <ActionButton buttonColor={buttonColor}>
          <ActionButton.Item buttonColor='#1abc9c' title="Pin Libre" onPress={() => {this.onLockMap(false)}}>
            <Icon name="ios-pin-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Centrar pin" onPress={() => {this.onLockMap(true)}}>
            <Icon name="ios-pin" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

LocationFull.propTypes = {
  provider: MapView.ProviderPropType,
};

function mapStateToProps(state, ownProps) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(walletActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(LocationFull);
