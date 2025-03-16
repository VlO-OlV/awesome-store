import { RegistrationForm } from './components/registration-form';
import { styles } from './registration.styles';
import { SafeAreaView } from 'react-native-safe-area-context';

export const RegistrationScreen = () => {
	return (
		<SafeAreaView style={styles.screenWrapper}>
			<RegistrationForm />
		</SafeAreaView>
	);
};
