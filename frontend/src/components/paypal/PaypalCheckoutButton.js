import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

const PaypalCheckoutButton = props => {
	const handleApprove = details => {
		props.onSuccess(details);
	};

	return (
		<PayPalButtons
			createOrder={(data, actions) => {
				return actions.order.create({
					application_context: {
						cancel_url: 'https://localhost:3000',
					},
					purchase_units: [
						{
							amount: {
								value: props.totalPrice,
							},
						},
					],
				});
			}}
			onApprove={(data, actions) => {
				return actions.order.capture().then(details => {
					handleApprove(details);
				});
			}}
		/>
	);
};

export default PaypalCheckoutButton;
