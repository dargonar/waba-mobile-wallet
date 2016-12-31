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

import OneSignal from 'react-native-onesignal';

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

	// source={require('../img/pattern4.png')}
	render() {
		//const base64Icon = 'data:image/png;base64,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';
  
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
