import {useEffect, useState} from 'react';
import {Button, Platform, Text, View} from 'react-native';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';

const MicroPhone = () => {
  const [microPermission, setMicrophonePermission] = useState('');

  console.log(" 888888  visible 0000000");
  

  const microphonePermission = async () => {
    const result = await check(
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.RECORD_AUDIO
        : PERMISSIONS.IOS.MICROPHONE,
    );
    console.log(result);
    setMicrophonePermission(result);
  };

  useEffect(() => {
    microphonePermission();
  }, []);

  const GetPermission = async () => {
    if (microPermission === RESULTS.DENIED) {
      console.log(' inside denied  **');

      const re = await request(
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.RECORD_AUDIO
          : PERMISSIONS.IOS.MICROPHONE,
      );
    }
  };

  return (
    <View style={{marginTop: 20}}>
      {microPermission == RESULTS.DENIED && (
        <Button
          title="Click to get microphone permission"
          onPress={GetPermission}
        />
      )}
      {microPermission == RESULTS.GRANTED && (
        <Text>You have granted permission for microphone</Text>
      )}
      {microPermission === RESULTS.BLOCKED && (
        <Text>
          MicroPhone permission is blocked. Go to settings to unblock it.
        </Text>
      )}
      {microPermission === RESULTS.UNAVAILABLE && (
        <Text>Microphone permission is not available on this device.</Text>
      )}
    </View>
  );
};

export default MicroPhone;
