import * as yup from 'yup';

export const validationSchema = yup.object().shape({
	email: yup.string().email('Invalid email').required('Email is required'),
});
