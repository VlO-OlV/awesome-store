import { StyleSheet } from 'react-native';
import { FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	formWrapper: {
		flex: 1,
	},
	form: {
		flex: 1,
	},
	titleWrapper: {
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 30,
	},
	title: {
		fontFamily: FONTS.poppinsBold,
		fontSize: 16,
	},
});
