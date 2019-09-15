import moment from 'moment';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  RefreshControl,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import RepositoryCard from '../../components/RepositoryCard';
import {GET_REPOSITORY_LIST} from '../../redux/types';
import {getRepositoryList} from '../../redux/actions/repository';

class Repository extends Component {
  static navigationOptions = {
    headerTitle: 'Repositories',
  };

  state = {
    refleshing: false,
  };

  componentDidMount() {
    this.getRepositoryList();
  }

  getRepositoryList = async () => {
    if (!this.props.pagination || this.props.loading) {
      return;
    }
    const {nextPage} = this.props.pagination;
    await this.props.getRepositoryList('reactjs', {
      page: nextPage,
      per_page: 20,
      sort: 'updated',
    });
    if (this.props.error) {
      return alert(this.props.error);
    }
  };

  onRefresh = async () => {
    this.setState({refleshing: true});
    await this.props.getRepositoryList('reactjs', {
      page: 1,
      per_page: 20,
      reflesh: true,
      sort: 'updated',
    });
    this.setState({refleshing: false});

    if (this.props.error) {
      return alert(this.props.error);
    }
  };

  onNavigateRepositoryDetail = repository => {
    this.props.navigation.push('RepositoryDetail', {
      repository,
    });
  };

  renderItem = ({item: repo}) => {
    const {
      id,
      name,
      language,
      updated_at,
      description,
      stargazers_count,
    } = repo;
    return (
      <RepositoryCard
        key={id}
        title={name}
        language={language}
        star={stargazers_count}
        updateDate={moment(updated_at).fromNow()}
        description={description}
        onPress={() => this.onNavigateRepositoryDetail(repo)}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refleshing}
              onRefresh={this.onRefresh}
            />
          }
          onEndReached={this.getRepositoryList}
          onEndReachedThreshold={0}
          data={this.props.repositoryList}
          keyExtractor={item => item.id.toString()}
          ListFooterComponent={
            !this.state.refleshing &&
            this.props.loading && <ActivityIndicator size="large" />
          }
          ListFooterComponentStyle={styles.footer}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1},
  footer: {margin: 30},
});

const mapStateToProps = state => ({
  repositoryList: state.repository.repositoryList,
  pagination: state.repository.pagination,
  loading:
    state.repository.loading.isLoading &&
    state.repository.loading.action === GET_REPOSITORY_LIST,
  error: state.repository.error,
});

const mapDispatchToProps = {
  getRepositoryList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Repository);
