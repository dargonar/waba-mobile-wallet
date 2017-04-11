import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles/SliderEntry';
import colors from './styles/SliderEntry';

export default class SliderEntry extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string,
        illustration: PropTypes.string,
        bgcolor: PropTypes.string,
        remaining: PropTypes.number
    };

    render () {
        const { title, subtitle, illustration, bgcolor, remaining } = this.props;
        const bgcolors = {'I':colors.avalI_bg, 'X':colors.avalX_bg, 'XXX':colors.avalXXX_bg};
        const bgcolor_css = bgcolors[bgcolor];
        const uppercaseTitle = title ? (
            <Text style={[styles.title]} numberOfLines={2}>{ title.toUpperCase() }</Text>
        ) : false;

        // onPress={() => { alert(`You've clicked '${title}'`); }}

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
                      <Text style={[styles.content]} numberOfLines={2}>-username-</Text>  
                    </View>
                    <View style={{flex:1, flexDirection:'column'}}>
                      <Text style={[styles.subtitle]}>TIPO</Text>  
                      <Text style={[styles.content]} numberOfLines={2}>{ subtitle }</Text>  
                    </View>
                  </View>
                </View>
                <View style={{flex:1, flexDirection:'column'}}>
                  <Text style={[styles.remaining]} numberOfLines={2}>DISPONIBLE: { remaining } AVAL(ES)</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
