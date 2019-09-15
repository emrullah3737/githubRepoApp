import {LOADING, GET_REPOSITORY_LIST} from '../types';
import RequestService from '../../services/requestService';

export function getRepositoryList(owner, query) {
  return async dispatch => {
    dispatch({
      type: LOADING,
      payload: {loading: true, action: GET_REPOSITORY_LIST},
    });

    try {
      const {data: repositoryList, pagination} = await RequestService.get({
        path: `/users/${owner}/repos`,
        query,
      });

      dispatch({
        type: GET_REPOSITORY_LIST,
        payload: {repositoryList, pagination, reflesh: query.reflesh},
      });
    } catch (error) {
      dispatch({
        type: GET_REPOSITORY_LIST,
        payload: {
          repositoryList: [],
          error: error.toString(),
        },
      });
    } finally {
      dispatch({
        type: LOADING,
        payload: {loading: false, action: GET_REPOSITORY_LIST},
      });
    }
  };
}
