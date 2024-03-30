import React, {useEffect, useState} from 'react';
import {View, Text, Button, Platform, PermissionsAndroid} from 'react-native';
import {check, request, RESULTS, PERMISSIONS} from 'react-native-permissions';
import Camera from './src/Camera';

const Location = () => {
  const [locationPer, setLocationPer] = useState('');

  // const request = async () => {
  //   if (Platform.OS === 'android') {
  //     const re = await PermissionsAndroid.check(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     );
  //     console.log('re  **  ' + JSON.stringify(re));
  //   }
  // };

  const requstHandler = async () => {
    try {
      const location = await check(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_ALWAYS
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      setLocationPer(location);
      // Platform.OS === 'ios'
      //   ? console.log(' IOS  ***  ' + location)
      //   : console.log(' android   **** ' + location);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    requstHandler();
    // request()
  }, []);

  const handleGrantPermission = async () => {
    if (locationPer !== RESULTS.GRANTED) {
      const permissionResult = await request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_ALWAYS
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      setLocationPer(permissionResult);
    }
  };

  return (
    <View>
      {/* <Camera /> */}
      {locationPer === RESULTS.DENIED && (
        <View>
          <Text>Location permission is required to use this app.</Text>
          <Button title="Grant Permission" onPress={handleGrantPermission} />
          {/* <Button title="Deny Permission" onPress={handleDenyPermission} /> */}
        </View>
      )}
      {locationPer === RESULTS.GRANTED && (
        <Text>Location permission has been granted.</Text>
      )}
      {locationPer === RESULTS.BLOCKED && (
        <Text>
          Location permission is blocked. Go to settings to unblock it.
        </Text>
      )}
      {locationPer === RESULTS.UNAVAILABLE && (
        <Text>Camera permission is not available on this device.</Text>
      )}
    </View>
  );
};

export default Location;
