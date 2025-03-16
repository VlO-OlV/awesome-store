import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	modalWrapper: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.blur,
	},
	modal: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		paddingVertical: 40,
		paddingHorizontal: 16,
		borderRadius: 10,
		backgroundColor: COLORS.white,
	},
});
