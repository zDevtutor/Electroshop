import React, { useEffect, useState } from 'react';

import {
	Typography,
	Grid,
	RadioGroup,
	FormControlLabel,
	Radio,
	Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod, selectCart } from '../../store/cartSlice';

const PaymentForm = props => {
	const { paymentMethod } = useSelector(selectCart);
	const [payment, setPayment] = useState('PayPal');
	const dispatch = useDispatch();

	const submitFormHandler = event => {
		event.preventDefault();
		props.onNext();
		dispatch(savePaymentMethod(payment));
	};

	const navigateBackHandler = () => {
		props.onBack();
	};

	useEffect(() => {
		if (paymentMethod) {
			setPayment(paymentMethod);
		}
	}, [paymentMethod]);

	return (
		<>
			<Typography variant='h6' gutterBottom>
				Payment method
			</Typography>
			<Grid container spacing={3} component='form' onSubmit={submitFormHandler}>
				<Grid item xs={12} md={6}>
					<RadioGroup
						row
						aria-labelledby='demo-row-radio-buttons-group-label'
						name='row-radio-buttons-group'
						value={payment}
						onChange={e => setPayment(e.target.value)}>
						<FormControlLabel
							value='PayPal'
							control={<Radio />}
							label='PayPal or Credit Card'
						/>
						<FormControlLabel
							value='Stripe'
							control={<Radio />}
							label='Stripe'
						/>
					</RadioGroup>
				</Grid>

				<Grid item xs={12} textAlign='right'>
					<Button
						type='button'
						sx={{ mt: 3, mb: 2 }}
						onClick={navigateBackHandler}>
						Back
					</Button>
					<Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
						Next
					</Button>
				</Grid>
			</Grid>
		</>
	);
};

export default PaymentForm;
