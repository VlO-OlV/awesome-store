import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, Text, View } from 'react-native';
import { useGetOrder, useMakeOrderPayment } from 'src/hooks/order';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
	StackNavigation,
} from 'src/modules/navigation/types';
import { styles } from './order-details.styles';
import { List } from 'src/shared/components/list';
import { COLORS } from 'src/shared/styles';
import { ButtonSection } from 'src/shared/components/button-section';
import { ListItemRemovable } from 'src/shared/components/list-item-removable';
import PayIcon from '../../../../../../assets/icons/card.svg';
import { useDeleteOrderDetail } from 'src/hooks/order/useDeleteOrderDetail';
import { DeliveryStatus, PaymentStatus } from 'src/services/order/types';

type OrderDetailsScreenProps = NativeStackScreenProps<
	RootStackParamList,
	NAVIGATION_KEYS.ORDER_DETAILS
>;

export const OrderDetailsScreen = ({ route }: OrderDetailsScreenProps) => {
	const { orderId } = route.params;
	const { navigate } = useNavigation<StackNavigation>();

	const { data, isLoading } = useGetOrder(orderId);
	const { mutate: deleteOrderDetail } = useDeleteOrderDetail(orderId);
	const { mutate: payOrder, isPending: isPayOrderPending } =
		useMakeOrderPayment(orderId);

	if (!data) {
		return <ActivityIndicator size={'large'} color={COLORS.blue} />;
	}

	const handleRemoveItem = (index: string) => {
		deleteOrderDetail(index);
	};

	const handleSubmit = () => {
		payOrder(orderId);
	};

	return (
		<View style={styles.screenWrapper}>
			<View style={styles.titleWrapper}>
				<Text style={styles.title}>
					Total amount: ${data.totalAmount}
				</Text>
			</View>
			<List
				isLoading={isLoading}
				emptyMessage={'Order is empty'}
				data={data.orderDetails}
				keyExtractor={(item, index) => `${index}`}
				renderItem={({ item }) => (
					<ListItemRemovable
						height={72}
						name={item.product.name}
						amount={item.quantity}
						total={
							Math.round(
								item.purchasePrice * item.quantity * 100,
							) / 100
						}
						onRemove={() => handleRemoveItem(item.id)}
						onPress={() =>
							navigate(NAVIGATION_KEYS.EDIT_ITEM, {
								productId: item.productId,
								orderDetail: {
									...item,
									orderId,
								},
								isEditable:
									data.deliveryStatus ===
										DeliveryStatus.PENDING &&
									data.paymentStatus ===
										PaymentStatus.PENDING,
							})
						}
					/>
				)}
			/>
			<ButtonSection
				buttonText={'Pay'}
				buttonIcon={<PayIcon fill={COLORS.white} />}
				onSubmit={handleSubmit}
				isLoading={isPayOrderPending}
				disabled={
					data.orderDetails.length === 0 ||
					data.paymentStatus === PaymentStatus.COMPLETE
				}
			/>
		</View>
	);
};
