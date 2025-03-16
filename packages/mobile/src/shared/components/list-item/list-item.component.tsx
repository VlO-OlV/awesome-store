import { ReactNode } from 'react';
import { Pressable } from 'react-native';
import { styles } from './list-item.styles';

type ListItemProps = {
	onPress?: () => void;
	height: number;
	children: ReactNode;
};

export function ListItem({ onPress, height, children }: ListItemProps) {
	return (
		<Pressable onPress={onPress} style={[styles.item, { height }]}>
			{children}
		</Pressable>
	);
}
