import { SubmitHandler, useForm } from 'react-hook-form';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { ButtonSection } from 'src/shared/components/button-section';
import { Input } from 'src/shared/components/input';
import { styles } from './personal-info-form.styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './personal-info-form.schema';
import { User } from 'src/services/user/types';
import { useUpdateMe } from 'src/hooks/user';

type PersonalInfoFormProps = {
	data: User;
	openModal: () => void;
};

type FormData = {
	email: string;
	fullName: string;
	phone: string;
	address: string;
};

export function PersonalInfoForm({ data, openModal }: PersonalInfoFormProps) {
	const { mutate: updateMe, isPending: isUpdateMePending } = useUpdateMe();

	const onSubmit: SubmitHandler<FormData> = (data) => {
		updateMe({ ...data });
	};

	const {
		control,
		handleSubmit,
		formState: { isValid },
	} = useForm<FormData>({
		defaultValues: {
			email: data.email,
			fullName: data.fullName,
			phone: data.phone,
			address: data.address,
		},
		mode: 'onChange',
		resolver: yupResolver(validationSchema),
	});

	return (
		<View style={styles.formWrapper}>
			<ScrollView
				style={styles.form}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.formContent}
			>
				<Input
					name={'email'}
					label={'Email'}
					control={control}
					disabled
				/>
				<Input
					name={'fullName'}
					label={'Full name'}
					control={control}
				/>
				<Input
					name={'phone'}
					label={'Phone number'}
					control={control}
				/>
				<Input
					name={'address'}
					label={'Shipping address'}
					control={control}
				/>
				<View style={styles.deleteButtonWrapper}>
					<Pressable onPress={openModal}>
						<Text style={styles.deleteButtonText}>
							Delete Account
						</Text>
					</Pressable>
				</View>
			</ScrollView>
			<ButtonSection
				buttonText={'Save'}
				onSubmit={handleSubmit(onSubmit)}
				isLoading={isUpdateMePending}
				disabled={!isValid}
			/>
		</View>
	);
}
