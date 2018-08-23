import React, { PropTypes, Component } from 'react';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from '../wallet/wallet.actions';
// import styles from './styles/SendConfirm';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import Bts2helper from '../../utils/Bts2helper';

import * as config from '../../constants/config';

import { ToastAndroid, Dimensions, Alert,Platform, Image, ListView, TouchableHighlight, StyleSheet, Text, View } from 'react-native';

const item_width     = Dimensions.get('window').width/2-10;
const item_img_width = item_width - 40;
const xx = item_width-20;
const styles = StyleSheet.create({
  list: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff'
  },
  row: {
    margin: 3,
    width: item_width,
    height: item_width,
    backgroundColor: '#F6F6F6',
  },
  thumb: {
    flex:1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },

  name_container:{
    backgroundColor:'#000000',
    opacity: .6,  
    position: "absolute", top: xx, left: 0, right: 0, bottom: 0,
    
    // position: 'absolute',
    // bottom: 0,
    // left:0,
    // right: item_img_width
  },
  text: {
    position: 'absolute',
    bottom: 0,
    color: '#fff',
    backgroundColor:'transparent',
    alignSelf:'flex-start',
    textAlign: 'center',
    padding: 4,
    fontWeight: 'bold',
    opacity: 1,
    fontFamily : 'roboto_light',
    fontWeight: '100',
    fontSize: 15,
    lineHeight:15
  },
  discount: {
    color: '#fff',
    backgroundColor:'#000',
    alignSelf:'flex-start',
    marginTop: 5,
    marginLeft: 5,
    padding: 3,
    fontWeight: 'bold',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#000',
  },
});

class DscMain extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    // let dataSource = new ListView.DataSource({
    //   rowHasChanged : this._rowHasChanged.bind(this)
    // });

    this.state = {
      dataSource : ds,
      refreshing : false,
      recipient_selected : false,
      error: false
    };
    this._pressData={};
    // this._buildMemo = this._buildMemo.bind(this);

    this._renderRow = this._renderRow.bind(this);
    this._pressRow = this._pressRow.bind(this);    


  }

  fetchBusinesses () {

    console.log('Pedimos');
    this.setState({refreshing:true});
    walletActions.retrieveBusinesses(0, 100, 'query', 'search').then( (businesses) => {
      console.log('Traemos');
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(businesses['businesses']),
        refreshing: false,
        error:      false
      })
      ToastAndroid.show('fetchBusinesses() OK! ' + businesses['businesses'].length, ToastAndroid.LONG);
    }, (err) => {
      this.setState({refreshing:true});
      console.log('Error');
      ToastAndroid.show('fetchBusinesses() ERROR! ' + str(err), ToastAndroid.LONG);
    })
  }

  loadData(){
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this._genRows({})),
      refreshing: false,
      error:      false
    })
  }
  
  componentDidMount() {
//     AppState.addEventListener('change', this.handleAppStateChange);
    this.fetchBusinesses();
  }
  
  render() {
    return (
      // ListView wraps ScrollView and so takes on its properties.
      // With that in mind you can use the ScrollView's contentContainerStyle prop to style the items.
      //renderRow={this._renderRow}
      <View style={{flex:1, marginTop:3, backgroundColor:'#ffffff'}}>
        <ListView
          contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          initialListSize={21}
          pageSize={2} // should be a multiple of the no. of visible cells per row
          scrollRenderAheadDistance={500}
          
          renderRow={(rowData, sectionID, rowID) => this._renderRow(rowData, sectionID, rowID)}
        />
      </View>
    );
  }


   _renderRow(rowData, sectionID, rowID) {
    var imgSource = config.FILES_URL + rowData['account_id'] + '.png' ; //THUMB_URLS[0];
    //onPress={() => this._pressRow(rowID)}
    //onPress={this._pressRow.bind(this, rowID)}
    
    return (
      <TouchableHighlight
        onPress={() => this._pressRow(rowID)}
        underlayColor="transparent">
        <View style={{backgroundColor:'#ffffff'}}>
          <View style={styles.row}>
            <Image style={styles.thumb} source={{uri:imgSource}} >
              <Text style={styles.discount}>%{rowData['discount_ex'][config.getToday()]['discount']}</Text>
              <View style={styles.name_container}>                
              </View>
              <Text style={styles.text}>{rowData['name']}</Text>
            </Image>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  _genRows(pressData){
    var dataBlob = [];
    for (var ii = 0; ii < 100; ii++) {
      var pressedText = pressData[ii] ? ' (X)' : ' ';
      dataBlob.push('Cell ' + ii + pressedText);
    }
    return dataBlob;
  }

  _pressRow(rowID) {
    // this._pressData[rowID] = !this._pressData[rowID];
    // this.setState({
    //   dataSource: this.state.dataSource.cloneWithRows(
    //     this._genRows(this._pressData),
    //   ),
    // });
  }

  hashCode(str) {
    var hash = 15;
    for (var ii = str.length - 1; ii >= 0; ii--) {
      hash = (hash << 5) - hash + str.charCodeAt(ii);
    }
    return hash;
  }
}


function mapStateToProps(state, ownProps) {
	return {
		account    : state.wallet.account,
		balance    : state.wallet.balance,
		fees       : state.wallet.fees,
		asset      : state.wallet.asset,
		blockchain : state.wallet.blockchain
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(walletActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(DscMain);
