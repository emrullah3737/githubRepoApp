import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CountItem = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{props.name}</Text>
      <Text style={styles.count}>{props.count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    maxWidth: 75,
    borderWidth: 1,
    borderColor: '#D1D5DA',
    borderRadius: 5,
    paddingVertical: 5,
  },
  name: {
    color: '#24292F',
    fontWeight: '600',
    fontSize: 12,
  },
  count: {
    color: '#576069',
    fontWeight: '200',
    fontSize: 12,
  },
});

export default CountItem;
