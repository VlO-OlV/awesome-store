import { Pressable, PressableProps } from 'react-native';

export const TabButton = (props: PressableProps) => (
	<Pressable {...props} android_ripple={{ color: 'transparent' }} />
);
