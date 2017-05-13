import React, { PropTypes, Component } from 'react';
import { SearchBar } from 'react-native-elements'
import { List, ListItem } from 'react-native-elements'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

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

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#ff00ff'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
//...StyleSheet.absoluteFillObject,
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


class LocationMap extends Component {
  
  static navigatorStyle = {
    navBarTextFontFamily: 'roboto_thin',
    navBarTextColor: '#ffffff', 
    navBarBackgroundColor: '#2e2f3d', //0B5F83
    navBarButtonColor: '#ffffff'
  }
  
  constructor(props) {
    super(props);
  	this.state = {
      locked : false,
      region: {
        latitude: props.position.lat,
        longitude: props.position.lng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      marker:  {
        latitude: props.position.lat,
        longitude: props.position.lng
      }
    };
    
    this.tid = undefined;
    this.onRegionChange = this.onRegionChange.bind(this);
    this.onLockMap      = this.onLockMap.bind(this);
    this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
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
  
  onRegionChange(region) {
    this.setState({ region : region });
    if(!this.state.locked)
      return;
    clearTimeout(this.tid);
    let that = this;
    this.tid = setTimeout( () => {
      this.setState({ marker : region });
    }
    , 200);
  }

  render() {
    let buttonColor = '#1abc9c';
    if(this.state.locked)
      buttonColor = '#3498db';
    return (
      <View style={styles.container}>
        <MapView 
          style={styles.map} 
          initialRegion={this.state.region}
          provider={this.props.provider}
          onRegionChange={this.onRegionChange}
          >
          <MapView.Marker draggable
            coordinate={this.state.marker}
            onDragEnd={(e) => this.setState({ marker: e.nativeEvent.coordinate })}
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

LocationMap.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(LocationMap);
