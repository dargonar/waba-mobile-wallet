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

// var PAGES = [
//   [require('../img/logo.shadow.png'), 'Bienvenido', 'Una nueva forma de comprar'],
//   [require('../img/bank.png'), 'Desde tu teléfono', 'Recibí los puntos de recompensa directamente en tu smartphone'],
//   [require('../img/shop.png'), 'Miles de comercios', 'Localizá los miles de productos y servicios ofrecidos en la red'],
//   [require('../img/discover.png'), 'Pago móvil', 'Descubre las ofertas del día cerca tuyo y paga desde tu smartphone']
// ];

var PAGES = [
  [require('../img/logo.shadow.png'), 'BIENVENIDO', 'Con Discoin ganás dinero comprando: cada D$C acumulado vale un PESO.'],
  [require('../img/shop.png'), 'ELEGÍ TU BENEFICIO', 'Los comercios te ofrecen dos tipos de %: +recompensa y -descuento. Vos elegís el que más te conviene.'],
  [require('../img/abajo_naranja.png'), 'GANÁ DINERO COMPRANDO', 'Si elegís la recompensa, recibirás un % de la compra en D$C, que se acreditará en la app.'],
  [require('../img/arriba_azul.png'), 'PAGÁ CON DISCOINS', 'Si ya tenés D$C y decidís usarlos, podrás pagar una parte en pesos y una parte en D$C!'],
  [require('../img/discover.png'), 'EMPEZA AHORA!', 'Descubrí en la app tus comercios favoritos y empezá a COMPRAR MAS GASTANDO MENOS!']
];

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
          style={{width: '100%', height: 180, marginBottom:0}}
        />
        <Text style={styles.titleText}>{data[1]}</Text>
        <Text style={styles.tagLine}>{data[2]}</Text>

      </View>
    );
  },

  _onChangePage: function(
    page: number | string
  ) {
    // notifyMessage('Current page: ' + page);
    // ToastAndroid.show(page.toString(), ToastAndroid.SHORT)
    if((page+1)==PAGES.length && typeof this.props.onEnd === "function") {
      this.props.onEnd();
      
    }
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
      color:"#777",
      textAlign:'center',
      fontFamily : 'Montserrat-Medium',
      fontWeight : '100',
      fontSize   : 16,
      lineHeight : 20,
      paddingRight: 40,
      paddingLeft: 40,

  }
});

module.exports = ImagesScreen;
