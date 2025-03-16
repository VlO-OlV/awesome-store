import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NAVIGATION_KEYS } from '../../types';
import { ProductsScreen } from '../../../app/product/screens/products';
import { OrdersScreen } from '../../../app/order/screens/orders';
import { SettingsScreen } from '../../../app/profile/screens/settings';
import { TABS_SCREEN_OPTIONS } from '../../constants';
import ProductsIcon from '../../../../../assets/icons/cube.svg';
import OrdersIcon from '../../../../../assets/icons/list.svg';
import SettingsIcon from '../../../../../assets/icons/settings.svg';
import { COLORS } from 'src/shared/styles';
import { TabButton } from './tab-button';
import { PressableProps } from 'react-native';
import { CartButton } from '../root-navigator/cart-button';

const BottomTab = createBottomTabNavigator();

export const TabsNavigator = () => {
	return (
		<BottomTab.Navigator
			initialRouteName={NAVIGATION_KEYS.PRODUCTS}
			screenOptions={{
				...TABS_SCREEN_OPTIONS,
				tabBarButton: (props) => (
					<TabButton {...(props as PressableProps)} />
				),
			}}
		>
			<BottomTab.Screen
				name={NAVIGATION_KEYS.PRODUCTS}
				component={ProductsScreen}
				options={({ navigation }) => ({
					title: 'Products',
					tabBarIcon: ({ focused }) => (
						<ProductsIcon
							height={24}
							fill={focused ? COLORS.blue : COLORS.black}
						/>
					),
					headerRight: ({}) => (
						<CartButton
							isNested
							onPress={() =>
								navigation.navigate(NAVIGATION_KEYS.CART)
							}
						/>
					),
				})}
			/>
			<BottomTab.Screen
				name={NAVIGATION_KEYS.ORDERS}
				component={OrdersScreen}
				options={{
					title: 'Orders',
					tabBarIcon: ({ focused }) => (
						<OrdersIcon
							height={24}
							fill={focused ? COLORS.blue : COLORS.black}
						/>
					),
				}}
			/>
			<BottomTab.Screen
				name={NAVIGATION_KEYS.SETTINGS}
				component={SettingsScreen}
				options={{
					title: 'Settings',
					tabBarIcon: ({ focused }) => (
						<SettingsIcon
							height={24}
							stroke={focused ? COLORS.blue : COLORS.black}
						/>
					),
				}}
			/>
		</BottomTab.Navigator>
	);
};
