import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './reset-password.styles';
import { ResetPasswordForm } from './components/reset-password-form';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';

type ResetPasswordScreenProps = NativeStackScreenProps<
	RootStackParamList,
	NAVIGATION_KEYS.RESET_PASSWORD
>;

export const ResetPasswordScreen = ({ route }: ResetPasswordScreenProps) => {
	return (
		<SafeAreaView style={styles.screenWrapper}>
			<ResetPasswordForm resetToken={route.params.resetToken} />
		</SafeAreaView>
	);
};
