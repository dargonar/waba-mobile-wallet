'use strict';

import {StyleSheet} from 'react-native';

const hairlineWidth = StyleSheet.hairlineWidth;

export const BG_COLOR = '#546979'; //'#d2d5dc';


export default StyleSheet.create({
    wrapper: {
        flex:4,
        flexDirection: 'row',
        backgroundColor: '#f4f4f4'
    },
    main: {
        flex: 1,
        alignSelf: 'flex-end',
        flexDirection: 'column'
    },
    row: {
      flex: 1,
      flexDirection: 'row'
    }
});


export let keyStyle = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    bd: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: hairlineWidth,
        borderTopWidth: hairlineWidth,
        borderColor: '#f5f9fd'
    },
    mainText: {
        fontFamily : 'Montserrat-Regular',
        fontWeight: '100',
        fontSize: 20,
        color: '#666'
    },
    otherText: {
        fontSize: 10,
        color: '#666',
    },
    bg_d2d5dc: {
        backgroundColor: '#f5f9fd',//BG_COLOR,
    },
    bottomBordered:{
      borderBottomWidth: hairlineWidth,
      borderColor: '#f0f4f7'
    },
    dot: {
        height: 30,
        fontSize: 30,
        lineHeight: 25
    }
});
