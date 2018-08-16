import * as config from '../constants/config';
import * as walletActions from '../modules/wallet/wallet.actions';

/*
Funcion que valida el balance de la subcuenta y preapra la transaccion para enviar el excedente de cuenta o resetear el salod a 0, segun parametro.
*/
export function prepareResetBalance(reset_to_zero, account, balance){

	if(balance<1)
		throw 'No cuenta con saldo disponible';
	
	if(!account.subaccount.business || !account.subaccount.business.account)
		throw 'Es imposible encontrar la cuenta del Comercio';

	let biz_account 		= account.subaccount.business.account;
	let biz_account_id 	= account.subaccount.business.account_id;
	let biz_name 				= account.subaccount.business.name;
	
	let withdrawal_limit = getPermissionWithdrawlLimit(account.subaccount.permission);
	if(!reset_to_zero && ((Number(balance)-1)<Number(withdrawal_limit) ) )
		throw	'Operación imposible de realizar. Su balance de D$C'+balance.toString()+' es menor que el límite dario de D$C'+withdrawal_limit.toString();
	
	return {
		type: 				reset_to_zero?config.SA_RESET_BALANCE:config.SA_SEND_EXTRA_BALANCE,
  	recipient: 		[biz_account, biz_account_id],
  	biz_name: 		biz_name,
  	amount: 			reset_to_zero?(balance-1):((balance-1)-withdrawal_limit),
  	memo: 				reset_to_zero?config.SA_RESET_BALANCE_PREFIX:config.SA_SEND_EXTRA_BALANCE_PREFIX
	}
}

export function getPermissionWithdrawlLimit(permission){
	return permission.withdrawal_limit.amount/config.ASSET_DIVIDER;
}

export function getAccountWithdrawPermission(account){
	
	return new Promise( (resolve, reject) => {
		walletActions.getSubAccountPermissions(account.id).then( (permissions) => {
			console.log(' -- Traemos permisos del usuario:',  JSON.stringify(permissions));
			if(permissions && 'subaccounts' in permissions)
			{
				for(var i=0; i<permissions.subaccounts.length; i++) {
					let perm = permissions.subaccounts[i];
					console.log(' -------- perm.expiration>config.getFullUTCNow()', perm.expiration, config.getFullUTCNow());
					if (perm.expiration>config.getFullUTCNow())
					{
						resolve(perm);
						return;
					}
				}
			}

			reject('No tiene configurado ningún permiso o ya ha expirado.');
			return;
			
		}, (err) => {
			// this.setState({refreshing:true});
			console.log('Error', JSON.stringify(err));
			reject(err);
		})
	});
}