import {LOADING, GET_ISSUE_LIST, CLEAR_PAGINATION} from '../types';

const defaultState = {
  issueList: [],
  error: undefined,
  pagination: {
    nextPage: 1,
  },
  loading: {isLoading: false},
};

export default function(state = defaultState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_ISSUE_LIST: {
      return {
        ...state,
        issueList: payload.reflesh
          ? payload.issueList
          : [...state.issueList, ...payload.issueList],
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
    case CLEAR_PAGINATION: {
      return {
        ...state,
        pagination: payload.pagination,
        issueList: [],
      };
    }
    default:
      return state;
  }
}
