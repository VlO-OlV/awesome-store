import * as yup from 'yup';

export const validationSchema = yup.object().shape({
	password: yup
		.string()
		.min(8, 'Password is too short')
		.matches(/[A-Z]/, 'Password must have 1 uppercase letter')
		.matches(/[a-z]/, 'Password must have 1 lowercase letter')
		.matches(/[0-9]/, 'Password must have 1 number')
		.required('Password is required'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password')], 'Passwords must match')
		.required('Confirm the password'),
});
