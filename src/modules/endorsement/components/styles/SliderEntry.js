import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.35;
const slideWidth = wp(75);

export const sliderWidth = viewportWidth;
export const itemHorizontalMargin = wp(2);
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: 'hsl(15, 55%, 50%)',
    background2: 'hsl(230, 30%, 45%)'
};

export default StyleSheet.create({
    avalI_bg:{ backgroundColor:'#EF8B8A'},
    avalX_bg:{ backgroundColor:'#6E75AC'},
    avalXXX_bg:{ backgroundColor:'#5CD59E'},
	//
    slideInnerContainer: {
        width: itemWidth,
        height: slideHeight,
        paddingHorizontal: itemHorizontalMargin,
        paddingBottom: 18 // needed for shadow
        
    },
    cardContainer: {
        flex: 5,
				justifyContent: 'center',
        flexDirection: 'column',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius,
//         paddingTop: 40 - entryBorderRadius,
				paddingTop: 16,
        paddingBottom: 16,
        paddingHorizontal: 16,
    },
    title: {
        color: 'white',
        fontFamily : 'roboto_thin',
				fontWeight : '100',
				fontSize: 30,
        letterSpacing: 0.5,
        textAlign:'center'
        
    },
    subtitle: {
			color: '#1a1917',
			fontSize: 10,
			fontFamily : 'roboto_light',
			fontWeight : '300'
    },
		content:{
			color: 'white',
			fontSize: 13,
			fontFamily : 'roboto_light',
			fontWeight : '100',
			flex:1
		},
    remaining:{
      flex:1,
			color: '#DDDDDD',
			//color: '#888888',
			fontSize: 10,
			fontFamily : 'roboto_light',
			fontWeight : '100',
      textAlign: 'right'  
    },
		parLogo: {
			width:40,
			height:40,
			alignItems: 'center',
			justifyContent: 'center'
  	},
		iconChecked: {
			width:40,
			height:40,
			alignItems: 'center',
			justifyContent: 'center'
  },
});
