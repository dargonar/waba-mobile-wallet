import Bts2helper from './Bts2helper';
import * as config from '../constants/config';


export function  addSignature(tx, privkey) {
		return new Promise( (resolve, reject) => {
			Bts2helper.txDigest( JSON.stringify(tx), config.CHAIN_ID).then( digest => {
				console.log('_addSignature txDigest =>', digest);
				Bts2helper.signCompact(digest, privkey).then( signature => {
					console.log('_addSignature signCompact =>', signature);
					if(!tx.signatures) tx.signatures = [];
					tx.signatures.push(signature);
					resolve(tx);
				}, err => {
					reject(err);
				})
			}, err => {
				reject(err);
			});
		});
}	


export function generateUnsignedTx(params, _blockchain) {
		
		return new Promise( (resolve, reject) => {
			tx = {
				'expiration': 			config.dateAdd(new Date(),'second',120).toISOString().substr(0, 19),
				'ref_block_num': 		_blockchain.refBlockNum,
				'ref_block_prefix': _blockchain.refBlockPrefix,
				'operations' : [
					 [
						0,
						{
							from   : params.from,
							to     : params.to,
							amount : {
								amount   : (Number(params.amount)*Math.pow(10,params.asset.precision))>>0,
								asset_id : params.asset.id
							},
							memo   : params.memo
						}
					]
				]
			}
    
			fetch(config.getAPIURL('/get_fees_for_tx'), {
				method: 'POST',
				headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({
            tx : tx,
        })
			})
			.then((response) => response.json()
				, err => {
          this._onGetTxError('#X -- '+JSON.stringify(err));
          reject(err);
				})
			.then((responseJson) => {
        	tx.operations[0][1].fee = {
  					asset_id  : responseJson['fees'][0]['asset_id'], //params.asset.id,
  					amount    : responseJson['fees'][0]['amount']
  				}
  				resolve(tx);
			}, err => {
				this._onGetTxError('#Y -- '+JSON.stringify(err));
        reject(err);
			});
		}); 
	}

export function getRecipientInfoFormMemo(recipient) {
	return getRecipientInfo(recipient);
}

export function getRecipientInfo(recipient, do_job) {

		return new Promise( (resolve, reject) => {
			// if(this.state.memo_key && this.state.discount_rate>0) {
			if(!do_job){ 
        resolve();
				return;
			}

      fetch(config.getAPIURL('/business/by_name/')+recipient, {
				method: 'GET',
				headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
			})
			.then((response) => response.json()
				, err => {
          this._onGetTxError('#1 -- '+JSON.stringify(err));
				})
			.then((responseJson) => {
        console.log('--------------- schedule:', JSON.stringify(responseJson));
        if(responseJson.error)
        {
          this._onGetTxError('#? -- '+responseJson.error);
          reject(responseJson.error);
        }
        let today = config.getToday();
        console.log('------------Searching discount for:', today);
        let discount_rate =0;
        if(responseJson.discount_schedule)
        {
          for (var i = 0; i < responseJson.discount_schedule.length; i++){
            let schedule = responseJson.discount_schedule[i];
            console.log(' --- Schedules LOOP', JSON.stringify(schedule));
            if(schedule['date']==today)
            {
              console.log(' ---------------------------------- DISCOUNT FOUND:', discount_rate);
              discount_rate = schedule['discount'];
              break;
            }
          }
          console.log(' ---------------------------------- DISCOUNT >>>> ', discount_rate);
        }
        else {
          console.log(' ---------------------------------- NO DISCOUNT RECEIVED ');
        }
				// this.setState({memo_key:responseJson.account.options.memo_key, discount_rate:discount_rate});
				resolve({memo_key:responseJson.account.options.memo_key, discount_rate:discount_rate});
			}, err => {
				this._onGetTxError('#2 -- '+JSON.stringify(err));
        reject(err);
			});
		});
}

	
export function getTx(from_id, to_id, amount, enc_memo, asset, _blockchain) {
	return new Promise( (resolve, reject) => {
    		// let amount = Math.min(this.state.discount_dsc, available_balance).toFixed(2);
  			// console.log('---- discount_dsc:', this.state.discount_dsc, 'available_balance:', available_balance);
        generateUnsignedTx({
  					from   : from_id,
  					to     : to_id,
  					amount : amount,
  					memo   : enc_memo,
  					asset  : asset
  				}
  				, _blockchain
  			)
  			.then((tx) => {
  				console.log('----------TX------------');
  				console.log(JSON.stringify(tx));
  				console.log('------------------------');
  				resolve(tx);
  			}
  			, err => {
  				console.error('ERR1: ', err);
  				reject(err);
  			})

  });        
}