import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	item: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
		paddingTop: 8,
		paddingBottom: 4,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: COLORS.grey,
	},
});
