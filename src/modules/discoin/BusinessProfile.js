import React, { Component } from 'react';
import { Dimensions, View, StyleSheet, Text, ToastAndroid } from 'react-native';
// import { Location, Permissions } from 'expo';
// import Permissions from 'react-native-permissions'
import { Button } from 'react-native-elements';
import get from 'lodash/get';
import pick from 'lodash/pick';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { Marker } from 'react-native-maps';

const item_h     = (Dimensions.get('window').height/2);

const deltas = {
	latitudeDelta: 0.0922,
	longitudeDelta: 0.0421
};

const initialRegion = {
	latitude: 37.321996988,
	longitude: -122.0325472123455
};

const styles = StyleSheet.create({
  container:{ flexDirection: 'column',flex: 1 , backgroundColor:'#ffffff'},

	map: {
		width: '100%',
		height: item_h
	},
	infobox: {
		flex:1,
		backgroundColor: '#ff00ff'
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
  
  categoryText:{
    color: '#f35b42',
    fontFamily: 'roboto_thin',
    fontSize:     15,
  },
  nameText:{
    color: '#000',
    fontFamily: 'roboto_bold',
    fontSize:     20,  
  },
  addressText:{
    color: '#000',
    fontFamily: 'roboto_normal',
    fontSize:     15,  
  }
});


class BusinessProfile extends Component {

	static navigatorStyle = {
    navBarTextColor: '#000000', 
    navBarBackgroundColor: '#ffffff',
    navBarButtonColor: '#000000',
    navBarTextFontFamily: 'roboto_normal'
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
					
          <View style={{flex:1, padding:10, backgroundColor:'#ffffff'}}>
            <View style={{flex:1, flexDirection:'row', justifyContent: 'flex-start'}}>
	            <View style={{flex:1, flexDirection:'column', justifyContent: 'flex-start'}}>
	              <View style={{height:30, justifyContent: 'center', alignItems: 'flex-start'}}>
	                <Text style={styles.categoryText}>{this.state.business_data.category.name}</Text>
	              </View>
	              <View style={{height:40, justifyContent: 'center', alignItems:'flex-start' }}>
	                <Text style={styles.nameText}>{this.state.business_data.name}</Text>
	              </View>
	              <View style={{height:20, justifyContent: 'center', alignItems:'flex-start' }}>
	                <Text style={styles.addressText}>{this.state.business_data.address || 'ND'}</Text>
	              </View>
	            </View>
            	<View style={{flex:1, flexDirection:'column', justifyContent: 'center'}}>

          		</View>
        		</View>
          </View>
		
				
			);
	}

	render() {
		

		return (
			<View style={styles.container}>
				<MapView
					style={styles.map}
					initialRegion={this.state.region}
          provider={this.props.provider}
				>
					{this.renderMarkers()}
				</MapView>
		
				<View style={styles.infobox}>{this.renderInfobox()}</View>
			</View>
		);
	}
}


export default BusinessProfile;
