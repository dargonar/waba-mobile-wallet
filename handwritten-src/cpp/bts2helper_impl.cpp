#include <string>
#include <iostream>
#include <vector>

#include <boost/array.hpp>
#include <boost/algorithm/string/replace.hpp>

#include <fc/io/json.hpp>
#include <fc/crypto/hex.hpp>
#include <fc/crypto/ripemd160.hpp>
#include <fc/variant.hpp>
#include <fc/string.hpp>

#include <fc/smart_ref_fwd.hpp>
#include <fc/smart_ref_impl.hpp>
#include <fc/bitutil.hpp>

#include <fc/crypto/elliptic.hpp>
#include <fc/crypto/ripemd160.hpp>
#include <fc/crypto/sha512.hpp>
#include <fc/crypto/sha256.hpp>

#include <graphene/db/object_database.hpp>

#include <graphene/chain/protocol/protocol.hpp>
#include <graphene/chain/protocol/transaction.hpp>
#include <graphene/chain/protocol/account.hpp>
#include <graphene/chain/protocol/memo.hpp>

#include <graphene/utilities/key_conversion.hpp>

#include "bts2helper_impl.hpp"

using namespace boost;
using namespace graphene::chain;
using namespace graphene::utilities;

void __hack() {
  graphene::db::object_database a;
}

struct get_required_fees_helper
{
   get_required_fees_helper(
      const fee_schedule& _current_fee_schedule,
      const price& _core_exchange_rate
      )
      : current_fee_schedule(_current_fee_schedule),
        core_exchange_rate(_core_exchange_rate)
   {}

   asset set_op_fees( operation& op )
   {
       asset fee = current_fee_schedule.set_fee( op, core_exchange_rate );
       return fee;
   }

   const fee_schedule& current_fee_schedule;
   const price& core_exchange_rate;
};



namespace bts2helper {
    
    std::string Bts2helper::encode_memo(const std::string & priv, const std::string & pub, const std::string & msg) {
      auto priv_key = fc::ecc::private_key::regenerate( fc::sha256(priv) );
      auto pub_key  = public_key_type( pub );

      memo_data data;
      data.set_message(priv_key, pub_key, msg, 0);

      return boost::replace_all_copy( fc::json::to_string(data), "\"GPH", "\"BTS");
    }

    std::string Bts2helper::decode_memo(const std::string & priv, const std::string & pub, const std::string& memo_from, const std::string& memo_to,
          const std::string& memo_nonce, const std::string& memo_message) {

      auto priv_key = fc::ecc::private_key::regenerate( fc::sha256(priv) );
      auto pub_key  = public_key_type( pub );

      memo_data data;

      data.from    = public_key_type(memo_from);
      data.to      = public_key_type(memo_to);
      data.nonce   = fc::to_uint64(memo_nonce);

      auto byte_size = memo_message.length()/2;

      data.message.resize(byte_size);
      fc::from_hex(memo_message, &data.message[0], byte_size);

      return data.get_message(priv_key, pub_key);      
    }

    vector<int64_t> Bts2helper::calc_fee(const std::string& current_fee_schedule_json,
                                         const vector<std::string>& ops, 
                                         const std::string& core_exchange_rate_json) {
      
      auto core_exchange_rate = fc::json::from_string(core_exchange_rate_json).as<price>();
      auto current_fee_schedule = fc::json::from_string(current_fee_schedule_json).as<fee_schedule>();
      
      vector< operation > _ops;
      for(int i=0; i<ops.size(); i++) {
        _ops.push_back( fc::json::from_string(ops[i]).as<operation>() );
      }
      
      vector< int64_t > result;
      result.reserve(ops.size());
   
      get_required_fees_helper helper(
          current_fee_schedule,
          core_exchange_rate
      );
      
      for( operation& op : _ops )
      {
        result.push_back( helper.set_op_fees( op ).amount.value );
      }

      return result;
    }   

    bool Bts2helper::is_cheap_name(const std::string& name) {
      return graphene::chain::is_cheap_name(name);
    }   

    bool Bts2helper::is_valid_name(const std::string& name) {
      return graphene::chain::is_valid_name(name);
    }   
  
    std::string Bts2helper::tx_digest(const std::string &tx_json, const std::string & chain_id) {
      auto tx     = fc::json::from_string(tx_json).as<transaction>();
      auto digest = tx.sig_digest(fc::sha256(chain_id));
      auto data   = fc::raw::pack(digest);
      return fc::to_hex(data);
    }

    std::string Bts2helper::sign_compact(const std::string & digest, const std::string &hexpriv) {
      //auto pk  = wif_to_key(wif);
      auto pk = fc::ecc::private_key::regenerate( fc::sha256(hexpriv) );
      auto tmp = fc::sha256(digest);
      auto sig = pk.sign_compact(tmp);
      return fc::to_hex(fc::raw::pack(sig));
    }
 
}