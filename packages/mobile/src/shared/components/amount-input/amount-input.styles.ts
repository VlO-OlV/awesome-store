import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	inputWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 10,
		height: 50,
		gap: 15,
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 46,
		height: 46,
		borderRadius: 24,
	},
	buttonReduce: {
		backgroundColor: COLORS.secondaryLightGrey,
	},
	buttonIncrease: {
		backgroundColor: COLORS.blue,
	},
	buttonText: {
		marginTop: 6,
		fontFamily: FONTS.poppinsSemiBold,
		fontSize: 24,
		color: COLORS.white,
	},
	input: {
		position: 'relative',
		width: 44,
		height: '100%',
		paddingBottom: 2,
		textAlign: 'center',
		fontFamily: FONTS.poppinsSemiBold,
		fontSize: 16,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: COLORS.secondaryGrey,
		backgroundColor: COLORS.white,
	},
});
