import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MapView } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import get from 'lodash/get';

const deltas = {
	latitudeDelta: 0.0922,
	longitudeDelta: 0.0421
};

const initialRegion = {
	latitude: 37.321996988,
	longitude: -122.0325472123455
};

// const Marker = MapView.Marker;

class Map extends Component {
	
	constructor(props) {
    super(props);
  }

	renderMarkers() {
		return false;
		// return this.props.places.map((place, i) => (
		// 	<Marker key={i} title={place.name} coordinate={place.coords} />
		// ));
	}

	render() {
		// console.log(' -------------------- this.props:', this.props);
		const { location } = this.props;
		let region = {
			latitude: get(location, 'coords.latitude', null) ,
			longitude: get(location, 'coords.longitude', null),
			...deltas
		};

		if (!region.latitude || !region.longitude) {
			// return (
			// 	<View>
			// 		<Text>Loading map...</Text>
			// 	</View>
			// );
			region.latitude = initialRegion.latitude;
			region.longitude = initialRegion.longitude;
		}

		return (
			<MapView
				style={styles.container}
				region={region}
				initialRegion={{ ...initialRegion, ...deltas }}
				showsUserLocation
				showsMyLocationButton
			>
				{this.renderMarkers()}
			</MapView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '80%'
	}
});

export default Map;