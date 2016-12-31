// AUTOGENERATED FILE - DO NOT MODIFY!
// This file generated by Djinni from bts2helper.djinni

#pragma once

#include <string>

namespace bts2helper {

/** This interface will be implemented in C++ and can be called from any language. */
class Bts2helper {
public:
    virtual ~Bts2helper() {}

    static std::string tx_digest(const std::string & tx_json, const std::string & chain_id);

    static std::string sign_compact(const std::string & digest, const std::string & wif);
};

}  // namespace bts2helper