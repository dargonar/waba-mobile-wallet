import React, { PropTypes, Component } from 'react';
import { SearchBar } from 'react-native-elements'
//import { List, ListItem } from 'react-native-elements'
import { ActivityIndicator } from 'react-native';

import {
  View,
  ListView
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from './wallet.actions';
import { iconsMap } from '../../utils/AppIcons';
import * as config from '../../constants/config';

import styles from './styles/SelectRecipient';

import { Image } from 'react-native';
import { List, ListItem, Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';


class FindUser extends Component {

  static navigatorStyle = {
    navBarTextColor: '#ffffff',
    navBarBackgroundColor: '#f15d44',
    navBarButtonColor: '#ffffff',
		navBarTextFontFamily: 'roboto_thin',
    topBarElevationShadowEnabled: false
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
			recipient_selected : false,
      error: false,
      users: []
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
		walletActions.retrieveUsers(search, '2').then( (users) => {
			console.log('Traemos');
			this.setState({
        users:      users['res'],
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

  componentWillUnmount() {
//     AppState.removeEventListener('change', this.handleAppStateChange);
  }

  focus() {
  }

	_onRecipientSelected(data){
    console.log(' -- recipientSelected', JSON.stringify(data))
    return;
    this.setState({recipient_selected:true});
		this.props.actions.memoSuccess('');
		this.props.navigator.push({
			screen: 'wallet.SelectAmount',
			title: 'Monto de factura',
			passProps: {recipient: data}
			// ,rightButtons: [
			// 	{
			// 		icon: iconsMap['ios-attach'],
			// 		id: 'attachMemo'
			// 	}
			// ]
		});

	}

  render() {
    // console.log(this.state.dataSource);
    console.log(' -- SelectRecipient::render()');
    let content = undefined;
    // <Image style={{width: 60, height: 60, resizeMode: Image.resizeMode.contain, borderWidth: 0}} source={{uri: base64Icon}}/>
		if ( this.state.refreshing )
			content = (
				<View style={{ flex: 1, justifyContent: 'center'}}>
					<ActivityIndicator size="large" color="#0B5F83" />
				</View>
			)
		else
    content = (
      <Container style={{ flex: 1}}>
        <Content style={{ flex: 1, backgroundColor:'#0000ff'}}>
          <List dataArray={this.state.users} renderRow={(rowData) =>
            <ListItem avatar onPress={this._onRecipientSelected.bind(this, rowData)}>
                <Left>
                  <Thumbnail source={{uri: rowData[2]}} />
                </Left>
                <Body>
                  <Text>{rowData[0]}</Text>
                  <Text note>{rowData[1]}</Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
              } />
       </Content>
     </Container>
    )

		return (

      <View style={styles.container}>
        <SearchBar
          lightTheme
          onChangeText={this._onChangeText}
          autoFocus={true}
					ref={(searchBar) => this.searchBar = searchBar}
					placeholder='Buscar usuario...'
					placeholderStyle={{}}
					inputStyle={{color:'#000000', textDecorationLine :'none'}}
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

	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(walletActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(FindUser);
