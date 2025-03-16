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
		gap: 8,
	},
	imageWrapper: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 50,
		marginBottom: 20,
	},
	image: {
		width: 245,
	},
	formRedirectText: {
		fontFamily: FONTS.poppinsMedium,
		fontSize: 14,
		color: COLORS.blue,
	},
});
