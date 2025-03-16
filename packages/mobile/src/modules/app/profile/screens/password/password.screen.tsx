import { View } from 'react-native';
import { styles } from './password.styles';
import { PasswordForm } from './components/password-form';

export const PasswordScreen = () => {
	return (
		<View style={styles.screenWrapper}>
			<PasswordForm />
		</View>
	);
};
