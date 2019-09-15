import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Image, Text} from 'react-native';
import LinkItem from '../../components/LinkItem';
import CountItem from '../../components/CountItem';
import NavigationButton from '../../components/NavigationButton';

export default class RepositoryDetail extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: navigation.getParam('repository').name,
  });

  render() {
    const repository = this.props.navigation.getParam('repository');
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Image
              style={styles.avatar}
              source={{uri: repository.owner.avatar_url}}
            />
            <Text style={styles.description}>{repository.description}</Text>
          </View>
          <View style={styles.countItemList}>
            <CountItem name="Fork" count={repository.forks} />
            <CountItem name="Star" count={repository.stargazers_count} />
            <CountItem name="Watch" count={repository.watchers} />
            <CountItem name="Open" count={repository.open_issues} />
          </View>
          <View style={styles.linkList}>
            <LinkItem name="Home" link={repository.homepage} />
            <LinkItem name="Html" link={repository.html_url} />
            <LinkItem name="Github" link={repository.git_url} />
          </View>
          <View style={styles.navigationList}>
            <NavigationButton
              onPress={() =>
                this.props.navigation.push('Issues', {
                  owner: repository.owner.login,
                  repo: repository.name,
                })
              }
              title="Issues"
            />
            <NavigationButton
              onPress={() =>
                this.props.navigation.push('PullRequests', {
                  owner: repository.owner.login,
                  repo: repository.name,
                })
              }
              title="Pull Requests"
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  avatar: {
    borderRadius: 10,
    height: 100,
    width: 100,
  },
  description: {
    flex: 1,
    margin: 10,
    flexWrap: 'wrap',
  },
  linkList: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 10,
  },
  countItemList: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  navigationList: {
    flex: 1,
    fontSize: 20,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
  },
  navigationContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});
