import React, {useEffect, useState} from 'react';
import {View, Text, Button, Platform} from 'react-native';
import {check, request, RESULTS, PERMISSIONS} from 'react-native-permissions';

const Camera = () => {
  const [cameraPermission, setCameraPermission] = useState(null);

  const requestCameraPermission = async () => {
    try {
      let result;
      if (Platform.OS === 'ios') {
        result = await request(PERMISSIONS.IOS.CAMERA);
      } else {
        result = await request(PERMISSIONS.ANDROID.CAMERA);
      }
      setCameraPermission(result);
    } catch (error) {
      console.log('Error requesting camera permission: ', error);
    }
  };

  const checkCameraPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const result = await check(PERMISSIONS.ANDROID.CAMERA);
        console.log('android result **  ' + result);

        setCameraPermission(result);
      } else {
        console.log(' inside ios bar  ');

        check(PERMISSIONS.IOS.CAMERA)
          .then(result => {
            setCameraPermission(result);
            switch (result) {
              case RESULTS.UNAVAILABLE:
                console.log(
                  'This feature is not available (on this device / in this context)',
                );
                break;
              case RESULTS.DENIED:
                console.log(
                  'The permission has not been requested / is denied but requestable',
                );
                break;
              case RESULTS.LIMITED:
                console.log(
                  'The permission is limited: some actions are possible',
                );
                break;
              case RESULTS.GRANTED:
                console.log('The permission is granted');
                break;
              case RESULTS.BLOCKED:
                console.log(
                  'The permission is denied and not requestable anymore',
                );
                break;
            }
          })
          .catch(error => {
            // …
          });
      }
    } catch (error) {
      console.log('Error checking camera permission: ', error);
    }
  };

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const handleGrantPermission = () => {
    requestCameraPermission();
  };

  const handleDenyPermission = () => {
    setCameraPermission(RESULTS.DENIED);
  };

  console.log('cameraPermission  ****  ' + cameraPermission);

  return (
    <View style={{marginTop: 100}}>
      {cameraPermission === RESULTS.UNAVAILABLE && (
        <Text>Camera permission is not available on this device.</Text>
      )}
      {cameraPermission === RESULTS.DENIED && (
        <View>
          <Text>Camera permission is required to use the camera.</Text>
          <Button title="Grant Permission" onPress={handleGrantPermission} />
          <Button title="Deny Permission" onPress={handleDenyPermission} />
        </View>
      )}
      {cameraPermission === RESULTS.GRANTED && (
        <Text>Camera permission has been granted.</Text>
      )}
      {cameraPermission === RESULTS.BLOCKED && (
        <Text>Camera permission is blocked. Go to settings to unblock it.</Text>
      )}
    </View>
  );
};

export default Camera;
