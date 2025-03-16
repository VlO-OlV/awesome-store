import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './forgot-password.styles';
import { ForgotPasswordForm } from './components/forgot-password-form';

export const ForgotPasswordScreen = () => {
	return (
		<SafeAreaView style={styles.screenWrapper}>
			<ForgotPasswordForm />
		</SafeAreaView>
	);
};
