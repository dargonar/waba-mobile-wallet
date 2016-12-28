/* eslint-disable new-cap */
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// define your suffixes by yourself..
// here we use active, big, small, very-big..
const replaceSuffixPattern = /--(active|big|small|very-big)/g;
const icons = {
  "ios-arrow-round-up" : [30, "#fff"],
  "ios-add" : [30, "#fff"],
  "ios-backspace" : [30, "#fff"],

  "ios-person": [30, "#bbb"],
  "ios-person--big": [50, "#bbb"],

  "ios-person--active": [30, "#fff"],
  "ios-person--active--big": [50, "#fff"],
  "ios-person--active--very-big": [100, "#fff"],
  
  "ios-people": [30, "#bbb"],
  "ios-people--active": [30, "#fff"],

  "ios-keypad": [30, "#bbb"],
  "ios-keypad--active": [30, "#fff"],

  "ios-chatbubbles": [30, "#bbb"],
  "ios-chatbubbles--active": [30, "#fff"],
  
  "logo-usd": [30, "#bbb"],
  "logo-usd--active": [30, "#fff"],
   
  "ios-backspace": [30, "#bbb"],
  "ios-backspace--active": [30, "#fff"],
  
  "ios-attach": [30, "#ffffff"],
  "ios-attach--active": [30, "#ffffff"],
  
  "ios-trash-outline": [30, "#ffffff"],
  "ios-trash-outline--active": [30, "#fff"],
  
  "ios-add": [30, "#ffffff"],
  "ios-add--active": [30, "#fff"],
  
  "ios-information-circle": [30, "#ffffff"],
  "ios-information-circle--active": [30, "#ffffff"],
  // Use other Icon provider, see the logic at L39
  "facebook": [30, "#bbb", FontAwesome],
  "facebook--active": [30, "#fff", FontAwesome],
  
  "qrcode": [25, "#fff", FontAwesome],
  "qrcode--active": [25, "#fff", FontAwesome],
  
//   "ios-swap": [30, "#ffffff"],
  "ios-swap": [30, "#1f475b"],
  
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