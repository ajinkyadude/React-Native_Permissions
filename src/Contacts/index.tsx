import {useEffect, useState} from 'react';
import {Button, Platform, Text, View} from 'react-native';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';

const Contacts = () => {
  const [result, setResult] = useState();

  const checkPermissionFunction = async () => {
    let response;
    if (Platform.OS === 'ios') {
      response = await check(PERMISSIONS.IOS.CONTACTS);
      //   console.log('response  **  ' + response);
    } else {
      response = await check(PERMISSIONS.ANDROID.READ_CONTACTS);
      //   console.log(' response android ***  ' + response);
    }
    setResult(response);

    // TakePermissionFromUser();
  };

  const TakePermissionFromUser = async () => {
    let response;
    if (Platform.OS === 'ios') {
      response = await request(PERMISSIONS.IOS.CONTACTS);
      console.log('response requst   **  ' + response);
    } else {
      response = await request(PERMISSIONS.ANDROID.READ_CONTACTS);
      console.log(' response android ***  ' + response);
    }

    setResult(response);
  };

  useEffect(() => {
    checkPermissionFunction();
  }, []);

  return (
    <View style={{marginTop: 100}}>
      {result === RESULTS.UNAVAILABLE && (
        <Text style={{color: 'black'}}>
          Contacts permission is not available on this device.
        </Text>
      )}
      {result === RESULTS.DENIED && (
        <View>
          <Text style={{color: 'black'}}>
            Contacts permission is required to use the camera.
          </Text>
          <Button title="Grant Permission" onPress={TakePermissionFromUser} />
          {/* <Button title="Deny Permission" onPress={handleDenyPermission} /> */}
        </View>
      )}
      {result === RESULTS.GRANTED && (
        <Text style={{color: 'black'}}>
          Contacts permission has been granted.
        </Text>
      )}
      {result === RESULTS.BLOCKED && (
        <Text style={{color: 'black'}}>
          Contacts permission is blocked. Go to settings to unblock it.
        </Text>
      )}
    </View>
  );
};

export default Contacts;
