import React, { PropTypes, Component } from 'react';
import {
	View
} from 'react-native';

import { connect } from 'react-redux';

import styles from './styles/Main';
import Balance from './components/Balance';
import History from './components/History';

import { iconsMap } from '../../utils/AppIcons';

class Main extends Component {

  static navigatorButtons = {
    fab: {
      collapsedId     : 'new-transfer',
      collapsedIcon   : iconsMap['ios-add'],
      backgroundColor : '#415261'
    }
  };

  constructor(props) {
		super(props);

    //this._onNavigatorEvent = this._onNavigatorEvent.bind(this);
    
    this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
	}

	componentWillMount() {
		//this._retrieveHistory();
	}

	componentWillReceiveProps(nextProps) {

  }

  _onNavigatorEvent(event) {

    if(event.id == 'new_transfer') {
      this.props.navigator.push({
        screen: 'wallet.select_user'
      });
    }
    
  }

	render() {
		return (
			<View style={styles.container}>
        <Balance {...this.props} style={styles.balance}/>
        <History {...this.props} style={styles.history}/>
      </View>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {

  };
}

export default connect(mapStateToProps, null)(Main);