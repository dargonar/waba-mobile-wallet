/* eslint-disable new-cap */
import React, { PropTypes, Component } from 'react';
import {
  AppState,
  View,
  Text,
  TouchableOpacity,
	ListView,
  Image,
  TouchableHighlight,
  RefreshControl
} from 'react-native';

import * as walletActions from '../wallet.actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as config from '../../../constants/config';

import styles from './styles/History';
import { iconsMap } from '../../../utils/AppIcons';
import Bts2helper from '../../../utils/Bts2helper';

import OneSignal from 'react-native-onesignal';

var ops = [
	JSON.stringify([0, {
	 fee : { 
		amount   : 26418,
		asset_id : "1.3.1004"
	 },
	 from    : "1.2.150912",
	 to      : "1.2.142374",
	 amount  : {
		amount   : 3300000,
		asset_id : "1.3.1004"
	 },
	 memo : {
		from    : "BTS83GV9zVqamyQPaqdTbEwfi5gvbGZZzbobFk1NYxnSY3PBJTuHb",
		to      : "BTS7szhP8GK7rTwaiZH9Lf4gzu2E8JpqEhqKbfjN5YtV5RekNgv2C",
		nonce   : "3477628209827763",
		message : "facd6139787c7a41a8dd16bb6f0b3a43ca4116aa210462431a378fdb7036e89b"
	 } 
	}])
];

var cer = JSON.stringify({
	"base": {
		"amount": 100000,
		"asset_id": "1.3.0"
	},
	"quote": {
		"amount": 10000,
		"asset_id": "1.3.1004"
	}
});

var current_fees = JSON.stringify({
  "parameters": [
    [
      0,
      {
        "fee": 264174,
        "price_per_kbyte": 146763
      }
    ],
    [
      1,
      {
        "fee": 14676
      }
    ],
    [
      2,
      {
        "fee": 1467
      }
    ],
    [
      3,
      {
        "fee": 14676
      }
    ],
    [
      4,
      {}
    ],
    [
      5,
      {
        "basic_fee": 1467634,
        "premium_fee": 73381739,
        "price_per_kbyte": 102734
      }
    ],
    [
      6,
      {
        "fee": 14676,
        "price_per_kbyte": 102734
      }
    ],
    [
      7,
      {
        "fee": 1467634
      }
    ],
    [
      8,
      {
        "membership_annual_fee": "146763479066893",
        "membership_lifetime_fee": 1761161748
      }
    ],
    [
      9,
      {
        "fee": 73381739
      }
    ],
    [
      10,
      {
        "long_symbol": 733817395,
        "price_per_kbyte": 146763,
        "symbol3": "117410783253",
        "symbol4": "29352695813"
      }
    ],
    [
      11,
      {
        "fee": 29352695,
        "price_per_kbyte": 102734
      }
    ],
    [
      12,
      {
        "fee": 73381739
      }
    ],
    [
      13,
      {
        "fee": 73381739
      }
    ],
    [
      14,
      {
        "fee": 264174,
        "price_per_kbyte": 146763
      }
    ],
    [
      15,
      {
        "fee": 14676
      }
    ],
    [
      16,
      {
        "fee": 7338173
      }
    ],
    [
      17,
      {
        "fee": 733817
      }
    ],
    [
      18,
      {
        "fee": 73381739
      }
    ],
    [
      19,
      {
        "fee": 1467
      }
    ],
    [
      20,
      {
        "fee": 733817395
      }
    ],
    [
      21,
      {
        "fee": 146763
      }
    ],
    [
      22,
      {
        "fee": 2201452,
        "price_per_kbyte": 733817
      }
    ],
    [
      23,
      {
        "fee": 73381,
        "price_per_kbyte": 102734
      }
    ],
    [
      24,
      {
        "fee": 0
      }
    ],
    [
      25,
      {
        "fee": 2201452
      }
    ],
    [
      26,
      {
        "fee": 146763
      }
    ],
    [
      27,
      {
        "fee": 211339,
        "price_per_kbyte": 102734
      }
    ],
    [
      28,
      {
        "fee": 0
      }
    ],
    [
      29,
      {
        "fee": 73381739
      }
    ],
    [
      30,
      {
        "fee": 146763479
      }
    ],
    [
      31,
      {
        "fee": 0
      }
    ],
    [
      32,
      {
        "fee": 73381739
      }
    ],
    [
      33,
      {
        "fee": 29352695
      }
    ],
    [
      34,
      {
        "fee": 733817395
      }
    ],
    [
      35,
      {
        "fee": 146763,
        "price_per_kbyte": 733817
      }
    ],
    [
      36,
      {
        "fee": 7338173
      }
    ],
    [
      37,
      {}
    ],
    [
      38,
      {
        "fee": 14676347,
        "price_per_kbyte": 102734
      }
    ],
    [
      39,
      {
        "fee": 3082033,
        "price_per_output": 1027344
      }
    ],
    [
      41,
      {
        "fee": 3082033
      }
    ],
    [
      43,
      {
        "fee": 14676347
      }
    ]
  ],
  "scale": 10000
});

class History extends Component {

	constructor(props) {
		super(props);

    let dataSource = new ListView.DataSource({
      sectionHeaderHasChanged : this._sectionHeaderHasChanged.bind(this),
      rowHasChanged           : this._rowHasChanged.bind(this),
      getSectionHeaderData    : this._getSectionHeaderData.bind(this)
    });
    
    this.state = {
      dataSource : dataSource,
      refreshing : false
    };
	}

  componentWillReceiveProps(nextProps) {
		//if (nextProps.history !== this.props.history) {
      let data = nextProps.history;
      //console.log('componentWillReceiveProps:', data);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(data) || [],
        refreshing: false,
      })
    //}
  }

  _rowHasChanged(oldRow, newRow) {
		return true;
    //return (oldRow.id !== newRow.id || oldRow.message !== oldRow.message);
  }

  _getSectionHeaderData(dataBlob, sectionID) {
    //console.log('getSectionHeaderData::', dataBlob, '--->', sectionID);
    return sectionID;
  }
  
  _sectionHeaderHasChanged(prevSectionData, nextSectionData) {
    //console.log('sectionHeaderHasChanged::', prevSectionData, '--->', nextSectionData);
    return prevSectionData !== nextSectionData;
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  
		let that = this;
		OneSignal.configure({
			onIdsAvailable: function(device) {
				console.log('UserId = ', device.userId);
				console.log('PushToken = ', device.pushToken);
				//fetch('http://35.161.140.21:8080/api/v1/push_id', {
				fetch(config.getAPIURL('/push_id'), {
					method: 'POST',
					headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
					body: JSON.stringify({
						name:   	that.props.account.name,
						push_id: 	device.userId,
					})
				})
				.then((response) => response.json()) 
				.then((responseJson) => {
					console.log('PUSH ID =>', responseJson);
				});										
				//OneSignal.sendTags({"account" :that.props.account.name});
				//OneSignal.getTags((receivedTags) => {
				//	console.log('TAAAAGS=>', receivedTags);
				//});
			
			},
			onNotificationOpened: function(message, data, isActive) {
				console.log('MESSAGE: ', message);
				console.log('DATA: ', data);
				console.log('ISACTIVE: ', isActive);
				
				that.props.actions.retrieveHistory(
					that.props.account.name, 
					that.props.account.keys[1].pubkey, 
					that.props.account.keys[1].privkey
				);
			}
		});

		Bts2helper.calcFee(current_fees, ops, cer).then(res => {
			console.log("CALCFEEE =>", res);
		}, err => {
			console.log("ERR CALCFEEE =>", err);
		});
		//(String feeSchedule, ReadableArray ops, String coreExchangeRatio, Promise promise)
		
		//this.props.actions.retrieveHistory(this.props.account.name, this.props.account.keys[1].pubkey, this.props.account.keys[1].privkey);
	}

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(appState) {
    if (appState === 'active') {
      // this.props.dispatch(loadSessions());
    }
  }
  
  _onPressButton(rowID, rowData) {
    console.log('History::_onPressButton');
  }

  _onRefresh() {
    this.setState({refreshing: true});
    //setTimeout(() => {
    //this.props.actions.retrieveHistory();
		this.props.actions.retrieveHistory(this.props.account.name, this.props.account.keys[1].pubkey, this.props.account.keys[1].privkey);
    //}, 3000);
  }

  _renderSectionHeader(sectionData, sectionID)  {
    //console.log()
    return (
      <View style={styles.section_container}>
        <Text key={`${sectionID}`} style={styles.section_text}>{sectionData}</Text>
      </View>
    );
  }
  
  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View key={`${sectionID}-${rowID}`} style={styles.separator}/>
    );
  }

  _renderRow(rowData, sectionID, rowID) {
			
			if(rowData.__typename == 'NoDetailOp') {
				return(
					<TouchableHighlight underlayColor={'#ccc'} onPress={this._onPressButton.bind(this)}>
						<Text style={styles.row_amount}>Operacion no conocida</Text>				
					</TouchableHighlight>
				)
			}

       let mapa   = {received:'recibido', sent: 'enviado'};
       let rotato = {received:'135 deg', sent : '-45 deg'};
       let bg     = {received:'#8ec919', sent:'#fcc4cb'};
       let dea    = {received:'De:', sent:'A:'};
       let _type  = rowData.from.name.endsWith(this.props.account.name) ? 'sent' : 'received';

       let message = undefined;
       if(rowData.message)
         message = (<Text style={styles.row_message}>{rowData.message}</Text>);
       
        return (
        <TouchableHighlight underlayColor={'#ccc'} onPress={this._onPressButton.bind(this)}>
          <View style={styles.row_container}>
            <View style={[styles.row_avatar, {backgroundColor:bg[_type]}]}>
              <Image source={iconsMap['ios-arrow-round-up']} style={[styles.row_arrow, {transform : [{rotate: rotato[_type]}]}]}/>
            </View>
            <View style={styles.row_content}>            
              <View style={styles.row_line1}>
                <Text style={styles.row_amount}>${rowData.amount.quantity} {mapa[_type]}s</Text>
              </View>
              <View style={styles.row_line2}>
                <Text style={styles.row_dea}>{dea[_type]} </Text>
                <Text>{_type == 'received' ? rowData.from.name : rowData.to.name}</Text>
              </View>
              {message}
            </View>
            <View style={styles.row_hour}>
              <Text>{rowData.block.timestamp.substr(11,5)}</Text>
            </View>
          </View>
        </TouchableHighlight>
      );
  }

	render() {
 
		if(this.state.dataSource.getRowCount()>0)
		{
			return (
        <View style={styles.container}>
         <ListView
            refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
              colors={['#8ec919', '#fcc4cb', '#d8ef27']}
            />}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow.bind(this)}
            renderSeparator={this._renderSeparator.bind(this)}
            renderSectionHeader={this._renderSectionHeader.bind(this)}
         />
       </View>
    	);	
		}
    else{
			return(
				<View style={styles.containerEmpty}>
					<View style={styles.bgImageWrapper}>
						<Image source={require('./img/pattern.png')} style={styles.bgImage} />
					</View>
					<Text style={styles.emptyListText}>Aún no tiene ninguna transferencia</Text>
					<TouchableOpacity style={styles.button} onPress={this._onRefresh.bind(this)}>
						<Text style={styles.text}>Actualizar</Text>
					</TouchableOpacity>
				</View>
				
			);
		}
  }
}

function mapStateToProps(state, ownProps) {
	console.log('HISTORY::mapStateToProps');
	return {
		history: state.wallet.history,
		account: state.wallet.account 
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(walletActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(History);
