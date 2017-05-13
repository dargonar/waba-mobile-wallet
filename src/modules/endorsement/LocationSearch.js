import React, { PropTypes, Component } from 'react';
import { SearchBar } from 'react-native-elements'
import { List, ListItem } from 'react-native-elements'
import Geocoder from 'react-native-geocoder';

import {
	ActivityIndicator,
  View,
  ListView,
  StyleSheet,
  ToastAndroid
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from '../wallet/wallet.actions';
import { iconsMap } from '../../utils/AppIcons';
import * as config from '../../constants/config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFF'
  },
  rowText:{
    fontFamily : 'roboto_light',
    fontWeight: '500'
  }
});

class LocationSearch extends Component {
  
  static navigatorStyle = {
    navBarTextFontFamily: 'roboto_thin',
    navBarTextColor: '#ffffff', 
    navBarBackgroundColor: '#2e2f3d', //0B5F83
    navBarButtonColor: '#ffffff'
  }
  
  constructor(props) {
    super(props);
    
		this._onChangeText  = this._onChangeText.bind(this);
    
		let dataSource 			= new ListView.DataSource({
      rowHasChanged : this._rowHasChanged.bind(this)
    });

    this.state = {
      dataSource          : dataSource,
      refreshing          : false,
      recipient_selected  : false,
      next_screen         : props.next_screen,
      with_no_credit      : props.with_no_credit
    };
    
		Geocoder.fallbackToGoogle('AIzaSyCRitgO50RXR78GlCqGunpz-Siz38N1abE');
    this.tid = undefined;
    this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
  }
  
	_onNavigatorEvent(event) { 
  	if (event.id == 'clearAddress') { 
				// this.props.actions.memoSuccess('');
		}
  }
	
  _onChangeText(text) {
    clearTimeout(this.tid);
    let that = this;
    this.tid = setTimeout( () => {
      that.geoSearch(text);       
    }
    , 500);
  }
  
  _rowHasChanged(oldRow, newRow) {
    //console.log('rowHasChanged::', oldRow, '--->', newRow);
    //return true;
    return oldRow.id !== newRow.id;
  }
  
  componentWillMount() {
    this.setState({recipient_selected:false}); 
  }

  componentWillReceiveProps(nextProps) {
  }

  geoSearch(search) {
    console.log('Pedimos');
    this.setState({refreshing:true});
//    0=no filter (all)
//    1=solo sin credito y sin BL
//    2=solo con credito
    
		Geocoder.geocodeAddress(search).then(res => {
    	// res is an Array of geocoding object (see below)
			this.setState({
        dataSource: this.state.dataSource.cloneWithRows(res),
        refreshing: false,
      })
		})
		.catch((err) => {
			this.setState({refreshing:false});
      console.log('Error');
		});
	}

  componentDidMount() {
//     AppState.addEventListener('change', this.handleAppStateChange);
    
  }

  componentWillUnmount() {
//     AppState.removeEventListener('change', this.handleAppStateChange);
  }
  
  focus() {
  }
  
  _onGeoSelected(data){
		console.log(' ---- GEO SELECTED:');
		console.log(JSON.stringify(data));
		
		this.props.navigator.push({
      screen: 'endorsement.LocationMap', // unique ID registered with Navigation.registerScreen
      title: 'Dirección', // title of the screen as appears in the nav bar (optional)
      navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
      animationType: 'slide-down', // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
      rightButtons: [
        {
          icon: iconsMap['md-checkmark'].uri,
          id: 'selectAddress'
        }
      ],
			passProps: {position:data.position},
// 			fab: {
//         collapsedId: 'lockMap',
//         collapsedIcon: iconsMap['ios-locate-outline'].uri,
//         backgroundColor: '#2e2f3d'
//       }
    });
//     if(this.state.recipient_selected)
//       return;
    
//     let next_title = 'Crédito a autorizar';
//     if (this.state.next_screen!='endorsement.SelectEndorseType')
//       next_title = 'Tipo y cantidad de avales';
    
//     this.setState({recipient_selected:true}); 
//     this.props.navigator.push({
//       screen     : this.state.next_screen,
//       title      : next_title,
//       passProps  : {endorsed: data[0]}
//     });
    
  }
		
// 	{
//     position: {lat, lng},
//     formattedAddress: String, // the full address 
//     feature: String | null, // ex Yosemite Park, Eiffel Tower 
//     streetNumber: String | null,
//     streetName: String | null,
//     postalCode: String | null,
//     locality: String | null, // city name 
//     country: String, 
//     countryCode: String
//     adminArea: String | null
//     subAdminArea: String | null,
//     subLocality: String | null
// 	}
        
  renderRow (rowData, sectionID) {
		let data = rowData.formattedAddress + ' | ' + rowData.streetName + ' ' + rowData.streetNumber + ', ' + rowData.locality + ', ' + rowData.country;
		console.log(' ---- GEO RESULT:');
		console.log(JSON.stringify(rowData));
    return (
      <ListItem
        onPress={this._onEndorsedSelected.bind(this, rowData)} 
        underlayColor='#cccccc'
        key={sectionID}
        title={data}
        titleStyle={styles.rowText}
        fontFamily={'roboto_thin'}
        hideChevron={true}
        chevronColor={'transparent'}
      />
    );
  }
  
  //renderRow={this.renderRow}
  render() {
    //console.log(this.state.dataSource);
    
    let content = undefined;
    if ( this.state.refreshing )
      content = ( 
        <View style={{ flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#0B5F83" />
        </View>
      )
    else
      content = ( 
        <List>
          <ListView
            renderRow={(rowData, sectionID) => <ListItem
                                      onPress={this._onGeoSelected.bind(this, rowData)} 
                                      underlayColor='#cccccc'
                                      key={sectionID}
                                      title={rowData.formattedAddress}
                                    />}
            dataSource={this.state.dataSource}
            enableEmptySections={true}
          />
        </List>
      )
    
    return (
      
      <View style={styles.container}>
        <SearchBar
          lightTheme
          onChangeText={this._onChangeText}
          autoFocus={true}
          ref={(searchBar) => this.searchBar = searchBar} 
          placeholderStyle={{}}
          inputStyle={{color:'#000000', textDecorationLine :'none'}}
          placeholder='Ingrese dirección...' 
					placeholderTextColor="#999999"
          underlineColorAndroid ="transparent"
        />
        {content}
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(walletActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(LocationSearch);
