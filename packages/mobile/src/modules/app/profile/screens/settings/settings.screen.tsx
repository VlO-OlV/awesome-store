import { useNavigation } from '@react-navigation/native';
import { Pressable, Text, View } from 'react-native';
import { NAVIGATION_KEYS, StackNavigation } from 'src/modules/navigation/types';
import { styles } from './settings.styles';
import { useLogout } from 'src/hooks/auth';
import { CustomModal } from 'src/shared/components/modal';
import { WebView } from 'react-native-webview';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from 'src/shared/styles';

export const SettingsScreen = () => {
	const { navigate } = useNavigation<StackNavigation>();
	const { mutate: logout } = useLogout();

	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [isLogout, setIsLogout] = useState<boolean>(false);

	return (
		<View style={styles.screenWrapper}>
			<View style={styles.optionsWrapper}>
				<Pressable
					onPress={() => navigate(NAVIGATION_KEYS.PERSONAL_INFO)}
				>
					<Text style={styles.optionText}>Personal info</Text>
				</Pressable>
				<Pressable onPress={() => navigate(NAVIGATION_KEYS.PASSWORD)}>
					<Text style={styles.optionText}>Change password</Text>
				</Pressable>
				<Pressable onPress={() => navigate(NAVIGATION_KEYS.FAQ)}>
					<Text style={styles.optionText}>FAQ</Text>
				</Pressable>
				<Pressable
					onPress={() => {
						setIsLogout(false);
						setIsModalVisible(true);
					}}
				>
					<Text style={styles.optionText}>Terms & Conditions</Text>
				</Pressable>
				<Pressable
					onPress={() => {
						setIsLogout(true);
						setIsModalVisible(true);
					}}
				>
					<Text style={[styles.optionText, styles.redText]}>
						Logout
					</Text>
				</Pressable>
			</View>
			<CustomModal isOpened={isModalVisible}>
				{isLogout ? (
					<>
						<Text style={styles.modalTitle}>
							Are you sure you want to logout?
						</Text>
						<View style={styles.modalButtonsWrapper}>
							<Pressable
								onPress={() => setIsModalVisible(false)}
								style={[
									styles.modalButton,
									styles.modalRejectButton,
								]}
							>
								<Text style={styles.modalButtonText}>No</Text>
							</Pressable>
							<Pressable
								onPress={() => logout()}
								style={styles.modalButton}
							>
								<Text style={styles.modalButtonText}>Yes</Text>
							</Pressable>
						</View>
					</>
				) : (
					<>
						<Pressable
							onPress={() => setIsModalVisible(false)}
							style={styles.closeButton}
						>
							<Ionicons
								name={'close'}
								size={24}
								color={COLORS.red}
							/>
						</Pressable>
						<View style={styles.webViewWrapper}>
							<WebView
								source={{
									uri: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
								}}
								style={{ flex: 1 }}
							/>
						</View>
					</>
				)}
			</CustomModal>
		</View>
	);
};
