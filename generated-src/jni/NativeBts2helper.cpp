// AUTOGENERATED FILE - DO NOT MODIFY!
// This file generated by Djinni from bts2helper.djinni

#include "NativeBts2helper.hpp"  // my header
#include "Marshal.hpp"

namespace djinni_generated {

NativeBts2helper::NativeBts2helper() : ::djinni::JniInterface<::bts2helper::Bts2helper, NativeBts2helper>("com/diventi/bts2helper/Bts2helper$CppProxy") {}

NativeBts2helper::~NativeBts2helper() = default;


CJNIEXPORT void JNICALL Java_com_diventi_bts2helper_Bts2helper_00024CppProxy_nativeDestroy(JNIEnv* jniEnv, jobject /*this*/, jlong nativeRef)
{
    try {
        DJINNI_FUNCTION_PROLOGUE1(jniEnv, nativeRef);
        delete reinterpret_cast<::djinni::CppProxyHandle<::bts2helper::Bts2helper>*>(nativeRef);
    } JNI_TRANSLATE_EXCEPTIONS_RETURN(jniEnv, )
}

CJNIEXPORT jstring JNICALL Java_com_diventi_bts2helper_Bts2helper_txDigest(JNIEnv* jniEnv, jobject /*this*/, jstring j_txJson, jstring j_chainId)
{
    try {
        DJINNI_FUNCTION_PROLOGUE0(jniEnv);
        auto r = ::bts2helper::Bts2helper::tx_digest(::djinni::String::toCpp(jniEnv, j_txJson),
                                                     ::djinni::String::toCpp(jniEnv, j_chainId));
        return ::djinni::release(::djinni::String::fromCpp(jniEnv, r));
    } JNI_TRANSLATE_EXCEPTIONS_RETURN(jniEnv, 0 /* value doesn't matter */)
}

CJNIEXPORT jstring JNICALL Java_com_diventi_bts2helper_Bts2helper_signCompact(JNIEnv* jniEnv, jobject /*this*/, jstring j_digest, jstring j_wif)
{
    try {
        DJINNI_FUNCTION_PROLOGUE0(jniEnv);
        auto r = ::bts2helper::Bts2helper::sign_compact(::djinni::String::toCpp(jniEnv, j_digest),
                                                        ::djinni::String::toCpp(jniEnv, j_wif));
        return ::djinni::release(::djinni::String::fromCpp(jniEnv, r));
    } JNI_TRANSLATE_EXCEPTIONS_RETURN(jniEnv, 0 /* value doesn't matter */)
}

CJNIEXPORT jboolean JNICALL Java_com_diventi_bts2helper_Bts2helper_isValidName(JNIEnv* jniEnv, jobject /*this*/, jstring j_name)
{
    try {
        DJINNI_FUNCTION_PROLOGUE0(jniEnv);
        auto r = ::bts2helper::Bts2helper::is_valid_name(::djinni::String::toCpp(jniEnv, j_name));
        return ::djinni::release(::djinni::Bool::fromCpp(jniEnv, r));
    } JNI_TRANSLATE_EXCEPTIONS_RETURN(jniEnv, 0 /* value doesn't matter */)
}

CJNIEXPORT jboolean JNICALL Java_com_diventi_bts2helper_Bts2helper_isCheapName(JNIEnv* jniEnv, jobject /*this*/, jstring j_name)
{
    try {
        DJINNI_FUNCTION_PROLOGUE0(jniEnv);
        auto r = ::bts2helper::Bts2helper::is_cheap_name(::djinni::String::toCpp(jniEnv, j_name));
        return ::djinni::release(::djinni::Bool::fromCpp(jniEnv, r));
    } JNI_TRANSLATE_EXCEPTIONS_RETURN(jniEnv, 0 /* value doesn't matter */)
}

CJNIEXPORT jobject JNICALL Java_com_diventi_bts2helper_Bts2helper_calcFee(JNIEnv* jniEnv, jobject /*this*/, jstring j_feeSchedule, jobject j_ops, jstring j_coreExchangeRatio)
{
    try {
        DJINNI_FUNCTION_PROLOGUE0(jniEnv);
        auto r = ::bts2helper::Bts2helper::calc_fee(::djinni::String::toCpp(jniEnv, j_feeSchedule),
                                                    ::djinni::List<::djinni::String>::toCpp(jniEnv, j_ops),
                                                    ::djinni::String::toCpp(jniEnv, j_coreExchangeRatio));
        return ::djinni::release(::djinni::List<::djinni::I64>::fromCpp(jniEnv, r));
    } JNI_TRANSLATE_EXCEPTIONS_RETURN(jniEnv, 0 /* value doesn't matter */)
}

}  // namespace djinni_generated
