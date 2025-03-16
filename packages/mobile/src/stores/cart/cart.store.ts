import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { STORAGE_KEYS } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OrderDetail } from 'src/services/order/types';

type CartItem = Omit<OrderDetail, 'id'> & {
	name: string;
};

type CartStore = {
	totalAmount: number;
	cartItems: CartItem[];
	addItem: (item: CartItem) => void;
	editItem: (
		index: number,
		item: Omit<CartItem, 'productId' | 'name'>,
	) => void;
	removeItem: (index: number) => void;
	clearCart: () => void;
};

const getTotalAmount = (items: CartItem[]) => {
	const updatedAmount = items.reduce((previousAmount, currentItem) => {
		return (
			previousAmount + currentItem.quantity * currentItem.purchasePrice
		);
	}, 0);

	return Math.round(updatedAmount * 100) / 100;
};

export const useCartStore = create<CartStore>()(
	persist(
		(set) => ({
			totalAmount: 0,
			cartItems: [],
			addItem: (item: CartItem) => {
				set(({ cartItems }) => {
					const updatedCartItems = [...cartItems, item];
					return {
						cartItems: updatedCartItems,
						totalAmount: getTotalAmount(updatedCartItems),
					};
				});
			},
			editItem: (
				index: number,
				item: Omit<CartItem, 'productId' | 'name'>,
			) => {
				set(({ cartItems }) => {
					const updatedCartItems = cartItems.map(
						(currentItem, currentIndex) => {
							return currentIndex === index
								? { ...currentItem, ...item }
								: currentItem;
						},
					);
					return {
						cartItems: updatedCartItems,
						totalAmount: getTotalAmount(updatedCartItems),
					};
				});
			},
			removeItem: (index: number) => {
				set(({ cartItems }) => {
					const updatedCartItems = cartItems.filter(
						(currentItem, currentIndex) => currentIndex !== index,
					);
					return {
						cartItems: updatedCartItems,
						totalAmount: getTotalAmount(updatedCartItems),
					};
				});
			},
			clearCart: () => {
				set({ cartItems: [], totalAmount: 0 });
			},
		}),
		{
			name: STORAGE_KEYS.CART_STORE,
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
