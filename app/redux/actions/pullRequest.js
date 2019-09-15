import {LOADING, GET_PR_LIST, CLEAR_PAGINATION} from '../types';
import RequestService from '../../services/requestService';

export function getPrList(owner, repo, query) {
  return async dispatch => {
    dispatch({
      type: LOADING,
      payload: {loading: true, action: GET_PR_LIST},
    });

    try {
      const {data: prList, pagination} = await RequestService.get({
        path: `/repos/${owner}/${repo}/pulls`,
        query,
      });

      dispatch({
        type: GET_PR_LIST,
        payload: {prList, pagination, reflesh: query.reflesh},
      });
    } catch (error) {
      dispatch({
        type: GET_PR_LIST,
        payload: {
          prList: [],
          error: error.toString(),
        },
      });
    } finally {
      dispatch({
        type: LOADING,
        payload: {loading: false, action: GET_PR_LIST},
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
