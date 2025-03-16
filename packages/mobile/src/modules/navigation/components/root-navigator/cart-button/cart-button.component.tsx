import { Pressable, Text, View } from 'react-native';
import CartIcon from '../../../../../../assets/icons/cart.svg';
import { styles } from './cart-button.styles';
import { useCartStore } from 'src/stores/cart';

type CartButtonProps = {
	isNested?: boolean;
	onPress: () => void;
};

export const CartButton = ({ isNested, onPress }: CartButtonProps) => {
	const { cartItems } = useCartStore();

	return (
		<Pressable
			onPress={onPress}
			style={[styles.buttonWrapper, isNested && styles.nested]}
		>
			<CartIcon />
			{cartItems.length !== 0 && (
				<View style={styles.badge}>
					<Text style={styles.badgeText}>{cartItems.length}</Text>
				</View>
			)}
		</Pressable>
	);
};
