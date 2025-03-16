import { SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Input } from 'src/shared/components/input';
import { styles } from './password-form.styles';
import { ButtonSection } from 'src/shared/components/button-section';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './password-form.schema';
import { useChangePassword } from 'src/hooks/auth';
import { useEffect } from 'react';
import { getErrorMessage } from 'src/shared/services/utils';

type FormData = {
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
};

export function PasswordForm({}) {
	const {
		mutate: changePassword,
		isPending: isChangePasswordPending,
		error: changePasswordError,
	} = useChangePassword();

	const onSubmit: SubmitHandler<FormData> = (data) => {
		changePassword({ ...data });
	};

	const {
		control,
		handleSubmit,
		setError,
		formState: { isValid },
	} = useForm<FormData>({
		defaultValues: {
			oldPassword: '',
			newPassword: '',
			confirmPassword: '',
		},
		mode: 'onChange',
		resolver: yupResolver(validationSchema),
	});

	useEffect(() => {
		if (changePasswordError) {
			const message = getErrorMessage(changePasswordError);
			if (message.toLowerCase().includes('password')) {
				setError('oldPassword', {
					message: getErrorMessage(changePasswordError),
				});
			}
		}
	}, [changePasswordError]);

	return (
		<View style={styles.formWrapper}>
			<ScrollView
				style={styles.form}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.formContent}
			>
				<Input
					name={'oldPassword'}
					label={'Current Password'}
					control={control}
					secured
				/>
				<Input
					name={'newPassword'}
					label={'New Password'}
					control={control}
					secured
				/>
				<Input
					name={'confirmPassword'}
					label={'Confirm New Password'}
					control={control}
					secured
				/>
			</ScrollView>
			<ButtonSection
				buttonText={'Save'}
				onSubmit={handleSubmit(onSubmit)}
				isLoading={isChangePasswordPending}
				disabled={!isValid}
			/>
		</View>
	);
}
