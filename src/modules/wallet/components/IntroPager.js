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

// [require('../img/logo.shadow.png'), 'Bienvenido a PAR', 'Una nueva forma de dinero'],
var PAGES = [
  [require('../img/waba.png'), '', 'Powered by Blockchain, driven by Communities', 'img_bold'],
  [require('../img/bank.png'), 'Dinero digital', 'Siempre disponible, seguro y accesible desde tu teléfono, sin cuenta de banco', 'img_thin'],
  [require('../img/shop.png'), 'Economías más fuertes', 'Las monedas locales conectan recursos disponibles con necesidades insatisfechas de la comunidad', 'img_thin'],
  [require('../img/discover.png'), 'Conecciones locales', 'Las monedas locales crean conexiones entre las personas, aumentando la cooperación y fomentando proyectos sociales', 'img_thin']  
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
			let img_style = (data[3]=='img_bold')?styles.img_bold:styles.img_thin;
    	return (
				<View style={styles.page}>
					<Image
						resizeMode='contain'
						source={data[0]}
						style={styles.img_bold}
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

var styles = StyleSheet.create({
  viewpager:{
    flex:4,
    flexDirection: 'column'
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingLeft:20,
    paddingRight:20
  },
	img_bold: {
    width: 300,
    height: 120,
		marginBottom:20
  },
	img_thin: {
    width: 150,
    height: 150,
		marginBottom:20
  },
  titleText: {
        color:"#014372", 
        textAlign:'center',
        fontFamily : 'roboto_light',
        fontWeight : '100',
        fontSize   : 30,
        lineHeight : 35,
        marginBottom:20
  },
	tagLine:{
      color:"#014372", 
      textAlign:'center',
      fontFamily : 'roboto_light',
      fontWeight : '100',
      fontSize   : 20,
      lineHeight : 20
  }
});

module.exports = ImagesScreen;