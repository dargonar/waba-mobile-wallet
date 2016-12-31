#include <string>
#include <iostream>
#include <vector>

#include <boost/array.hpp>

#include <fc/io/json.hpp>
#include <fc/crypto/hex.hpp>
#include <fc/crypto/ripemd160.hpp>

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

#include <graphene/utilities/key_conversion.hpp>

#include "bts2helper_impl.hpp"

using namespace boost;
using namespace graphene::chain;
using namespace graphene::utilities;

void __hack() {
  graphene::db::object_database a;
}

namespace bts2helper {
    
//     std::shared_ptr<Bts2helper> Bts2helperImpl::create() {
//         return std::make_shared<Bts2helperImpl>();
//     }
    
//     Bts2helperImpl::Bts2helperImpl() {
 
//     }

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