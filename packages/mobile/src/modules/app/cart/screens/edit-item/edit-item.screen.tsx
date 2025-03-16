import {
	ActivityIndicator,
	Pressable,
	ScrollView,
	Text,
	View,
} from 'react-native';
import { styles } from './edit-item.styles';
import { ButtonSection } from 'src/shared/components/button-section';
import { useNavigation } from '@react-navigation/native';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
	StackNavigation,
} from 'src/modules/navigation/types';
import { useGetProduct } from 'src/hooks/product';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCartStore } from 'src/stores/cart';
import { useState } from 'react';
import { COLORS } from 'src/shared/styles';
import { AmountInput } from 'src/shared/components/amount-input';
import { useDeleteOrderDetail } from 'src/hooks/order/useDeleteOrderDetail';
import { useUpdateOrderDetail } from 'src/hooks/order/useUpdateOrderDetail';

type EditItemScreenProps = NativeStackScreenProps<
	RootStackParamList,
	NAVIGATION_KEYS.EDIT_ITEM
>;

export const EditItemScreen = ({ route }: EditItemScreenProps) => {
	const { goBack } = useNavigation<StackNavigation>();
	const { productId, cartItemIndex, orderDetail, isEditable } = route.params;

	const { data } = useGetProduct(productId);
	const { mutate: deleteOrderDetail } = useDeleteOrderDetail(
		orderDetail?.orderId as string,
	);
	const { mutate: updateOrderDetail, isPending: isUpdateOrderDetailPending } =
		useUpdateOrderDetail(orderDetail?.orderId as string);
	const { cartItems, editItem, removeItem } = useCartStore();

	const [amount, setAmount] = useState<number>(
		cartItemIndex
			? cartItems[cartItemIndex].quantity
			: orderDetail
				? orderDetail.quantity
				: 1,
	);

	if (!data) {
		return <ActivityIndicator size={'large'} color={COLORS.blue} />;
	}

	const handleSubmit = () => {
		if (cartItemIndex) {
			editItem(cartItemIndex, {
				quantity: amount,
				purchasePrice: data.price,
			});
		}
		if (orderDetail) {
			updateOrderDetail({
				orderDetailId: orderDetail.id,
				quantity: amount,
			});
		}
		goBack();
	};

	const handleRemoveItem = () => {
		if (cartItemIndex) {
			removeItem(cartItemIndex);
		}
		if (orderDetail) {
			deleteOrderDetail(orderDetail.id);
		}
		goBack();
	};

	return (
		<View style={styles.screenWrapper}>
			<ScrollView style={styles.productInfoWrapper}>
				<View style={styles.infoSection}>
					<Text style={styles.boldText}>Name:</Text>
					<Text style={styles.text}>{data.name}</Text>
				</View>
				<View style={styles.infoSection}>
					<Text style={styles.boldText}>Description:</Text>
					<Text style={styles.text}>{data.description}</Text>
				</View>
				<View style={styles.infoSection}>
					<Text style={styles.boldText}>In Stock:</Text>
					<Text style={styles.text}>{data.quantity}</Text>
				</View>
				<View style={styles.infoSection}>
					<Text style={styles.boldText}>Price:</Text>
					<Text style={styles.text}>{data.price}</Text>
				</View>
				<View style={styles.infoSection}>
					<Text style={styles.boldText}>Category:</Text>
					<Text style={styles.text}>{data.category}</Text>
				</View>
				<View>
					<Text style={styles.boldText}>Amount:</Text>
					<AmountInput
						max={
							cartItemIndex
								? data.quantity
								: orderDetail
									? orderDetail.quantity + data.quantity
									: 1
						}
						amount={amount}
						disabled={!isEditable}
						changeAmount={(newAmount: number) =>
							setAmount(newAmount)
						}
					/>
					{isEditable ? (
						<View style={styles.removeButtonWrapper}>
							<Pressable onPress={handleRemoveItem}>
								<Text style={styles.removeButtonText}>
									Remove from the{' '}
									{cartItemIndex ? 'cart' : 'order'}
								</Text>
							</Pressable>
						</View>
					) : null}
				</View>
			</ScrollView>
			<ButtonSection
				buttonText={'Save'}
				onSubmit={handleSubmit}
				isLoading={isUpdateOrderDetailPending}
				disabled={!isEditable}
			/>
		</View>
	);
};
