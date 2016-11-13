/**
 * @flow
 */

'use strict';

var UWMain = require('./UWMain');
var UWDetail = require('./UWDetail');
var UWSideMenu = require('./UWSideMenu');
var UWBarcode = require('./UWBarcode');
var PushedScreen = require('./PushedScreen');


//var FacebookSDK = require('FacebookSDK');
//var Parse = require('parse/react-native');
var React = require('React');

var { Provider } = require('react-redux');
var { connect } = require('react-redux');

var apollo = require('./store/apollo');
var configureStore = require('./store/configureStore');

import {Navigation} from 'react-native-navigation';

require('../shim');
var {Apis} = require("graphenejs-ws");
var {ChainStore} = require("graphenejs-lib");

let dynamicGlobal = null;
function updateState(updated_objects) {
  //updated_objects = updated_objects || [];
  if(updated_objects) {
    updated_objects[0].forEach(function(r) {
      console.log('--------------------------------');
      console.log(r.id);
      console.log('--------------------------------');
    });
  }  
}

var { iconsMap, iconsLoaded } = require('./app-icons');

function setup() {
  iconsLoaded.then(() => {
    
    console.log(iconsMap);
    startApp();
    
  });
}

function startApp() {
  
  var store = configureStore( () => {} );

  var StyledScreen = require('./StyledScreen');
  
  Navigation.registerComponent('uw.main', () => StyledScreen, store, Provider)
  Navigation.registerComponent('uw.sidemenu', () => UWSideMenu, store, Provider );
  Navigation.registerComponent('uw.pushed', () => PushedScreen, store, Provider )

  Navigation.startSingleScreenApp({
   screen: {
     screen: 'uw.main',
//     title: 'Principal',
     navigatorStyle: {
       //navBarBackgroundColor: '#4dbce9',
       //collapsingToolBarImage: require('./img/bg-dashboard.png'),
       navBarTextColor: '#ffffff',
       //navBarSubtitleTextColor: '#ff0000',
       navBarButtonColor: '#ffffff',
       //navBarTranslucent: true,
       //statusBarTextColorScheme: 'light'
       //navBarNoBorder: true,
       drawUnderNavBar : true,
       navBarTransparent: true
     }
   },
   drawer: {
     left: {
       screen: 'uw.sidemenu',
       //color: '#ffffff',
       icon: iconsMap['ios-person--active'],
       color: '#ffffff',
       navBarButtonColor: '#ffffff',
     },
     color: '#ffffff',
     icon: iconsMap['ios-person--active'],
     navBarButtonColor: '#ffffff',
    
   }
    
  });

  
  
}

function setup2() {

  Apis.instance("ws://35.161.140.21:8090/", true).init_promise.then((res) => {
      console.log("connected to:", res[0].network);
      ChainStore.init(Apis).then(() => {
          ChainStore.subscribe(updateState);
          //ChainStore.getAccount("elmato");
//           ChainStore.FetchChain("getAccount","elmato").then(function(r) {
//             console.log('Aca esta el FetchChain =>', JSON.stringify(r));
//           });
      });
  });


  var store = configureStore( () => {} );
    
  Navigation.registerComponent('uw.main', () => UWMain, store, Provider);
  Navigation.registerComponent('uw.detail', () => UWDetail, store, Provider);
  Navigation.registerComponent('uw.sidemenu', () => UWSideMenu, store, Provider);
  Navigation.registerComponent('uw.barcode', () => UWBarcode, store, Provider);
  Navigation.registerComponent('uw.pushed', () => PushedScreen, store, Provider);

  Navigation.startSingleScreenApp({
   screen: {
     screen: 'uw.main',
     title: 'Principal',
     navigatorStyle: {
       navBarBackgroundColor: '#4dbce9',
       //collapsingToolBarImage: require('./img/bg-dashboard.png'),
       navBarTextColor: '#ffffff',
       navBarSubtitleTextColor: '#ff0000',
       navBarButtonColor: '#ffffff',
       navBarTranslucent: true,
       statusBarTextColorScheme: 'light'
     }
   },
   drawer: {
     left: {
       screen: 'uw.sidemenu'
     }
   }
  });


}

module.exports = setup;
