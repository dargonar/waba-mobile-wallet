import * as config from '../constants/config';

export function jsonForAccountOnly(account_id, account_name){
	// {"account_id":"1.2.97","account_name":"pepe","type":"account_only"} 
	return {ai:account_id, an:account_name, t:config.QRSCAN_ACCOUNT_ONLY} 
}

export function jsonForAccountNAmount(account_id, account_name, amount_required){	
	// {"account_id":"1.2.87","account_name":"izquierdo","type":"account_n_amount","amount_required":250}
	return {ai:account_id, an:account_name, ar:amount_required, t:config.QRSCAN_ACCOUNT_N_AMOUNT} 
}

export function jsonForInvoice(bill_amount, bill_id, discount_rate, discount_dsc, discount_ars, account_id, account_name, business_id, business_name){	
	// {"bill_amount":"250","bill_id":"qwerty","discount_rate":"20","discount_dsc":"50","discount_ars":200,"account_id":"1.2.87","account_name":"izquierdo","business_id":"1.2.56","business_name":"comercio14","type":"invoice_discount"}
	
	// return {ba:bill_amount, bi:bill_id, dr:discount_rate, dd:discount_dsc, da:discount_ars,ai:account_id, an:account_name, bi:business_id, bn:business_name , t:config.QRSCAN_INVOICE_DISCOUNT}
	
	let obj = {ba:bill_amount, dd:discount_dsc, da:discount_ars, ai:account_id, an:account_name, t:config.QRSCAN_INVOICE_DISCOUNT};
	console.log(' ------------------------ jsonForInvoice:', JSON.stringify(obj))
	return obj;

}

export function expandJSONForQR(jsonData){
	

	let jsonObj = jsonData;
	if(typeof jsonObj != 'object')
		jsonObj = JSON.parse(jsonData)

	if(jsonObj.t == config.QRSCAN_ACCOUNT_ONLY)
		return {account_id:jsonObj.ai, account_name:jsonObj.an, type:jsonObj.t} 

	if(jsonObj.t == config.QRSCAN_ACCOUNT_N_AMOUNT)
		return {account_id:jsonObj.ai, account_name:jsonObj.an, amount_required:jsonObj.ar, type:jsonObj.t} 

	if(jsonObj.t == config.QRSCAN_INVOICE_DISCOUNT)
		// return {bill_amount:jsonObj.ba, bill_id:jsonObj.bi, discount_rate:jsonObj.dr, discount_dsc:jsonObj.dd, discount_ars:jsonObj.da, account_id:jsonObj.ai, account_name:jsonObj.an, business_id:jsonObj.bi, business_name:jsonObj.bn, type:jsonObj.t} 
		return {bill_amount:jsonObj.ba, bill_id:'', discount_rate:0, discount_dsc:jsonObj.dd, discount_ars:jsonObj.da, account_id:jsonObj.ai, account_name:jsonObj.an, business_id:jsonObj.ai, business_name:jsonObj.an, type:jsonObj.t} 
}