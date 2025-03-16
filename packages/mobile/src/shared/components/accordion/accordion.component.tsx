import { ReactNode, useState } from 'react';
import Animated, {
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { styles } from './accordion.styles';
import { Pressable, View } from 'react-native';
import { Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type AccordionProps = {
	title: string;
	children: ReactNode;
};

export function Accordion({ title, children }: AccordionProps) {
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const height = useSharedValue(0);

	const derivedHeight = useDerivedValue(() =>
		withTiming(isExpanded ? height.value : 0, {
			duration: 500,
		}),
	);

	const rotation = useDerivedValue(() =>
		withTiming(isExpanded ? 90 : 0, {
			duration: 300,
		}),
	);

	const toggleAccordion = () => {
		setIsExpanded(!isExpanded);
	};

	const contentStyle = useAnimatedStyle(() => {
		return {
			height: derivedHeight.value,
		};
	});

	const buttonStyle = useAnimatedStyle(() => {
		return {
			transform: [{ rotate: `${rotation.value}deg` }],
		};
	});

	return (
		<View>
			<View>
				<Pressable onPress={toggleAccordion} style={styles.button}>
					<Text style={styles.buttonText}>{title}</Text>
					<Animated.View style={buttonStyle}>
						<Ionicons
							name={'chevron-forward'}
							size={24}
							color={'black'}
						/>
					</Animated.View>
				</Pressable>
			</View>
			<Animated.View style={[styles.animatedView, contentStyle]}>
				<View
					onLayout={(e) =>
						(height.value = e.nativeEvent.layout.height)
					}
					style={styles.wrapper}
				>
					{children}
				</View>
			</Animated.View>
		</View>
	);
}
