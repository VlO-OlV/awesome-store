import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	buttonWrapper: {
		paddingBottom: 4,
	},
	nested: {
		marginRight: 16,
	},
	badge: {
		position: 'absolute',
		top: 12,
		left: 12,
		alignItems: 'center',
		justifyContent: 'center',
		height: 18,
		width: 18,
		paddingTop: 2,
		borderRadius: 9,
		backgroundColor: COLORS.red,
	},
	badgeText: {
		fontFamily: FONTS.poppinsRegular,
		fontSize: 8,
		color: COLORS.white,
	},
});
