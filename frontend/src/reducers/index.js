import { combineReducers } from 'redux';
import categories from './categories';
import posts from './posts';
import comments from './comments';
import { loadingBarReducer } from 'react-redux-loading-bar';

export default combineReducers({
  categories,
  posts,
  comments,
  loadingBar: loadingBarReducer,
});
