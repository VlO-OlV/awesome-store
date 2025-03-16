import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	button: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 10,
		paddingLeft: 20,
		paddingRight: 10,
		backgroundColor: COLORS.additionalLightGrey,
	},
	buttonText: {
		fontFamily: FONTS.poppinsMedium,
		fontSize: 16,
	},
	wrapper: {
		position: 'absolute',
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	animatedView: {
		overflow: 'hidden',
		backgroundColor: COLORS.additionalLightGrey,
	},
});
