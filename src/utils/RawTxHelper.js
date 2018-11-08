import * as config from '../constants/config';
import * as moment from 'moment'

export const action   	= {received:'RECIBISTE DE', sent: 'ENVIADOS A', discounted_subacc:'PAGO RECIBIDO DE', refunded_subacc:'RECOMPENSASTE A', refunded:'TE RECOMPENSÓ', discounted:'PAGASTE A'};
export const action_raw = {received:'ENVIO', sent: 'ENVIO', discounted_subacc:'PAGO', refunded_subacc:'RECOMPENSA', refunded:'RECOMPENSA', discounted:'PAGO'};
export const rotato   	= {received:'0 deg', 			sent : '-180 deg',   discounted_subacc:'0 deg',            refunded_subacc:'-180 deg',        refunded:'0 deg'     ,    discounted:'-180 deg'};
export const bg     	 	= {received:'#76eafa', sent:'#f576ff', refunded_subacc:'#ff73b9', discounted_subacc:'#80fbbf', refunded:'#80fbbf', discounted:'#ff73b9'};
				
export function getTxData(rowData, account_name){

	if(rowData.__typename == 'Transfer' && config.ASSET_ID == rowData.amount.asset.id) {
		return getTransferData(rowData, account_name);
	}

}

export function getTransferData(rowData, account_name){  
	
	// let _type  	 	= rowData.from.name.endsWith(this.props.account.name) ? 'sent' : 'received';
	let _type  	 				= rowData.from.name==account_name ? 'sent' : 'received';
	let _dea   	 				= _type;
	let local_timestamp = moment.utc(rowData.block.timestamp).local().format('YYYY-MM-DD HH:mm:ss');
	let _fecha  	 			= _getFecha(local_timestamp);
	let _hora   	 			= _getHora(local_timestamp);
	let asset_symbol  	= config.ASSET_SYMBOL;
	let _rotato 				= _type;
	let _bg 		 				= _type;
	let _action   			= _type;
	let _msg 						= '';

	let _bill_amount  	= 0;
	let _discount 	  	= 0;
	let _bill_id 				= '';
	let _message      	= (rowData.message)?rowData.message:'N/D';

	if(rowData.memo)
  {
    _msg 		  		= config.fromHex(rowData.memo.message);
		let prefix 	  = _msg.substring(0,3);
		let post_fix	= '_subacc';
    if(prefix==config.REFUND_PREFIX && _type=='sent')
    {
      _dea  	= 'refunded'+post_fix;
      _rotato = _dea;
      _bg 		= _dea;
      _action = _dea;	
    }
    
    if(prefix==config.REFUND_PREFIX && _type=='received')
    {
    	_dea  	= 'refunded';
      _rotato = _dea;
      _bg 		= _dea;
      _action = _dea;	
    }
    
    if(prefix==config.PAYDISCOUNTED_PREFIX && _type=='sent')
    {
    	_dea  	= 'discounted';
      _rotato = _dea;
      _bg 		= _dea;
      _action = _dea;
    }
    
    if(prefix==config.PAYDISCOUNTED_PREFIX && _type=='received')
    {
    	_dea  	= 'discounted'+post_fix;
      _rotato = _dea;
      _bg 		= _dea;
      _action = _dea;
    }

    // Bill data
    let msg_info = _msg.split(':')
    if(msg_info.length>1)
    {
    	// [ '~re', '1000', 'NA' ]
	    _discount    = 0;
	    _bill_amount = 0;
	    if(!isNaN(msg_info[1]))
	    { 
	      _discount      = rowData.amount.quantity/parseFloat(msg_info[1]);
	      _bill_amount   = parseFloat(msg_info[1]);
	    }
	    _bill_id       = msg_info[2] || 'N/D';
    }	
  }

	return {
		_type 				: _type,
		_dea 					: (_type == 'sent' ) ? rowData.to.name : rowData.from.name,
		_dea_raw 		  : _dea,
		_fecha			  : _fecha ,
		_hora					: _hora,
		asset_symbol	: asset_symbol,
		_rotato				: _rotato,
		_bg						: _bg,
		_action				: _action,
		_msg 					: _msg,
		_bill_amount 	: _bill_amount,
		_discount 		: _discount,
		_bill_id 			: _bill_id,
		_is_simple    : (_dea==_type),
		_message 			: _message
	}

}

export function _getFecha(timestamp) {
	const meses = ["", "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

	var month = timestamp.substr(5,2) >> 0;
	var mes   = meses[month];
	var dia   = timestamp.substr(8,2) >> 0;

	return dia + ' ' + mes;
}

export function _getHora(timestamp) {
	var hora = timestamp.substr(11,2) >> 0;
	var min   = timestamp.substr(14,2) >> 0;
	return ("0" + hora).slice(-2) + ':' + ("0" + min).slice(-2);
}

export function _getFechaHora(timestamp){
	let fecha  = _getFecha(timestamp);
  let hora   = _getHora(timestamp);
	return fecha + ' ' + hora;
}

export function _getFechaFromUTC(timestamp) {
	let local_timestamp = moment.utc(timestamp).local().format('YYYY-MM-DD HH:mm:ss');
	return _getFecha(local_timestamp);
}

export function _getHoraFromUTC(timestamp){
	let local_timestamp = moment.utc(timestamp).local().format('YYYY-MM-DD HH:mm:ss');
	return _getHora(local_timestamp);
}