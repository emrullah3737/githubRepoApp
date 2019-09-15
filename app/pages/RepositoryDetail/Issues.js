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
import IssueCard from '../../components/IssuePrCard';
import {GET_ISSUE_LIST} from '../../redux/types';
import {getIssueList, clearPagination} from '../../redux/actions/issue';

class Issue extends Component {
  static navigationOptions = {
    headerTitle: 'Issues',
  };

  state = {
    refleshing: false,
  };

  componentDidMount() {
    this.getIssueList();
  }

  componentWillUnmount() {
    this.props.clearPagination();
  }

  getIssueList = async () => {
    if (!this.props.pagination || this.props.loading) {
      return;
    }
    const {nextPage} = this.props.pagination;
    const {owner, repo} = this.props;
    await this.props.getIssueList(owner, repo, {
      state: 'all',
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
    const {owner, repo} = this.props;
    await this.props.getIssueList(owner, repo, {
      state: 'all',
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

  renderItem = ({item: repo}) => {
    const {id, title, comments, updated_at, state, number, user} = repo;
    return (
      <IssueCard
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
          onEndReached={this.getIssueList}
          onEndReachedThreshold={0}
          data={this.props.issueList}
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
  issueList: state.issue.issueList,
  pagination: state.issue.pagination,
  loading:
    state.issue.loading.isLoading &&
    state.issue.loading.action === GET_ISSUE_LIST,
  error: state.issue.error,
});

const mapDispatchToProps = {
  getIssueList,
  clearPagination,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Issue);
