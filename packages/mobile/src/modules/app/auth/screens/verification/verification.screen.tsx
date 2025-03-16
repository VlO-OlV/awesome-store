import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './verification.styles';
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useState } from 'react';
import { ButtonSection } from 'src/shared/components/button-section';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import {
	useForgotPassword,
	useResendEmail,
	useVerifyEmail,
	useVerifyPasswordReset,
} from 'src/hooks/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type VerificationScreenProps = NativeStackScreenProps<
	RootStackParamList,
	NAVIGATION_KEYS.VERIFICATION
>;

export const VerificationScreen = ({ route }: VerificationScreenProps) => {
	const { email, isPasswordReset } = route.params;

	const { mutate: verifyEmail, isPending: isVerifyEmailPending } =
		useVerifyEmail();
	const { mutate: verifyPasswordReset, isPending: isVerifyPasswordPending } =
		useVerifyPasswordReset();
	const { mutate: resendEmailCode } = useResendEmail();
	const { mutate: resendPasswordCode } = useForgotPassword();

	const [value, setValue] = useState('');
	const ref = useBlurOnFulfill({ value, cellCount: 6 });
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	});

	const handleSubmitPress = () => {
		if (isPasswordReset) {
			verifyPasswordReset({ token: value, email });
		} else {
			verifyEmail({ token: value, email });
		}
	};

	const handleResend = () => {
		if (isPasswordReset) {
			resendPasswordCode({ email });
		} else {
			resendEmailCode({ email });
		}
		setValue('');
	};

	return (
		<SafeAreaView style={styles.screenWrapper}>
			<View style={styles.mainSectionWrapper}>
				<ScrollView>
					<View style={styles.textWrapper}>
						<Text style={styles.mainTitle}>Email Verification</Text>
					</View>
					<View style={styles.textWrapper}>
						<Text style={styles.mainText}>
							Please type the code from the email
						</Text>
					</View>
					<CodeField
						ref={ref}
						{...props}
						value={value}
						onChangeText={setValue}
						cellCount={4}
						rootStyle={styles.codeFieldRoot}
						keyboardType="number-pad"
						textContentType="oneTimeCode"
						renderCell={({ index, symbol, isFocused }) => (
							<View
								key={index}
								style={[
									styles.cell,
									isFocused && styles.focusCell,
								]}
								onLayout={getCellOnLayoutHandler(index)}
							>
								<Text style={styles.cellText}>
									{symbol || (isFocused ? <Cursor /> : null)}
								</Text>
							</View>
						)}
					/>
				</ScrollView>
			</View>
			<ButtonSection
				buttonText={'Submit'}
				onSubmit={handleSubmitPress}
				text={'Didn\'t receive a code?'}
				pressableText={'Resend'}
				onPressText={handleResend}
				isLoading={isVerifyEmailPending || isVerifyPasswordPending}
				disabled={value.length !== 4}
			/>
		</SafeAreaView>
	);
};
