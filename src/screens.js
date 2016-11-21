/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';

import Drawer from './modules/_global/Drawer';
import Main from './modules/wallet/Main';
import SelectRecipient from './modules/wallet/SelectRecipient';
import SelectAmount from './modules/wallet/SelectAmount';

export function registerScreens(store, Provider) {
	Navigation.registerComponent('wallet.Main', () => Main, store, Provider);
	Navigation.registerComponent('wallet.SelectRecipient', () => SelectRecipient);
	Navigation.registerComponent('wallet.SelectAmount', () => SelectAmount);
	Navigation.registerComponent('wallet.Drawer', () => Drawer);
}