import React, { ReactNode } from 'react';
import { Modal, StatusBar, View } from 'react-native';
import { styles } from './modal.styles';
import { COLORS } from 'src/shared/styles';

type CustomModalProps = {
	isOpened: boolean;
	children: ReactNode;
};

export function CustomModal({ isOpened, children }: CustomModalProps) {
	return (
		<>
			<StatusBar
				backgroundColor={isOpened ? COLORS.blur : COLORS.lightBlue}
			/>
			<Modal animationType={'fade'} transparent={true} visible={isOpened}>
				<View style={styles.modalWrapper}>
					<View style={styles.modal}>{children}</View>
				</View>
			</Modal>
		</>
	);
}
