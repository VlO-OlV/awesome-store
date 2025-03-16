import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles } from './success.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { Text, View } from 'react-native';
import { ButtonSection } from 'src/shared/components/button-section';
import SuccessIcon from '../../../../../../assets/icons/checkmark.svg';
import { COLORS } from 'src/shared/styles';

type SuccessScreenProps = NativeStackScreenProps<
	RootStackParamList,
	NAVIGATION_KEYS.SUCCESS | NAVIGATION_KEYS.SUCCESS_PRIVATE
>;

export const SuccessScreen = ({ route }: SuccessScreenProps) => {
	const { mainText, buttonText, redirect, isIcon } = route.params;

	return (
		<SafeAreaView style={styles.screenWrapper}>
			<View style={styles.mainSection}>
				<SuccessIcon height={120} width={120} fill={COLORS.green} />
				<Text style={styles.mainText}>{mainText}</Text>
			</View>
			<ButtonSection
				buttonText={buttonText}
				onSubmit={redirect}
				buttonIcon={
					isIcon ? (
						<SuccessIcon height={20} fill={COLORS.white} />
					) : null
				}
			/>
		</SafeAreaView>
	);
};
