import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import styles from './styles/SliderEntry';
import colors from './styles/SliderEntry';

export default class SliderEntryMin extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        bgcolor: PropTypes.string
    };

    render () {
        const { title, subtitle, bgcolor } = this.props;
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
                  <View style={{flex:1, flexDirection:'column'}}>
                      <Text style={[styles.subtitle]}>TIPO</Text>  
                      <Text style={[styles.content]} numberOfLines={2}>{ subtitle }</Text>  
                  </View>
                  <View style={{flex:1, flexDirection:'column'}}>
                      <Text style={[styles.subtitle]}>CANTIDAD</Text>  
                      <TextInput style={{fontSize:12, underlineColorAndroid:'#575863', height: 40, color:'#fff', placeholderTextColor:'#cccccc', backgroundColor:'#575863'}}
                        keyboardType='numeric'
                        placeholder='Cantidad'
                      />
                  </View>
                </View>
            </TouchableOpacity>
        );
    }
}
