/* eslint-disable new-cap */
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
  PixelRatio
} from 'react-native';
//const ICON_SIZE_ANDROID     = __DEV__ ? 30 : PixelRatio.getPixelSizeForLayoutSize(30);
//const ICON_SIZE_ANDROID_25  = __DEV__ ? 25 : PixelRatio.getPixelSizeForLayoutSize(25);
//const ICON_SIZE_ANDROID_BIG = __DEV__ ? 50 : PixelRatio.getPixelSizeForLayoutSize(50);

const ICON_SIZE_ANDROID     = 30;// : PixelRatio.getPixelSizeForLayoutSize(30);
const ICON_SIZE_ANDROID_25  = 25;// : PixelRatio.getPixelSizeForLayoutSize(25);
const ICON_SIZE_ANDROID_BIG = 50;// : PixelRatio.getPixelSizeForLayoutSize(50);

// define your suffixes by yourself..
// here we use active, big, small, very-big..
const replaceSuffixPattern = /--(active|big|small|very-big)/g;
const icons = {
  "ios-locate-outline": [ICON_SIZE_ANDROID, "#fff"],
  "ios-card-outline": [ICON_SIZE_ANDROID, "#fff"],
  "ios-help": [ICON_SIZE_ANDROID, "#fff"],
  "ios-card": [ICON_SIZE_ANDROID, "#fff"],
  "ios-ribbon-outline": [ICON_SIZE_ANDROID, "#fff"],
  "ios-share-alt-outline" : [ICON_SIZE_ANDROID, "#fff"],
  "ios-checkmark-circle-outline" : [ICON_SIZE_ANDROID, "#fff"],
  "md-checkmark" : [ICON_SIZE_ANDROID, "#fff"],
  "ios-checkmark" : [ICON_SIZE_ANDROID, "#fff"],
  // fa-id-card-o, fa-id-card, fa-address-card-o, fa-address-card
  "id-card-o": [ICON_SIZE_ANDROID, "#fff", FontAwesome],
  "credit-card": [ICON_SIZE_ANDROID, "#fff", FontAwesome],
  "handshake-o": [ICON_SIZE_ANDROID, "#fda720", FontAwesome],
  "ios-arrow-round-up" : [ICON_SIZE_ANDROID, "#fff"],
  "ios-arrow-down-outline" : [ICON_SIZE_ANDROID, "#fff"],
  
  "ios-add-circle-outline": [ICON_SIZE_ANDROID_BIG, "#fff"],
  "ios-add" : [ICON_SIZE_ANDROID, "#fff"],
  
  "ios-backspace" : [ICON_SIZE_ANDROID, "#fff"],

  "ios-person": [ICON_SIZE_ANDROID, "#bbb"],
  "ios-person--big": [50, "#bbb"],

  "ios-person--active": [ICON_SIZE_ANDROID, "#fff"],
  "ios-person--active--big": [50, "#fff"],
  "ios-person--active--very-big": [100, "#fff"],
  
  "ios-people": [ICON_SIZE_ANDROID, "#bbb"],
  "ios-people--active": [ICON_SIZE_ANDROID, "#fff"],

  "ios-keypad": [ICON_SIZE_ANDROID, "#bbb"],
  "ios-keypad--active": [ICON_SIZE_ANDROID, "#fff"],

  "ios-chatbubbles": [ICON_SIZE_ANDROID, "#bbb"],
  "ios-chatbubbles--active": [ICON_SIZE_ANDROID, "#fff"],
  
  "logo-usd": [ICON_SIZE_ANDROID, "#bbb"],
  "logo-usd--active": [ICON_SIZE_ANDROID, "#fff"],
   
  "ios-backspace": [ICON_SIZE_ANDROID, "#bbb"],
  "ios-backspace--active": [ICON_SIZE_ANDROID, "#fff"],
  
  "ios-attach": [ICON_SIZE_ANDROID, "#ffffff"],
  "ios-attach--active": [ICON_SIZE_ANDROID, "#ffffff"],
  
  "ios-trash-outline": [ICON_SIZE_ANDROID, "#ffffff"],
  "ios-trash-outline--active": [ICON_SIZE_ANDROID, "#fff"],
  
  "ios-add": [ICON_SIZE_ANDROID, "#ffffff"],
  "ios-add--active": [ICON_SIZE_ANDROID, "#fff"],
  
  "ios-information-circle": [ICON_SIZE_ANDROID, "#ffffff"],
  "ios-information-circle--active": [ICON_SIZE_ANDROID, "#ffffff"],
  // Use other Icon provider, see the logic at L39
  "facebook": [ICON_SIZE_ANDROID, "#bbb", FontAwesome],
  "facebook--active": [ICON_SIZE_ANDROID, "#fff", FontAwesome],
  
  "qrcode": [ICON_SIZE_ANDROID_25, "#fff", FontAwesome],
  "qrcode--active": [ICON_SIZE_ANDROID_25, "#fff", FontAwesome],
  
//   "ios-swap": [ICON_SIZE_ANDROID, "#ffffff"],
  "ios-swap": [ICON_SIZE_ANDROID, "#1f475b"],
  "ios-key" : [ICON_SIZE_ANDROID, "#1f475b"],
  
}

const defaultIconProvider = Ionicons;

let iconsMap = {};

function getIcon(name) {
  return iconsMap[name];
}

let iconsLoaded = new Promise((resolve, reject) => {
  new Promise.all(
    Object.keys(icons).map(iconName => {
      const Provider = icons[iconName][2] || defaultIconProvider; // Ionicons
      return Provider.getImageSource(
        iconName.replace(replaceSuffixPattern, ''),
        icons[iconName][0],
        icons[iconName][1]
      )
    })
  ).then(sources => {
    Object.keys(icons)
      .forEach((iconName, idx) => iconsMap[iconName] = sources[idx])

    // Call resolve (and we are done)
    resolve(true);
  })
});

export {
    iconsMap,
    iconsLoaded
};