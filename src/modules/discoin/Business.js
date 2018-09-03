import React, { PropTypes, Component } from 'react';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from '../wallet/wallet.actions';
// import styles from './styles/SendConfirm';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import Bts2helper from '../../utils/Bts2helper';

import * as config from '../../constants/config';

import { ToastAndroid, Dimensions, Alert,Platform, Image, ListView, TouchableHighlight, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native';

const item_width     = (Dimensions.get('window').width)-20;
const xx = item_width-40;
const styles = StyleSheet.create({
  container:{flex:1, paddingTop:3, backgroundColor:'#ffffff'},
  list: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff'
  },
  businessCard: {
    borderRadius: 4,
    marginTop:10,
    width: item_width,
    height: 120,
    elevation: 6,
    backgroundColor: '#FFF',
  },

  businessCardInfo: {
    color: '#000', 
    flexDirection: 'column',
  },
  businesseCardTitle:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#58595b',
    marginBottom: 6,
  },
  businessCardInfoContainer:{
    padding: 10,
    paddingTop: 5,
    flex: 1
  },
  businessCategorie:{
    fontSize: 8,
    fontWeight: 'bold',
    margin: 0,
    padding: 0,
    lineHeight: 10,
  },
  row: {
    margin: 5,
    width: item_width,
    height: item_width,
    backgroundColor: '#F6F6F6',
  },
  row2: {
    margin: 5,
    width: item_width,
    height: 120,
    backgroundColor: 'red',
    elevation: 6,
    borderRadius: 10,
  },
  thumb: {
    flex:1,
    width: null,
    height: null,
    resizeMode: 'cover',
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
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
    fontFamily : 'roboto_light',
    fontWeight: '100',
    fontSize: 15,
    lineHeight:15
  },
  discount: {
    color: '#fff',
    backgroundColor:'#6b91f8',
    alignSelf:'flex-end',
    padding: 13,
    paddingTop: 15,
    fontWeight: '100',
    borderRadius: 4,
    fontFamily : 'roboto_bold',
    fontSize: 26,
    lineHeight:15,
    flex: 1,
    marginRight: 2.5,
    marginTop: 8,
    textAlign: 'right', 
    justifyContent: 'flex-start'
  },
  reward: {
    color: '#fff',
    backgroundColor:'#ff7233',
    alignSelf:'flex-end',
    padding: 13,
    paddingTop: 15,
    fontWeight: '100',
    borderRadius: 4,
    fontFamily : 'roboto_bold',
    fontSize: 26,
    lineHeight:15,
    flex: 1,
    marginTop: 8,
    marginLeft: 2.5,
    textAlign: 'right', 
  },
  promoLabel:{
    fontSize: 12,
    fontWeight: '100',
    alignItems: 'flex-start',
    margin: 20,
    alignSelf: 'flex-start',
    height: 1,
  },
});

class Business extends Component {

  static navigatorStyle = {
    navBarTextColor: '#000000', 
    navBarBackgroundColor: '#ffffff',
    navBarButtonColor: '#000000',
    navBarTextFontFamily: 'roboto_normal'
  }
  
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource :      ds,
      refreshing :      false,
      error:            false,
      refreshing:       true,
      business_filter:  props.business_filter
    };
    
    this._renderRow = this._renderRow.bind(this);
    this._pressRow = this._pressRow.bind(this);    

    this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
  }

  _onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'filterBusinesses') {
        this.filterPressed();
      }
    }
  }
   
  filterPressed(){
    // podemos setear estado global para que muestre el filtro de negocios
    this.props.navigator.toggleDrawer({
      to: 'open',
      side: 'right',
      animated: true
    });
  }

  componentWillReceiveProps(nextProps) {
    
    console.log('******************** componentWillReceiveProps', 'Business will receive props!!!')

    if (nextProps.business_filter !== this.props.business_filter) {
      console.log('componentWillReceiveProps: new business_filter =>', nextProps.business_filter);
      this.setState({
          business_filter: nextProps.business_filter
      }, () => {
          this.fetchBusinesses();
      });

    }
  }

  fetchBusinesses () {

    let filter = this.state.business_filter;
    console.log('Pedimos -> fetchBusinesses');
    this.setState({refreshing:true});
    walletActions.retrieveBusinesses(0, 100, 'query', filter).then( (businesses) => {
      console.log('Traemos');
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(businesses['businesses']),
        refreshing: false,
        error:      false
      })
      ToastAndroid.show('fetchBusinesses() OK! ' + businesses['businesses'].length, ToastAndroid.LONG);
    }, (err) => {
      this.setState({refreshing:true});
      console.log('Error');
      ToastAndroid.show('fetchBusinesses() ERROR! ' + str(err), ToastAndroid.LONG);
    })
  }

  
  componentDidMount() {
//     AppState.addEventListener('change', this.handleAppStateChange);
    this.fetchBusinesses();
  }
  
  render() {

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
          contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          initialListSize={21}
          pageSize={1} // should be a multiple of the no. of visible cells per row
          scrollRenderAheadDistance={500}
          renderRow={(rowData, sectionID, rowID) => this._renderRow(rowData, sectionID, rowID)}
        />
    );

    return (
      <View style={styles.container}>
        {content}     
      </View>
    );
  }


  removePercent(value){
    return parseInt(value).toString();
  }


  _renderRow(rowData, sectionID, rowID) {
    
    var imgSource = config.FILES_URL + rowData['image'] ;
    if(!rowData['image'] || rowData['image']=='') 
      imgSource = 'data:image/png;base64,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';  
    
    let _discount = this.removePercent(rowData['discount_ex'][config.getToday()]['discount']);

    let _reward = this.removePercent(rowData['discount_ex'][config.getToday()]['reward']);


    return (
      <TouchableHighlight style={styles.businessCard}
        onPress={() => this._pressRow(rowID, rowData)}
        underlayColor="#FFF">
        <View style={{flexDirection: 'row', flex:1}}>
          <View style={{width:110}}>
            <Image style={styles.thumb} source={{uri:imgSource}} >
            </Image>
          </View> 
          <View style={styles.businessCardInfoContainer}>
            <View style={styles.businessInfo}>
              <Text style={styles.businesseCardTitle}>{rowData['name']} </Text>
              <View>
                <Text style={styles.businessCategorie}>{rowData['category']['name'].toUpperCase()}</Text>
                <Text style={styles.businessCategorie}>{rowData['subcategory']['name'].toUpperCase()}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', flex: 1}}>
              <Text style={styles.discount}><Text style={styles.promoLabel}>%</Text>{_discount}</Text>
              
              <Text style={styles.reward}><Text style={styles.promoLabel}>%</Text>{_reward}</Text>
              
            </View>
          </View>

        </View>
      </TouchableHighlight>
    );
  }

  _pressRow(rowID, rowData) {
    
    this.props.navigator.push({
      screen: 'discoin.BusinessProfile',
      title: rowData['name'],
      passProps: { business_data: rowData}
    });    
  }

}


function mapStateToProps(state, ownProps) {
  return {
    account         : state.wallet.account,
    balance         : state.wallet.balance,
    business_filter : state.wallet.business_filter
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(walletActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Business);
