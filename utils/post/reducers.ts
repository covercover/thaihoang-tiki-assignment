import {actionTypes} from './actions';
import {formatTimePost} from '../formatTimePost';

const initialState = {
	posts: [],
	fetchPostsStatus: {
		loading: false,
		success: false,
		error: false
	},
	loadMorePostsStatus: {
		loading: false,
		success: false,
		error: false
	},
	searchPostsStatus: {
		loading: false,
		success: false,
		error: false
	},
	error: null
};

export default function post(state = initialState, action) {
	switch (action.type) {
		case actionTypes.FETCH_POST_LIST_REQUEST: {
			return {
				...state,
				...{
					fetchPostsStatus: {
						loading: true,
						success: false,
						error: false
					}
				},
			};
		}

		case actionTypes.FETCH_POST_LIST_SUCCESS: {
			const posts = formatTimePost(action.payload.articles);
			return {
				...state,
				...{
					posts: posts,
					fetchPostsStatus: {
						loading: false,
						success: true,
						error: false
					}
				}
			};
		}

		case actionTypes.LOAD_MORE_POST_LIST_SUCCESS: {
			const prevPosts = [...state.posts];
			const currentPosts = formatTimePost(action.payload.articles);
			const posts = prevPosts.concat(currentPosts);
			return {
				...state,
				...{
					posts: posts,
					loadMorePostsStatus: {
						loading: false,
						success: true,
						error: false
					}
				}
			};
		}

		case actionTypes.SEARCH_POST_REQUEST: {
			return {
				...state,
				...{
					searchPostsStatus: {
						loading: true,
						success: false,
						error: false
					}
				},
			};
		}

		case actionTypes.SEARCH_POST_SUCCESS: {
			const posts = formatTimePost(action.payload.articles);
			return {
				...state,
				...{
					posts: posts,
					searchPostsStatus: {
						loading: false,
						success: true,
						error: false
					}
				}
			};
		}

		case actionTypes.FETCH_POST_LIST_FAILURE: {
			return {
				...state,
				...{
					error: action.error,
					fetchPostsStatus: {
						loading: false,
						success: false,
						error: true
					}
				},
			};
		}

		default:
			return state;
	}
}
