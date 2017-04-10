import { StyleSheet } from 'react-native';
import {colors} from '../components/styles/SliderEntry'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:'#FFF'
	},
	fullWidthButton: {
    	borderRadius: 0,
        height:100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    		backgroundColor: '#044967' 
      },
    	fullWidthButtonDisabled: {
        backgroundColor: '#999999'
      },
    	fullWidthButtonText: {
        fontFamily : 'roboto_light',
    		fontWeight : '100',
        fontSize   : 20,
    		color: 'white'
      },
	fullWidthButtonTextDisabled:{
		fontFamily : 'roboto_light',
		fontWeight : '100',
        fontSize   : 15,
		color			 : '#cccccc'
	},

	colorsContainer: {
		...StyleSheet.absoluteFillObject,
    flexDirection: 'row'
	},
    color1: {
        flex: 1,
        backgroundColor: colors.background1
    },
    color2: {
        flex: 1,
        backgroundColor: colors.background2
    },
    scrollview: {
        flex: 4
//         paddingTop: 50
    },
    title: {
			backgroundColor: 'transparent',
      fontFamily : 'roboto',
			fontWeight : '700',
			fontSize: 15,
			color: '#D5D5D5'
    },
    subtitle: {
			marginTop: 5,
			backgroundColor: 'transparent',
			fontFamily : 'roboto_light',
			fontWeight : '100',
			fontSize: 11,
			fontStyle: 'italic',
			color: '#D5D5D5'
    },
    slider: {
        marginBottom: 30
    },
    sliderContainer: {
    }

});

export default styles;