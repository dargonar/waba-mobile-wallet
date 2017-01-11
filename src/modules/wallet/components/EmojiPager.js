'use strict';

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
	ListView,
  Dimensions,
  ToastAndroid,
  Platform,
  Image
} from 'react-native';

import { emojisByCategory, CATEGORIES } from 'react-native-emoji-picker';

var ViewPager = require('react-native-viewpager');

var deviceWidth  = Dimensions.get('window').width;

var styles2 = StyleSheet.create({
    list: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    item: {
        backgroundColor: '#FFFFFF00',
			  textAlign: 'center',
        margin: 0,
			  padding: 5,
			  flex: 10,
				fontFamily: 'monospace',
        //width: 40,
        //height: 40,
			  fontSize: 25
    }
});

var EmojiCategory = React.createClass({
	
	getInitialState: function() {
    
		var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

// 		var a = emojisByCategory[this.props.category];
// 		var arrays = [], size = 8;
// 		while (a.length > 0)
// 			arrays.push(a.splice(0, size));
		
    return {
			dataSource: dataSource.cloneWithRows([{id:this.props.category, items:emojisByCategory[this.props.category]}])
    };
  },
	
	
// 	renderEmojis: function(emojis) {
// 		emojis.map((e, idx) => return (<Text key={e} onPress={() => this.props.onEmojiSelected(e)} style={styles2.item}>{e}</Text>)
// 	  );
// 	},
	//this.renderEmojis
	//onPress={() => this.props.onEmojiSelected(e)} 
	//key={e} style={styles2.item}

	//renderRow={(emojis) => { console.log('VAN EMO =>', emojis ); return emojis.map((e, idx) =>{ return (<Text key={e} style={styles2.item} onPress={() => this.props.onEmojiSelected(e)} >{e}</Text>) }); }}

	render: function() {
			return (
				<ListView contentContainerStyle={styles2.list}
					dataSource={this.state.dataSource}
				  scrollRenderAheadDistance={40}
					initialListSize={10}
					renderRow={(e) => {
						return (
							<Text key={e.id} style={styles2.item} onPress={() => this.props.onEmojiSelected(e.id)} >{e.items.join(' ')}</Text>
						)
					}}
				/>
			);
		}

});

var EmojiPager = React.createClass({
  
	getInitialState: function() {
    
		var dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });

    return {
      dataSource: dataSource.cloneWithPages(CATEGORIES),
    };
  },

  render: function() {
    return (
      <ViewPager
        style={styles.viewpager}
        dataSource={this.state.dataSource}
        renderPage={this._renderPage}
				renderPageIndicator={false}
        onChangePage={this._onChangePage}
        isLoop={false}
        autoPlay={false}/>
    );
  },
  
  _renderPage: function(data, pageID) {
    console.log('_renderPage =>', data, pageID);
			return (
				<EmojiCategory 
				{...this.props}
				category={data}/>
    );
  },

  _onChangePage: function(
    page: number | string
  ) {

  },

});

var styles = StyleSheet.create({
  viewpager:{
    flex:4,
    flexDirection: 'column'
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B5F83',
    paddingLeft:20,
    paddingRight:20
  },
  titleText: {
        color:"#ffffff", 
        textAlign:'center',
        fontFamily : 'roboto_light',
        fontWeight : '100',
        fontSize   : 30,
        lineHeight : 35,
        marginBottom:20
  },
	tagLine:{
      color:"#ffffff", 
      textAlign:'center',
      fontFamily : 'roboto_light',
      fontWeight : '100',
      fontSize   : 15,
      lineHeight : 20
  }
});

module.exports = EmojiPager;