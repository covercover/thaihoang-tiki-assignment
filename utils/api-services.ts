import axios from 'axios';

class ApiServices {
	baseURL: string;
	constructor() {
		this.baseURL = process.env.API_URL
	}

	get = async (params) => {
		try {
			return await axios({
				method: 'GET',
				url: this.baseURL,
				params: {
					apiKey: process.env.API_KEY,
					...params
				}
			});
		} catch (e) {
			console.log('error:', e)
		}
	};
}

export default new ApiServices()
