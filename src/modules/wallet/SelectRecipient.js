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

class SelectRecipient extends Component {
  
  static navigatorStyle = {
    navBarTextColor: '#ffffff', 
    navBarBackgroundColor: '#1f475b',
    navBarButtonColor: '#ffffff'
  }
  
  constructor(props) {
    super(props);
//     this._onNavigatorEvent = this._onNavigatorEvent.bind(this);
//     this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
    
    this._onChangeText        = this._onChangeText.bind(this);
    this._onClearButtonPress  = this._onClearButtonPress.bind(this);
    //this._onUserSelected			= this._onUserSelected.bind(this);
		
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
  
	_onClearButtonPress() {
  
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

  renderRow (rowData, sectionID) {
		return (
      <ListItem
				onPress = {() => { 
					console.log(rowData);
				}}
				underlayColor='#cccccc'
        key={sectionID}
        title={rowData.name}
      />
    )
  }
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
						renderRow={this.renderRow}
						dataSource={this.state.dataSource}
					/>
				</List>
			)
		
		return (
      
      <View style={styles.container}>
        <SearchBar
          lightTheme
          onChangeText={this._onChangeText}
          placeholder='Buscar destinatario...' />
        {content}
      </View>
    );
  }
}

// function mapDispatchToProps(dispatch) {
// 	return {
// 		actions: bindActionCreators(walletActions, dispatch)
// 	};
// }

export default SelectRecipient;