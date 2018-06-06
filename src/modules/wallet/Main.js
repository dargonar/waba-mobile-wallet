import React, { PropTypes, Component } from 'react';
import {
	Alert,
	View
} from 'react-native';

// import * as walletActions from './wallet.actions';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './styles/Main';
import Balance from './components/Balance';
import History from './components/History';
import ActionButton from 'react-native-action-button';
import { iconsMap } from '../../utils/AppIcons';
import Icon from 'react-native-vector-icons/Ionicons';

class Main extends Component {

	constructor(props) {
		super(props);
    this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
		this.state = {account:''};
		this.newTx = this.newTx.bind(this);
	}

	componentWillMount() {

	}

	componentWillReceiveProps(nextProps) {
  	//console.log('Main::componentWillReceiveProps', nextProps);
	}

	newTx(){
		this.props.navigator.push({
      screen: 'wallet.SelectRecipient',
			title: 'Comercio'
		});
	}
  _onNavigatorEvent(event) {

//     if(event.id == 'newTx') {
//       this.props.navigator.push({
//         screen: 'wallet.SelectRecipient',
// 				title: 'Seleccione destinatario'
//       });
//     }
		if(event.id == 'qrCode') {
			Alert.alert(
				'No disponible',
				'Función no disponible.',
				[
					{text: 'OK'},
				]
			)
    }

  }

	render() {
		let icon = (<Icon name="ios-add" style={styles.actionButtonIcon} />);
		let buttonColor =	'#f15d44';
		return (
			<View style={styles.container}>
        <Balance {...this.props} style={styles.balance}/>
        <History {...this.props} style={styles.history}/>
				<ActionButton buttonColor={buttonColor} style={styles.actionButton} onPress={() => {  this.newTx() }} icon={ icon } />
      </View>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		history: state.wallet.history,
		balance: state.wallet.balance
	}
}

// function mapDispatchToProps(dispatch) {
// 	return {
// 		actions: bindActionCreators(walletActions, dispatch)
// 	};
// }


export default connect(mapStateToProps, null)(Main);
