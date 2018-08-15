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

    if(rowData.__typename == 'WithdrawPermissionClaim' && this.state.is_subaccount) {
      let icon 						= 'ios-card-outline';
      let bg     					= {credit_request:'#29c3cb'};
      let fecha  			    = this._getFecha(rowData.block.timestamp);
      let hora   			    = this._getHora(rowData.block.timestamp);
      let asset_symbol = config.ASSET_SYMBOL;

      const _icon = (<Icon name={icon} size={18} color={bg['credit_request']} />);
      return(
        <TouchableHighlight underlayColor={'#0f0'} onPress={() => { this._onPressButton(rowID, rowData)}}>
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
        <TouchableHighlight underlayColor={'#0f0'} onPress={() => { this._onPressButton(rowID, rowData)}}>
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

		if(rowData.__typename == 'Transfer' && config.ASSET_ID == rowData.amount.asset.id) {

       let mapa   = {received:'recibidos', sent: 'enviados', refunded:'recompensados', discounted:'pagados con descuento'};
       let rotato = {received:'135 deg', sent : '-45 deg', refunded_subacc:'-45 deg'     , discounted_subacc:'135 deg', refunded:'135 deg'     , discounted:'-45 deg'};
       //let bg     = {received:'#8ec919', sent:'#fcc4cb'};
			 //let bg     = {received:'#A2EA4A', sent:'#FF7251'};
			 let bg     = {received:'#3498db', sent:'#1abc9c', refunded:'#3498db', discounted:'#1abc9c'};
       let dea    = {received:'De:', sent:'A:', refunded:'De:', discounted:'A:'};
       let _type  = rowData.from.name.endsWith(this.props.account.name) ? 'sent' : 'received';
       let _dea   = _type;
       let fecha  = this._getFecha(rowData.block.timestamp);
			 let hora   = this._getHora(rowData.block.timestamp);
			 let asset_symbol = config.ASSET_SYMBOL;
       let message = undefined;
       let _rotato = _type;
       if(rowData.message)
         message = (<Text style={styles.row_message}>{rowData.message}</Text>);
       else
        if(rowData.memo)
        {
          let msg 		      = config.fromHex(rowData.memo.message);
					let prefix 	      = msg.substring(0,3);
          if(prefix==config.REFUND_PREFIX)
          {
            _dea  = !this.state.is_subaccount?'refunded':'discounted';
            _type = 'refunded';
            _rotato = _type + (this.state.is_subaccount?'_subacc':'');
          }
          if(prefix==config.PAYDISCOUNTED_PREFIX)
          {
            _dea  = !this.state.is_subaccount?'discounted':'refunded';
            _type = 'discounted';
            _rotato = _type + (this.state.is_subaccount?'_subacc':'');
          }
					// let memo_account = msg.substring(4);
          message = (<Text style={styles.row_message}>{msg}</Text>);
        }

       return (
        <TouchableHighlight underlayColor={'#ccc'} onPress={() => { this._onPressButton(rowID, rowData)}}>
          <View style={styles.row_container}>
            <View style={[styles.row_avatar, {backgroundColor:bg[_type]}]}>
              <Image source={iconsMap['ios-arrow-round-up']} style={[styles.row_arrow, {transform : [{rotate: rotato[_rotato]}]}]}/>
            </View>
            <View style={styles.row_content}>
              <View style={styles.row_line1}>
                <Text style={styles.row_amount}>{asset_symbol}{rowData.amount.quantity} {mapa[_type]}</Text>
              </View>
              <View style={styles.row_line2}>
                <Text style={styles.row_dea}>{dea[_dea]} </Text>
                <Text>{((_type == 'received' || _type == 'refunded') && !this.state.is_subaccount) ? rowData.from.name : rowData.to.name}</Text>
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
