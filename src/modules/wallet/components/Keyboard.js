import React, { PropTypes, Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles, {
    keyStyle, BG_COLOR
} from './styles/Keyboard';

import { iconsMap } from '../../../utils/AppIcons';

const numberKeys = [
    [
        {mainText: '1', otherText: ''},
        {mainText: '2', otherText: 'ABC'},
        {mainText: '3', otherText: 'DEF'}
    ],
    [
        {mainText: '4', otherText: 'GHI'},
        {mainText: '5', otherText: 'JKL'},
        {mainText: '6', otherText: 'MNO'}
    ],
    [
        {mainText: '7', otherText: 'PQRS'},
        {mainText: '8', otherText: 'TUV'},
        {mainText: '9', otherText: 'WXYZ'}
    ]
];


class Keyboard extends React.Component {

    constructor(props) {
        super(props);
    }

    _clearAll() {
       this.props.onClear();
    }

    _onPress(key) {
        if (key === '') {
            return;

        // delete key
        } else if (key === 'del') {
            this.props.onDelete();

        // number key
        } else {
            this.props.onKeyPress(key);
        }
    }

    _renderKey(key, index) {
        return (
            <TouchableHighlight
                key={index}
                underlayColor={BG_COLOR}
                style={keyStyle.wrapper}
                onPress={ this._onPress.bind(this, key.mainText) }
            >
                <View style={keyStyle.bd}>
                    <Text style={keyStyle.mainText}>{key.mainText}</Text>

                </View>
            </TouchableHighlight>
        );
    }
    // <Text style={keyStyle.otherText}>{key.otherText}</Text>
    _renderNumberKeys() {
        return numberKeys.map((group, groupIndex) => {
            return (
                <View key={groupIndex} style={styles.row}>
                    {group.map(this._renderKey.bind(this))}
                </View>
            );
        });
    }

    _isDecimalPad() {
        return this.props.keyboardType === 'decimal-pad';
    }

    _renderDotKey() {
        let dotNode = null, dotText = '';
        if (this._isDecimalPad()) {
            dotText = '.';
            dotNode = <Text style={[keyStyle.mainText, keyStyle.dot]}>.</Text>;
        }
        return (
            <TouchableHighlight
                underlayColor="#ffffff"
                style={[keyStyle.wrapper, keyStyle.bg_d2d5dc]}
                onPress={this._onPress.bind(this, dotText)}
            >
                <View style={keyStyle.bd}>{dotNode}</View>
            </TouchableHighlight>
        );
    }

    ////style={styles.mainText}

    render() {
        let props = this.props;
        const iconBackspace = (<Icon name="ios-backspace" size={26} color="#ccc" />);
        return (
            <View style={styles.wrapper}>

              <View style={styles.main}>

                    {this._renderNumberKeys()}

                    <View style={styles.row}>
                        {this._renderDotKey()}

                        <TouchableHighlight
                            underlayColor={'red'}
                            style={[keyStyle.wrapper, keyStyle.bottomBordered]}
                            onPress={ this._onPress.bind(this, '0') }>
                            <View style={keyStyle.bd}>
                                <Text style={keyStyle.mainText}>0</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight
                            underlayColor="#ffffff"
                            style={[keyStyle.wrapper, keyStyle.bg_d2d5dc]}
                            onPress={  this._onPress.bind(this, 'del') }
                            onLongPress={this._clearAll.bind(this)}
                        >
                            <View style={keyStyle.bd}>
                              {iconBackspace}
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
}


Keyboard.propTypes = {
    // 是否显示小数点符号
    keyboardType :   PropTypes.oneOf(['number-pad', 'decimal-pad']),
    // 点击键盘按键
    onKeyPress   :   PropTypes.func,
    // 点击删除按钮
    onDelete     :   PropTypes.func,
    // 长按删除按钮
    onClear      :   PropTypes.func
};


Keyboard.defaultProps = {
    keyboardType :   'number-pad',
    onKeyPress   :   () => {},
    onDelete     :   () => {},
    onClear      :   () => {}
};


export default Keyboard;
