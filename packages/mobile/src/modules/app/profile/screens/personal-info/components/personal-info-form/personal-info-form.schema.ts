import * as yup from 'yup';

export const validationSchema = yup.object().shape({
	email: yup.string().required(),
	fullName: yup.string().required('Full name is required'),
	phone: yup
		.string()
		.matches(/^[0-9]+$/, 'Phone must contain only numbers')
		.required('Phone number is required'),
	address: yup.string().required('Shipping address is required'),
});
