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
  RefreshControl,
	ActivityIndicator,
	Animated,
	ToastAndroid
} from 'react-native';

import * as walletActions from '../wallet.actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as config from '../../../constants/config';

import styles from './styles/History';
import { iconsMap } from '../../../utils/AppIcons';
import Bts2helper from '../../../utils/Bts2helper';

import OneSignal from 'react-native-onesignal';

import Spinner from 'react-native-spinkit';

class History extends Component {

	buildSections(history) {
		data2 = {};
		const meses = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
		for(var i=0; i<history.length; i++) {
			var month = history[i].block.timestamp.substr(5,2) >> 0;
			var mes   = meses[month];
			if(!(mes in data2)) {
				data2[mes] = []
			}
			data2[mes].push(history[i]);
		}
		return data2;
	} 

	constructor(props) {
		super(props);

    let dataSource = new ListView.DataSource({
      sectionHeaderHasChanged : this._sectionHeaderHasChanged.bind(this),
      rowHasChanged           : this._rowHasChanged.bind(this),
      getSectionHeaderData    : this._getSectionHeaderData.bind(this)
    });
    
    this.state = {
      dataSource : dataSource.cloneWithRowsAndSections(this.buildSections(props.history || [])),
      refreshing : false,
			infiniteLoading : false,
			bounceValue: new Animated.Value(0),
			errors : 0
    };
		
// 		this.state.bounceValue.addListener((v)=>{
// 			console.log('bounceValue=>', v);
// 		});
	}

	refreshHistory(start_offset) {
		if(start_offset == undefined) start_offset = 0;
		this.props.actions.retrieveHistory(
			this.props.account.name, 
			this.props.account.keys,
			!this.props.account.id,
			start_offset
		);
	}
	
// 	shouldComponentUpdate(nextProps, nextState) {
// 		console.log('History::shouldComponentUpdate=>', nextProps);
// 		return true;
// 	}
	
  componentWillReceiveProps(nextProps) {
		console.log('History::componentWillReceiveProps=>', nextProps.errors);
		
		let new_state = {};
		if (nextProps.history !== this.props.history) {
			console.log('componentWillReceiveProps: new history =>', nextProps.history.length);
			let data = nextProps.history;
      new_state.dataSource=this.state.dataSource.cloneWithRowsAndSections(this.buildSections(data));
		}			

		if(this.state.infiniteLoading) {
			new_state.infiniteLoading=false;
		}

		new_state.refreshing = false;

		if(nextProps.errors > this.state.errors) {
			ToastAndroid.show('Verifique su conexión a Internet', ToastAndroid.SHORT);
		}
		
		new_state.errors = nextProps.errors;
		
		this.setState(new_state);
  }

  _rowHasChanged(oldRow, newRow) {
    return (oldRow.id !== newRow.id)
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
				
				that.refreshHistory();
			}
		});

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
		this.refreshHistory(0);
  }

  _onEndReached()  {
		console.log('ON END REACHED!!!!!', this.props.at_end);
		
		if(this.props.at_end)
			return;
		
		this.setState({infiniteLoading:true});

		this.state.bounceValue.setValue(-20);     // Start large
		Animated.timing(                          // Base: spring, decay, timing
			this.state.bounceValue,                 // Animate `bounceValue`
			{
				toValue  : 20,                         // Animate to smaller size
				duration: 300
			}
		).start();
		
		let last_id = this.props.history[this.props.history.length-1].id;
		console.log('LAST ID=>', last_id);
		parts = last_id.split('.').map( function(v){ return v>>0; });
		parts[2]-=1;
		last_id = parts.join('.');
		console.log('LAST ID (tocado)=>', last_id);
		
		this.refreshHistory(last_id);
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

  _getFecha(timestamp) {
		const meses = ["", "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

		var month = timestamp.substr(5,2) >> 0;
		var mes   = meses[month];
		var dia   = timestamp.substr(8,2) >> 0;

		return dia + ' ' + mes;
  }

  _renderRow(rowData, sectionID, rowID) {
			
			if(rowData.__typename == 'NoDetailOp') {
				return(
					<TouchableHighlight underlayColor={'#ccc'} onPress={this._onPressButton.bind(this)}>
						<Text style={styles.row_amount}>Operacion no conocida</Text>				
					</TouchableHighlight>
				)
			}

			if(rowData.__typename == 'OverdraftChange') {
				console.log(' -- DESCUBIERTO:', JSON.stringify(rowData));
 				let _tipo = rowData.type == 'up' ? 'credit_up' : 'credit_down'; 
				//let _tipo  = rowData.from.name.endsWith(this.props.account.name) ? 'credit_up' : 'credit_down'; // testing
				let bg     = {credit_up:'#60A3C0', credit_down:'#413932'}; //down -> #dddddd
				let msg    = {credit_up:'incrementado', credit_down:'decrementado'};
				let title  = {credit_up:'de crédito ampliado', credit_down:'de crédito reducido'};
				return(
					<TouchableHighlight underlayColor={'#0f0'} onPress={this._onPressButton.bind(this)}>
						<View style={styles.row_container}>
							<View style={[styles.row_avatar, {backgroundColor:bg[_tipo]}]}>
								<Image source={iconsMap['handshake-o']} style={[styles.row_hand]}/>
							</View>
							<View style={styles.row_content}>            
								<View style={styles.row_line1}>
									<Text style={styles.row_amount}>${rowData.amount.quantity} {title[_tipo]}</Text>
								</View>
								<View style={styles.row_line2}>
                <Text>Se ha {msg[_tipo]} su crédito</Text>
              </View>
							</View>
							<View style={styles.row_hour}>
								<Text>{fecha}</Text>
							</View>
						</View>
					</TouchableHighlight>
				)
			}

       let mapa   = {received:'recibido', sent: 'enviado'};
       let rotato = {received:'135 deg', sent : '-45 deg'};
       //let bg     = {received:'#8ec919', sent:'#fcc4cb'};
			 //let bg     = {received:'#A2EA4A', sent:'#FF7251'};
			 let bg     = {received:'#B7F072', sent:'#ff9379'};
       let dea    = {received:'De:', sent:'A:'};
       let _type  = rowData.from.name.endsWith(this.props.account.name) ? 'sent' : 'received';
       let fecha  = this._getFecha(rowData.block.timestamp);

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
              <Text>{fecha}</Text>
            </View>
          </View>
        </TouchableHighlight>
      );
  }

	render() {

		if(this.state.dataSource.getRowCount()>0)
		{
			let infiniteLoading=undefined;
			if(this.state.infiniteLoading) {
				//console.log(this.state.bounceValue.value);
				infiniteLoading = (
					<Animated.View style={{
							left:0, 
							right:0, 
							zIndex:1, 
							position:'absolute', 
							bottom:this.state.bounceValue,
							alignItems:'center'
						}}
					>
						<Spinner
							isVisible={true}
							size={30}
							type='Wave' 
							color='#B7F072'
						/>
					</Animated.View>
				)
		  }

			return (
        <View style={styles.container}>
         <ListView
            refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
              colors={['#8ec919', '#fcc4cb', '#B7F072']}
            />}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow.bind(this)}
            renderSeparator={this._renderSeparator.bind(this)}
            renderSectionHeader={this._renderSectionHeader.bind(this)}
						onEndReached={this._onEndReached.bind(this)}
						onEndReachedThreshold={10}
         />
				 {infiniteLoading}	
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
	//console.log('HISTORY::mapStateToProps');
	return {
		history   : state.wallet.history,
		account   : state.wallet.account,
		at_end    : state.wallet.at_end,
		errors    : state.wallet.errors
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(walletActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(History);
