/* eslint-disable new-cap */
import React, { PropTypes, Component } from 'react';
import {
  AppState,
  View,
  Text,
  ListView,
  Image,
  TouchableHighlight,
  RefreshControl
} from 'react-native';

import * as walletActions from '../wallet.actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './styles/History';
import { iconsMap } from '../../../utils/AppIcons';

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
        dataSource: this.state.dataSource.cloneWithRowsAndSections(data),
        refreshing: false,
      })
    //}
  }

  _rowHasChanged(oldRow, newRow) {
    //console.log('rowHasChanged::', oldRow, '--->', newRow);
    return true;
    return (oldRow.id !== newRow.id || oldRow.message !== oldRow.message);
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
    this.props.actions.retrieveHistory(this.props.account.name);
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
		this.props.actions.retrieveHistory(this.props.account.name);
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
}

function mapStateToProps(state, ownProps) {
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
