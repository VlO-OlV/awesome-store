import { StyleSheet } from 'react-native';
import { FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	screenWrapper: {
		flex: 1,
		paddingHorizontal: 16,
	},
	titleWrapper: {
		height: 70,
		paddingTop: 8,
		alignItems: 'center',
	},
	title: {
		fontFamily: FONTS.poppinsSemiBold,
		fontSize: 16,
	},
});
