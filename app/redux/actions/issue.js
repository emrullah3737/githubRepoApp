import {LOADING, GET_ISSUE_LIST, CLEAR_PAGINATION} from '../types';
import RequestService from '../../services/requestService';
import filter from 'lodash/filter';

export function getIssueList(owner, repo, query) {
  return async dispatch => {
    dispatch({
      type: LOADING,
      payload: {loading: true, action: GET_ISSUE_LIST},
    });

    try {
      const {data, pagination} = await RequestService.get({
        path: `/repos/${owner}/${repo}/issues`,
        query,
      });

      dispatch({
        type: GET_ISSUE_LIST,
        payload: {
          issueList: filter(data, ({pull_request}) => !pull_request),
          pagination,
          reflesh: query.reflesh,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_ISSUE_LIST,
        payload: {
          issueList: [],
          error: error.toString(),
        },
      });
    } finally {
      dispatch({
        type: LOADING,
        payload: {loading: false, action: GET_ISSUE_LIST},
      });
    }
  };
}

export function clearPagination() {
  return dispatch => {
    dispatch({
      type: CLEAR_PAGINATION,
      payload: {pagination: {nextPage: 1}},
    });
  };
}
