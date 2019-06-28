import {combineReducers} from 'redux';
import posts from '../post/reducers';

export default combineReducers({
  postsReducer: posts
})
