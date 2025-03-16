import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	screenWrapper: {
		flex: 1,
		paddingHorizontal: 26,
	},
	optionsWrapper: {
		gap: 20,
	},
	optionText: {
		fontFamily: FONTS.poppinsRegular,
		fontSize: 16,
	},
	redText: {
		color: COLORS.red,
	},
	webViewWrapper: {
		width: '100%',
		height: 300,
	},
	closeButton: {
		position: 'absolute',
		alignSelf: 'flex-end',
		top: 10,
		right: 16,
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
