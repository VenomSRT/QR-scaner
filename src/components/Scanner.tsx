import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react-lite';
import {CameraKitCameraScreen} from 'react-native-camera-kit';
import store from '../store/store';

export const Scanner = observer(() => {
  return (
    <View style={styles.camera_container}>
      <CameraKitCameraScreen
        showFrame={true}
        scanBarcode={true}
        laserColor={'red'}
        onReadCode={(event: any) => {
          store.onBarcodeScan(event.nativeEvent.codeStringValue);
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  camera_container: {
    flex: 1,
  },
});
