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
import Icon from 'react-native-vector-icons/Ionicons';
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
		
		this._onPressButton   = this._onPressButton.bind(this);
		this._openEndorsement = this._openEndorsement.bind(this);
// 		this.state.bounceValue.addListener((v)=>{
// 			console.log('bounceValue=>', v);
// 		});
	}
	
	_openEndorsement(prefix, rowID, rowData){
		let available_credit = config.readyToRequestCredit(this.props.balance, this.props.credit_ready);
		if(!available_credit)
			return;
		if(prefix == config.ENDORSED_BY_PREFIX || prefix == config.ENDORSED_TX_PREFIX)
			this.props.navigator.push({
				screen: 'endorsement.Endorsement',
				title: 'Avales'
			});		
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
		
// 		let data = this._getRowData(rowData);
// 		this.props.navigator.push({
// 			screen: 'wallet.TxDetails',
// 			title: 'Detalles',
// 			passProps: data
// 		});

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
      <View key={`${sectionID}-${rowID}`} style={styles.separator}></View>
    );
  }

  _getFecha(timestamp) {
		const meses = ["", "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

		var month = timestamp.substr(5,2) >> 0;
		var mes   = meses[month];
		var dia   = timestamp.substr(8,2) >> 0;

		return dia + ' ' + mes;
  }
	
	_getHora(timestamp) {
		var hora = timestamp.substr(11,2) >> 0;
		var min   = timestamp.substr(14,2) >> 0;
		return ("0" + hora).slice(-2) + ':' + ("0" + min).slice(-2);
  }
	
	_getFechaHora(timestamp){
		let fecha  = this._getFecha(timestamp);
	  let hora   = this._getHora(timestamp);
 		return fecha + ' ' + hora;
	}
	
	
  _renderRow(rowData, sectionID, rowID) {
			
			if(rowData.__typename == 'CreditRequest') {
				let icon 						= 'ios-card';
			  let aval_amount 	  = config.ALL_AVALS_DESC[rowData.amount.asset.id];
				let aval_type 			= 'credit_request';
				let bg     					= {credit_request:'#29c3cb'}; 
				let fecha  			    = this._getFecha(rowData.block.timestamp);
			  let hora   			    = this._getHora(rowData.block.timestamp);
				//<View style={[styles.row_avatar, {backgroundColor:bg[aval_type]}]}>
				// <Image source={iconsMap[icon]} style={[styles.row_hand]}/>
				const _icon = (<Icon name={icon} size={18} color={bg[aval_type]} />);
				return(
					<TouchableHighlight underlayColor={'#0f0'} onPress={() => { this._onPressButton(rowID, rowData)}}>
						<View style={styles.row_container}>
							<View style={[styles.row_avatar, {borderWidth: 0.5, borderColor:bg[aval_type]}]}>
								{_icon}
							</View>
							<View style={styles.row_content}>            
								<View style={styles.row_line1}>
									<Text style={styles.row_amount}>Has solicitado un crédito por <Text style={styles.row_dea}>{aval_amount}</Text></Text>
								</View>
							</View>
							<View style={styles.row_hour}>
								<Text style={styles.row_hour_item}>{hora}</Text>
								<Text style={styles.row_hour_item}>{fecha}</Text>
							</View>
						</View>
					</TouchableHighlight>
				)
			}
			
			if(rowData.__typename == 'Transfer' && config.ALL_AVALS.indexOf(rowData.amount.asset.id) != -1) {
				let bg     			= {share:'#413932', endorse:'#ef5030', share_received:'#B7F072', share_sent:'#ff9379'};
				let fecha  			= this._getFecha(rowData.block.timestamp);
			  let hora   			= this._getHora(rowData.block.timestamp);
				let _recv_sent  = rowData.from.name.endsWith(this.props.account.name) ? 'sent' : 'received';
				let to_account  = _recv_sent == 'received' ? rowData.from.name : rowData.to.name;

				let aval_type 			= '';
				let icon_type 			= '';
				let icon 						= 'ios-help'; // Meta hack
				let line1 					= 'Operación desconocida'; // Meta hack
				let line2 					= '';
				let pre_line2 		  = '';
				let post_line2 			= '';
				let aval_type_desc  = '';
				let aval_amount 	  = config.ALL_AVALS_DESC[rowData.amount.asset.id];
				
				let prefix 					= '';
				let memo_account 		= '';
				if(rowData.memo && rowData.memo.message && rowData.memo.message.length > 2)
				{
					let msg 		 = config.fromHex(rowData.memo.message);
					prefix 			 = msg.substring(0,3);
					memo_account = msg.substring(4);
				}
				else
				{
					memo_account = 'Administración PAR';
					prefix =config.ENDORSED_TX_PREFIX;
				}

				if(prefix == config.I_ENDORSE_PREFIX)
				{
					line1 					 = null;
					aval_type 			 = 'endorse';
					icon_type 			 = 'endorse';
					icon 						 = 'ios-ribbon';
					aval_type_desc   = rowData.amount.quantity>1?'autorizaciones':'autorización';
					pre_line2        = 'Has autorizado a ';
					post_line2       = ' a solicitar un crédito por ' + aval_amount;
				}
				
				if(prefix == config.ENDORSED_BY_PREFIX)
				{
					line1 					 = null;
					aval_type 			 = 'endorse';
					icon_type 			 = 'endorse';
					icon 						 = 'md-checkmark';
					aval_type_desc   = rowData.amount.quantity>1?'autorizaciones':'autorización';
					pre_line2        = '';
					post_line2       = ' te ha autorizado a solicitar un crédito por ' + aval_amount;
				}

				if(prefix == config.ENDORSED_TX_PREFIX)
				{
					aval_type 			= 'share';
					icon_type 			= 'share';
					icon 						= 'ios-card';
					aval_type_desc  = rowData.amount.quantity>1?'avales':'aval';	
					if (!rowData.from.id.endsWith(this.props.account.id))
					{
						icon            = 'ios-card';
						icon_type 			= 'share_received';
						pre_line2       = '';
						post_line2      = ' te ha enviado avales para autorizar créditos por ' + aval_amount;
						//line2 					= rowData.from.name + ' te ha enviado avales para autorizar créditos por ' + aval_amount;
					}	
					else
					{	
						icon            = 'ios-card-outline';
						icon_type 			= 'share_sent';
						pre_line2       = 'Has enviado avales a ';
						post_line2      = ' para que pueda autorizar créditos por ' + aval_amount;
						//line2 					= 'Has enviado avales a ' + rowData.to.name + ' para que pueda autorizar créditos por ' + aval_amount;
					}
					line1     			= 'Has ' + (rowData.from.id.endsWith(this.props.account.id)?'enviado':'recibido') + ' ' + rowData.amount.quantity.toString() + ' ' + aval_type_desc ; 
				}	

				let text2 = null;
				if(line1)
				{
					text2 = (<View style={styles.row_line2}>
									<Text style={styles.row_simple}>{line1}</Text>
              	</View>);
				}

				const _icon = (<Icon name={icon} size={18} color={bg[aval_type]} />);
				return(
					<TouchableHighlight underlayColor={'#0f0'} onPress={() => { this._openEndorsement(prefix, rowID, rowData)}}>
						<View style={styles.row_container}>
							<View style={[styles.row_avatar, {borderWidth: 0.5, borderColor:bg[aval_type]}]}>
								{_icon}
							</View>
							<View style={styles.row_content}>            
								<View style={styles.row_line1}>
									<Text style={styles.row_amount}>{pre_line2}<Text style={styles.row_dea}>{memo_account}</Text>{post_line2}</Text>
								</View>
								{text2}
							</View>
							<View style={styles.row_hour}>
								<Text style={styles.row_hour_item}>{hora}</Text>
								<Text style={styles.row_hour_item}>{fecha}</Text>
							</View>
						</View>
					</TouchableHighlight>
				)
			}

			if(rowData.__typename == 'OverdraftChange') {
 				let _tipo = rowData.type == 'up' ? 'credit_up' : 'credit_down'; 
				//let _tipo  = rowData.from.name.endsWith(this.props.account.name) ? 'credit_up' : 'credit_down'; // testing
				let bg     = {credit_up:'#fda720', credit_down:'#413932'}; 
				let msg    = {credit_up:'incrementado', credit_down:'reducido'};
				let asset_symbol = config.ASSET_SYMBOL;
				let title  = 'Se ha '+ msg[_tipo] + 'tu límite de crédito en';
				if(!rowData.memo || !rowData.memo.message)
				{
					title = '¡Solicitud de crédito aprobada! Has accedido a un crédito de';
				}
				let fecha  = this._getFecha(rowData.block.timestamp);
			  let hora   = this._getHora(rowData.block.timestamp);
//
// 					<Text style={styles.row_amount}>{title[_tipo]} de límite de crédito por {asset_symbol}{rowData.amount.quantity}</Text>
				return(
					<TouchableHighlight underlayColor={'#0f0'} onPress={() => { this._onPressButton(rowID, rowData)}}>
						<View style={styles.row_container}>
							<View style={[styles.row_avatar, {borderWidth: 0.5, borderColor:bg[_tipo]}]}>
                <Image source={iconsMap['handshake-o']} style={[styles.row_hand]}/>
							</View>
							<View style={styles.row_content}>            
								<View style={styles.row_line1}>
									<Text style={styles.row_amount}>{title} {asset_symbol}{rowData.amount.quantity}</Text>
								</View>
							</View>
							<View style={styles.row_hour}>
								<Text style={styles.row_hour_item}>{hora}</Text>
								<Text style={styles.row_hour_item}>{fecha}</Text>
							</View>
						</View>
					</TouchableHighlight>
				)
			}

// 			console.log('--------------RIW');
// 			console.log(rowData);
// 			console.log('---------------------------------');


		if(rowData.__typename == 'Transfer' && config.MONEDAPAR_ID == rowData.amount.asset.id) {

       let mapa   = {received:'recibido', sent: 'enviado'};
       let rotato = {received:'135 deg', sent : '-45 deg'};
       //let bg     = {received:'#8ec919', sent:'#fcc4cb'};
			 //let bg     = {received:'#A2EA4A', sent:'#FF7251'};
			 let bg     = {received:'#B7F072', sent:'#ff9379'};
       let dea    = {received:'De:', sent:'A:'};
       let _type  = rowData.from.name.endsWith(this.props.account.name) ? 'sent' : 'received';
       let fecha  = this._getFecha(rowData.block.timestamp);
			 let hora   = this._getHora(rowData.block.timestamp);
			 let asset_symbol = config.ASSET_SYMBOL;
       let message = undefined;
       if(rowData.message)
         message = (<Text style={styles.row_message}>{rowData.message}</Text>);
       
        return (
        <TouchableHighlight underlayColor={'#ccc'} onPress={() => { this._onPressButton(rowID, rowData)}}>
          <View style={styles.row_container}>
            <View style={[styles.row_avatar, {backgroundColor:bg[_type]}]}>
              <Image source={iconsMap['ios-arrow-round-up']} style={[styles.row_arrow, {transform : [{rotate: rotato[_type]}]}]}/>
            </View>
            <View style={styles.row_content}>            
              <View style={styles.row_line1}>
                <Text style={styles.row_amount}>{asset_symbol}{rowData.amount.quantity} {mapa[_type]}s</Text>
              </View>
              <View style={styles.row_line2}>
                <Text style={styles.row_dea}>{dea[_type]} </Text>
                <Text>{_type == 'received' ? rowData.from.name : rowData.to.name}</Text>
              </View>
              {message}
            </View>
            <View style={styles.row_hour}>
              <Text style={styles.row_hour_item}>{hora}</Text>
							<Text style={styles.row_hour_item}>{fecha}</Text>
            </View>
          </View>
        </TouchableHighlight>
      );
		}

		//return null;
		return(
 			<TouchableHighlight underlayColor={'#ccc'} onPress={() => { this._onPressButton(rowID, rowData)}}>
 				<Text style={styles.row_unknown_op}>Operación no conocida</Text>				
 			</TouchableHighlight>
 		)
	
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
