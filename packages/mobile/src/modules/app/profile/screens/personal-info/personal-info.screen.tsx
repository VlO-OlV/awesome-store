import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { PersonalInfoForm } from './components/personal-info-form';
import { styles } from './personal-info.styles';
import { useState } from 'react';
import { COLORS } from 'src/shared/styles';
import { CustomModal } from 'src/shared/components/modal';
import { useDeleteMe, useGetMe } from 'src/hooks/user';

export const PersonalInfoScreen = () => {
	const { data } = useGetMe();
	const { mutate: deleteMe } = useDeleteMe();

	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

	if (!data) {
		return <ActivityIndicator size={'large'} color={COLORS.blue} />;
	}

	return (
		<View style={styles.screenWrapper}>
			<PersonalInfoForm
				data={data}
				openModal={() => setIsModalVisible(true)}
			/>
			<CustomModal isOpened={isModalVisible}>
				<Text style={styles.modalTitle}>
					Are you sure you want to delete your account?
				</Text>
				<View style={styles.modalButtonsWrapper}>
					<Pressable
						onPress={() => setIsModalVisible(false)}
						style={[styles.modalButton, styles.modalRejectButton]}
					>
						<Text style={styles.modalButtonText}>No</Text>
					</Pressable>
					<Pressable
						onPress={() => deleteMe()}
						style={styles.modalButton}
					>
						<Text style={styles.modalButtonText}>Yes</Text>
					</Pressable>
				</View>
			</CustomModal>
		</View>
	);
};
