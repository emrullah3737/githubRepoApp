import {LOADING, GET_REPOSITORY_LIST} from '../types';

const defaultState = {
  repositoryList: [],
  error: undefined,
  pagination: {
    nextPage: 1,
  },
  loading: {isLoading: false},
};

export default function(state = defaultState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_REPOSITORY_LIST: {
      return {
        ...state,
        repositoryList: payload.reflesh
          ? payload.repositoryList
          : [...state.repositoryList, ...payload.repositoryList],
        pagination: payload.pagination,
        error: payload.error,
      };
    }
    case LOADING: {
      return {
        ...state,
        loading: {isLoading: payload.loading, action: payload.action},
      };
    }
    default:
      return state;
  }
}
