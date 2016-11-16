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
		return (
      <Image source={require('./img/bg-dashboard.png')} style={styles.container}>
        <View style={styles.balance}> 
          <Text style={styles.int_part}>4500.</Text>
          <Text style={styles.dec_part}>00</Text>
        </View>
        <Text style={styles.currency}>CREDITOS</Text>
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
		//moviesGenres: state.movies.genres
	};
}

export default connect(mapStateToProps, null)(Balance);
