import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const IssuePrCard = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.IssueTitle}>{props.title}</Text>
      <View style={styles.IssueDescriptionContainer}>
        <Text style={styles.IssueDescription}>
          #{props.number} {props.state} {props.updateDate} by {props.user}
        </Text>
        <Text style={styles.IssueComment}>{props.comments} Comment</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    minHeight: 50,
    marginHorizontal: 20,
    marginTop: 10,
    borderBottomColor: '#D1D5DA',
    borderBottomWidth: 0.5,
  },
  IssueTitle: {
    flex: 1,
    marginBottom: 5,
    fontSize: 20,
    fontWeight: '600',
    color: '#24292f',
  },
  IssueDescriptionContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  IssueDescription: {
    flex: 3,
    fontSize: 12,
    color: '#576069',
  },
  IssueComment: {
    flex: 1,
    fontSize: 12,
    color: '#576069',
  },
});

export default IssuePrCard;
