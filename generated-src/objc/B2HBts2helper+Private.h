// AUTOGENERATED FILE - DO NOT MODIFY!
// This file generated by Djinni from bts2helper.djinni

#include "bts2helper.hpp"
#include <memory>

static_assert(__has_feature(objc_arc), "Djinni requires ARC to be enabled for this file");

@class B2HBts2helper;

namespace djinni_generated {

class Bts2helper
{
public:
    using CppType = std::shared_ptr<::bts2helper::Bts2helper>;
    using CppOptType = std::shared_ptr<::bts2helper::Bts2helper>;
    using ObjcType = B2HBts2helper*;

    using Boxed = Bts2helper;

    static CppType toCpp(ObjcType objc);
    static ObjcType fromCppOpt(const CppOptType& cpp);
    static ObjcType fromCpp(const CppType& cpp) { return fromCppOpt(cpp); }

private:
    class ObjcProxy;
};

}  // namespace djinni_generated
