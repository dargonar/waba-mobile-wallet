'use strict';

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ToastAndroid,
  Platform,
  AlertIOS,
  Image
} from 'react-native';

var ViewPager = require('react-native-viewpager');
//var ViewPager = require('./ViewPager');
var deviceWidth = Dimensions.get('window').width;

var PAGES = [
  'Page 0',
  'Page 1',
  'Page 2',
  'Page 3',
  'Page 4',
];

var PAGES = [
  [require('../img/logo.shadow.png'), 'Bienvenido', 'Una nueva forma de comprar'],
  [require('../img/bank.png'), 'Desde tu teléfono', 'Recibí los puntos de recompensa directamente en tu smartphone'],
  [require('../img/shop.png'), 'Miles de comercios', 'Localizá los miles de productos y servicios ofrecidos en la red'],
  [require('../img/discover.png'), 'Pago móvil', 'Descubre las ofertas del día cerca tuyo y paga desde tu smartphone']
];

// var IMGS = [
//   'https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024',
//   'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024',
//   'https://images.unsplash.com/photo-1441448770220-76743f9e6af6?h=1024',
//   'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
//   'https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024',
//   'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024',
//   'https://images.unsplash.com/photo-1440847899694-90043f91c7f9?h=1024'
// ];

function notifyMessage(msg: string) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT)
  } else {
    AlertIOS.alert(msg);
  }
}

var ImagesScreen = React.createClass({
  getInitialState: function() {
    var dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });

    return {
      dataSource: dataSource.cloneWithPages(PAGES),
    };
  },

  // this.props.style ||
  render: function() {
    return (
      <ViewPager
        style={styles.viewpager}
        dataSource={this.state.dataSource}
        renderPage={this._renderPage}
        onChangePage={this._onChangePage}
        isLoop={false}
        autoPlay={false}/>
    );
  },

//   source={require(data)}
//   source={{uri: data}}
//   style={styles.page}
  // <Text style={styles.text}>Page {pageID}</Text>
  _renderPage: function(
    data: Object,
    pageID: number | string,) {
    return (
      <View style={styles.page}>
        <Image
          source={data[0]}
          style={{width: '100%', height: 180, marginBottom:20}}
        />
        <Text style={styles.titleText}>{data[1]}</Text>
        <Text style={styles.tagLine}>{data[2]}</Text>

      </View>
    );
  },

  _onChangePage: function(
    page: number | string
  ) {
//     notifyMessage('Current page: ' + page);
  },

});

/*
DISCOIN COLORS
  >  #f15d44
  > rgb(241, 93, 68)
*/
var styles = StyleSheet.create({
  viewpager:{
    flex:4,
    flexDirection: 'column'
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', //0B5F83

  },
  titleText: {
        color:"#ff7232",
        textAlign:'center',
        fontFamily : 'Montserrat-Light',
        fontWeight : '100',
        fontSize   : 25,
        lineHeight : 35,
        marginBottom:20
  },
	tagLine:{
      color:"#999",
      textAlign:'center',
      fontFamily : 'Montserrat-Regular',
      fontWeight : '100',
      fontSize   : 14,
      lineHeight : 20,
      paddingRight: 40,
      paddingLeft: 40,

  }
});

module.exports = ImagesScreen;
