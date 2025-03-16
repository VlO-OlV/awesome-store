import {
	Pressable,
	StyleProp,
	Text,
	TextInput,
	TextStyle,
	View,
	ViewStyle,
} from 'react-native';
import {
	Control,
	FieldPath,
	FieldValues,
	RegisterOptions,
	useController,
} from 'react-hook-form';

import { styles } from './input.styles';
import { InputError } from '../input-error';
import { createRef, useState } from 'react';
import ShowIcon from '../../../../assets/icons/show.svg';
import HideIcon from '../../../../assets/icons/hide.svg';
import { COLORS } from 'src/shared/styles';

type InputProps<
	T extends FieldValues = FieldValues,
	N extends FieldPath<T> = FieldPath<T>,
> = {
	name: N;
	control: Control<T>;
	rules?:
		| Omit<
				RegisterOptions<T, N>,
				'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
		  >
		| undefined;
	label?: string;
	placeholder?: string;
	secured?: boolean;
	disabled?: boolean;
	extraInputContainerStyles?: StyleProp<ViewStyle>;
	extraErrorStyles?: StyleProp<TextStyle>;
};

export function Input<
	T extends FieldValues,
	N extends FieldPath<T> = FieldPath<T>,
>({
	control,
	name,
	rules,
	label,
	placeholder,
	secured = false,
	disabled = false,
	extraInputContainerStyles,
	extraErrorStyles = {},
}: InputProps<T, N>) {
	const [isFocused, setIsFocused] = useState(false);
	const [isVisible, setIsVisible] = useState(true);

	const inputRef = createRef<TextInput>();

	const {
		field: { value, onBlur, onChange },
		fieldState: { error },
	} = useController({
		control,
		name,
		rules,
	});

	const handleFocus = () => {
		if (inputRef.current?.isFocused) {
			setIsFocused(true);
			return;
		}
		setIsFocused(false);
	};

	const handleBlur = () => {
		onBlur();
		setIsFocused(false);
	};

	const toggleInput = () => {
		setIsVisible(!isVisible);
	};

	return (
		<View style={[styles.container, extraInputContainerStyles]}>
			{label && <Text style={styles.label}>{label}</Text>}
			<View
				style={[
					styles.inputWrapper,
					value && !error && styles.correct,
					isFocused && styles.focused,
					error && styles.wrong,
					disabled && styles.disabled,
				]}
			>
				<TextInput
					value={value}
					editable={!disabled}
					secureTextEntry={secured && !isVisible}
					onChangeText={onChange}
					onBlur={handleBlur}
					onFocus={handleFocus}
					style={[
						styles.input,
						disabled ? styles.disabledInput : null,
					]}
					placeholder={placeholder}
					placeholderTextColor={COLORS.black}
					autoCapitalize="none"
					ref={inputRef}
				/>
				{secured && (
					<Pressable onPress={toggleInput} style={styles.inputButton}>
						{isVisible ? <ShowIcon /> : <HideIcon />}
					</Pressable>
				)}
			</View>

			<InputError<T>
				control={control}
				field={name}
				extraErrorStyles={extraErrorStyles}
			/>
		</View>
	);
}
