import { ScrollView, Text, View } from 'react-native';
import { styles } from './registration-form.styles';
import { Input } from 'src/shared/components/input';
import { ButtonSection } from 'src/shared/components/button-section';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NAVIGATION_KEYS, StackNavigation } from 'src/modules/navigation/types';
import { useNavigation } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './registration-form.schema';
import { useRegister } from 'src/hooks/auth';
import { UserRole } from 'src/services/user/types';
import { useEffect } from 'react';
import { getErrorMessage } from 'src/shared/services/utils';

export type FormData = {
	email: string;
	fullName: string;
	phone: string;
	address: string;
	password: string;
	confirmPassword: string;
};

export function RegistrationForm({}) {
	const { navigate } = useNavigation<StackNavigation>();
	const {
		mutate: register,
		isPending: isRegisterPending,
		error: registerError,
	} = useRegister();

	const {
		control,
		handleSubmit,
		setError,
		formState: { isValid },
	} = useForm<FormData>({
		defaultValues: {
			email: '',
			fullName: '',
			phone: '',
			address: '',
			password: '',
			confirmPassword: '',
		},
		mode: 'onChange',
		resolver: yupResolver(validationSchema),
	});

	useEffect(() => {
		if (registerError) {
			const message = getErrorMessage(registerError);
			if (
				message.toLowerCase().includes('email') ||
				message.toLowerCase().includes('user')
			) {
				setError('email', { message: getErrorMessage(registerError) });
			}
		}
	}, [registerError]);

	const onSubmit: SubmitHandler<FormData> = (data) => {
		register({ ...data, role: UserRole.USER });
	};

	const handleRedirectPress = () => {
		navigate(NAVIGATION_KEYS.LOGIN);
	};

	return (
		<View style={styles.formWrapper}>
			<ScrollView
				style={styles.form}
				contentContainerStyle={styles.formContent}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.titleWrapper}>
					<Text style={styles.title}>Sign Up</Text>
				</View>
				<Input name={'email'} control={control} label={'Email'} />
				<Input
					name={'fullName'}
					control={control}
					label={'Full name'}
				/>
				<Input
					name={'phone'}
					control={control}
					label={'Phone number'}
				/>
				<Input
					name={'address'}
					control={control}
					label={'Shipping address'}
				/>
				<Input
					name={'password'}
					control={control}
					label={'Password'}
					secured
				/>
				<Input
					name={'confirmPassword'}
					control={control}
					label={'Confirm Password'}
					secured
				/>
			</ScrollView>
			<ButtonSection
				buttonText={'Sign up'}
				onSubmit={handleSubmit(onSubmit)}
				text={'Have you already registered?'}
				pressableText={'Sign In'}
				onPressText={handleRedirectPress}
				isLoading={isRegisterPending}
				disabled={!isValid}
			/>
		</View>
	);
}
