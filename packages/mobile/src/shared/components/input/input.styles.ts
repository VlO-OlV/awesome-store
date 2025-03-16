import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	container: {
		position: 'relative',
		paddingBottom: 20,
	},
	inputWrapper: {
		flexDirection: 'row',
		borderWidth: 1,
		borderColor: COLORS.lightGrey,
		borderRadius: 10,
		backgroundColor: COLORS.white,
	},
	input: {
		flex: 1,
		paddingHorizontal: 16,
		paddingVertical: 8,
		fontFamily: FONTS.poppinsRegular,
		fontSize: 16,
	},
	inputButton: {
		width: 50,
		alignItems: 'center',
		justifyContent: 'center',
	},
	label: {
		marginBottom: 6,
		fontFamily: FONTS.poppinsMedium,
		fontSize: 14,
		color: COLORS.grey,
	},
	focused: {
		borderWidth: 1,
		borderColor: COLORS.grey,
	},
	wrong: {
		borderWidth: 1,
		borderColor: COLORS.red,
	},
	correct: {
		borderWidth: 1,
	},
	disabled: {
		backgroundColor: COLORS.additionalLightGrey,
	},
	disabledInput: {
		color: COLORS.secondaryGrey,
	},
});
