import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {observer} from 'mobx-react-lite';
import {ScannedResult} from './components/ScannedResult';
import {Root} from './components/Root';
import store from './store/store';

const App = observer(() => {
  return (
    <SafeAreaView style={styles.body}>
      {store.errorStatus && <Text>{store.errorMessage}</Text>}

      {store.qrValue.length === 0 && <Root />}

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
