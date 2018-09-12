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
      dataSource :        dataSource.cloneWithRowsAndSections(this.buildSections(props.history || [])),
      refreshing :        false,
			infiniteLoading :   false,
			bounceValue:        new Animated.Value(0),
			errors :            0,
      is_subaccount:      config.isSubaccountMode(props.account.subaccount)
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
			start_offset,
      this.props.account.subaccount
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
				console.log('*************************** ONE SIGNAL ');
				console.log('MESSAGE: ', 	message);
				console.log('DATA: ', 		data);
				console.log('ISACTIVE: ', isActive);

				let tx_info = {
					message 	: message,
					data 			: data,
					isActive 	: isActive
				}
				that.props.actions.newTxHACK(tx_info);
				/*
				'MESSAGE: ', 'vaku te ha enviado 10 DSC'
				'DATA: ', { sound: 'coins_received', smallIcon: 'ic_iconoclasa.png' }
				'ISACTIVE: ', true
				*/
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
    console.log(' ----------------------- History::_onPressButton');
		console.log(JSON.stringify(rowData));

		// let data = this._getRowData(rowData);
		this.props.navigator.push({
			screen: 'wallet.TxDetails',
			title: 'Detalles',
			passProps: rowData
		});

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

    if(rowData.__typename == 'WithdrawPermissionClaim' && this.state.is_subaccount) {
      let icon 						= 'ios-card-outline';
      let bg     					= {credit_request:'#29c3cb'};
      let fecha  			    = this._getFecha(rowData.block.timestamp);
      let hora   			    = this._getHora(rowData.block.timestamp);
      let asset_symbol = config.ASSET_SYMBOL;

      const _icon = (<Icon name={icon} size={18} color={bg['credit_request']} />);
      return(
        <TouchableHighlight style={styles.txRow} underlayColor={'#0f0'} onPress={() => { this._onPressButton(rowID, rowData)}}>
          <View style={styles.row_container}>
            <View style={[styles.row_avatar, {borderWidth: 0.5, borderColor:bg['credit_request']}]}>
              {_icon}
            </View>
            <View style={styles.row_content}>
              <View style={styles.row_line1}>
                <Text style={styles.row_amount}><Text style={styles.row_dea}>{asset_symbol}{rowData.amount.quantity}</Text> recibidos para inicio de caja</Text>
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


    if(rowData.__typename == 'WithdrawPermission' && this.state.is_subaccount) {
      let icon 						= 'ios-card';
      let bg     					= {credit_request:'#29c3cb'};
      let fecha  			    = this._getFecha(rowData.block.timestamp);
      let hora   			    = this._getHora(rowData.block.timestamp);
      let asset_symbol = config.ASSET_SYMBOL;

      const _icon = (<Icon name={icon} size={18} color={bg['credit_request']} />);
      return(
        <TouchableHighlight style={styles.txRow} underlayColor={'#0f0'} onPress={() => { this._onPressButton(rowID, rowData)}}>
          <View style={styles.row_container}>
            <View style={[styles.row_avatar, {borderWidth: 0.5, borderColor:bg['credit_request']}]}>
              {_icon}
            </View>
            <View style={styles.row_content}>
              <View style={styles.row_line1}>
                <Text style={styles.row_amount}>Te han asignado como subcuenta por <Text style={styles.row_dea}>{asset_symbol}{rowData.amount.quantity}</Text> diarios</Text>
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
					<TouchableHighlight style={styles.txRow} underlayColor={'#0f0'} onPress={() => { this._onPressButton(rowID, rowData)}}>
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

				return(
					<TouchableHighlight style={styles.txRow} underlayColor={'#0f0'} onPress={() => { this._onPressButton(rowID, rowData)}}>
						<View style={styles.row_container}>
							<View style={[styles.row_avatar, {borderWidth: 0.5, borderColor:bg[_tipo]}]}>
                <Image source={iconsMap['ios-thumbs-up']} style={[styles.row_hand]}/>
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

		if(rowData.__typename == 'Transfer' && config.ASSET_ID == rowData.amount.asset.id) {

       let mapa   = {received:'RECIBISTE DE', sent: 'ENVIADOS A', discounted_subacc:'PAGO RECIBIDO DE', refunded_subacc:'RECOMPENSASTE A', refunded:'TE RECOMPENSÓ', discounted:'PAGASTE A'};
       let rotato = {received:'0 deg', sent : '-180 deg', refunded_subacc:'-45 deg', discounted_subacc:'135 deg', refunded:'0 deg'     , discounted:'-180 deg'};
       //let bg     = {received:'#8ec919', sent:'#fcc4cb'};
			 //let bg     = {received:'#A2EA4A', sent:'#FF7251'};
		let bg     = {received:'#76eafa', sent:'#f576ff', refunded_subacc:'green', discounted_subacc:'yellow', refunded:'#80fbbf', discounted:'#ff73b9'};
       let dea    = {received:'De:', sent:'A:', refunded_subacc:'A:', discounted_subacc:'De:', refunded:'De:', discounted:'A:'};
       let _type  = rowData.from.name.endsWith(this.props.account.name) ? 'sent' : 'received';
       let _dea   = _type;
       let fecha  = this._getFecha(rowData.block.timestamp);
			 let hora   = this._getHora(rowData.block.timestamp);
			 let asset_symbol = config.ASSET_SYMBOL;
       let message 	= undefined;
       let _rotato 	= _type;
       let _bg 		 	= _type;
       let _mapa   	= _type;
       let post_fix	= this.state.is_subaccount?'_subacc':'' 
       if(rowData.message)
         message = (<Text style={styles.row_message}>{rowData.message}</Text>);
       else
        if(rowData.memo)
        {
          let msg 		      = config.fromHex(rowData.memo.message);
					let prefix 	      = msg.substring(0,3);
          if(prefix==config.REFUND_PREFIX)
          {
            // _dea  = ;
            _dea  = 'refunded'+post_fix;
            _type = 'refunded';
            _rotato = _type + (this.state.is_subaccount?'_subacc':'');
            _bg 		= _rotato;
            _mapa   = _rotato;
          }
          if(prefix==config.PAYDISCOUNTED_PREFIX)
          {
          	_dea  = 'discounted'+post_fix;
            _type = 'discounted';
            _rotato = _type + (this.state.is_subaccount?'_subacc':'');
            _bg 		= _rotato;
            _mapa   = _rotato;
          }
					// let memo_account = msg.substring(4);
          message = (<Text style={styles.row_message}>{msg}</Text>);
        }

        // <View style={[styles.row_avatar]}>
        // 	<View style={{flex:1, backgroundColor:bg[_bg]}}>
        //   	<Image source={iconsMap['md-arrow-up']} style={[styles.row_arrow, {transform : [{rotate: rotato[_rotato]}]}]}/>
        // 	</View>
        // </View>
		let imgData = 'data:image/png;base64,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';
		
       return (
        <TouchableHighlight style={styles.txRow} underlayColor={'#ccc'} onPress={() => { this._onPressButton(rowID, rowData)}}>
          <View style={styles.row_container}>
            <View style={{width:60, backgroundColor:bg[_bg], borderBottomLeftRadius: 7,borderTopLeftRadius: 7}}>
            	<View style={styles.row_avatar}>
            		<Image source={iconsMap['md-arrow-up']} style={[styles.row_arrow, {transform : [{rotate: rotato[_rotato]}]}]}/>
            	</View>
            </View>
            <View style={styles.row_content}>
				<View style={styles.row_line1}>
					<Text style={styles.row_action}>{mapa[_mapa]}</Text>
				</View>
				<View style={styles.row_line2}>
					<Text style={styles.row_dea}>{((_type == 'received' || _type == 'discounted' || _type == 'refunded_subacc')) ? rowData.from.name : rowData.to.name}</Text>
				</View>
				<View style={styles.row_line2}>
					<Text style={styles.row_hour_item}>{hora}{" - "}{fecha}</Text>
				</View>
            </View>
            <View style={styles.col_amount}>
            	<View flexDirection="row" alignItems="center">
					<Image style={{width: 10, height: 10, resizeMode: Image.resizeMode.contain, borderWidth: 0, opacity: 0.25, marginRight: 5}} source={{uri: imgData}}/>
					<Text style={styles.row_amount}>
						{rowData.amount.quantity}
					</Text>
				</View>
				{message}
            </View>
          </View>
        </TouchableHighlight>
      );
		}

		return null;
		/*return(
 			<TouchableHighlight underlayColor={'#ccc'} onPress={() => { this._onPressButton(rowID, rowData)}}>
 				<Text style={styles.row_unknown_op}>Operación no conocida</Text>
 			</TouchableHighlight>
 		)*/

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
							color='#3498db'
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
              colors={['#8ec919', '#fcc4cb', '#3498db']}
            />}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow.bind(this)}
            
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
