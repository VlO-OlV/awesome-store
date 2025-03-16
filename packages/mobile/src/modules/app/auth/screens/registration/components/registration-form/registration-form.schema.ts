import * as yup from 'yup';

export const validationSchema = yup.object().shape({
	email: yup.string().email('Invalid email').required('Email is required'),
	fullName: yup.string().required('Full name is required'),
	phone: yup
		.string()
		.matches(/^[0-9]+$/, 'Phone must contain only numbers')
		.required('Phone number is required'),
	address: yup.string().required('Shipping address is required'),
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
