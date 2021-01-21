import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.button_container}>
        <TouchableOpacity style={styles.camera_button} activeOpacity={0.7}>
          <Text style={styles.button_text}>Open camera</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#ddd',
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
