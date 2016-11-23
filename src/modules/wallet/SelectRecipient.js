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
import styles from './styles/SelectRecipient';
import * as walletActions from './wallet.actions';
import { iconsMap } from '../../utils/AppIcons';

class SelectRecipient extends Component {
  
  static navigatorStyle = {
    navBarTextColor: '#ffffff', 
    navBarBackgroundColor: '#1pf475b',
    navBarButtonColor: '#ffffff'
  }
  
  constructor(props) {
    super(props);
//     this._onNavigatorEvent = this._onNavigatorEvent.bind(this);
//     this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
    
    this._onChangeText        = this._onChangeText.bind(this);
  	
    let dataSource = new ListView.DataSource({
      rowHasChanged : this._rowHasChanged.bind(this)
    });

    this.state = {
      dataSource : dataSource,
      refreshing : false
    };
		
	}
  
  _onChangeText() {
  
	}
  
  _rowHasChanged(oldRow, newRow) {
    //console.log('rowHasChanged::', oldRow, '--->', newRow);
    //return true;
    return oldRow.id !== newRow.id;
  }
  
  componentWillMount() {
    //this._retrieveHistory();
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

  componentDidMount() {
//     AppState.addEventListener('change', this.handleAppStateChange);
    console.log('Pedimos');
		this.setState({refreshing:true});
		walletActions.retrieveUsers('').then( (users) => {
			console.log('Traemos');
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(users),
				refreshing: false,
			})
			
		}, (err) => {
			console.log('Error');
		})
  }

  componentWillUnmount() {
//     AppState.removeEventListener('change', this.handleAppStateChange);
  }
  
  focus() {
  }
	
// 	onPress = {() => { 
// 					this.props.navigator.push({
// 						screen: 'wallet.SelectAmount',
// 						title: 'Indique monto',
// 						passProps: {recipient: rowData}
// 					});
					
// 	}}

// onPress={this._onRecipientSelected.bind(this, rowData)} 
// onPress = {() => { this._onRecipientSelected.bind(rowData) }}

	_onRecipientSelected(data){
		this.props.actions.memoSuccess('');		
		this.props.navigator.push({
			screen: 'wallet.SelectAmount',
			title: 'Indique monto',
			passProps: {recipient: data},
			rightButtons: [
				{
					icon: iconsMap['ios-attach'],
					id: 'attachMemo'
				}
			]
		});
		
	}
				
  renderRow (rowData, sectionID) {
		return (
      <ListItem
				onPress={this._onRecipientSelected.bind(this, rowData)} 
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
					<ActivityIndicator size="large" color="#1f475b" />
				</View>
			)
		else
			content = ( 
				<List>
					<ListView
						renderRow={(rowData, sectionID) => <ListItem
																			onPress={this._onRecipientSelected.bind(this, rowData)} 
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
          placeholder='Buscar destinatario...' 
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
		memo: state.wallet.memo
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(walletActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(SelectRecipient);
