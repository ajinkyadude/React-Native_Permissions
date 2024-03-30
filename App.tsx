import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MicroPhone from './src/MicroPhone';
import {useState} from 'react';
import Camera from './src/Camera';
import Location from './src/Location';

const App = () => {
  const [selsectedPermission, setSelectedPermission] = useState('');
  return (
    // <View><MicroPhone></MicroPhone></View>
    <SafeAreaView>
      <View style={Styles.mainContainer}>
        <Text style={Styles.textStyle}>Below are the list of permissions</Text>
        <TouchableOpacity style={Styles.touchableStyle} onPress={()=> setSelectedPermission('camera')}>
          <Text style={Styles.touchableText}>Camera Permission</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.touchableStyle} onPress={() => setSelectedPermission('location')}>
          <Text style={Styles.touchableText}>Location Permission</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.touchableStyle} onPress={() => setSelectedPermission('microphone')}>
          <Text style={Styles.touchableText}>Microphone Permission</Text>
        </TouchableOpacity>

        {selsectedPermission === 'camera' && <Camera />}
        {selsectedPermission === 'location' && <Location />}
        {selsectedPermission === 'microphone' && <MicroPhone />}
      </View>
    </SafeAreaView>
  );
};
export default App;

const Styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
    marginVertical: 30,
    alignItems: 'center',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  touchableStyle: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#01C1E5',
    borderRadius: 8,
    marginVertical: 10,
  },
  touchableText: {
    // textDecorationLine: 'underline',
    // textDecorationColor: 'black',
    color: '#01C1E5',
  },
});
