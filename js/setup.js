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

function setup() {

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
       navBarTextColor: '#ffffff',
       navBarSubtitleTextColor: '#ff0000',
       navBarButtonColor: '#ffffff',
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
