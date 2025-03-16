import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
	StackNavigation,
} from 'src/modules/navigation/types';
import { ButtonSection } from 'src/shared/components/button-section';
import { styles } from './product-info.styles';
import { Text } from 'react-native';
import { AmountInput } from '../../../../../shared/components/amount-input';
import { useGetProduct } from 'src/hooks/product';
import { COLORS } from 'src/shared/styles';
import { useState } from 'react';
import { useCartStore } from 'src/stores/cart';
import { useNavigation } from '@react-navigation/native';

type ProductInfoScreenProps = NativeStackScreenProps<
	RootStackParamList,
	NAVIGATION_KEYS.PRODUCT_INFO
>;

export const ProductInfoScreen = ({ route }: ProductInfoScreenProps) => {
	const { navigate } = useNavigation<StackNavigation>();
	const { cartItems, addItem, editItem } = useCartStore();
	const productId = route.params.productId;
	const existingItem = cartItems.find((item) => item.productId === productId);

	const { data } = useGetProduct(productId);

	const [amount, setAmount] = useState<number>(
		existingItem ? existingItem.quantity : 1,
	);

	if (!data) {
		return <ActivityIndicator size={'large'} color={COLORS.blue} />;
	}

	const handleSubmit = () => {
		if (!existingItem) {
			addItem({
				productId: route.params.productId,
				quantity: amount,
				purchasePrice: data.price,
				name: data.name,
			});
		} else {
			editItem(cartItems.indexOf(existingItem), {
				quantity: amount,
				purchasePrice: data.price,
			});
		}
		navigate(NAVIGATION_KEYS.CART);
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
						max={data.quantity}
						amount={amount}
						disabled={false}
						changeAmount={(newAmount: number) =>
							setAmount(newAmount)
						}
					/>
				</View>
			</ScrollView>
			<ButtonSection
				buttonText={existingItem ? 'Save' : 'Add to Cart'}
				onSubmit={handleSubmit}
			/>
		</View>
	);
};
