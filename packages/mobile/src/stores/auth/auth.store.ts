import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { STORAGE_KEYS } from '../constants';

type AuthStore = {
	accessToken: string | null;
	refreshToken: string | null;
	isAuth: boolean;
	setTokens: (accessToken: string, refreshToken: string) => void;
	removeTokens: () => void;
};

export const useAuthStore = create<AuthStore>()(
	persist(
		(set) => ({
			accessToken: null,
			refreshToken: null,
			isAuth: false,
			setTokens: (accessToken: string, refreshToken: string) => {
				set({ accessToken, refreshToken, isAuth: true });
			},
			removeTokens: () => {
				set({ accessToken: null, refreshToken: null, isAuth: false });
			},
		}),
		{
			name: STORAGE_KEYS.AUTH_STORE,
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
