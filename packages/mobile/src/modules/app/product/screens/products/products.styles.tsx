import { StyleSheet } from 'react-native';
import { FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	screenWrapper: {
		flex: 1,
		paddingHorizontal: 16,
	},
	listItem: {
		height: 82,
	},
	itemInfoSection: {
		justifyContent: 'space-between',
	},
	infoContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 3,
	},
	boldText: {
		fontFamily: FONTS.poppinsSemiBold,
		fontSize: 16,
	},
	text: {
		fontFamily: FONTS.poppinsRegular,
		fontSize: 16,
	},
	inputSectionWrapper: {
		justifyContent: 'flex-start',
	},
	sortingSection: {
		position: 'relative',
		bottom: 10,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	sortingText: {
		fontFamily: FONTS.poppinsMedium,
		fontSize: 16,
	},
});
