import axios from 'axios';

export const getErrorMessage = (error: Error): string => {
	if (axios.isAxiosError(error) && error.response) {
		const message = error.response.data.message;
		return Array.isArray(message) ? message[0] : message;
	} else {
		return error.message ?? 'Oops! Something went wrong';
	}
};
