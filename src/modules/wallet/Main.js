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

import { iconsMap } from '../../utils/AppIcons';

class Main extends Component {

	constructor(props) {
		super(props);
    this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
		this.state = {account:''};
	}
	
	componentWillMount() {
	
	}

	componentWillReceiveProps(nextProps) {
  	//console.log('Main::componentWillReceiveProps', nextProps);
	}

  _onNavigatorEvent(event) {

    if(event.id == 'newTx') {
      this.props.navigator.push({
        screen: 'wallet.SelectRecipient',
				title: 'Seleccione destinatario'
      });
    }
		if(event.id == 'qrCode') {
			Alert.alert(
				'No disponible',
				'Función no disponible en versión DEMO.',
				[
					{text: 'OK'},
				]
			)      
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