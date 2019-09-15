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
import PrCard from '../../components/IssuePrCard';
import {GET_PR_LIST} from '../../redux/types';
import {getPrList, clearPagination} from '../../redux/actions/pullRequest';

class PullRequest extends Component {
  static navigationOptions = {
    headerTitle: 'Pull Requests',
  };

  state = {
    refleshing: false,
  };

  componentDidMount() {
    this.getPrList();
  }

  componentWillUnmount() {
    this.props.clearPagination();
  }

  getPrList = async () => {
    if (!this.props.pagination || this.props.loading) {
      return;
    }
    const {nextPage} = this.props.pagination;
    const {owner, repo} = this.props;
    await this.props.getPrList(owner, repo, {
      state: 'all',
      page: nextPage,
      per_page: 20,
      sort: 'updated',
      direction: 'desc',
    });
    if (this.props.error) {
      return alert(this.props.error);
    }
  };

  onRefresh = async () => {
    this.setState({refleshing: true});
    const {owner, repo} = this.props;
    await this.props.getPrList(owner, repo, {
      state: 'all',
      page: 1,
      per_page: 20,
      reflesh: true,
      sort: 'updated',
      direction: 'desc',
    });
    this.setState({refleshing: false});

    if (this.props.error) {
      return alert(this.props.error);
    }
  };

  renderItem = ({item: repo}) => {
    const {id, title, comments, updated_at, state, number, user} = repo;
    return (
      <PrCard
        key={id}
        title={title}
        comments={comments}
        state={state}
        number={number}
        user={user.login}
        updateDate={moment(updated_at).fromNow()}
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
          onEndReached={this.getPrList}
          onEndReachedThreshold={0}
          data={this.props.prList}
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

const mapStateToProps = (state, props) => ({
  repo: props.navigation.getParam('repo'),
  owner: props.navigation.getParam('owner'),
  prList: state.pullRequest.prList,
  pagination: state.pullRequest.pagination,
  loading:
    state.pullRequest.loading.isLoading &&
    state.pullRequest.loading.action === GET_PR_LIST,
  error: state.pullRequest.error,
});

const mapDispatchToProps = {
  getPrList,
  clearPagination,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PullRequest);
