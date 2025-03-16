import { StyleSheet } from 'react-native';
import { FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	listWrapper: {
		flex: 1,
	},
	list: {
		gap: 15,
	},
	emptyContainer: {
		alignItems: 'center',
	},
	emptyMessage: {
		fontFamily: FONTS.poppinsRegular,
		fontSize: 16,
	},
});
