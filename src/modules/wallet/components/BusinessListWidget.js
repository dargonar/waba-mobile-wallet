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
	Dimensions,
	StyleSheet,
	ToastAndroid
} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import { Icon } from 'native-base';
import * as walletActions from '../wallet.actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as config from '../../../constants/config';

// import styles from './styles/History';
import { iconsMap } from '../../../utils/AppIcons';
import Bts2helper from '../../../utils/Bts2helper';
import OneSignal from 'react-native-onesignal';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-spinkit';


const item_width     = (Dimensions.get('window').width)-30;
const xx = item_width-40;
const styles = StyleSheet.create({
  container:{flex:8, paddingTop:3, backgroundColor:'#ffffff'},
  containerEmpty : {
    flex             : 7,
    alignItems       : 'center',
    justifyContent   : 'center'
  },
  emptyListText:{
      color:"#777777", 
      textAlign:'center',
      fontFamily : 'Montserrat-Regular',
      fontWeight : '100',
      fontSize   : 15,
      lineHeight : 20
  },
  bgImageWrapper: {
      position: 'absolute',
      top: 0, bottom: 0, left: 0, right: 0
  },
  bgImage: {
      flex: 1,
      opacity : 0.2 
      //resizeMode:'center'
  },
  button: {
    borderColor: '#8E8E8E',
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20
  },
  buttonText: {
    color: '#8E8E8E',
  },
	list: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff'
  },
  businessCard: {
    borderRadius: 7,
    marginTop: 22,
    width: undefined,
    marginLeft:22,
    marginRight:22,
    height: 110,
    elevation: 10,
    backgroundColor: '#FFF',
    borderColor: 'transparent'
  },

  businessCardInfo: {
    color: '#000', 
    flexDirection: 'column',
  },
  businesseCardTitle:{
    fontSize: 15,
    fontFamily : 'Montserrat-Medium',
    color: '#58595b',
    marginBottom: 3,
    marginTop: 3,
  },
  businessCardInfoContainer:{
    padding: 10,
    paddingTop: 5,
    paddingLeft: 8,
    flex: 1,
    flexDirection:'column'
  },
  businessCategorie:{
    fontSize: 7,
    fontFamily : 'Montserrat-Bold',
    letterSpacing: 10,
    margin: 1,
    padding: 0,
    lineHeight: 6,
    color: '#000',
    opacity: 0.25,
  },
  row: {
    margin: 5,
    width: item_width,
    height: item_width,
    backgroundColor: '#F6F6F6',
  },
  thumb: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    // right: 110,
    width:110,
    height:110,
    resizeMode: 'cover',
    borderBottomLeftRadius: 7,
    borderTopLeftRadius: 7,
  },

  paymentMethodsBG: {
    // flex:1,
    // width: 105,
    // height: null,

    position: 'absolute',
    top: 0,
    bottom: 70,
    left: 0,
    right: 0,
    borderTopLeftRadius: 7,
    backgroundColor: '#000',
    opacity:0.3

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
    textAlign: 'left',
    padding: 4,
    fontWeight: 'bold',
    opacity: 1,
    fontFamily : 'Montserrat-Medium',
    fontWeight: '100',
    fontSize: 15,
    lineHeight:15
  },
  discount: {
    color: '#fff',
    backgroundColor:'transparent',
    fontWeight: '100',
    borderRadius: 4,
    fontFamily : 'Montserrat-Regular',
    fontSize: 26,
    flex: 0,
    textAlign: 'right', 
  },
  reward: {
    color: '#fff',
    backgroundColor:'transparent',
    fontWeight: '100',
    borderRadius: 4,
    fontFamily : 'Montserrat-Regular',
    fontSize: 26,
    flex: 0,
    textAlign: 'right', 
  },
  rewardGradient: {
    flex: 1,
    borderRadius: 5,
    padding: 4,
    marginLeft: 4,
    marginTop: 6,
    paddingRight: 10
  },
  rewardIcon: {
    position: 'absolute',  
    color: '#FFF',
    opacity: 0.5,
  },
  discountGradient: {
    flex: 1,
    borderRadius: 5,
    padding: 4,
    marginRight: 4,
    marginTop: 6,
    paddingRight: 10
  },
  promoLabel:{
    flex: 1,
    textAlign: 'right',
    alignSelf: 'center',
    marginTop: -9,
    marginRight: 4,
    fontSize: 14,
    color: '#FFF',
    fontFamily : 'Montserrat-Light',
  },
  
  sectionTitle:{
    fontSize: 18,
    padding: 8,
    marginTop: 5,
    marginBottom: 4,
    paddingLeft: 0,
    color: '#a7a8aa',
    fontFamily : 'Montserrat-SemiBold',
  }, 
  discoinCount:{
    width: item_width,    
    alignItems: 'center',
    padding: 0,
    paddingRight: 20,
    flexDirection: 'row', 
    justifyContent: 'flex-end',
  },
  discoinCountValue:{
    fontSize: 45,
    fontFamily : 'Montserrat-Light', 
    color: '#FFF',
  },
  discoinCountGradient:{
    borderRadius: 35,
    height: 60,
  },
});

class BusinessListWidget extends Component {

	
	constructor(props) {
		super(props);

    let dataSource = new ListView.DataSource({
      rowHasChanged           : this._rowHasChanged.bind(this)
    });

    this.state = {
      dataSource :        dataSource.cloneWithRows(props.business_list || []),
      refreshing :        false,
			infiniteLoading :   false,
			bounceValue:        new Animated.Value(0),
			errors :            0,
      mode:               props.mode
    };

    // ToastAndroid.show(props.mode, ToastAndroid.SHORT);
		// this._onPressButton   = this._onPressButton.bind(this);
	}

	refreshBusinessList(start_offset) {
		//skip, count, query, filter
		if(start_offset == undefined) start_offset = 0;
    my_filter = this.props.business_filter;
    console.log(' ---- BusinessListWidget::this.state.mode:', this.state.mode)
    if(this.state.mode!='search')
      delete my_filter.search_text;
    if(this.state.mode=='search')
      my_filter['search_text'] = this.props.search_text;
		this.props.actions.retrieveBusinesses(
			start_offset,
			'',
			my_filter,
      this.state.mode
		);
	}

  componentWillReceiveProps(nextProps){

    console.log('BusinessListWidget::componentWillReceiveProps errors=>', nextProps.errors);

		let new_state = {};
	  // if (nextProps.business_list !== this.props.business_list) {
   //    console.log('componentWillReceiveProps: new business_list =>', nextProps.business_list.length);
   //    let data = nextProps.business_list;
   //    new_state.dataSource=this.state.dataSource.cloneWithRows(data);
   //  }
    if (nextProps.business_list !== this.props.business_list && this.state.mode=='main') {
			console.log('componentWillReceiveProps: new business_list =>', nextProps.business_list.length);
			let data = nextProps.business_list;
      new_state['dataSource']=this.state.dataSource.cloneWithRows(data);
		}

    if (nextProps.business_searched_list !== this.props.business_searched_list && this.state.mode=='search') {
      console.log('componentWillReceiveProps: new business_searched_list =>', nextProps.business_searched_list.length);
      let data = nextProps.business_searched_list;
      new_state['dataSource']=this.state.dataSource.cloneWithRows(data);
    }

		if(this.state.infiniteLoading) {
			new_state.infiniteLoading=false;
		}

		new_state.refreshing = false;

		if(nextProps.errors > this.state.errors) {
			ToastAndroid.show('Verifique su conexión a Internet', ToastAndroid.SHORT);
		}

    if(nextProps.business_filter!==this.props.business_filter)
    {
      this.refreshBusinessList();
      new_state.refreshing = true;
    }

    if(nextProps.search_text!==this.props.search_text && this.state.mode=='search')
    {
      this.refreshBusinessList();
      new_state.refreshing = true;
    }

    // ToastAndroid.show('about to update state', ToastAndroid.SHORT);
		console.log(' ----------**********----------- about to update state');
    this.setState(new_state);
  }

  _rowHasChanged(oldRow, newRow) {
    return (oldRow.mega_id !== newRow.mega_id)
  }

  componentDidMount() {
     
  //   AppState.addEventListener('change', this.handleAppStateChange);
		// let that = this;
		// OneSignal.configure({
		// 	onIdsAvailable: function(device) {
		// 		console.log('UserId = ', device.userId);
		// 		console.log('PushToken = ', device.pushToken);
		// 		//fetch('http://35.161.140.21:8080/api/v1/push_id', {
		// 		fetch(config.getAPIURL('/push_id'), {
		// 			method: 'POST',
		// 			headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
		// 			body: JSON.stringify({
		// 				name:   	that.props.account.name,
		// 				push_id: 	device.userId,
		// 			})
		// 		})
		// 		.then((response) => response.json())
		// 		.then((responseJson) => {
		// 			console.log('PUSH ID =>', responseJson);
		// 		});
		// 		//OneSignal.sendTags({"account" :that.props.account.name});
		// 		//OneSignal.getTags((receivedTags) => {
		// 		//	console.log('TAAAAGS=>', receivedTags);
		// 		//});

		// 	},
		// 	onNotificationOpened: function(message, data, isActive) {
		// 		console.log('*************************** ONE SIGNAL ');
		// 		console.log('MESSAGE: ', 	message);
		// 		console.log('DATA: ', 		data);
		// 		console.log('ISACTIVE: ', isActive);

		// 		let tx_info = {
		// 			message 	: message,
		// 			data 			: data,
		// 			isActive 	: isActive
		// 		}
		// 		that.props.actions.newTxHACK(tx_info);
		// 		/*
		// 		'MESSAGE: ', 'vaku te ha enviado 10 DSC'
		// 		'DATA: ', { sound: 'coins_received', smallIcon: 'ic_iconoclasa.png' }
		// 		'ISACTIVE: ', true
		// 		*/
		// 		that.refreshBusinessList();
		// 	}
		// });

	}



  componentWillUnmount() {
    // AppState.removeEventListener('change', this.handleAppStateChange);
  }

  // handleAppStateChange(appState) {
  //   if (appState === 'active') {
  //     // this.props.dispatch(loadSessions());
  //   }
  // }

//   _onPressButton(rowID, rowData) {
//     console.log('History::_onPressButton');

// // 		let data = this._getRowData(rowData);
// // 		this.props.navigator.push({
// // 			screen: 'wallet.TxDetails',
// // 			title: 'Detalles',
// // 			passProps: data
// // 		});

//   }

  _onRefresh() {
    this.setState({refreshing: true});
		this.refreshBusinessList(0);
  }

  _onEndReached()  {
		console.log('ON END REACHED!!!!!', this.props.business_list_at_end);

		
    if(this.props.business_list_at_end && this.state.mode=='main')
			return;

    if(this.props.business_searched_list_at_end && this.state.mode=='search')
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

		let last_id = this.state.mode=='main'?this.props.business_list.length:this.props.business_searched_list.length;
		// console.log('LAST ID=>', last_id);
		// parts = last_id.split('.').map( function(v){ return v>>0; });
		// parts[2]-=1;
		// last_id = parts.join('.');
		// console.log('LAST ID (tocado)=>', last_id);

		this.refreshBusinessList(last_id);
  }

	removePercent(value){
    return parseInt(value).toString();
  }

  _pressRow(rowID, rowData) {
    
    this.props.navigator.push({
      screen: 'discoin.BusinessProfile',
      title: rowData['name'],
      passProps: { business_data: rowData}
    });    
  }

	_renderRow(rowData, sectionID, rowID) {
    
    var imgSource = {uri:config.FILES_URL + rowData['logo']} ;
    if(!rowData['logo'] || rowData['logo']=='') 
    {
      imgSource = require('../img/discoin_logo.png');
      // console.log('---------', rowData['name'],  ' --> ', imgSource)
    }
    
    let _discount = this.removePercent(rowData['discount_ex'][config.getToday()]['discount']);

    let _reward = this.removePercent(rowData['discount_ex'][config.getToday()]['reward']);

    let cash_icon   =  (rowData['discount_ex'][config.getToday()]['pm_cash']==1)?(<Image source={{uri:iconsMap['cash'].uri}} style={{height:12, width:16, marginTop:2}} />):false;
    let credit_icon =  (rowData['discount_ex'][config.getToday()]['pm_credit']==1)?(<Image source={{uri:iconsMap['credit-card'].uri}} style={{height:12, width:16, marginTop:2, marginLeft:6}} />):false;
    let debit_icon  =  (rowData['discount_ex'][config.getToday()]['pm_debit']==1)?(<Image source={{uri:iconsMap['bank'].uri}} style={{height:12, width:12, marginLeft:6}} />):false;
             

    return (
      <TouchableHighlight style={styles.businessCard}
        onPress={() => this._pressRow(rowID, rowData)}
        underlayColor="#FFF">
        <View style={{flexDirection: 'row', flex:1}}>
          <View style={{width:110, height:110, overflow: 'hidden'}}>
            <Image style={styles.thumb} source={imgSource} ></Image>
          </View> 
          <View style={styles.businessCardInfoContainer}>
            
            <View style={{flexDirection: 'column', flex: 1}}>
              <Text style={styles.businesseCardTitle}>{rowData['name']} </Text>
              <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'row', flex: 1}}>
                  <Icon name='send' style={{fontSize: 18, color: '#dcdcdc', marginRight: 4}}/>
                  <View>
                    <Text style={styles.businessCategorie}>{rowData['category']['name'].toUpperCase()}</Text>
                    <Text style={styles.businessCategorie}>{rowData['subcategory']['name'].toUpperCase()}</Text>
                  </View>
                
                  <View style={{flex: 1, justifyContent:'flex-end', alignItems:'center', flexDirection: 'row', paddingRight:2}}>
                    {cash_icon}
                    {credit_icon}
                    {debit_icon}  
                  </View>
                </View>  
              </View>
            </View>
            
            <View style={{flexDirection: 'row', flex: 1}}>
              
              <LinearGradient start={{x: 0, y: 1}} end={{x: 0.75, y: 0}} colors={['#76eafa', '#6b91f8']} style={styles.discountGradient}>
                <View style={{flexDirection: 'row', flex: 1}}>
                  <Icon name="remove" style={{color: '#FFF', opacity: 0.3, position:'absolute', bottom: 0, top: 0, left: -5, fontSize: 40}}/>                  
                  <Text style={styles.promoLabel}>%</Text>
                  <Text style={styles.discount}>{_discount}</Text>
                </View>
              </LinearGradient>

              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#ff9e5d', '#ff7233']} style={styles.rewardGradient}>
                <View style={{flexDirection: 'row', flex: 1}}>
                  <Icon name="add" style={{color: '#FFF', opacity: 0.3, position:'absolute', bottom: 0, top: 0, left: -5, fontSize: 40}}/>
                  <Text style={styles.promoLabel}>%</Text>
                  <Text style={styles.reward}>{_reward}</Text>
                </View>
              </LinearGradient>
            </View>
          </View>

        </View>
      </TouchableHighlight>
    );
  }
	
  render() {

    console.log(' ----------**********----------- rendering biz list');
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
         		contentContainerStyle={{paddingBottom:30}}
            refreshControl={
	            <RefreshControl
	              refreshing={this.state.refreshing}
	              onRefresh={this._onRefresh.bind(this)}
	              colors={['#8ec919', '#fcc4cb', '#3498db']}
	            />}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow.bind(this)}
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
					<Text style={styles.emptyListText}>NO HAY COMERCIOS QUE MOSTRAR{"\n"}INTENTE CON OTRO FILTRO</Text>
					<TouchableOpacity style={styles.button} onPress={ this._onRefresh.bind(this) }>
            <Text style={styles.buttonText}>Actualizar</Text>
          </TouchableOpacity>
				</View>

			);
		}
  }
}

function mapStateToProps(state, ownProps) {
	return {
		business_list 				: state.wallet.business_list,
    business_searched_list: state.wallet.business_searched_list,
		account   						: state.wallet.account,
		business_list_at_end  : state.wallet.business_list_at_end,
		business_filter       : state.wallet.business_filter
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(walletActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(BusinessListWidget);
