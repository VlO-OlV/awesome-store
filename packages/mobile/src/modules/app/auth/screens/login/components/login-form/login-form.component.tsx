import { SubmitHandler, useForm } from 'react-hook-form';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { Input } from 'src/shared/components/input';
import { ButtonSection } from 'src/shared/components/button-section';
import { styles } from './login-form.styles';
import { useNavigation } from '@react-navigation/native';
import { NAVIGATION_KEYS, StackNavigation } from 'src/modules/navigation/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './login-form.schema';
import { useLogin } from 'src/hooks/auth';
import { IMAGE_MAP } from 'src/shared/styles';
import { useEffect } from 'react';
import { getErrorMessage } from 'src/shared/services/utils';

type FormData = {
	email: string;
	password: string;
};

export function LoginForm({}) {
	const { navigate } = useNavigation<StackNavigation>();
	const {
		mutate: login,
		isPending: isLoginPending,
		error: loginError,
	} = useLogin();

	const {
		control,
		handleSubmit,
		setError,
		formState: { isValid },
	} = useForm<FormData>({
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onChange',
		resolver: yupResolver(validationSchema),
	});

	useEffect(() => {
		if (loginError) {
			const message = getErrorMessage(loginError);
			if (message.toLowerCase().includes('password')) {
				setError('password', { message: getErrorMessage(loginError) });
			}
			if (message.toLowerCase().includes('email')) {
				setError('email', { message: getErrorMessage(loginError) });
			}
		}
	}, [loginError]);

	const onSubmit: SubmitHandler<FormData> = (data) => {
		login(data);
	};

	const handleRedirectPress = () => {
		navigate(NAVIGATION_KEYS.REGISTRATION);
	};

	return (
		<View style={styles.formWrapper}>
			<ScrollView
				style={styles.form}
				contentContainerStyle={styles.formContent}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.imageWrapper}>
					<Image source={IMAGE_MAP.logo} style={styles.image} />
				</View>
				<Input name={'email'} control={control} label={'Email'} />
				<Input
					name={'password'}
					control={control}
					label={'Password'}
					secured
				/>
				<View>
					<Pressable
						onPress={() =>
							navigate(NAVIGATION_KEYS.FORGOT_PASSWORD)
						}
					>
						<Text style={styles.formRedirectText}>
							Forgot password?
						</Text>
					</Pressable>
				</View>
			</ScrollView>
			<ButtonSection
				buttonText={'Sign in'}
				onSubmit={handleSubmit(onSubmit)}
				text={'Don\'t have an account?'}
				pressableText={'Sign Up'}
				onPressText={handleRedirectPress}
				isLoading={isLoginPending}
				disabled={!isValid}
			/>
		</View>
	);
}
