import React, { PropTypes, Component } from 'react';

import {
  Alert,
	TouchableHighlight,
	ListView,
  View

} from 'react-native';

import { List, ListItem } from 'react-native-elements'
import { ActivityIndicator } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from '../wallet/wallet.actions';
// import styles from './styles/SendConfirm';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import Bts2helper from '../../utils/Bts2helper';

import * as config from '../../constants/config';

import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

// import mock from './static/mock';

class Business extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    let dataSource = new ListView.DataSource({
      rowHasChanged : this._rowHasChanged.bind(this)
    });

    this.state = {
      dataSource : dataSource,
      refreshing : false,
			recipient_selected : false,
      error: false
    };

    this.tid = undefined;
  }

  static navigatorStyle = {
    navBarTextColor: '#ffffff',
    navBarBackgroundColor: '#f15d44',
    navBarButtonColor: '#ffffff',
		navBarTextFontFamily: 'roboto_thin',
    topBarElevationShadowEnabled: false
  }

  _rowHasChanged(oldRow, newRow) {
    //console.log('rowHasChanged::', oldRow, '--->', newRow);
    //return true;
    return oldRow.id !== newRow.id;
  }

  async fetchBusinesses () {

    console.log('Pedimos');
		this.setState({refreshing:true});
		walletActions.retrieveBusinesses(0, 100, 'query', 'search').then( (businesses) => {
			console.log('Traemos');
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(businesses['businesses']),
				refreshing: false,
        error:      false
			})

		}, (err) => {
			this.setState({refreshing:true});
			console.log('Error');
		})
	}

  componentWillMount() {
    this.setState({recipient_selected:false});
  }

  componentDidMount () {
    this.fetchBusinesses()
  }

  goToTransaction = id => () => {
    // business logic
  }

  _onRecipientSelected(data){
    console.log(JSON.stringify(data));
  }

  // <Image source={{uri: 'Image URL'}} style={{height: 200, width: null, flex: 1}}/>

  render() {
    console.log(' -- Business::render()', this.state.refreshing);
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
            automaticallyAdjustContentInsets={false}
            renderRow={(rowData) => <Card>
                                     <CardItem>
                                       <Left>
                                         <Thumbnail source={require('./static/ic_coffee.png')} />
                                         <Body>
                                           <Text>{rowData['name']}</Text>
                                           <Text note>{rowData['description']}</Text>
                                         </Body>
                                       </Left>
                                     </CardItem>
                                     <CardItem cardBody>
                                       <Image source={require('./static/splash_logo.png')} style={{height: 200, width: null, flex: 1}}/>
                                     </CardItem>
                                     <CardItem>
                                       <Left>
                                         <Button transparent>
                                           <Icon active name="thumbs-up" />
                                           <Text>12 Likes</Text>
                                         </Button>
                                       </Left>
                                       <Body>
                                         <Button transparent>
                                           <Icon active name="chatbubbles" />
                                           <Text>4 Comments</Text>
                                         </Button>
                                       </Body>
                                       <Right>
                                         <Text> ago</Text>
                                       </Right>
                                     </CardItem>
                                   </Card>}
						dataSource={this.state.dataSource}
						enableEmptySections={true}
					/>
				</List>
			)

    return (
      <View  style={{ flex: 1 , backgroundColor:'#ffffff'}}>
        {content}
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
	return {
		account    : state.wallet.account,
		balance    : state.wallet.balance,
		fees       : state.wallet.fees,
		asset      : state.wallet.asset,
		blockchain : state.wallet.blockchain
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(walletActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Business);
