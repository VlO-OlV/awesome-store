import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	buttonSection: {
		alignItems: 'center',
	},
	buttonWrapper: {
		position: 'relative',
		width: '100%',
		height: 43,
	},
	button: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 10,
		borderRadius: 10,
	},
	buttonText: {
		marginTop: 4,
		fontFamily: FONTS.poppinsBold,
		fontSize: 16,
		color: COLORS.white,
	},
	buttonActive: {
		backgroundColor: COLORS.blue,
	},
	buttonDisabled: {
		backgroundColor: COLORS.secondaryGrey,
	},
	buttonSectionRedirect: {
		flexDirection: 'row',
		gap: 4,
		marginTop: 20,
		marginBottom: 10,
	},
	redirectText: {
		fontFamily: FONTS.poppinsRegular,
		fontSize: 16,
	},
	redirectButtonText: {
		fontFamily: FONTS.poppinsBold,
		fontSize: 16,
		color: COLORS.blue,
	},
});
