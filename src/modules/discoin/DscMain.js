import React, { PropTypes, Component } from 'react';

import {
  Alert,
	Text,
	TouchableHighlight,
	View

} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from '../wallet/wallet.actions';
// import styles from './styles/SendConfirm';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import Bts2helper from '../../utils/Bts2helper';

import * as config from '../../constants/config';

import { Transactions, Header, Footer } from './components/balance';
import mock from './static/mock';

class DscMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transactions:[]
    }

    // this._buildMemo = this._buildMemo.bind(this);
  }

  async fetchTransactions () {
    this.setState({
      transactions: mock
    })
  }

  componentDidMount () {
    this.fetchTransactions()
  }

  goToTransaction = id => () => {
    // business logic 💰
  }

  render() {
    const { transactions } = this.state
    return (
      <View  style={{ flex: 1 }}>
        <Header menuToggle={this.menuToggle} qrToggle={this.qrToggle} />
        <Transactions transactions={transactions} navigationHandler={this.goToTransaction} />
        <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(DscMain);
