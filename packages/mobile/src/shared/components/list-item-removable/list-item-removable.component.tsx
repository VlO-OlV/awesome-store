import { Pressable, View } from 'react-native';
import { ListItem } from '../list-item/list-item.component';
import { Text } from 'react-native';
import { styles } from './list-item-removable.styles';
import DeleteIcon from '../../../../assets/icons/delete.svg';
import { COLORS } from 'src/shared/styles';

type ListItemRemovableProps = {
	onPress?: () => void;
	onRemove: () => void;
	height: number;
	name: string;
	amount: number;
	total: number;
};

export function ListItemRemovable({
	onRemove,
	onPress,
	height,
	name,
	amount,
	total,
}: ListItemRemovableProps) {
	return (
		<ListItem onPress={onPress} height={height}>
			<View style={styles.itemSection}>
				<Text style={styles.text}>{name}</Text>
				<View style={styles.infoContainerWrapper}>
					<View style={styles.infoContainer}>
						<Text style={styles.boldText}>Total:</Text>
						<Text style={styles.text}>${total}</Text>
					</View>
					<View style={styles.infoContainer}>
						<Text style={styles.boldText}>Amount:</Text>
						<Text style={styles.text}>{amount}</Text>
					</View>
				</View>
			</View>
			<View style={[styles.itemSection, styles.removeButtonWrapper]}>
				<Pressable onPress={onRemove}>
					<DeleteIcon fill={COLORS.lightRed} />
				</Pressable>
			</View>
		</ListItem>
	);
}
