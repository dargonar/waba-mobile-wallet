import React, { PropTypes, Component } from 'react';
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  ToastAndroid,
  View,
  ListView,
  StyleSheet,
  Dimensions
} from 'react-native';

import { List, ListItem } from 'react-native-elements'
import { ActivityIndicator } from 'react-native';

import * as walletActions from './wallet.actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './styles/Main';
import * as config from '../../constants/config';

import { Fab, Icon, Button } from 'native-base';
import { iconsMap } from '../../utils/AppIcons';

const alignItemsMap = {
  center: "center",
  left: "flex-start",
  right: "flex-end"
};

const item_width     = (Dimensions.get('window').width)-30;
const xx = item_width-40;
const styles_x = StyleSheet.create({
  
  container:{flex:1, paddingTop:3, backgroundColor:'#f0f0f0'},
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
  businessCard: {
    borderRadius: 7,
    marginTop: 11,
    width: undefined,
    marginLeft:11,
    marginRight:11,
    height: 60,
    elevation: 5,
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
    flex: 1
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
    
    width: 60,
    height: 60,
    // flex:1,
    // resizeMode: 'cover',
    borderBottomLeftRadius: 7,
    borderTopLeftRadius: 7,
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

class FindUser extends Component {

  constructor(props) {
    super(props);

    this._onChangeText        = this._onChangeText.bind(this);

    let dataSource = new ListView.DataSource({
      rowHasChanged : this._rowHasChanged.bind(this)
    });

    this.state = {
      dataSource :          dataSource,
      refreshing :          false,
      recipient_selected :  false,
      error:                false,

      search_type:          props.search_type,

      reward_info:          props.reward_info || {},

      search_text:''
    };

    this.tid = undefined;
  }

  static navigatorStyle = {
    navBarButtonColor: '#000',
    navBarBackgroundColor: '#f0f0f0',
    topBarElevationShadowEnabled: false,
    navBarTextFontFamily: 'Montserrat-Regular'
  }

  _onChangeText(text) {
    // clearTimeout(this.tid);
    // let that = this;
    // this.tid = setTimeout( () => {
    //   that.pedir(text);
    // }
    // , 700);
    
    this.setState({search_text:text});
    
    clearTimeout(this.tid);
    let that = this;
    // this.tid = setTimeout( that.setBizFilter() , 700);
    // this.tid = setTimeout( that.setState( { search_text_posta:that.state.search_text } ) , 700);
    this.tid = setTimeout(() => {that.pedir( that.state.search_text )}, 700); //this starts the interval

  }

  _rowHasChanged(oldRow, newRow) {
    //console.log('rowHasChanged::', oldRow, '--->', newRow);
    //return true;
    return oldRow.id !== newRow.id;
  }

  componentWillMount() {
    this.setState({recipient_selected:false});
  }

  componentWillReceiveProps(nextProps) {
    //console.log('Main::componentWillReceiveProps', nextProps);
  }

  pedir(search) {
    console.log('Pedimos');
    this.setState({refreshing:true});
    let search_type = '0';
    
    if(this.state.search_type==config.SEARCH_TYPE_CONFIRM)
      search_type = '1';

    walletActions.retrieveUsers(search, search_type).then( (users) => {
      console.log('Traemos');
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(users['res']),
        refreshing: false,
        error:      false
      })

    }, (err) => {
      this.setState({refreshing:true});
      console.log('Error');
    })
  }

  componentDidMount() {
//     AppState.addEventListener('change', this.handleAppStateChange);
    this.pedir('');
  }

  _onRecipientSelected(data){
//    if(this.state.recipient_selected)
//      return;

    //data.push(undefined);

    if(this.state.search_type==config.SEARCH_TYPE_SEND)
    {
      this.setState({recipient_selected:true});
      this.props.actions.memoSuccess('');
      this.props.navigator.push({
        screen: 'wallet.SelectAmount',
        title: 'Cuánto quieres enviar?',
        passProps: {recipient: data, pay_or_send:'send'}
      });
    }

    if(this.state.search_type==config.SEARCH_TYPE_CONFIRM)
    {
      console.log(' ------------------ FindUSer -> ConfirmReward');
      console.log(JSON.stringify(this.state.reward_info));
      this.props.actions.memoSuccess('');
      this.props.navigator.push({
        screen: 'wallet.RewardConfirm',
        title: 'Confirmar recompensa',
        passProps: {
            recipient: data,
            ...this.state.reward_info
        }
      });
    }
  }

  _onScanQR(){
    this.props.navigator.push({
      screen: 'wallet.QRScanner',
      title: 'Escanear QR de discoiner',
      passProps: {mode:config.QRSCAN_ACCOUNT_ONLY}
    });
  }

  _renderRow(rowData, sectionID, rowID) {
    
    var imgSource = config.getIdenticonForHash(rowData[2]) ;
    if(!rowData[2] || rowData[2]=='') 
      imgSource = 'data:image/png;base64,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';  
    
    // const iconUser   = (<Icon name='user-circle' type='FontAwesome' style={{fontSize: 20, color: '#666'}}/>);
    // const iconBiz    = (<Icon name='store' type='MaterialCommunityIcons' style={{fontSize: 20, color: '#666'}}/>);
    const iconUser   = (<Icon name='md-person' style={{fontSize: 20, color: '#666'}}/>);
    // const iconBiz    = (<Icon name='store' style={{fontSize: 20, color: '#666'}}/>);
    const iconBiz    = (<Image source={{uri:iconsMap['store--active'].uri}} style={{height:20,width:20, color:'#666'}} />);
    
    let icon = iconUser;
    if(Math.random()>0.5)
      icon = iconBiz;

    return (
      <TouchableHighlight style={styles_x.businessCard}
        onPress={this._onRecipientSelected.bind(this, rowData)}
        underlayColor="#FFF">
        <View style={{flexDirection: 'row', flex:1}}>
          <View style={{width:60}}>
            <Image style={styles_x.thumb} source={{uri:imgSource}} >
            </Image>
          </View> 
          <View style={[styles_x.businessCardInfoContainer, { flexDirection: 'row', alignItems:'center' }]}>
            <View style={{flex:3}}>
              <Text style={styles_x.businesseCardTitle}>{rowData[0]} </Text>
            </View>
            <View style={{justifyContent: 'flex-end', flex: 1}}>
              {icon}
            </View>
          </View>

        </View>
      </TouchableHighlight>
    );
  }
  // FAV Button: https://github.com/mastermoo/react-native-action-button
  render() {
    
    // console.log(' ----- iconsMap[store]:', iconsMap['store']);

    const iconQrcode = (<Image source={iconsMap['qrcode--active']} style={{resizeMode:'contain', height:20,width:20}} />);
    let content = undefined;
    if ( this.state.refreshing )
      content = (
        <View style={{ flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#0B5F83" />
        </View>
      )
    else
      content = (
          <ListView
            style={{backgroundColor:'#f0f0f0'}}
            contentContainerStyle={{backgroundColor:'transparent'}}
            renderRow={this._renderRow.bind(this)}
            dataSource={this.state.dataSource}
            enableEmptySections={true}
          />
      )

    return (
    <View style={styles.container}>
        
        <View style={{height:60, paddingLeft:20, paddingRight:20, backgroundColor:'#f0f0f0', flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
          <View style={{width:20, marginRight:10, alignSelf:'center', flexDirection:'row', justifyContent: 'center'}}>  
            <Icon name="ios-search" size={18}  style={{color:'#cccccc'}}  />
          </View>
          <TextInput
            autoCapitalize="none"
            style={[styles.textInputPlaceholder, {flex:1}]}
            onChangeText={this._onChangeText}
            value={this.state.search_text}
            underlineColorAndroid ="transparent"
            placeholder="Buscar..."
          />
        </View>
        
        {content}        
        
        <Fab
            style={{ backgroundColor: '#ff7233' }}
            position="bottomRight"
            onPress={ this._onScanQR.bind(this) }>
            {/*
              <Icon name="qrcode-scan" type='MaterialCommunityIcons' style={{fontSize: 20, color: '#fff'}} />
              <Icon name="ios-qr-scanner" style={{fontSize: 20, color: '#fff'}} />
            */}
            {iconQrcode}
        </Fab>

      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    account: state.wallet.account,
    history: state.wallet.history
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(walletActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(FindUser);
