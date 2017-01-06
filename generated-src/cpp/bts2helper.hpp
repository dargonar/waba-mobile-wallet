// AUTOGENERATED FILE - DO NOT MODIFY!
// This file generated by Djinni from bts2helper.djinni

#pragma once

#include <cstdint>
#include <string>
#include <vector>

namespace bts2helper {

/** This interface will be implemented in C++ and can be called from any language. */
class Bts2helper {
public:
    virtual ~Bts2helper() {}

    static std::string tx_digest(const std::string & tx_json, const std::string & chain_id);

    static std::string sign_compact(const std::string & digest, const std::string & wif);

    static bool is_valid_name(const std::string & name);

    static bool is_cheap_name(const std::string & name);

    static std::vector<int64_t> calc_fee(const std::string & fee_schedule, const std::vector<std::string> & ops, const std::string & core_exchange_ratio);

    static std::string encode_memo(const std::string & priv, const std::string & pub, const std::string & msg);

    static std::string decode_memo(const std::string & priv, const std::string & pub, const std::string & memo_from, const std::string & memo_to, const std::string & memo_nonce, const std::string & memo_message);
};

}  // namespace bts2helper
