import API from '../api-services';

export const actionTypes = {
	FETCH_POST_LIST_REQUEST: 'FETCH_POST_LIST_REQUEST',
	FETCH_POST_LIST_SUCCESS: 'FETCH_POST_LIST_SUCCESS',
	FETCH_POST_LIST_FAILURE: 'FETCH_POST_LIST_FAILURE',
	SEARCH_POST_REQUEST: 'SEARCH_POST_REQUEST',
};

export const fetchPostListRequest = payload => {
	return {
		type: actionTypes.FETCH_POST_LIST_REQUEST,
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


export const fetchPostListFailure = error => {
	return {
		type: actionTypes.FETCH_POST_LIST_FAILURE,
		error
	}
};
