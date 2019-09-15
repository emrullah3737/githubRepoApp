import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import repository from './reducers/repository';
import issue from './reducers/issue';
import pullRequest from './reducers/pullRequest';

const rootReducer = combineReducers({
  repository,
  issue,
  pullRequest,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger), applyMiddleware(thunk)),
);

export default store;
