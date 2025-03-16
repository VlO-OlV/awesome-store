import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { COLORS, FONTS } from 'src/shared/styles';

export const STACK_SCREEN_OPTIONS: NativeStackNavigationOptions = {
	headerTitleAlign: 'center',
	headerTitleStyle: {
		fontFamily: FONTS.poppinsBold,
		fontSize: 24,
		color: COLORS.black,
	},
	headerBackVisible: false,
	headerStyle: {
		backgroundColor: COLORS.lightBlue,
	},
	headerShadowVisible: false,
	contentStyle: {
		backgroundColor: COLORS.lightBlue,
	},
	statusBarBackgroundColor: COLORS.lightBlue,
};

export const TABS_SCREEN_OPTIONS: BottomTabNavigationOptions = {
	headerTitleAlign: 'center',
	headerTitleStyle: {
		fontFamily: FONTS.poppinsBold,
		fontSize: 24,
		color: COLORS.black,
	},
	headerStyle: {
		backgroundColor: COLORS.lightBlue,
	},
	headerShadowVisible: false,
	tabBarStyle: {
		height: 80,
	},
	tabBarLabelStyle: {
		fontFamily: FONTS.poppinsRegular,
		fontSize: 16,
	},
	tabBarIconStyle: {
		flex: 1,
		alignItems: 'center',
		marginBottom: 0,
	},
	tabBarInactiveTintColor: COLORS.black,
	tabBarActiveTintColor: COLORS.blue,
	sceneStyle: {
		backgroundColor: COLORS.lightBlue,
	},
	animation: 'shift',
};
