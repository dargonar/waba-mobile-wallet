import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles/SliderEntry';
import colors from './styles/SliderEntry';
import {avales_colors} from './static/endorsements_const';
import Icon from 'react-native-vector-icons/Ionicons';

export default class SliderEntry extends Component {

    static propTypes = {
        amount       : PropTypes.number,
        amount_txt   : PropTypes.string,
        description  : PropTypes.string,
        _key         : PropTypes.string,
        remaining    : PropTypes.number,
        user_name    : PropTypes.string,
        checked      : PropTypes.bool,
        onTap        : PropTypes.func
    };
    
    _onPressButton(){
      this.props.onTap && this.props.onTap(this.props._key);
    }
    
    render () {
        const { amount, amount_txt, description, _key, remaining, user_name, checked } = this.props;
        const bgcolor_css     = avales_colors[_key];
        const uppercaseTitle  = amount_txt ? (
            <Text style={[styles.title]} numberOfLines={1}>{ amount_txt.toUpperCase() }</Text>) : false;
        const iconSelected    = checked ? (<Icon name="ios-checkmark-circle-outline" size={40} color="#FFFFFF" style={[styles.iconChecked]} />) : null; 
        
        return (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.slideInnerContainer}
              onPress={this._onPressButton.bind(this)}
              >
                <View style={[styles.cardContainer, bgcolor_css]}>
                  <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}> 
                    <View style={{flex:1, alignItems:'flex-start'}}>
                      {iconSelected}
                    </View>
                    <View style={{flex:1, alignItems:'flex-end'}}>
                      <Image source={require('../../wallet/img/logo.rc2.png')} style={[styles.parLogo]} />
                    </View>
                  </View>
                  <View style={{flex:1}}>  
                    <Text style={[styles.title]}>{ uppercaseTitle }</Text>
                  </View>
                  <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}> 
                    <View style={{flex:1, flexDirection:'column'}}>
                      <Text style={[styles.subtitle]}>TITULAR</Text>  
                      <Text style={[styles.content]} numberOfLines={2}>{user_name}</Text>  
                    </View>
                    <View style={{flex:1, flexDirection:'column'}}>
                      <Text style={[styles.subtitle]}>TIPO</Text>  
                      <Text style={[styles.content]} numberOfLines={2}>{ description }</Text>  
                    </View>
                  </View>
                </View>
                <View style={{flex:1, flexDirection:'column'}}>
                  <Text style={[styles.remaining]} numberOfLines={2}>DISPONIBLE(S): { remaining } AVAL(ES)</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
