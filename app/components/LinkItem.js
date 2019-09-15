import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const LinkItem = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{props.name}</Text>
      <Text style={styles.link}>{props.link}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 10,
    minHeight: 20,
  },
  link: {
    flex: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 10,
    color: '#0365D6',
  },
  name: {
    flex: 1,
    color: '#24292F',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default LinkItem;
