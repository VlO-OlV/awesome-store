import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	screenWrapper: {
		flex: 1,
		paddingHorizontal: 16,
	},
	mainSectionWrapper: {
		flex: 1,
		alignItems: 'center',
		paddingTop: 50,
	},
	textWrapper: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	mainTitle: {
		fontFamily: FONTS.poppinsBold,
		fontSize: 16,
		marginBottom: 30,
	},
	mainText: {
		fontFamily: FONTS.poppinsMedium,
		fontSize: 14,
		color: COLORS.grey,
		marginBottom: 30,
	},
	codeFieldRoot: {
		height: 50,
		justifyContent: 'center',
		gap: 10,
	},
	cell: {
		width: 44,
		height: 50,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: COLORS.lightGrey,
		backgroundColor: COLORS.white,
	},
	focusCell: {
		borderColor: COLORS.grey,
	},
	cellText: {
		position: 'relative',
		height: '100%',
		paddingTop: 6,
		textAlignVertical: 'center',
		textAlign: 'center',
		fontFamily: FONTS.poppinsMedium,
		fontSize: 24,
	},
});
