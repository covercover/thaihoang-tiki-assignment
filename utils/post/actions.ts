import API from '../api-services';

export const actionTypes = {
	FETCH_POST_LIST_REQUEST: 'FETCH_POST_LIST_REQUEST',
	FETCH_POST_LIST_SUCCESS: 'FETCH_POST_LIST_SUCCESS',
	FETCH_POST_LIST_FAILURE: 'FETCH_POST_LIST_FAILURE',
	LOAD_MORE_POST_LIST_REQUEST: 'LOAD_MORE_POST_LIST_REQUEST',
	LOAD_MORE_POST_LIST_SUCCESS: 'LOAD_MORE_POST_LIST_SUCCESS',
	SEARCH_POST_REQUEST: 'SEARCH_POST_REQUEST',
	SEARCH_POST_SUCCESS: 'SEARCH_POST_SUCCESS',
};

export const fetchPostListRequest = payload => {
	return {
		type: actionTypes.FETCH_POST_LIST_REQUEST,
		payload
	}
};

export const loadMorePostListRequest = payload => {
	return {
		type: actionTypes.LOAD_MORE_POST_LIST_REQUEST,
		payload
	}
};

export const APIFetchPostList = async (payload: object) => {
	try {
		return await API.get({
			...payload
		});
	} catch (e) {
		throw new Error(e)
	}
};

export const APISearchPost = async (payload: object) => {
	try {
		return await API.get({
			...payload
		});
	} catch (e) {
		throw new Error(e)
	}
};

export const fetchPostListSuccess = payload => {
	return {
		type: actionTypes.FETCH_POST_LIST_SUCCESS,
		payload
	}
};

export const loadMorePostListSuccess = payload => {
	return {
		type: actionTypes.LOAD_MORE_POST_LIST_SUCCESS,
		payload
	}
};

export const searchPostListSuccess = payload => {
	return {
		type: actionTypes.SEARCH_POST_SUCCESS,
		payload
	}
};


export const fetchPostListFailure = error => {
	return {
		type: actionTypes.FETCH_POST_LIST_FAILURE,
		error
	}
};
