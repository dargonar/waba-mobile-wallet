/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';

import Drawer from './modules/_global/Drawer';
import CreateAccount from './modules/wallet/CreateAccount';
import NewAccount from './modules/wallet/NewAccount';
import Main from './modules/wallet/Main';
import Wallet from './modules/wallet/Wallet';
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
import EndorseSending from './modules/endorsement/Sending';
import EndorseResult from './modules/endorsement/Result';
import ApplyConfirm from './modules/endorsement/ApplyConfirm';
import ShareConfirm from './modules/endorsement/ShareConfirm';

import Register from './modules/endorsement/Register';
import LocationSearch from './modules/endorsement/LocationSearch';
import LocationMap from './modules/endorsement/LocationMap';
import LocationFull from './modules/endorsement/LocationFull';

import DscMain from './modules/discoin/DscMain';
import Business from './modules/discoin/Business';
import BusinessProfile from './modules/discoin/BusinessProfile';
import BusinessFilter from './modules/discoin/BusinessFilter';

import BusinessSearch from './modules/wallet/BusinessSearch';

import SwitchConfirm from './modules/_global/SwitchConfirm';

import FindUser from './modules/wallet/FindUser';
import SelectCustomer from './modules/wallet/SelectCustomer';
import SetDiscount from './modules/wallet/SetDiscount';
import SwitchResult from './modules/wallet/SwitchResult';

import DiscountOrReward from './modules/wallet/DiscountOrReward';
import DiscountShowQR from './modules/wallet/DiscountShowQR';
import QRScanner from './modules/wallet/QRScanner';
import PayConfirm from './modules/wallet/PayConfirm';
import InvoicePayConfirm from './modules/wallet/InvoicePayConfirm';

import RewardReceiptSelect from './modules/wallet/RewardReceiptSelect';
import RewardConfirm from './modules/wallet/RewardConfirm';
import RewardResult from './modules/wallet/RewardResult';
import Rewarding from './modules/wallet/Rewarding';

import ResetBalanceConfirm from './modules/wallet/ResetBalanceConfirm';

import QRShowNScan from './modules/customer/QRShowNScan';
import SendAmount from './modules/customer/SendAmount';
import SendConfirmEx from './modules/customer/SendConfirmEx';
import SendingEx from './modules/customer/SendingEx';
import SendResultEx from './modules/customer/SendResultEx';
import InvoiceConfirm from './modules/customer/InvoiceConfirm';
import PayResultEx from './modules/customer/PayResultEx';

export function registerScreens(store, Provider) {

	Navigation.registerComponent('global.Drawer', () => Drawer, store, Provider);

	Navigation.registerComponent('wallet.CreateAccount', () => CreateAccount);
	Navigation.registerComponent('wallet.NewAccount', () => NewAccount, store, Provider);
	Navigation.registerComponent('wallet.Main', () => Main, store, Provider);
	Navigation.registerComponent('wallet.Wallet', () => Wallet, store, Provider);
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
	Navigation.registerComponent('endorsement.Sending', () => EndorseSending, store, Provider);
	Navigation.registerComponent('endorsement.Result', () => EndorseResult, store, Provider);
	Navigation.registerComponent('endorsement.ApplyConfirm', () => ApplyConfirm, store, Provider);
	Navigation.registerComponent('endorsement.ShareConfirm', () => ShareConfirm, store, Provider);
	Navigation.registerComponent('endorsement.Register', () => Register, store, Provider);
	Navigation.registerComponent('endorsement.LocationSearch', () => LocationSearch	, store, Provider);
	Navigation.registerComponent('endorsement.LocationMap', () => LocationMap	, store, Provider);
	Navigation.registerComponent('endorsement.LocationFull', () => LocationFull	, store, Provider);

	Navigation.registerComponent('discoin.Main', () => DscMain	, store, Provider);
	Navigation.registerComponent('discoin.Business', () => Business	, store, Provider);
	Navigation.registerComponent('discoin.BusinessProfile', () => BusinessProfile	, store, Provider);
	Navigation.registerComponent('discoin.BusinessFilter', () => BusinessFilter	, store, Provider);
	Navigation.registerComponent('wallet.BusinessSearch', () => BusinessSearch	, store, Provider);
	Navigation.registerComponent('discoin.SwitchConfirm', () => SwitchConfirm	, store, Provider);
	
	Navigation.registerComponent('wallet.FindUser', () => FindUser	, store, Provider);
	Navigation.registerComponent('wallet.SelectCustomer', () => SelectCustomer	, store, Provider);
	Navigation.registerComponent('wallet.SetDiscount', () => SetDiscount	, store, Provider);
	Navigation.registerComponent('wallet.RewardConfirm', () => RewardConfirm	, store, Provider);
	Navigation.registerComponent('wallet.RewardResult', () => RewardResult	, store, Provider);
	Navigation.registerComponent('wallet.Rewarding', () => Rewarding	, store, Provider);
	Navigation.registerComponent('wallet.SwitchResult', () => SwitchResult	, store, Provider);
	Navigation.registerComponent('wallet.DiscountOrReward', () => DiscountOrReward	, store, Provider);
	Navigation.registerComponent('wallet.DiscountShowQR', () => DiscountShowQR	, store, Provider);
	Navigation.registerComponent('wallet.QRScanner', () => QRScanner	, store, Provider);
	Navigation.registerComponent('wallet.RewardReceiptSelect', () => RewardReceiptSelect	, store, Provider);
	Navigation.registerComponent('wallet.PayConfirm', () => PayConfirm	, store, Provider);
	Navigation.registerComponent('wallet.InvoicePayConfirm', () => InvoicePayConfirm, store, Provider);
	Navigation.registerComponent('wallet.ResetBalanceConfirm', () => ResetBalanceConfirm, store, Provider);
	
	Navigation.registerComponent('customer.QRShowNScan', () => QRShowNScan, store, Provider);
	Navigation.registerComponent('customer.SendAmount', () => SendAmount, store, Provider);
	Navigation.registerComponent('customer.SendConfirmEx', () => SendConfirmEx	, store, Provider);
	Navigation.registerComponent('customer.SendingEx', () => SendingEx	, store, Provider);
	Navigation.registerComponent('customer.SendResultEx', () => SendResultEx	, store, Provider);
	Navigation.registerComponent('customer.InvoiceConfirm', () => InvoiceConfirm	, store, Provider);
	Navigation.registerComponent('customer.PayResultEx', () => PayResultEx	, store, Provider);
	
	
}
