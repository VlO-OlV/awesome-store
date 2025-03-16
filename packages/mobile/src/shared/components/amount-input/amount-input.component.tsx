import { Pressable, Text, TextInput, View } from 'react-native';
import { styles } from './amount-input.styles';

type AmountInputProps = {
	max: number;
	amount: number;
	disabled: boolean;
	changeAmount: (newAmount: number) => void;
};

export function AmountInput({
	max,
	amount,
	changeAmount,
	disabled,
}: AmountInputProps) {
	const onChange = (value: string) => {
		let newAmount = parseInt(value.replace(/[^0-9]/g, ''));
		if (isNaN(newAmount) || newAmount < 0) {
			newAmount = 1;
		} else if (newAmount > max) {
			newAmount = max;
		}
		changeAmount(newAmount);
	};

	const reduceAmount = () => {
		if (amount > 1) {
			changeAmount(amount - 1);
		}
	};

	const increaseAmount = () => {
		if (amount < max) {
			changeAmount(amount + 1);
		}
	};

	return (
		<View style={styles.inputWrapper}>
			<Pressable
				onPress={reduceAmount}
				style={[styles.button, styles.buttonReduce]}
				disabled={disabled}
			>
				<Text style={styles.buttonText}>-</Text>
			</Pressable>
			<TextInput
				onChangeText={onChange}
				keyboardType={'numeric'}
				style={styles.input}
				value={`${amount}`}
				editable={!disabled}
			/>
			<Pressable
				onPress={increaseAmount}
				style={[styles.button, styles.buttonIncrease]}
				disabled={disabled}
			>
				<Text style={styles.buttonText}>+</Text>
			</Pressable>
		</View>
	);
}
