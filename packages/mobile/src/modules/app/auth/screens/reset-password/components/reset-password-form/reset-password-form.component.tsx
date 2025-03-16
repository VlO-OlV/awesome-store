import { ScrollView, Text } from 'react-native';
import { View } from 'react-native';
import { ButtonSection } from 'src/shared/components/button-section';
import { Input } from 'src/shared/components/input';
import { styles } from './reset-password-form.styles';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './reset-password-form.schema';
import { useResetPassword } from 'src/hooks/auth';

type FormData = {
	password: string;
	confirmPassword: string;
};

type ResetPasswordFormProps = {
	resetToken: string;
};

export function ResetPasswordForm({ resetToken }: ResetPasswordFormProps) {
	const { mutate: resetPassword, isPending: isResetPasswordPending } =
		useResetPassword();

	const {
		control,
		handleSubmit,
		formState: { isValid },
	} = useForm<FormData>({
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
		mode: 'onChange',
		resolver: yupResolver(validationSchema),
	});

	const onSubmit: SubmitHandler<FormData> = (data) => {
		resetPassword({ token: resetToken, password: data.password });
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
				<Input
					name={'password'}
					control={control}
					label={'New password'}
					secured
				/>
				<Input
					name={'confirmPassword'}
					control={control}
					label={'Confirm password'}
					secured
				/>
			</ScrollView>
			<ButtonSection
				buttonText={'Submit'}
				onSubmit={handleSubmit(onSubmit)}
				isLoading={isResetPasswordPending}
				disabled={!isValid}
			/>
		</View>
	);
}
