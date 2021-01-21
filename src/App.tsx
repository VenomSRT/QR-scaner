import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import {CameraKitCameraScreen} from 'react-native-camera-kit';
import store from './store/store';

const App = observer(() => {
  return (
    <SafeAreaView style={styles.body}>
      {store.errorStatus && <Text>{store.errorMessage}</Text>}

      {store.scannerOpened ? (
        <View style={styles.camera_container}>
          <CameraKitCameraScreen
            showFrame={true}
            scanBarcode={true}
            laserColor={'red'}
            onReadCode={(event: any) => {
              store.onBarcodeScan(event.nativeEvent.codeStringValue);
            }}
          />
          <View>
            <Text>TEXT</Text>
          </View>
        </View>
      ) : (
        <View style={styles.button_container}>
          <TouchableOpacity
            style={styles.camera_button}
            activeOpacity={0.7}
            onPress={store.openScanner}>
            <Text style={styles.button_text}>Open camera</Text>
          </TouchableOpacity>
          <Text onPress={() => Linking.openURL(`${store.qrValue}`)}>
            {store.qrValue}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#eee',
  },
  camera_container: {
    flex: 1,
  },
  button_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera_button: {
    width: 100,
    height: 100,
    borderRadius: 50,
    padding: 10,
    backgroundColor: '#00a0ea',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#0077aa',
  },
  button_text: {
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default App;
