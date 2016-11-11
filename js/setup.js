/**
 * @flow
 */

'use strict';

var UWMain = require('./UWMain');
var UWDetail = require('./UWDetail');
var UWSideMenu = require('./UWSideMenu');
var UWBarcode = require('./UWBarcode');

//var FacebookSDK = require('FacebookSDK');
//var Parse = require('parse/react-native');
var React = require('React');

var { Provider } = require('react-redux');
var { connect } = require('react-redux');

var apollo = require('./store/apollo');
var configureStore = require('./store/configureStore');

// import {
//     Router,
//     Scene,
//     Actions,
//     Header,
//     ActionConst,
// } from 'react-native-router-flux';

//var {serverURL} = require('./env');

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
  //console.log(' updateState...', JSON.stringify(updated_objects) );
  //   console.log('param =>', JSON.stringify(object));
// //console.log();
  //dynamicGlobal = ChainStore.getObject("2.1.0");
  //console.log("ChainStore object update\n", dynamicGlobal ? dynamicGlobal.toJS() : dynamicGlobal);
}


function setup() {

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


// function setup(): React.Component {
//   console.disableYellowBox = true;
//   //Parse.initialize('oss-f8-app-2016');
//   //Parse.serverURL = `${serverURL}/parse`;

//   //FacebookSDK.init();
//   //Parse.FacebookUtils.init();
  
//   // const CUWMain = connect()(UWMain);
//   // const CUWDetail = connect()(UWDetail);

//   // const Scenes = Actions.create(
//   //   <Scene key="root">
//   //     <Scene key="main" component={CUWMain} navigationBarStyle={{backgroundColor: 'green', borderBottomColor: 'green'}} />
//   //     <Scene key="detail" type={ActionConst.PUSH} component={CUWDetail} />
//   //   </Scene>
//   // );

//   //const CRouter = connect()(Router);

//   class Root extends React.Component {
//     constructor() {
//       super();
//       this.state = {
//         isLoading : true,
//         store     : configureStore(() => this.setState({isLoading : false})),
//         client    : apollo,
//       };
//     }
//     render() {
//       if (this.state.isLoading) {
//         return null;
//       }
//       return (
//         <Provider store={this.state.store} client={this.state.client}>
          
//         </Provider>
//       );
//     }
//   }

//   return Root;
// }

//global.LOG = (...args) => {
//  console.log('/------------------------------\\');
//  console.log(...args);
//  console.log('\\------------------------------/');
//  return args[args.length - 1];
//};

module.exports = setup;
