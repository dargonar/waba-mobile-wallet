import React, { PropTypes, Component } from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-elements';

import styles from './styles/SelectAmount';

import Keyboard from './components/Keyboard';

class SelectAmount extends React.Component {
  
  static navigatorStyle = {
    navBarTextColor: '#ffffff', 
    navBarBackgroundColor: '#1f475b',
    navBarButtonColor: '#ffffff'
  }
  
  constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    componentDidMount() {
//         model.onChange((model) => {
//             this.setState({text: model.getKeys().join('')});
//         });
    }

    _handleClear(){
      this.setState({
        text : ''
      });
    }

    _handleDelete(){
      if (this.state.text.length==0)
        return;
      let new_string = this.state.text.substring(0, this.state.text.length-1);
      this.setState({
        text : new_string
      });
    }

    _handleKeyPress(key){
      
      if('0123456789'.indexOf(key)>=0)
      {
        if (this.state.text=='0' && key=='0')
          return;
        if (this.state.text=='0' && key!='0')
        {
          this.setState({
            text : key  
          });
          return;
        } 
      }
      if (this.state.text.length==1 && key=='0')
        return;
      
      if((key==',' || key=='.') && this.state.text.indexOf(key)>=0)
        return;
      
      if((key==',' || key=='.') && this.state.text.length==0)
      {
        this.setState({
          text : '0'+key
        });
        return;
      }
      this.setState({
        text : this.state.text+key  
      });
    }
    
    _onNext(){
      
    }
/*
import { FormLabel, FormInput } from 'react-native-elements'

<FormLabel>Name</FormLabel>
<FormInput onChangeText={someFunction}/>
*/
//onPress={this._onPressButton}
    render() {
        const iconMoney = (<Icon name="logo-usd" size={26} color="#9F9F9F" style={{textAlign:'center', textAlignVertical:'center', flex:1 }} />);
        return (
            <View style={{flex: 1, backgroundColor:'#fff', flexDirection: 'column'}}>
                
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 7, flexDirection: 'column'}}>
                  <Text style={styles.inputText}>
                    {this.state.text}
                  </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'column'}}>
                  {iconMoney}
                </View>
              </View>
              <Keyboard 
                  keyboardType="decimal-pad"
                  onClear={this._handleClear.bind(this)}
                  onDelete={this._handleDelete.bind(this)}
                  onKeyPress={this._handleKeyPress.bind(this)}
              />
              <Button buttonStyle={{flex: 1, backgroundColor:"#2c3f50", marginLeft:0, marginRight:0 }}  underlayColor="#546979"
                  onPress={this._onNext.bind(this)} title='SIGUIENTE' />
            </View>
        );
    }
}
export default SelectAmount;