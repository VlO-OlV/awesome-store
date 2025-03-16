import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavContainer } from '../nav-container';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from '../../types/navigation.type';
import { VerificationScreen } from '../../../app/auth/screens/verification';
import { STACK_SCREEN_OPTIONS } from '../../constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { SuccessScreen } from '../../../app/success/screens/success';
import { useAuthStore } from 'src/stores/auth';
import { TabsNavigator } from '../tabs-navigator';
import { ProductInfoScreen } from 'src/modules/app/product/screens/product-info';
import { CartScreen } from 'src/modules/app/cart/screens/cart';
import { EditItemScreen } from 'src/modules/app/cart/screens/edit-item';
import { OrderDetailsScreen } from 'src/modules/app/order/screens/order-details';
import { PersonalInfoScreen } from 'src/modules/app/profile/screens/personal-info';
import { PasswordScreen } from 'src/modules/app/profile/screens/password';
import { FAQScreen } from 'src/modules/app/faq/screens/faq';
import { LoginScreen } from 'src/modules/app/auth/screens/login';
import { RegistrationScreen } from 'src/modules/app/auth/screens/registration';
import { CartButton } from './cart-button';
import { Pressable } from 'react-native';
import { ForgotPasswordScreen } from 'src/modules/app/auth/screens/forgot-password';
import { ResetPasswordScreen } from 'src/modules/app/auth/screens/reset-password';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
	const { isAuth } = useAuthStore();

	return (
		<NavContainer>
			<Stack.Navigator
				initialRouteName={
					isAuth
						? NAVIGATION_KEYS.TABS_NAVIGATOR
						: NAVIGATION_KEYS.LOGIN
				}
				screenOptions={({ navigation }) => ({
					...STACK_SCREEN_OPTIONS,
					headerLeft: () =>
						navigation.canGoBack() ? (
							<Pressable onPress={() => navigation.goBack()}>
								<Ionicons name="chevron-back" size={30} />
							</Pressable>
						) : null,
				})}
			>
				{isAuth ? (
					<>
						<Stack.Screen
							name={NAVIGATION_KEYS.TABS_NAVIGATOR}
							component={TabsNavigator}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name={NAVIGATION_KEYS.PRODUCT_INFO}
							component={ProductInfoScreen}
							options={({ navigation }) => ({
								title: 'Product information',
								headerRight: ({}) => (
									<CartButton
										onPress={() =>
											navigation.navigate(
												NAVIGATION_KEYS.CART,
											)
										}
									/>
								),
							})}
						/>
						<Stack.Screen
							name={NAVIGATION_KEYS.CART}
							component={CartScreen}
							options={({ navigation }) => ({
								title: 'Cart',
								headerRight: ({}) => (
									<CartButton
										onPress={() =>
											navigation.navigate(
												NAVIGATION_KEYS.CART,
											)
										}
									/>
								),
							})}
						/>
						<Stack.Screen
							name={NAVIGATION_KEYS.EDIT_ITEM}
							component={EditItemScreen}
							options={({ navigation }) => ({
								title: 'Edit Item',
								headerRight: ({}) => (
									<CartButton
										onPress={() =>
											navigation.navigate(
												NAVIGATION_KEYS.CART,
											)
										}
									/>
								),
							})}
						/>
						<Stack.Screen
							name={NAVIGATION_KEYS.ORDER_DETAILS}
							component={OrderDetailsScreen}
							options={{
								title: 'Order details',
							}}
						/>
						<Stack.Screen
							name={NAVIGATION_KEYS.PERSONAL_INFO}
							component={PersonalInfoScreen}
							options={{
								title: 'Personal Info',
							}}
						/>
						<Stack.Screen
							name={NAVIGATION_KEYS.PASSWORD}
							component={PasswordScreen}
							options={{
								title: 'Change password',
							}}
						/>
						<Stack.Screen
							name={NAVIGATION_KEYS.FAQ}
							component={FAQScreen}
							options={{
								title: 'FAQ',
							}}
						/>
						<Stack.Screen
							name={NAVIGATION_KEYS.SUCCESS_PRIVATE}
							component={SuccessScreen}
							options={{
								headerShown: false,
							}}
						/>
					</>
				) : (
					<>
						<Stack.Screen
							name={NAVIGATION_KEYS.LOGIN}
							component={LoginScreen}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name={NAVIGATION_KEYS.REGISTRATION}
							component={RegistrationScreen}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name={NAVIGATION_KEYS.VERIFICATION}
							component={VerificationScreen}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name={NAVIGATION_KEYS.SUCCESS}
							component={SuccessScreen}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name={NAVIGATION_KEYS.FORGOT_PASSWORD}
							component={ForgotPasswordScreen}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name={NAVIGATION_KEYS.RESET_PASSWORD}
							component={ResetPasswordScreen}
							options={{
								headerShown: false,
							}}
						/>
					</>
				)}
			</Stack.Navigator>
		</NavContainer>
	);
};
