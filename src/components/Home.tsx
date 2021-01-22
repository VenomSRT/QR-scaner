import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react-lite';
import store from '../store/store';

export const Home = observer(() => {
  return (
    <View style={styles.button_container}>
      <TouchableOpacity
        style={styles.camera_button}
        activeOpacity={0.7}
        onPress={() => store.openScanner()}>
        <Text style={styles.button_text}>Open camera</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
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
    lineHeight: 20,
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
