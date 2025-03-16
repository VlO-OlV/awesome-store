import { Pressable, Text, View } from 'react-native';
import { List } from 'src/shared/components/list';
import { styles } from './orders.styles';
import { useGetMyOrders } from 'src/hooks/order';
import { useState } from 'react';
import { ListItem } from 'src/shared/components/list-item';
import { getDateString } from 'src/hooks/utils';
import {
	DeliveryStatus,
	PaymentStatus,
	RENDER_DELIVERY_STATUS,
	RENDER_PAYMENT_STATUS,
} from 'src/services/order/types';
import { useNavigation } from '@react-navigation/native';
import { NAVIGATION_KEYS, StackNavigation } from 'src/modules/navigation/types';
import { useBottomSheetContext } from 'src/shared/contexts/bottom-sheet';
import SuccessIcon from '../../../../../../assets/icons/checkmark.svg';
import { COLORS } from 'src/shared/styles';

type BottomSheetContentProps = {
	title: string;
	options: Array<{ name: string; action: () => void; active?: boolean }>;
};

export const OrdersScreen = () => {
	const { navigate } = useNavigation<StackNavigation>();

	const { openSheet, closeSheet } = useBottomSheetContext();

	const [paymentFilter, setPaymentFilter] = useState<PaymentStatus | null>(
		null,
	);
	const [deliveryFilter, setDeliveryFilter] = useState<DeliveryStatus | null>(
		null,
	);
	const [dateFilter, setDateFilter] = useState<'asc' | 'desc' | null>(null);
	const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

	const { data, isLoading, refetch } = useGetMyOrders({
		paymentStatus: paymentFilter ?? undefined,
		deliveryStatus: deliveryFilter ?? undefined,
		date: dateFilter ?? undefined,
	});

	const refreshList = async () => {
		setIsRefreshing(true);
		await refetch();
		setIsRefreshing(false);
	};

	const handleOpenSheet = ({ title, options }: BottomSheetContentProps) => {
		openSheet(
			<View style={styles.bottomContentWrapper}>
				<Text style={[styles.boldText, styles.bottomTitle]}>
					{title}
				</Text>
				<View>
					{options.map(({ name, action, active }) => (
						<Pressable
							key={name}
							onPress={() => {
								closeSheet();
								action();
							}}
							style={styles.bottomOption}
						>
							<Text
								style={[
									styles.text,
									active ? styles.filterOption : null,
								]}
							>
								{name}
							</Text>
							{active ? (
								<SuccessIcon fill={COLORS.green} height={20} />
							) : null}
						</Pressable>
					))}
				</View>
			</View>,
		);
	};

	return (
		<View style={styles.screenWrapper}>
			<View style={styles.filterSectionWrapper}>
				<Text style={styles.boldText}>Filter by</Text>
				<View style={styles.filterSection}>
					<View style={styles.filterOptionWrapper}>
						<Text style={styles.boldText}>Payment:</Text>
						<Pressable
							onPress={() =>
								handleOpenSheet({
									title: 'Payment Status',
									options: [
										null,
										...Object.values(PaymentStatus),
									].map((value) => ({
										name: value
											? RENDER_PAYMENT_STATUS[value]
											: 'All',
										action: () => setPaymentFilter(value),
										active: value === paymentFilter,
									})),
								})
							}
						>
							<Text style={[styles.text, styles.filterOption]}>
								{paymentFilter
									? RENDER_PAYMENT_STATUS[paymentFilter]
									: 'All'}
							</Text>
						</Pressable>
					</View>
					<View style={styles.filterOptionWrapper}>
						<Text style={styles.boldText}>Delivery:</Text>
						<Pressable
							onPress={() =>
								handleOpenSheet({
									title: 'Delivery Status',
									options: [
										null,
										...Object.values(DeliveryStatus),
									].map((value) => ({
										name: value
											? RENDER_DELIVERY_STATUS[value]
											: 'All',
										action: () => setDeliveryFilter(value),
										active: value === deliveryFilter,
									})),
								})
							}
						>
							<Text style={[styles.text, styles.filterOption]}>
								{deliveryFilter
									? RENDER_DELIVERY_STATUS[deliveryFilter]
									: 'All'}
							</Text>
						</Pressable>
					</View>
					<View style={styles.filterOptionWrapper}>
						<Text style={styles.boldText}>Date:</Text>
						<Pressable
							onPress={() =>
								handleOpenSheet({
									title: 'Date',
									options: [
										{
											name: 'None',
											action: () => setDateFilter(null),
											active: dateFilter === null,
										},
										{
											name: 'Ascending',
											action: () => setDateFilter('asc'),
											active: dateFilter === 'asc',
										},
										{
											name: 'Descending',
											action: () => setDateFilter('desc'),
											active: dateFilter === 'desc',
										},
									],
								})
							}
						>
							<Text style={[styles.text, styles.filterOption]}>
								{dateFilter
									? dateFilter[0].toUpperCase() +
										dateFilter.slice(1)
									: 'None'}
							</Text>
						</Pressable>
					</View>
				</View>
			</View>
			<List
				isLoading={isLoading}
				isRefreshing={isRefreshing}
				onRefresh={refreshList}
				emptyMessage={'Orders not found'}
				data={data}
				renderItem={({ item }) => (
					<ListItem
						onPress={() =>
							navigate(NAVIGATION_KEYS.ORDER_DETAILS, {
								orderId: item.id,
							})
						}
						height={212}
					>
						<View style={styles.itemInfoSection}>
							<Text style={styles.text}>
								<Text style={styles.boldText}>Date:</Text>{' '}
								{getDateString(new Date(item.updatedAt))}
							</Text>
							<Text style={styles.text}>
								<Text style={styles.boldText}>ID:</Text>{' '}
								{item.id}
							</Text>
							<Text style={styles.text}>
								<Text style={styles.boldText}>
									Payment Status:
								</Text>{' '}
								{RENDER_PAYMENT_STATUS[item.paymentStatus]}
							</Text>
							<Text style={styles.text}>
								<Text style={styles.boldText}>
									Delivery Status:
								</Text>{' '}
								{RENDER_DELIVERY_STATUS[item.deliveryStatus]}
							</Text>
							<Text style={styles.text}>
								<Text style={styles.boldText}>Total:</Text> $
								{item.totalAmount}
							</Text>
						</View>
						<View></View>
					</ListItem>
				)}
			/>
		</View>
	);
};
