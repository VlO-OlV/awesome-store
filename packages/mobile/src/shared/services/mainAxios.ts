import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { useAuthStore } from 'src/stores/auth';
import { getErrorMessage } from './utils';
import { showToast } from 'src/hooks/utils';
import { authService } from 'src/services/auth';
import { HttpStatusCode } from './types';

export const mainAxios = axios.create({
	withCredentials: true,
});

let isRefreshing = false;

mainAxios.interceptors.request.use(
	(config): InternalAxiosRequestConfig<unknown> => {
		if (useAuthStore.getState().isAuth) {
			config.headers.Authorization = `Bearer ${!isRefreshing ? useAuthStore.getState().accessToken : useAuthStore.getState().refreshToken}`;
		}
		return config;
	},
);

mainAxios.interceptors.response.use(
	(response): AxiosResponse<unknown, unknown> => {
		return response;
	},
	async (error) => {
		const originalRequest = error.config;
		if (
			!!error.response &&
			error.response.status === HttpStatusCode.UNAUTHORIZED
		) {
			if (isRefreshing) {
				return Promise.reject(error);
			}
			isRefreshing = true;
			try {
				const tokens = await authService.refresh();
				useAuthStore
					.getState()
					.setTokens(tokens.accessToken, tokens.refreshToken);
				mainAxios.defaults.headers.common.Authorization = `Bearer ${tokens.accessToken}`;
				isRefreshing = false;
				return mainAxios(originalRequest);
			} catch (refreshError) {
				showToast('error', `${getErrorMessage(error as Error)}`);
				useAuthStore.getState().removeTokens();
				isRefreshing = false;
				return Promise.reject(error);
			}
		}
		showToast('error', `${getErrorMessage(error)}`);
		return Promise.reject(error);
	},
);
