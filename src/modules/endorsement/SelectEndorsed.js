import React, { PropTypes, Component } from 'react';
import { SearchBar } from 'react-native-elements'
import { List, ListItem } from 'react-native-elements'
import { ActivityIndicator } from 'react-native';

import {
  View,
  ListView
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from '../wallet/wallet.actions';
import { iconsMap } from '../../utils/AppIcons';
import * as config from '../../constants/config';

import styles from './styles/SelectEndorsed';

class SelectEndorsed extends Component {
  
  static navigatorStyle = {
    navBarTextColor: '#ffffff', 
    navBarBackgroundColor: '#0B5F83',
    navBarButtonColor: '#ffffff'
  }
  
  constructor(props) {
    super(props);
    
    this._onChangeText        = this._onChangeText.bind(this);
  	
    let dataSource = new ListView.DataSource({
      rowHasChanged : this._rowHasChanged.bind(this)
    });

    this.state = {
      dataSource : dataSource,
      refreshing : false,
			recipient_selected : false
    };

		this.tid = undefined;
	}
  
  _onChangeText(text) {
		clearTimeout(this.tid);
		let that = this;
		this.tid = setTimeout( () => {
			that.pedir(text);				
		}
		, 300);
		//console.log(text);
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
//     if (nextProps.users !== this.props.users) {
//       let data = nextProps.users;
//       //console.log('componentWillReceiveProps:', data);
//       this.setState({
//         dataSource: this.state.dataSource.cloneWithRows(data),
//         refreshing: false,
//       })
//     }
  }

  pedir(search) {
    console.log('Pedimos');
		this.setState({refreshing:true});
		walletActions.retrieveUsers(search).then( (users) => {
			console.log('Traemos');
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(users),
				refreshing: false,
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

  componentWillUnmount() {
//     AppState.removeEventListener('change', this.handleAppStateChange);
  }
  
  focus() {
  }
	
	_onEndorsedSelected(data){
// 		if(this.state.recipient_selected)
// 			return;
		
		//data.push(undefined);
		//console.log('_onEndorsedSelected =>', data);
		
		this.setState({recipient_selected:true}); 
// 		this.props.actions.memoSuccess('');		
		this.props.navigator.push({
			screen: 'wallet.SelectEndorseType',
			title: 'Indique tipo de aval',
			passProps: {recipient: data}
		});
		
	}
				
  renderRow (rowData, sectionID) {
		return (
      <ListItem
				onPress={this._onEndorsedSelected.bind(this, rowData)} 
				underlayColor='#cccccc'
        key={sectionID}
        title={rowData[0]}
				titleStyle={styles.rowText}
				fontFamily={'roboto_thin'}
				hideChevron={true}
				chevronColor={'transparent'}
      />
    )
  }
	
	//renderRow={this.renderRow}
  render() {
    //console.log(this.state.dataSource);
		
		let content = undefined;
		if ( this.state.refreshing )
			content = (	
				<View style={{ flex: 1, justifyContent: 'center'}}>
					<ActivityIndicator size="large" color="#0B5F83" />
				</View>
			)
		else
			content = ( 
				<List>
					<ListView
						renderRow={(rowData, sectionID) => <ListItem
																			onPress={this._onEndorsedSelected.bind(this, rowData)} 
																			underlayColor='#cccccc'
																			key={sectionID}
																			title={rowData[0]}
																		/>}
						dataSource={this.state.dataSource}
					/>
				</List>
			)
		
		return (
      
      <View style={styles.container}>
        <SearchBar
          lightTheme
          onChangeText={this._onChangeText}
          autoFocus={true}
					ref={(searchBar) => this.searchBar = searchBar} 
					placeholder='Buscar destinatario...' 
					placeholderStyle={{}}
					inputStyle={{color:'#000000', textDecorationLine :'none'}}
					placeholder="Ingrese nombre"
					placeholderTextColor="#999999"
					underlineColorAndroid ="transparent"
				/>
        {content}
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
	return {
		// memo: state.wallet.memo
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(walletActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(SelectEndorsed);
