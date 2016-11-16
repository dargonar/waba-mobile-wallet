import React, { PropTypes, Component } from 'react';
import {
	View,
  Text
} from 'react-native';

import { connect } from 'react-redux';

import styles from './styles/SelectRecipient';

class SelectRecipient extends Component {

  constructor(props) {
		super(props);
//     this._onNavigatorEvent = this._onNavigatorEvent.bind(this);
//     this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
	}

	componentWillMount() {
		//this._retrieveHistory();
	}

	componentWillReceiveProps(nextProps) {

  }

//   _onNavigatorEvent(event) {

//     if(event.id == 'new_transfer') {
//       this.props.navigator.push({
//         screen: 'wallet.select_user'
//       });
//     }
    
//   }

	render() {
		return (
			<View style={styles.container}>
      
        <Text> Putorro {this.props.count} </Text>
      
      </View>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
    count : state.wallet.history.length
  };
}

export default connect(mapStateToProps, null)(SelectRecipient);