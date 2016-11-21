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
    if (nextProps.history !== this.props.history) {
      let data = nextProps.history;
      //console.log('componentWillReceiveProps:', data);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(data),
        refreshing: false,
      })
    }
  }

  _rowHasChanged(oldRow, newRow) {
    //console.log('rowHasChanged::', oldRow, '--->', newRow);
    //return true;
    return oldRow.id !== newRow.id;
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
    this.props.actions.retrieveHistory();
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
    setTimeout(() => {
      this.props.actions.retrieveHistory();
    }, 3000);
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

       let mapa   = {in:'recibido', 'out': 'enviado'};
       let rotato = {in:'135 deg', 'out' : '-45 deg'};
       let bg     = {in:'#8ec919', 'out':'#fcc4cb'};
       let dea    = {in:'De:', 'out':'A:'};

       let message = undefined;
       if(rowData.msg)
         message = (<Text style={styles.row_message}>{rowData.msg}</Text>);
       
        return (
        <TouchableHighlight underlayColor={'#ccc'} onPress={this._onPressButton.bind(this)}>
          <View style={styles.row_container}>
            <View style={[styles.row_avatar, {backgroundColor:bg[rowData.type]}]}>
              <Image source={iconsMap['ios-arrow-round-up']} style={[styles.row_arrow, {transform : [{rotate: rotato[rowData.type]}]}]}/>
            </View>
            <View style={styles.row_content}>            
              <View style={styles.row_line1}>
                <Text style={styles.row_amount}>${rowData.amount} {mapa[rowData.type]}s</Text>
              </View>
              <View style={styles.row_line2}>
                <Text style={styles.row_dea}>{dea[rowData.type]} </Text>
                <Text>{rowData.type == 'in' ? rowData.from : rowData.to}</Text>
              </View>
              {message}
            </View>
            <View style={styles.row_hour}>
              <Text>11:20</Text>
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
		history: state.wallet.history
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(walletActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(History);
