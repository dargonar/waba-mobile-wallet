LOCAL_PATH := ../../../../../generated-src/jni
DJINNI := /home/ubuntu/djinni/support-lib

include $(CLEAR_VARS)

LOCAL_MODULE := bts2helper

# LOCAL_CFLAGS += -std=c++11

LOCAL_SRC_FILES := NativeBts2helper.cpp 
LOCAL_SRC_FILES += /home/ubuntu/xwallet/handwritten-src/cpp/bts2helper_impl.cpp 
LOCAL_SRC_FILES += $(DJINNI)/jni/djinni_main.cpp
LOCAL_SRC_FILES += $(DJINNI)/jni/djinni_support.cpp

LOCAL_CPP_FEATURES := rtti

LOCAL_C_INCLUDES := /home/ubuntu/my-ndk
LOCAL_C_INCLUDES += $(LOCAL_PATH)/../cpp 
LOCAL_C_INCLUDES += $(LOCAL_PATH)/../../handwritten-src/cpp
LOCAL_C_INCLUDES += $(DJINNI)/jni
LOCAL_C_INCLUDES += /home/ubuntu/my-ndk/boost_157/include
LOCAL_C_INCLUDES += /home/ubuntu/graphene/libraries/fc/include
LOCAL_C_INCLUDES += /home/ubuntu/graphene/libraries/chain/include
LOCAL_C_INCLUDES += /home/ubuntu/graphene/libraries/db/include
LOCAL_C_INCLUDES += /home/ubuntu/graphene/libraries//utilities/include

LOCAL_LDLIBS += -l/home/ubuntu/graphene/libraries/db/libgraphene_db.a
LOCAL_LDLIBS += -l/home/ubuntu/graphene/libraries/chain/libgraphene_chain.a
LOCAL_LDLIBS += -l/home/ubuntu/graphene/libraries/fc/libfc.a
LOCAL_LDLIBS += -l/home/ubuntu/graphene/libraries/utilities/libgraphene_utilities.a
LOCAL_LDLIBS += -l/home/ubuntu/graphene/libraries/fc/vendor/secp256k1-zkp/.libs/libsecp256k1.a
LOCAL_LDLIBS += -l/home/ubuntu/my-ndk/sysroot/usr/lib/libcrypto.a
LOCAL_LDLIBS += -l/home/ubuntu/my-ndk/sysroot/usr/lib/libssl.a
LOCAL_LDLIBS += -l/home/ubuntu/my-ndk/boost_157/lib/libboost_iostreams-clang-mt-1_57.a
LOCAL_LDLIBS += -l/home/ubuntu/my-ndk/boost_157/lib/libboost_filesystem-clang-mt-1_57.a
LOCAL_LDLIBS += -l/home/ubuntu/my-ndk/boost_157/lib/libboost_thread-clang-mt-1_57.a
LOCAL_LDLIBS += -l/home/ubuntu/my-ndk/boost_157/lib/libboost_system-clang-mt-1_57.a
LOCAL_LDLIBS += -l/home/ubuntu/my-ndk/boost_157/lib/libboost_chrono-clang-mt-1_57.a
LOCAL_LDLIBS += -l/home/ubuntu/my-ndk/boost_157/lib/libboost_date_time-clang-mt-1_57.a
LOCAL_LDLIBS += -l/home/ubuntu/my-ndk/boost_157/lib/libboost_coroutine-clang-mt-1_57.a

include $(BUILD_SHARED_LIBRARY)