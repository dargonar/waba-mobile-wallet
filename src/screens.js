/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';

import Drawer from './modules/_global/Drawer';
import Onboard from './modules/_global/Onboard';

import Start from './modules/wallet/Start';
import NewAccount from './modules/wallet/NewAccount';

import Main from './modules/wallet/Main';

import { iconsMap } from './utils/AppIcons'

export function registerScreens(store, Provider) {

	Navigation.registerComponent('wallet.Start', () => Start);
	Navigation.registerComponent('wallet.NewAccount', () => NewAccount, store, Provider);
	Navigation.registerComponent('wallet.Main', () => Main, store, Provider);
	
	Navigation.registerComponent('global.Onboard', () => Onboard);
	Navigation.registerComponent('global.Drawer', () => Drawer);
}