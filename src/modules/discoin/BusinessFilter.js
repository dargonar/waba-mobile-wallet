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
    backgroundColor:'#f35b42',
    borderColor:'#f35b42',
    borderRadius:4
  },
  applyButtonText:{
    color: '#ffffff',
    fontFamily: 'roboto_bold',
    fontSize:     17,  
  },
  categoryButton:{
    marginRight: 10,
    marginTop: 10,
    padding:10,
    borderColor:'#f35b42',
    borderRadius:4
  },
  categoryButtonSelected:{
    backgroundColor:'#f35b42',
    marginRight: 10,
    marginTop: 10,
    padding:10,
    borderColor:'#f35b42',
    borderRadius:4
  },
  
  categoryButtonText:{
    color: '#f35b42',
    fontFamily: 'roboto_thin',
    fontSize:     15,
  },
  categoryButtonTextSelected:{
    color: '#ffffff',
    fontFamily: 'roboto_thin',
    fontSize:     15,  
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
      <Button bordered style={ [(selected_categories.indexOf(category.id)>-1)? styles.categoryButtonSelected : styles.categoryButton ] } onPress={ () => this._categorySelected(category['id']) } >
        <Text style={[(selected_categories.indexOf(category.id)>-1)? styles.categoryButtonTextSelected : styles.categoryButtonText ]}>{category['name']}</Text>
      </Button>
    ));

    return (
        <View style={{flex:1, paddingRight:10, flexDirection:'row', justifyContent: 'flex-start', flexWrap: 'wrap'}}>
          {buttons}
        </View> ); 

  }
  
  render() {

    return (
        <View style={styles.container}>
          <View style={{height:70, padding:20, backgroundColor:'#f35b42', flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color:'#ffffff', flex:1, alignSelf:'center', fontSize:18, fontFamily: 'roboto_bold'}}>Filtros</Text>
              <View style={{flex:1, alignSelf:'center', flexDirection:'row', justifyContent: 'flex-end'}}>  
                <Icon name='funnel' size={18}  style={{color:'#ffffff'}}  />
              </View>
            </View>
            
          <ScrollView style={{paddingBottom:0}} contentContainerStyle={{ flexDirection:'column', padding:20}}>
            
            <View style={{height:60, paddingLeft:10, paddingRight:10, backgroundColor:'#ffbe1d', flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
              <View style={{width:20, alignSelf:'center', flexDirection:'row', justifyContent: 'center'}}>  
                <Icon name="ios-search" size={18}  style={{color:'#ffffff'}}  />
              </View>
              <TextInput
                autoCapitalize="words"
                style={[styles.textInputPlaceholder, {flex:1}]}
                onChangeText={(text) => this.setState( { searchText:text } ) }
                value={this.state.searchText}
                underlineColorAndroid ="transparent"
                placeholder=""
              />
            </View>

            <View style={{flex:1, marginTop:20, paddingRight:10, flexDirection:'column', justifyContent: 'flex-start'}}>
              <View style={{height:40, alignSelf:'stretch', paddingRight:10, flexDirection:'column', justifyContent: 'center'}}>
                <Text style={{fontSize:18, fontFamily: 'roboto_bold'}}>Categorías</Text>
              </View>  

              {this.renderCategoryButtons()}
              
            </View>
            
            <View style={{flex:1, marginTop:20, flexDirection:'column', paddingTop:10,justifyContent: 'center', borderTopWidth:1, borderTopColor:'#cecece'}}> 
              <Button block style={styles.applyButton} onPress={ () => this.applyFilter() } >
                <Text style={styles.applyButtonText}>Aplicar</Text>
              </Button> 
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
