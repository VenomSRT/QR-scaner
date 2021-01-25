import React from 'react';
import {StyleSheet, View, Text, Linking} from 'react-native';

export const Item = ({item}: any) => {
  return (
    <View style={styles.row}>
      {item[0] === 'URL' ? (
        <>
          <Text>{`      "${item[0]}":`}</Text>
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL(item[1])
            }>{` "${item[1]}"${item[2]}`}</Text>
        </>
      ) : (
        <>
          <Text>{`     "${item[0]}":`}</Text>
          <Text>{` "${item[1]}"${item[2]}`}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  link: {
    color: 'blue',
  },
  row: {
    flexDirection: 'row',
  },
});
