import axios from 'axios';

export const api = () => {
	return axios.create({
		baseURL: 'http://172.20.0.2:3333',
	});
};
