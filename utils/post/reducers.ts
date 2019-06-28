import {actionTypes} from './actions';
import moment from 'moment';

const initialState = {
	posts: [],
	fetchPostsStatus: {
		loading: false,
		success: false,
		error: false
	},
	error: null
};

export default function post(state = initialState, action) {
	switch (action.type) {
		case actionTypes.FETCH_POST_LIST_REQUEST:
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
		case actionTypes.FETCH_POST_LIST_SUCCESS:
			console.log('action.payload:', action.payload);
			const posts = action.payload.articles.map((item) => {
				const newItem = {...item};
				newItem.publishedAt = moment(newItem.publishedAt).utc().format('DD/MM/YYYY HH:mm:ss');
				return newItem
			});
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
		case actionTypes.FETCH_POST_LIST_FAILURE:
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
		default:
			return state;
	}
}
