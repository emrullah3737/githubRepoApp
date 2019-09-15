import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const RepositoryCard = props => (
  <TouchableOpacity onPress={props.onPress} style={styles.container}>
    <Text style={styles.repositoryTitle}>{props.title}</Text>
    <Text style={styles.repositoryDescription}>{props.description}</Text>
    <View style={styles.repositoryDetail}>
      <Text style={styles.repositoryDetailText}>
        🔸{props.language || 'No language defined'}
      </Text>
      <Text style={styles.repositoryDetailText}>★ {props.star}</Text>
      <Text style={styles.repositoryDetailText}>
        Updated {props.updateDate}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    minHeight: 100,
    marginHorizontal: 20,
    marginTop: 10,
    borderBottomColor: '#D1D5DA',
    borderBottomWidth: 0.5,
  },
  repositoryTitle: {
    flex: 1,
    marginBottom: 5,
    fontSize: 20,
    fontWeight: '600',
    color: '#0365D6',
  },
  repositoryDescription: {
    flex: 1,
    fontSize: 12,
    color: '#576069',
  },
  repositoryDetail: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 12,
    color: '#576069',
  },
  repositoryDetailText: {
    fontSize: 10,
    marginTop: 5,
    marginRight: 10,
    color: '#576069',
  },
});

export default RepositoryCard;
