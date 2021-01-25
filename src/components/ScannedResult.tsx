import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import {observer} from 'mobx-react-lite';
import store from '../store/store';
import nextId from 'react-id-generator';
import {Item} from './Item';

export const ScannedResult = observer(() => {
  return (
    <>
      <View style={styles.body}>
        <View style={styles.result_container}>
          <Text>{'  {'}</Text>
          <FlatList
            data={store.qrValue}
            keyExtractor={() => nextId()}
            renderItem={(item) => <Item item={item.item} />}
          />
          <Text>{'  }'}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.back_button}
        onPress={() => store.resetScanner()}>
        <Text style={styles.button_text}>Back</Text>
      </TouchableOpacity>
    </>
  );
});

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  result_container: {},
  scan_result: {
    textAlign: 'center',
  },
  back_button: {
    paddingVertical: 20,
    backgroundColor: '#00a0ea',
  },
  button_text: {
    lineHeight: 20,
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
