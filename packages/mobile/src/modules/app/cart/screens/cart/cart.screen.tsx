import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { NAVIGATION_KEYS, StackNavigation } from 'src/modules/navigation/types';
import { List } from 'src/shared/components/list';
import { useCartStore } from 'src/stores/cart';
import { styles } from './cart.styles';
import { ButtonSection } from 'src/shared/components/button-section';
import { ListItemRemovable } from 'src/shared/components/list-item-removable';
import { useCreateOrder } from 'src/hooks/order';

export const CartScreen = () => {
	const { navigate } = useNavigation<StackNavigation>();

	const { cartItems, totalAmount, removeItem } = useCartStore();
	const { mutate: createOrder, isPending: isCreateOrderPending } =
		useCreateOrder();

	const handleRemoveItem = (index: number) => {
		removeItem(index);
	};

	const handleSubmit = () => {
		createOrder({
			orderDetails: cartItems,
		});
	};

	return (
		<View style={styles.screenWrapper}>
			<View style={styles.titleWrapper}>
				<Text style={styles.title}>Total amount: ${totalAmount}</Text>
			</View>
			<List
				data={cartItems}
				emptyMessage={'The cart is empty'}
				keyExtractor={(item, index) => `${index}`}
				renderItem={({ item, index }) => (
					<ListItemRemovable
						height={72}
						name={item.name}
						amount={item.quantity}
						total={
							Math.round(
								item.purchasePrice * item.quantity * 100,
							) / 100
						}
						onRemove={() => handleRemoveItem(index)}
						onPress={() =>
							navigate(NAVIGATION_KEYS.EDIT_ITEM, {
								productId: item.productId,
								cartItemIndex: index,
								isEditable: true,
							})
						}
					/>
				)}
			/>
			<ButtonSection
				buttonText={'Create Order'}
				onSubmit={handleSubmit}
				isLoading={isCreateOrderPending}
				disabled={cartItems.length === 0}
			/>
		</View>
	);
};
