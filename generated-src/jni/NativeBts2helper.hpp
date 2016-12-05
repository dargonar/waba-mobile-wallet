// AUTOGENERATED FILE - DO NOT MODIFY!
// This file generated by Djinni from bts2helper.djinni

#pragma once

#include "bts2helper.hpp"
#include "djinni_support.hpp"

namespace djinni_generated {

class NativeBts2helper final : ::djinni::JniInterface<::bts2helper::Bts2helper, NativeBts2helper> {
public:
    using CppType = std::shared_ptr<::bts2helper::Bts2helper>;
    using CppOptType = std::shared_ptr<::bts2helper::Bts2helper>;
    using JniType = jobject;

    using Boxed = NativeBts2helper;

    ~NativeBts2helper();

    static CppType toCpp(JNIEnv* jniEnv, JniType j) { return ::djinni::JniClass<NativeBts2helper>::get()._fromJava(jniEnv, j); }
    static ::djinni::LocalRef<JniType> fromCppOpt(JNIEnv* jniEnv, const CppOptType& c) { return {jniEnv, ::djinni::JniClass<NativeBts2helper>::get()._toJava(jniEnv, c)}; }
    static ::djinni::LocalRef<JniType> fromCpp(JNIEnv* jniEnv, const CppType& c) { return fromCppOpt(jniEnv, c); }

private:
    NativeBts2helper();
    friend ::djinni::JniClass<NativeBts2helper>;
    friend ::djinni::JniInterface<::bts2helper::Bts2helper, NativeBts2helper>;

};

}  // namespace djinni_generated
