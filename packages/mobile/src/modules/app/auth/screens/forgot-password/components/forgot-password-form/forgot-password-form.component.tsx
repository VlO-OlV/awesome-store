import { useNavigation } from '@react-navigation/native';
import { ScrollView, Text, View } from 'react-native';
import { NAVIGATION_KEYS, StackNavigation } from 'src/modules/navigation/types';
import { ButtonSection } from 'src/shared/components/button-section';
import { Input } from 'src/shared/components/input';
import { styles } from './forgot-password-form.styles';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './forgot-password-form.schema';
import { useForgotPassword } from 'src/hooks/auth';
import { useEffect } from 'react';
import { getErrorMessage } from 'src/shared/services/utils';

type FormData = {
	email: string;
};

export function ForgotPasswordForm({}) {
	const { navigate } = useNavigation<StackNavigation>();
	const {
		mutate: forgotPassword,
		isPending: isForgotPasswordPending,
		error: forgotPasswordError,
	} = useForgotPassword();

	const {
		control,
		handleSubmit,
		setError,
		formState: { isValid },
	} = useForm<FormData>({
		defaultValues: {
			email: '',
		},
		mode: 'onChange',
		resolver: yupResolver(validationSchema),
	});

	useEffect(() => {
		if (forgotPasswordError) {
			const message = getErrorMessage(forgotPasswordError);
			if (
				message.toLowerCase().includes('email') ||
				message.toLowerCase().includes('user')
			) {
				setError('email', {
					message: getErrorMessage(forgotPasswordError),
				});
			}
		}
	}, [forgotPasswordError]);

	const onSubmit: SubmitHandler<FormData> = (data) => {
		forgotPassword({
			email: data.email,
		});
	};

	return (
		<View style={styles.formWrapper}>
			<ScrollView
				style={styles.form}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.titleWrapper}>
					<Text style={styles.title}>Reset password</Text>
				</View>
				<Input name={'email'} control={control} label={'Your email'} />
			</ScrollView>
			<ButtonSection
				buttonText={'Send code'}
				onSubmit={handleSubmit(onSubmit)}
				text={'Remember password?'}
				pressableText={'Log in'}
				onPressText={() => navigate(NAVIGATION_KEYS.LOGIN)}
				isLoading={isForgotPasswordPending}
				disabled={!isValid}
			/>
		</View>
	);
}
