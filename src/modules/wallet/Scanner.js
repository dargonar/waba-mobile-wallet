var React = require('React');

import BarcodeScanner from 'react-native-barcodescanner';

var Scanner = React.createClass({
  statics : {
  
    navigatorStyle : {
      navBarHidden: true,
    },

  },

  getInitialState: function() {
    return {
      torchMode: 'off',
      cameraType: 'back',
    };
  },

  barcodeReceived: function(e) {
    console.log('Barcode: ' + e.data);
    console.log('Type: ' + e.type);
  },

  render: function() {
    return (
      <BarcodeScanner
        onBarCodeRead={this.barcodeReceived}
        style={{ flex: 1 }}
        torchMode={this.state.torchMode}
        cameraType={this.state.cameraType}
      />
    );
  }
});

module.exports = Scanner;