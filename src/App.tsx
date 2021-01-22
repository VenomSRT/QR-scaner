import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {observer} from 'mobx-react-lite';
import {Scanner} from './components/Scanner';
import {Home} from './components/Home';
import store from './store/store';
import {ScannedResult} from './components/ScannedResult';

const App = observer(() => {
  return (
    <SafeAreaView style={styles.body}>
      {store.errorStatus && <Text>{store.errorMessage}</Text>}

      {store.scannerOpened && <Scanner />}

      {!store.scannerOpened && store.qrValue.length === 0 && <Home />}

      {store.qrValue.length > 0 && <ScannedResult />}
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#eee',
  },
});

export default App;
