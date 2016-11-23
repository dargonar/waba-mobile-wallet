/* eslint-disable new-cap */
import React, { PropTypes, Component } from 'react';
import {
	Image,
	Text,
	View
} from 'react-native';

import { connect } from 'react-redux';
import styles from './styles/Balance';

class Balance extends Component {

	constructor(props) {
		super(props);
		// console.log(this.props.moviesGenres);
	}

	render() {
		//const { info, viewMovie } = this.props;
		
		//const int_part = 0;
		//const dec_part = 0;
		
		let b = this.props.balance;
		let parts = Number(b).toFixed(2).split('.');
		
		let p = undefined;
		if(parts[1] != '00')
			p = (<Text style={styles.dec_part}>.{parts[1]}</Text>)
		
		return (
      <Image source={require('./img/bg-dashboard.png')} style={styles.container}>
        <View style={styles.balance}> 
          <Text style={styles.int_part}>$ {parts[0]}</Text>
          {p}
        </View>
        <Text style={styles.currency}>PESO SOCIAL</Text>
      </Image>      
    );
	}
}

// CardMovie.propTypes = {
// 	info: PropTypes.object.isRequired,
// 	viewMovie: PropTypes.func.isRequired
// };

function mapStateToProps(state, ownProps) {
	return {
		balance: state.wallet.balance
	};
}

export default connect(mapStateToProps, null)(Balance);
