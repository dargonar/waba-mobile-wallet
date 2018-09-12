import React, { Component } from 'react';
import { Dimensions, View, StyleSheet, Text, ToastAndroid, ScrollView } from 'react-native';
// import { Location, Permissions } from 'expo';
// import Permissions from 'react-native-permissions'
import { Button } from 'react-native-elements';
import { Icon } from 'native-base';
import get from 'lodash/get';
import pick from 'lodash/pick';
import LinearGradient from 'react-native-linear-gradient';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { Marker } from 'react-native-maps';

const item_h     = (Dimensions.get('window').height/2);

const deltas = {
	// latitudeDelta: 0.0922,
	// longitudeDelta: 0.0421
  latitudeDelta: 0.0161,
  longitudeDelta: 0.0010
};

const initialRegion = {
	latitude: 37.321996988,
	longitude: -122.0325472123455
};

const styles = StyleSheet.create({
  container:{ flexDirection: 'column',flex: 1 , backgroundColor:'#ffffff'},

	map: {
		width: '100%',
		height: 270,
    borderRadius: 7,
    backgroundColor: '#FFF'
	},
  mapView:{
    width: '100%',
    height: 270,
    padding: 20,
    borderRadius: 7,
    marginTop: 10,
    marginBottom: 10
  },
	infobox: {
		flex:1,
	},
	button: {
		marginVertical: 4
	},

  textInputPlaceholder:{

    color               : '#ffffff',
    fontFamily          : 'roboto_normal',
    height              : 40, 
    borderBottomColor   : '#ffffff', 
    borderBottomWidth   : 1,
    fontSize            : 18,
    lineHeight          : 18
  },
  applyButton:{
    backgroundColor:'#f35b42',
    borderColor:'#f35b42',
    borderRadius:4
  },
  applyButtonText:{
    color: '#ffffff',
    fontFamily: 'roboto_bold',
    fontSize:     17,  
  },
  categoryButton:{
    marginRight: 10,
    marginTop: 10,
    padding:10,
    borderColor:'#f35b42',
    borderRadius:4
  },
  categoryButtonSelected:{
    backgroundColor:'#f35b42',
    marginRight: 10,
    marginTop: 10,
    padding:10,
    borderColor:'#f35b42',
    borderRadius:4
  },
  nameText:{
    color: '#000',
    fontFamily: 'roboto_bold',
    fontSize:     20,  
  },
  infoboxText:{
    color: '#666',
    fontFamily : 'Montserrat-Regular',
    fontSize:     13,  
  },
  //GRADIENTS
  discountGradient: {
    flex: 1,
    borderRadius: 5,
    padding: 4,
    marginRight: 4,
    marginTop: 6,
    paddingRight: 10,
    paddingLeft: 0
  },
  promoLabel:{
    flex: 1,
    textAlign: 'right',
    alignSelf: 'center',
    marginTop: -9,
    marginRight: 4,
    fontSize: 14,
    color: '#FFF',
    fontFamily : 'Montserrat-Light',
  },
  discount: {
    color: '#fff',
    backgroundColor:'transparent',
    fontWeight: '100',
    borderRadius: 4,
    fontFamily : 'Montserrat-Regular',
    fontSize: 34,
    flex: 0,
    textAlign: 'right', 
  },
  reward: {
    color: '#fff',
    backgroundColor:'transparent',
    fontWeight: '100',
    borderRadius: 4,
    fontFamily : 'Montserrat-Regular',
    fontSize: 34,
    flex: 0,
    textAlign: 'right', 
  },
  rewardGradient: {
    flex: 1,
    borderRadius: 5,
    padding: 4,
    marginLeft: 4,
    marginTop: 6,
    paddingRight: 10,
  },
  rewardIcon: {
    position: 'absolute',  
    color: '#FFF',
    opacity: 0.5,
  },
  promoTextLabel:{
    fontFamily : 'Montserrat-Bold',
    paddingLeft:10, 
    fontSize: 8, 
    color:'#FFF'
  },
  social:{
    width: 200,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  businessWeb:{
    marginBottom: 15,
    textAlign: 'center',
    fontFamily : 'Montserrat-Bold',
    fontSize: 10
  }
});


// ESTILOS DEL MAPA

mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#caffce"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8b949e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "stylers": [
      {
        "color": "#d1ffff"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#9dcdff"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]

class BusinessProfile extends Component {

	static navigatorStyle = {
    navBarTextColor: '#666', 
    navBarComponentAlignment: 'center',
    navBarBackgroundColor: '#ffffff',
    navBarButtonColor: '#000000',
    navBarTextFontFamily: 'Montserrat-Medium',
    topBarElevationShadowEnabled: false,
  }

	constructor(props) {
    super(props);
	    this.state = {
					region: 				{
										        ...initialRegion,
										        ...deltas
										      },
		      marker:  				{...initialRegion},
		      business_data : props.business_data,
					errorMessage: 	null,
					// coffeeShops: 		[]
		};

	
  }

  

	componentWillMount() {
		this.getLocationAsync();
	}

	// getCoffeeShops = async filter => {
	// 	const coords = get(this.state.location, 'coords');
	// 	const userLocation = pick(coords, ['latitude', 'longitude']);
	// 	let coffeeShops = await YelpService.getCoffeeShops(
	// 		userLocation,
	// 		filter
	// 	);
	// 	this.setState({ coffeeShops });
	// };

	renderMarkers() {
		// return false;
		// return this.props.places.map((place, i) => (
		// 	<Marker key={i} title={place.name} coordinate={place.coords} />
		// ));

		return (<MapView.Marker
            coordinate={this.state.marker}
          />);
	}

	getLocationAsync = async () => {
		navigator.geolocation.getCurrentPosition(
      (position) => {
      	// await this.promisedSetState({ location : {latitude: position.coords.latitude,
      	// 	          											longitude: position.coords.longitude} });
      	// await this.promisedSetState({stars: stars});
      	// ToastAndroid.show(' *** getLocationAsync SUCCEDD: ' + JSON.stringify(position), ToastAndroid.SHORT);
        let newState = { region : {	latitude: position.coords.latitude,
      															longitude: position.coords.longitude,
      															...deltas},
												 marker:  {	latitude: position.coords.latitude,
      															longitude: position.coords.longitude} };
        this.setState(newState);

        
      },
      (error) => {
      		ToastAndroid.show(' *** getLocationAsync FAILED: ' + JSON.stringify(error), ToastAndroid.SHORT);
      		this.setState({ error: error.message })
      	},
      {  },
    );

    //enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
  }

 	renderInfobox() {

		return (
					
          <View style={{flex:1, padding:20,}}>
            <View style={{flex:1, marginBottom: 10, alignItems: 'center', flexDirection: 'row'}}>
              <Icon name="ios-beer" style={{color: '#ddd', fontSize: 25, marginRight: 15, width: 20}}/>
              <Text style={styles.infoboxText}>{this.state.business_data.category.name} - {this.state.business_data.subcategory.name}</Text>
            </View>
            <View style={{flex:1, marginBottom: 10, alignItems: 'center', flexDirection: 'row'}}>
              <Icon name="ios-pin" style={{color: '#ddd', fontSize: 25, marginRight: 15, width: 20}}/>
              <Text style={styles.infoboxText}>{this.state.business_data.address || '14 e/ 59 y 60 n 1229'}</Text>
            </View>
            <View style={{flex:1, marginBottom: 10, alignItems: 'center', flexDirection: 'row'}}>
              <Icon name="ios-call" style={{color: '#ddd', fontSize: 25, marginRight: 15, width: 20}}/>
              <Text style={styles.infoboxText}>{this.state.business_data.phone || '423-9645'}</Text>
            </View>
            <View style={{flex:1, marginBottom: 10, alignItems: 'center', flexDirection: 'row'}}>
              <Icon name="md-cash" style={{color: '#ddd', fontSize: 25, marginRight: 15, width: 20}}/>
              <Text style={styles.infoboxText}>Efectivo, Crédito, Débito</Text>
            </View>
          </View>

				
			);
	}

	render() {
		

		return (
			<ScrollView style={styles.container}>
        <View style={{flexDirection: 'row', flex: 1, minHeight: 80, marginRight: 20, marginLeft: 20, marginBottom: 0, paddingTop: 5}}>

          <LinearGradient start={{x: 0, y: 1}} end={{x: 0.75, y: 0}} colors={['#76eafa', '#6b91f8']} style={styles.discountGradient}>
            <View style={{flexDirection: 'column', flex: 1, justifyContent:'space-between', paddingTop:2, paddingBottom:2}}>
              <Text style={styles.promoTextLabel}>PAGA CON DISCOINS HASTA</Text>
              <Icon name="remove" style={{color: '#FFF', opacity: 0.35, position:'absolute', bottom: 0, left: 0, fontSize: 50}}/>                  
              <View flexDirection='row'>
                <Text style={styles.promoLabel}>%</Text>
                <Text style={styles.discount}>35</Text>
              </View>  
            </View>
          </LinearGradient>

          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#ff9e5d', '#ff7233']} style={styles.rewardGradient}>
            <View style={{flexDirection: 'column', flex: 1, justifyContent:'space-between', paddingTop:2, paddingBottom:2}}>
              <Text style={styles.promoTextLabel}>CON TU COMPRA RECIBIS</Text>
              <Icon name="add" style={{color: '#FFF', opacity: 0.35, position:'absolute', bottom: 0, left: -5, fontSize: 50}}/>                  
              <View flexDirection='row'>
                <Text style={styles.promoLabel}>%</Text>
                <Text style={styles.reward}>25</Text>
              </View>  
            </View>
          </LinearGradient>
        </View>
        <View style={styles.mapView}>
          <MapView
            style={styles.map}
            initialRegion={this.state.region}
            provider={this.props.provider}
            customMapStyle={mapStyle}
          >
            {this.renderMarkers()}
          </MapView>
        </View>

		
				<View style={styles.infobox}>{this.renderInfobox()}</View>

        <View flexDirection='row' justifyContent='space-between' style={styles.social}>
          <Icon name="logo-facebook" style={{color: '#ddd', fontSize: 25}}/>
          <Icon name="logo-twitter" style={{color: '#ddd', fontSize: 25}}/>
          <Icon name="logo-instagram" style={{color: '#ddd', fontSize: 25}}/>
        </View>
        <Text alignItems='center' style={styles.businessWeb}>www.benoit.com.ar</Text>
			</ScrollView>
		);
	}
}


export default BusinessProfile;
