import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  actionTypes as postActionTypes,
  APIFetchPostList,
  fetchPostListSuccess,
  fetchPostListFailure,
  APISearchPost
} from './post/actions';

/**
 * @param: action {object} contains action type and payload
 */
function * fetchPostWorker(action) {
  try {
    const {data} = yield call(APIFetchPostList, action.payload);
    yield put(fetchPostListSuccess(data));
    action.resolve(data)
  } catch (e) {
    yield put(fetchPostListFailure(e));
  }
}

function * searchPostWorker(action) {
  try {
    const {data} = yield call(APISearchPost, action.payload);
    yield put(fetchPostListSuccess(data));
  } catch (e) {
    yield put(fetchPostListFailure(e));
  }
}

function * rootSaga () {
  yield all([
    takeLatest(postActionTypes.FETCH_POST_LIST_REQUEST, fetchPostWorker),
    takeLatest(postActionTypes.SEARCH_POST_REQUEST, searchPostWorker),
  ])
}

export default rootSaga
