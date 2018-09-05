import React, { PropTypes, Component } from 'react';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from '../wallet/wallet.actions';
// import styles from './styles/SendConfirm';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import Bts2helper from '../../utils/Bts2helper';

import * as config from '../../constants/config';
// import Icon from 'react-native-vector-icons/Ionicons';
import { ToastAndroid
      , Dimensions
      , Alert
      , Platform
      , Image
      , ListView
      , TouchableHighlight
      , StyleSheet
      , ScrollView
      , Text
      , TextInput
      , View 
      , ActivityIndicator } from 'react-native';

import {Button, Icon} from 'native-base';

// f35b42
const styles = StyleSheet.create({
  container:{flex:1, backgroundColor:'#ffffff'},
  textInputPlaceholder:{

    color               : '#ffffff',
    fontFamily          : 'roboto_normal',
    height              : 40, 
    borderBottomColor   : '#ffffff', 
    borderBottomWidth   : 1,
    fontSize            : 18,
    lineHeight          : 18
  },
  applyButton:{
    width: '90%',
    borderColor:'#f35b42',
    borderRadius:25,
    padding: 10,

  },
  applyButtonText:{
    // color: '#ffffff',
    // fontFamily: 'Montserrat-Medium',
    // fontSize:     17,  
    // textAlign: 'center',
    fontSize: 12,
    fontFamily : 'Montserrat-Bold',
    color: '#58595b',
    paddingLeft:10,
    paddingRight:10,
    marginBottom: 1,
    opacity: 0.5,
  },
  categoryButton:{
    width: '45%',
    marginBottom: 4,
    marginRight: 4,
    color: '#f35b42',
    borderRadius: 20,
    backgroundColor:'transparent',
    padding: 8,
    textAlign: 'center', 
    alignItems: 'center',
    borderColor: '#dcdcdc',
    borderWidth: 1,
  },
  categoryButtonSelected:{
    width: '45%',
    marginBottom: 4,
    marginRight: 4,
    color: '#FFF',
    borderRadius: 20,
    backgroundColor:'#ff9e5d',
    borderColor: '#f58b44',
    borderWidth: 1,
    padding: 8,
    textAlign: 'center',
    alignItems: 'center' 
  },
  
  categoryButtonText:{
    fontSize:     11,
    fontFamily: 'Montserrat-Medium',
  },
  categoryButtonTextSelected:{
    fontSize:     11,
    fontFamily: 'Montserrat-Medium',
    color: '#FFF',
  }
});

class BusinessFilter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: 'Buscar...',
      categories: [],
      selected_categories: props.business_filter.selected_categories,
      refreshing: false,
      error:      false

    };

    this.applyFilter       = this.applyFilter.bind(this);
    this._categorySelected = this._categorySelected.bind(this);
  }
 
  _categorySelected(category_id){
    let selected_categories = this.state.selected_categories;
    let index = selected_categories.indexOf(category_id);
    if (index > -1) {
      selected_categories.splice(index, 1);
    }
    else{
      selected_categories.push(category_id)
    }
    this.setState({selected_categories:selected_categories})
  }
  
  fetchCategories () {

    console.log('Pedimos');
    this.setState({refreshing:true});
    walletActions.retrieveCategories().then( (categories) => {
      console.log('Traemos');
      this.setState({
        categories: categories['categories'],
        refreshing: false,
        error:      false
      })
      // ToastAndroid.show('fetchCategories() OK! ' + categories['categories'].length, ToastAndroid.LONG);
    }, (err) => {
      this.setState({refreshing:true});
      console.log('Error');
      ToastAndroid.show('fetchCategories() ERROR! ' + str(err), ToastAndroid.LONG);
    })
  }

  // fetchSubCategories (cat_id) {
  // }

  componentDidMount() {
    this.fetchCategories();
  }

  _toggleDrawer() {
    this.props.navigator.toggleDrawer({
      to: 'closed',
      side: 'right',
      animated: true
    });
  }

  applyFilter(){
    let selected_categories = this.state.selected_categories;
    let filter = {
        ...this.props.business_filter,
        selected_categories:selected_categories
      }
    console.log('BusinessFilter::filtro aplicado!', JSON.stringify(filter));
    this.props.actions.businessFilterSuccessHACK(filter);
    this._toggleDrawer();
  }

  renderCategoryButtons() {
    if(!this.state.categories || this.state.categories.length==0)
      return (false);
    let selected_categories = this.state.selected_categories;
    let buttons = this.state.categories.map((category, i) => (
      <TouchableHighlight style={ [(selected_categories.indexOf(category.id)>-1)? styles.categoryButtonSelected : styles.categoryButton ] } onPress={ () => this._categorySelected(category['id']) } >
        <Text style={[(selected_categories.indexOf(category.id)>-1)? styles.categoryButtonTextSelected : styles.categoryButtonText ]}>{category['name']}</Text>
      </TouchableHighlight>
    ));

    return (
        <View style={{flex:1, paddingRight:10, flexDirection:'row', justifyContent: 'flex-start', flexWrap: 'wrap'}}>
          {buttons}
        </View> ); 

  }
  
  render() {

    return (
        <View style={styles.container}>
          <View style={{height:70, padding:20, paddingBottom: 0, backgroundColor:'#FFF', flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color:'#a7a8aa', flex:1, alignSelf:'center', fontSize:18, fontFamily: 'Montserrat-Medium'}}>Filtros</Text>
            </View>
            
          <ScrollView style={{paddingBottom:0}} contentContainerStyle={{ flexDirection:'column', padding:20, paddingTop: 0}}>
            

            <View style={{flex:1, marginTop:0, paddingRight:10, flexDirection:'column', justifyContent: 'flex-start'}}>
              <View style={{height:40, alignSelf:'stretch', paddingRight:10, marginBottom: 10, flexDirection:'column', justifyContent: 'center'}}>
                <Text style={{fontSize:18, fontFamily: 'Montserrat-Medium'}}>Categorías</Text>
              </View>  

              {this.renderCategoryButtons()}
              
            </View>
            
            <View style={{flex:1, marginTop:20, flexDirection:'column', paddingTop:10,justifyContent: 'center', borderTopWidth:1, borderTopColor:'#cecece'}}> 
              <TouchableHighlight block style={styles.applyButton} onPress={ () => this.applyFilter() } >
                <Text style={styles.applyButtonText}>Aplicar</Text>
              </TouchableHighlight> 
            </View>

          </ScrollView>
    
        </View>
    );
  }
}


BusinessFilter.propTypes = {
  navigator: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    account           : state.wallet.account,
    balance           : state.wallet.balance,
    fees              : state.wallet.fees,
    asset             : state.wallet.asset,
    blockchain        : state.wallet.blockchain,
    business_filter   : state.wallet.business_filter
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(walletActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessFilter);
