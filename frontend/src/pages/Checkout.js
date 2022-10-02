import React, { useState, useEffect } from 'react';
import {
	Container,
	Paper,
	Stepper,
	Step,
	StepLabel,
	Typography,
} from '@mui/material';
import AddressForm from '../components/checkout/AddressForm';
import PaymentForm from '../components/checkout/PaymentForm';
import Review from '../components/checkout/Review';
import { useSelector } from 'react-redux';
import { getUserInfo } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Checkout = props => {
	const [activeStep, setActiveStep] = useState(0);
	const { userInfo } = useSelector(getUserInfo);
	const navigate = useNavigate();
	const steps = ['Shipping address', 'Payment details', 'Review your order'];

	function getStepContent(step) {
		switch (step) {
			case 0:
				return (
					<AddressForm
						onNext={navigateNextHandler}
						onBack={navigateBackHandler}
					/>
				);
			case 1:
				return (
					<PaymentForm
						onNext={navigateNextHandler}
						onBack={navigateBackHandler}
					/>
				);
			case 2:
				return (
					<Review onNext={navigateNextHandler} onBack={navigateBackHandler} />
				);
			default:
				throw new Error('Unknown step');
		}
	}

	const navigateNextHandler = () => {
		setActiveStep(activeStep + 1);
	};

	const navigateBackHandler = () => {
		setActiveStep(activeStep - 1);
	};

	useEffect(() => {
		if (Object.keys(userInfo).length === 0) {
			navigate('/login', { replace: true });
		}
	}, [userInfo, navigate]);

	return (
		<Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
			<Paper
				variant='outlined'
				sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
				<Typography component='h1' variant='h4' align='center'>
					Checkout
				</Typography>
				<Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
					{steps.map(label => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>

				<React.Fragment>{getStepContent(activeStep)}</React.Fragment>
			</Paper>
		</Container>
	);
};

export default Checkout;
