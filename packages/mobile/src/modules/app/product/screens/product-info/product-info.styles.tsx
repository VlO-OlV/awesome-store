import { StyleSheet } from 'react-native';
import { FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	screenWrapper: {
		flex: 1,
		paddingHorizontal: 16,
	},
	productInfoWrapper: {
		flex: 1,
	},
	infoSection: {
		marginBottom: 10,
	},
	boldText: {
		fontFamily: FONTS.poppinsSemiBold,
		fontSize: 16,
	},
	text: {
		fontFamily: FONTS.poppinsRegular,
		fontSize: 16,
	},
});
