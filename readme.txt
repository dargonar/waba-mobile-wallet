# node
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
# react-native client
sudo npm install -g react-native-cli
# install app packages
npm install

# android
??? https://gist.github.com/wenzhixin/43cf3ce909c24948c6e7
??? export PATH=${PATH}:~/requirements/android-sdk-linux/tools
??? export PATH=${PATH}:~/requirements/android-sdk-linux/platform-tools


>>> https://github.com/codepath/android_guides/wiki/Installing-Android-SDK-Tools


wget https://dl.google.com/android/repository/tools_r25.2.3-linux.zip
unzip ~/android-sdk

export ANDROID_HOME=/home/ubuntu/android-sdk
export PATH=${PATH}:$ANDROID_HOME/tools

-----------------------
ON:
---
FAILURE: Build failed with an exception.
* What went wrong:
A problem occurred configuring project ':RNSound'.
> SDK location not found. Define location with sdk.dir in the local.properties file or with an ANDROID_HOME environment variable.


export ANDROID_HOME=/home/tuti/android-sdk
react-native run-android
-----------------------

# scp -i waba_dev.pem ubuntu@34.213.89.188:wallet/android/app/build/outputs/apk/app-armeabi-v7a-debug.apk .
