import { styles } from './login.styles';
import { LoginForm } from './components/login-form';
import { SafeAreaView } from 'react-native-safe-area-context';

export const LoginScreen = () => {
	return (
		<SafeAreaView style={styles.screenWrapper}>
			<LoginForm />
		</SafeAreaView>
	);
};
