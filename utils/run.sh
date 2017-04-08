#!/bin/bash
CP=".:json-20160212.jar:/home/matu/Downloads/bitcoinj-core-0.14.3-bundled.jar:/home/matu/Documents/Dev/cordova-plugin-tokkenit/src/android/libs/slf4j-android-1.7.10.jar:/home/matu/Documents/Dev/cordova-plugin-tokkenit/src/android/libs/slf4j-api-1.7.10.jar"

echo "##############################"
echo $CP
echo "##############################"

javac -cp "$CP" test.java
if [[ $? -eq 0 ]]; then
	java -cp "$CP" test $1 $2 $3
else
	echo "NO NO"
fi

