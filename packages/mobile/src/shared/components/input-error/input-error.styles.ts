import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	error: {
		position: 'absolute',
		bottom: -6,
		fontFamily: FONTS.poppinsMedium,
		fontSize: 14,
		color: COLORS.red,
	},
});
