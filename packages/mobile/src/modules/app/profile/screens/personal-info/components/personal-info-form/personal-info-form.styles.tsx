import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	formWrapper: {
		flex: 1,
	},
	form: {
		flex: 1,
	},
	formContent: {
		gap: 20,
	},
	deleteButtonWrapper: {
		alignItems: 'center',
		marginTop: 50,
		marginBottom: 20,
	},
	deleteButtonText: {
		fontFamily: FONTS.poppinsSemiBold,
		fontSize: 16,
		color: COLORS.red,
	},
});
