import {
	ActivityIndicator,
	Pressable,
	PressableProps,
	Text,
	View,
} from 'react-native';
import { styles } from './button-section.styles';
import React, { ReactNode } from 'react';
import { COLORS } from 'src/shared/styles';

type ButtonSectionProps = PressableProps & {
	buttonText: string;
	buttonIcon?: ReactNode;
	text?: string;
	pressableText?: string;
	isLoading?: boolean;
	onSubmit: () => void;
	onPressText?: () => void;
};

export function ButtonSection({
	buttonText,
	buttonIcon,
	text,
	pressableText,
	disabled,
	isLoading,
	onSubmit,
	onPressText,
	...props
}: ButtonSectionProps) {
	return (
		<View style={styles.buttonSection}>
			<View style={styles.buttonWrapper}>
				<Pressable
					onPress={onSubmit}
					style={[
						styles.button,
						disabled ? styles.buttonDisabled : styles.buttonActive,
					]}
					disabled={disabled}
					{...props}
				>
					{isLoading ? (
						<ActivityIndicator size={30} color={COLORS.white} />
					) : (
						<>
							{buttonIcon}
							<Text style={styles.buttonText}>{buttonText}</Text>
						</>
					)}
				</Pressable>
			</View>
			<View style={styles.buttonSectionRedirect}>
				{text && <Text style={styles.redirectText}>{text}</Text>}
				{pressableText && (
					<Pressable onPress={onPressText}>
						<Text style={styles.redirectButtonText}>
							{pressableText}
						</Text>
					</Pressable>
				)}
			</View>
		</View>
	);
}
