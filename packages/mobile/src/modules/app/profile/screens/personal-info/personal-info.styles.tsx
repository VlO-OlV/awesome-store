import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	screenWrapper: {
		flex: 1,
		paddingHorizontal: 16,
	},
	modalTitle: {
		textAlign: 'center',
		fontFamily: FONTS.poppinsRegular,
		fontSize: 16,
	},
	modalButtonsWrapper: {
		flexDirection: 'row',
		marginTop: 30,
		gap: 20,
	},
	modalButton: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 69,
		height: 43,
		backgroundColor: COLORS.blue,
		borderRadius: 10,
	},
	modalButtonText: {
		marginTop: 4,
		fontFamily: FONTS.poppinsBold,
		fontSize: 16,
		color: COLORS.white,
	},
	modalRejectButton: {
		backgroundColor: COLORS.lightRed,
	},
});
