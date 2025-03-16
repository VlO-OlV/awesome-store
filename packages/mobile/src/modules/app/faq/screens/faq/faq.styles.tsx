import { StyleSheet } from 'react-native';
import { FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	screenWrapper: {
		flex: 1,
		paddingHorizontal: 16,
	},
	accordionsWrapper: {
		paddingBottom: 20,
		gap: 20,
	},
	text: {
		fontFamily: FONTS.poppinsRegular,
		fontSize: 16,
	},
});
