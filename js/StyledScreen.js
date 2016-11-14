import React, {Component} from 'react';
import {
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';



var UWOperations = require('UWOperations');

import Icon from 'react-native-vector-icons/Ionicons';
// const myButton = (
//   <Icon.Button name="facebook" backgroundColor="#3b5998">
//     Login with Facebook
//   </Icon.Button>
// );

var { iconsMap, iconsLoaded } = require('./app-icons');

//console.log('Mira el que uso =>', iconsMap['ios-person--active'].uri);

class StyledScreen extends Component {
  
//   static navigatorStyle = {
//     drawUnderNavBar: true,
//     navBarTranslucent: true,
//     navBarNoBorder: true
//   };

    //statics : {

    static navigatorButtons = {
//       rightButtons: [
//         {
//           icon: iconsMap['ios-person--active'],
//           id: 'add'
//         }
//       ],
      
      fab: {
        collapsedId: 'new-transfer',
        collapsedIcon: iconsMap['ios-add'],
        backgroundColor: '#415261'
      }
      
  
    };

  
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if(event.id == 'new-transfer') {
      this.props.navigator.push({
        screen: 'uw.pushed',
        title: 'Pushed Screen'
      });

      return;
    }
    console.log('onNavigatorEvent::', event.id);
//     if(event.id == 'add') {
//       this.props.navigator.showContextualMenu(
//         {
//           rightButtons: [
//             {
//               title: 'Add',
//               icon: iconsMap['ios-keypad']
//             },
//             {
//               title: 'Delete',
//               icon: iconsMap['facebook']
//             }
//           ],
//           onButtonPressed: (index) => console.log('Button ${index} tapped')
//         }
//       );
//     }
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
  
        <Image source={require('./img/bg-dashboard.png')} style={styles.img_container}>
            <View style={{flexDirection:'row'}}> 
              <Text style={styles.balance}>-50000.</Text>
              <Text style={styles.decimal}>00</Text>
            </View>
            
            <Text style={styles.text}>NOSOTROS</Text>
        </Image>      
        <UWOperations {...this.props} />

      </View>
     );
  }
}

var styles = {
  text : {
    fontFamily: 'roboto_thin',
    color: '#ccc',
    fontSize: 16
  },
  balance : {
    fontFamily: 'serif',
    //fontWeight: 'bold',
    color: '#d8ef27',
    fontSize: 32
  },
  decimal : {
    fontFamily: 'roboto_regular',
    //fontWeight: 'bold',
    color: '#d8ef27',
    lineHeight: 35,
    fontSize: 16
  },

  balance : {
    fontFamily: 'Roboto',
///    fontWeight: 'bold',
    color: '#d8ef27',
    fontSize: 28
  },
  img_container: {
    flex: 2,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  }
}
module.exports = StyledScreen;
