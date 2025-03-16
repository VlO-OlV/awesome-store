import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	screenWrapper: {
		flex: 1,
		paddingHorizontal: 16,
	},
	filterSectionWrapper: {
		paddingTop: 14,
		paddingBottom: 20,
		gap: 20,
	},
	filterSection: {
		flexDirection: 'row',
		gap: '16%',
	},
	filterOptionWrapper: {
		width: 78,
	},
	itemInfoSection: {
		width: '64%',
		gap: 10,
	},
	boldText: {
		fontFamily: FONTS.poppinsSemiBold,
		fontSize: 16,
	},
	text: {
		fontFamily: FONTS.poppinsRegular,
		fontSize: 16,
	},
	filterOption: {
		color: COLORS.green,
	},
	bottomContentWrapper: {
		paddingHorizontal: 26,
	},
	bottomTitle: {
		textAlign: 'center',
	},
	bottomOption: {
		height: 40,
		flexDirection: 'row',
		gap: 15,
	},
});
