import { StyleSheet } from 'react-native';
import { FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	screenWrapper: {
		flex: 1,
		paddingHorizontal: 16,
	},
	mainSection: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		gap: 20,
	},
	mainText: {
		fontFamily: FONTS.poppinsRegular,
		fontSize: 16,
	},
});
