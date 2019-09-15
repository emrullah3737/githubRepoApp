import {LOADING, GET_PR_LIST, CLEAR_PAGINATION} from '../types';

const defaultState = {
  prList: [],
  error: undefined,
  pagination: {
    nextPage: 1,
  },
  loading: {isLoading: false},
};

export default function(state = defaultState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_PR_LIST: {
      return {
        ...state,
        prList: payload.reflesh
          ? payload.prList
          : [...state.prList, ...payload.prList],
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
        prList: [],
      };
    }
    default:
      return state;
  }
}
