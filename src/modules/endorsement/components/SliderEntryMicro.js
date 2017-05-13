import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import styles from './styles/SliderEntry';
import colors from './styles/SliderEntry';
import {avales_colors} from './static/endorsements_const'

export default class SliderEntryMicro extends Component {

    static propTypes = {
        amount       : PropTypes.number,
        amount_txt   : PropTypes.string,
        description  : PropTypes.string,
        _key         : PropTypes.string,
        quantity     : PropTypes.number,
        user_name    : PropTypes.string,
        quantity_or_tipo    : PropTypes.string,
    };

    render () {
        const { amount, amount_txt, description, _key, quantity, user_name, quantity_or_tipo } = this.props;
        const bgcolor_css = avales_colors[_key];
        const uppercaseTitle = amount_txt ? (
            <Text style={[styles.title]} numberOfLines={1}>{ amount_txt.toUpperCase() }</Text>
        ) : false;
        let _title   = 'CANTIDAD';
        let _data  = quantity;
        if (quantity_or_tipo=='tipo'){
          _title   = 'TIPO';
          _data  = description;
        }
        return (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.slideInnerContainer}
              >
                <View style={[styles.cardContainer, bgcolor_css]}>
                  <View style={{flex:1, alignItems:'flex-end'}}>
                    <Image source={require('../../wallet/img/logo.rc2.png')} style={[styles.parLogo]} />
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
                      <Text style={[styles.subtitle]}>{_title}</Text>  
                      <Text style={[styles.content]} numberOfLines={2}>{_data}</Text>
                    </View>
                  </View>
                </View>
            </TouchableOpacity>
        );
    }
}
