import {
	NavigationProp,
	NavigatorScreenParams,
} from '@react-navigation/native';
import { OrderDetail } from 'src/services/order/types';

export enum NAVIGATION_KEYS {
	LOGIN = 'LOGIN',
	REGISTRATION = 'REGISTRATION',
	VERIFICATION = 'VERIFICATION',
	FORGOT_PASSWORD = 'FORGOT_PASSWORD',
	RESET_PASSWORD = 'RESET_PASSWORD',
	SUCCESS = 'SUCCESS',
	SUCCESS_PRIVATE = 'SUCCESS_PRIVATE',
	PRODUCTS = 'PRODUCTS',
	PRODUCT_INFO = 'PRODUCT_INFO',
	CART = 'CART',
	EDIT_ITEM = 'EDIT_ITEM',
	ORDERS = 'ORDERS',
	ORDER_DETAILS = 'ORDER_DETAILS',
	PAYMENT = 'PAYMENT',
	SETTINGS = 'SETTINGS',
	PERSONAL_INFO = 'PERSONAL_INFO',
	PASSWORD = 'PASSWORD',
	FAQ = 'FAQ',

	TABS_NAVIGATOR = 'TABS_NAVIGATOR',
}

export type RootStackParamList = {
	[NAVIGATION_KEYS.LOGIN]: undefined;
	[NAVIGATION_KEYS.REGISTRATION]: undefined;
	[NAVIGATION_KEYS.VERIFICATION]: {
		email: string;
		isPasswordReset?: boolean;
	};
	[NAVIGATION_KEYS.FORGOT_PASSWORD]: undefined;
	[NAVIGATION_KEYS.RESET_PASSWORD]: { resetToken: string };
	[NAVIGATION_KEYS.SUCCESS]: {
		mainText: string;
		buttonText: string;
		isIcon?: boolean;
		redirect: () => void;
	};
	[NAVIGATION_KEYS.SUCCESS_PRIVATE]: {
		mainText: string;
		buttonText: string;
		isIcon?: boolean;
		redirect: () => void;
	};
	[NAVIGATION_KEYS.PRODUCT_INFO]: { productId: string };
	[NAVIGATION_KEYS.CART]: undefined;
	[NAVIGATION_KEYS.EDIT_ITEM]: {
		productId: string;
		cartItemIndex?: number;
		orderDetail?: OrderDetail & { orderId: string };
		isEditable: boolean;
	};
	[NAVIGATION_KEYS.ORDER_DETAILS]: { orderId: string };
	[NAVIGATION_KEYS.PAYMENT]: undefined;
	[NAVIGATION_KEYS.PERSONAL_INFO]: undefined;
	[NAVIGATION_KEYS.PASSWORD]: undefined;
	[NAVIGATION_KEYS.FAQ]: undefined;

	[NAVIGATION_KEYS.TABS_NAVIGATOR]: NavigatorScreenParams<BottomTabParamList>;
};

export type BottomTabParamList = {
	[NAVIGATION_KEYS.PRODUCTS]: undefined;
	[NAVIGATION_KEYS.ORDERS]: undefined;
	[NAVIGATION_KEYS.SETTINGS]: undefined;
};

export type StackNavigation = NavigationProp<RootStackParamList>;
