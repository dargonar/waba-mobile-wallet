/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';

import Drawer from './modules/_global/Drawer';
import CreateAccount from './modules/wallet/CreateAccount';
import NewAccount from './modules/wallet/NewAccount';
import Main from './modules/wallet/Main';
import SelectRecipient from './modules/wallet/SelectRecipient';
import SelectAmount from './modules/wallet/SelectAmount';
import Memo from './modules/wallet/Memo';
import SendConfirm from './modules/wallet/SendConfirm';
import Sending from './modules/wallet/Sending';
import SendResult from './modules/wallet/SendResult';
import RecoveryKeywords from './modules/wallet/RecoveryKeywords';
import Welcome from './modules/wallet/Welcome';
import RestoreAccount from './modules/wallet/RestoreAccount';
import Settings from './modules/wallet/Settings';
import Onboarding from './modules/wallet/Onboarding';
import TxDetails from './modules/wallet/TxDetails';
import Endorsement from './modules/endorsement/Endorsement';
import SelectEndorsed from './modules/endorsement/SelectEndorsed';
import SelectEndorseType from './modules/endorsement/SelectEndorseType';
import ShareEndorsement from './modules/endorsement/ShareEndorsement';
import EndorseConfirm from './modules/endorsement/EndorseConfirm';

export function registerScreens(store, Provider) {

	Navigation.registerComponent('wallet.CreateAccount', () => CreateAccount);
	Navigation.registerComponent('wallet.NewAccount', () => NewAccount, store, Provider);
	Navigation.registerComponent('wallet.Main', () => Main, store, Provider);
	Navigation.registerComponent('global.Drawer', () => Drawer, store, Provider);
	Navigation.registerComponent('wallet.SelectRecipient', () => SelectRecipient, store, Provider);
	Navigation.registerComponent('wallet.SelectAmount', () => SelectAmount, store, Provider);
	Navigation.registerComponent('wallet.Memo', () => Memo, store, Provider);
	Navigation.registerComponent('wallet.SendConfirm', () => SendConfirm, store, Provider);
	Navigation.registerComponent('wallet.Sending', () => Sending);
	Navigation.registerComponent('wallet.SendResult', () => SendResult, store, Provider);
	Navigation.registerComponent('wallet.RecoveryKeywords', () => RecoveryKeywords, store, Provider);
	Navigation.registerComponent('wallet.Welcome', () => Welcome, store, Provider);
	Navigation.registerComponent('wallet.Drawer', () => Drawer);
	Navigation.registerComponent('wallet.RestoreAccount', () => RestoreAccount, store, Provider);
	Navigation.registerComponent('wallet.Settings', () => Settings, store, Provider);
	Navigation.registerComponent('wallet.Onboarding', () => Onboarding, store, Provider);
  Navigation.registerComponent('wallet.TxDetails', () => TxDetails, store, Provider);
  Navigation.registerComponent('endorsement.Endorsement', () => Endorsement, store, Provider);
  Navigation.registerComponent('endorsement.SelectEndorsed', () => SelectEndorsed, store, Provider);
  Navigation.registerComponent('endorsement.SelectEndorseType', () => SelectEndorseType, store, Provider);
	Navigation.registerComponent('endorsement.ShareEndorsement', () => ShareEndorsement, store, Provider);
	Navigation.registerComponent('endorsement.EndorseConfirm', () => EndorseConfirm, store, Provider);
}
