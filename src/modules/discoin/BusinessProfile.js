import React, { Component } from 'react';
import { Linking, Image, Dimensions, View, StyleSheet, Text, ToastAndroid, ScrollView } from 'react-native';
// import { Location, Permissions } from 'expo';
// import Permissions from 'react-native-permissions'
import { Button, Icon } from 'native-base';
import get from 'lodash/get';
import pick from 'lodash/pick';
import LinearGradient from 'react-native-linear-gradient';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { Marker } from 'react-native-maps';
import * as config from '../../constants/config';
import { iconsMap } from '../../utils/AppIcons';

const item_h     = (Dimensions.get('window').height/2);


const {height, width} = Dimensions.get('window');

const img_height = width / 4 * 3  ;

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
  descriptionText:{
    color: '#666',
    fontFamily : 'Montserrat-Regular',
    fontSize:     20,  
    textAlign: 'justify'
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
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 0,
    marginRight: 0,
    fontSize: 25,
    color: '#FFF',
    fontFamily : 'Montserrat-Light',
  },
  discount: {
    color: '#fff',
    backgroundColor:'transparent',
    fontWeight: '100',
    borderRadius: 4,
    fontFamily : 'Montserrat-Regular',
    fontSize: config.normalizeFontSize(55),
    flex: 2,
    textAlign: 'center', 
  },
  reward: {
    color: '#fff',
    backgroundColor:'transparent',
    fontWeight: '100',
    borderRadius: 4,
    fontFamily : 'Montserrat-Regular',
    fontSize: config.normalizeFontSize(55),
    flex: 2,
    textAlign: 'center', 
  },
  rewardGradient: {
    flex: 1,
    borderRadius: 5,
    padding: 4,
    marginLeft: 4,
    marginTop: 6,
    paddingRight: 10,
  },
  promoTextLabel:{
    fontFamily : 'Montserrat-Bold',
    paddingLeft:10, 
    fontSize: 8, 
    color:'#FFF'
  },
  social:{
    width: 250,
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
    navBarTextColor: '#fff', 
    navBarComponentAlignment: 'center',
    navBarBackgroundColor: 'rgba(0, 0, 0, .2);',
    navBarButtonColor: '#fff',
    navBarTextFontFamily: 'Montserrat-Bold',
    
    drawUnderNavBar   : true,
    // navBarTransparent : true,
    navBarNoBorder    : true,
    topBarElevationShadowEnabled: false
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
					errorMessage: 	null
		};

    this._onGoToUrl           = this._onGoToUrl.bind(this);
	  this.renderSocialButtons  = this.renderSocialButtons.bind(this);
    this.renderSocialButton   = this.renderSocialButton.bind(this);
    this.disableRightDrawer();
    this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
  }


  disableRightDrawer(){
    this.props.navigator.setDrawerEnabled({
      side: 'right',
      enabled: false
    });
  }

  componentDidAppear() {
    this.disableRightDrawer();
  }

  _onNavigatorEvent(event) {
    if (event.type == 'ScreenChangedEvent') {
      if (event.id == 'didAppear') {
        this.componentDidAppear();
        return;
      }
      return;
    }
  }
  _onGoToUrl(field){
    let url = this.state.business_data[field];
    if(!url.startsWith("http://") || url.startsWith("https://"))
      url = "http://" + url;
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }

	componentWillMount() {
		// this.getLocationAsync();
    if(this.state.business_data.latitude && this.state.business_data.longitude)
    {
      let newState = { region : { latitude: this.state.business_data.latitude,
                                    longitude: this.state.business_data.longitude,
                                    ...deltas},
                         marker:  { latitude: this.state.business_data.latitude,
                                    longitude: this.state.business_data.longitude} };
      this.setState(newState);
    }
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
        let newState = { region : {	latitude:   position.coords.latitude,
      															longitude:  position.coords.longitude,
      															...deltas},
												 marker:  {	latitude:   position.coords.latitude,
      															longitude:  position.coords.longitude} };
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

    let cash_icon   =  (this.state.business_data['discount_ex'][config.getToday()]['pm_cash']==1)?(<Image source={{uri:iconsMap['cash--active'].uri}} style={{height:16, width:20, marginTop:2}} />):false;
    let credit_icon =  (this.state.business_data['discount_ex'][config.getToday()]['pm_credit']==1)?(<Image source={{uri:iconsMap['credit-card--active'].uri}} style={{height:16, width:20, marginTop:2}} />):false;
    let debit_icon  =  (this.state.business_data['discount_ex'][config.getToday()]['pm_debit']==1)?(<Image source={{uri:iconsMap['bank--active'].uri}} style={{height:20, width:20}} />):false;
    // let payment_text = ((this.state.business_data['discount_ex'][config.getToday()]['pm_cash']==1)?'Efectivo':'')+((this.state.business_data['discount_ex'][config.getToday()]['pm_credit']==1)?'Crédito':'')+((this.state.business_data['discount_ex'][config.getToday()]['pm_debit']==1)?'Débito':'');
		
    return (
      <View style={{flex:1, padding:20,}}>
        <View style={{flex:1, marginBottom: 10, alignItems: 'center', flexDirection: 'row'}}>
          <Icon name="bookmark" style={{color: '#ddd', fontSize: 25, marginRight: 15, width: 20}}/>
          <Text style={styles.infoboxText}>{this.state.business_data.category.name} - {this.state.business_data.subcategory.name}</Text>
        </View>
        <View style={{flex:1, marginBottom: 10, alignItems: 'center', flexDirection: 'row'}}>
          <Icon name="ios-pin" style={{color: '#ddd', fontSize: 25, marginRight: 15, width: 20}}/>
          <Text style={styles.infoboxText}>{this.state.business_data.address || 'N/D'}</Text>
        </View>
        <View style={{flex:1, marginBottom: 10, alignItems: 'center', flexDirection: 'row'}}>
          <Icon name="ios-call" style={{color: '#ddd', fontSize: 25, marginRight: 15, width: 20}}/>
          <Text style={styles.infoboxText}>{this.state.business_data.telephone || 'N/D'}</Text>
        </View>
        {
          (cash_icon)?
          (<View style={{flex:1, marginBottom: 10, alignItems: 'center', flexDirection: 'row'}}>
              {cash_icon}
              <Text style={[styles.infoboxText, {marginLeft: 15}]}>{"Efectivo"}</Text>
            </View>)
          :false
        }
        {(credit_icon)?
          (<View style={{flex:1, marginBottom: 10, alignItems: 'center', flexDirection: 'row'}}>
            {credit_icon}
            <Text style={[styles.infoboxText, {marginLeft: 15}]}>{"Crédito"}</Text>
          </View>)
          :false
        }
        {(debit_icon)?
          (<View style={{flex:1, marginBottom: 10, alignItems: 'center', flexDirection: 'row'}}>
            {debit_icon}
            <Text style={[styles.infoboxText, {marginLeft: 15}]}>{"Débito"}</Text>
          </View>)
          :false
        }
      </View>				
		);
	}

  renderSocialButtons(){
    
    let buttons = [];
    const www  = this.state.business_data.website?(<Icon  name="ios-globe" style={{color: '#4285f4', fontSize: 25}}/>):false;
    buttons.push([www, 'website']);
    const fb   = this.state.business_data.facebook?(<Icon  name="logo-facebook" style={{color: '#3b5998', fontSize: 25}}/>):false;
    buttons.push([fb, 'facebook']);
    const twi  = this.state.business_data.twiter?(<Icon  name="logo-twitter" style={{color: '#1da1f2', fontSize: 25}}/>):false;
    buttons.push([twi, 'twiter']);
    const inst = this.state.business_data.instagram?(<Icon  name="logo-instagram" style={{color: '#c32aa3', fontSize: 25}}/>):false;
    buttons.push([inst, 'instagram']);

    return buttons;
  }

  renderSocialButton(obj){
    if(!obj[0])
      return false;
    // if(obj[1]=='facebook' || obj[1]=='instagram')
    //   return (<Button onPress={() => {this._onGoToUrl(obj[1])}}>{obj[0]}</Button>)
    return (<Button transparent onPress={() => {this._onGoToUrl(obj[1])}}>{obj[0]}</Button>)

  }

	render() {
		
    let imageUrl = {uri:config.FILES_URL + this.state.business_data['image']}
    if(!this.state.business_data['image'] || this.state.business_data['image']=='') 
    {
      imageUrl = require('../wallet/img/discoin_promotion_2.png');
    }
    
    let buttons = this.renderSocialButtons();

		return (
			<ScrollView style={styles.container}>
        <Image style={{width:width, height:img_height, resizeMode: 'cover'}} source={imageUrl} ></Image>
        <View style={{flex:1, marginRight: 20, marginLeft: 20, marginBottom: 0, paddingTop: 5}}>
          <View style={{flex:1, marginBottom: 10, alignItems: 'center', flexDirection: 'row'}}>
            <Text style={styles.descriptionText}>{this.state.business_data.description}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', flex: 1, minHeight: 80, marginRight: 20, marginLeft: 20, marginBottom: 0, paddingTop: 5}}>
          <LinearGradient start={{x: 0, y: 1}} end={{x: 0.75, y: 0}} colors={['#76eafa', '#6b91f8']} style={styles.discountGradient}>
            <View style={{flexDirection: 'column', flex: 1, justifyContent:'space-between', paddingTop:2, paddingBottom:2}}>
              <Text style={styles.promoTextLabel}>PAGA CON DISCOINS HASTA</Text>
              <View style={{flexDirection:'row'}}>
                <View style={{flex:1}}>
                  <Icon name="remove" style={{color: '#FFF', opacity: 0.35, position:'absolute', bottom: 0, left: 0, fontSize: 50}}/>                  
                </View>
                <Text style={styles.discount}>{Number(this.state.business_data['discount_ex'][config.getToday()]['discount']).toFixed(0)}</Text>
                <Text style={styles.promoLabel}>%</Text>
                
              </View>  
            </View>
          </LinearGradient>

          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#ff9e5d', '#ff7233']} style={styles.rewardGradient}>
            <View style={{flexDirection: 'column', flex: 1, justifyContent:'space-between', paddingTop:2, paddingBottom:2}}>
              <Text style={styles.promoTextLabel}>CON TU COMPRA RECIBIS</Text>
              <View style={{flexDirection:'row'}}>
                <View style={{flex:1}}>
                  <Icon name="add" style={{color: '#FFF', opacity: 0.35, position:'absolute', bottom: 0, left: -5, fontSize: 50}}/>
                </View>
                <Text style={styles.reward}>{Number(this.state.business_data['discount_ex'][config.getToday()]['reward']).toFixed(0)}</Text>
                <Text style={styles.promoLabel}>%</Text>
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

        <View style={[{ flexDirection:'row',justifyContent:'space-between'}, styles.social]}>
          {buttons.map(button => this.renderSocialButton(button))}
        </View>

        <Button full transparent onPress={() => {this._onGoToUrl('website')}}>
          <Text alignItems='center' style={styles.businessWeb}>{this.state.business_data.website}</Text>
        </Button>
			</ScrollView>
		);
	}
}


export default BusinessProfile;
