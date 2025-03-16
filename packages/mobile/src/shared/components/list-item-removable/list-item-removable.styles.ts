import { StyleSheet } from 'react-native';
import { FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	itemSection: {
		justifyContent: 'space-between',
	},
	infoContainerWrapper: {
		flexDirection: 'row',
		gap: 15,
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
	removeButtonWrapper: {
		justifyContent: 'center',
		marginRight: 18,
	},
});
