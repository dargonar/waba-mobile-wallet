import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import styles from './styles/SliderEntry';
import colors from './styles/SliderEntry';
import avales_colors from './static/endorsements'

export default class SliderEntryMin extends Component {

    static propTypes = {
        amount_txt   : PropTypes.string,
        key          : PropTypes.string,
    };

    render () {
        const { amount_txt, key } = this.props;
        const bgcolor_css = avales_colors[key];
        const uppercaseTitle = amount_txt ? (
            <Text style={[styles.title]} numberOfLines={1}>{ amount_txt.toUpperCase() }</Text>
        ) : false;

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
                </View>
            </TouchableOpacity>
        );
    }
}
