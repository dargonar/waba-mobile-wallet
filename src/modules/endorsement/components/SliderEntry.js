import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles/SliderEntry';
import colors from './styles/SliderEntry';

export default class SliderEntry extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string,
        illustration: PropTypes.string,
        bgcolor: PropTypes.string
    };

    render () {
        const { title, subtitle, illustration, bgcolor } = this.props;
        const bgcolors = {'I':colors.avalI_bg, 'X':colors.avalX_bg, 'XXX':colors.avalXXX_bg};
        const bgcolor_css = bgcolors[bgcolor];
        const uppercaseTitle = title ? (
            <Text style={[styles.title]} numberOfLines={2}>{ title.toUpperCase() }</Text>
        ) : false;

        // onPress={() => { alert(`You've clicked '${title}'`); }}
//         <Image
//                       source={{ uri: illustration }}
//                       style={styles.image}
//                     />
      // <View style={[styles.radiusMask]} />                </View>
        return (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.slideInnerContainer}
              >
                <View style={[styles.imageContainer, bgcolor_css]}>
                    <View style={[styles.textContainer]}>
                      { uppercaseTitle }
                      <Text style={[styles.subtitle]} numberOfLines={2}>{ subtitle }</Text>
                  </View>
                </View>
            </TouchableOpacity>
        );
    }
}
