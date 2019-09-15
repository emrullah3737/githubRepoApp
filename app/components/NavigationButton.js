import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const NavigationButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text style={styles.navigationText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  navigationText: {
    fontSize: 20,
    fontWeight: '600',
    backgroundColor: '#F8FAFB',
    borderColor: '#A5A9AC',
    borderWidth: 1,
    margin: 10,
    padding: 5,
    borderRadius: 10,
  },
});

export default NavigationButton;
