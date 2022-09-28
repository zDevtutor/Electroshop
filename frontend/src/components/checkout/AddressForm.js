import React, { useEffect, useState } from 'react';
import { Grid, Typography, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress, selectCart } from '../../store/cartSlice';

const AddressForm = props => {
	const { shippingAddress } = useSelector(selectCart);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [region, setRegion] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [country, setCountry] = useState('');
	const disptach = useDispatch();

	const submitFormHandler = event => {
		event.preventDefault();
		props.onNext();

		disptach(
			saveShippingAddress({
				firstName,
				lastName,
				address,
				city,
				region,
				postalCode,
				country,
			})
		);
	};

	useEffect(() => {
		if (Object.keys(shippingAddress).length > 0) {
			setFirstName(shippingAddress.firstName);
			setLastName(shippingAddress.lastName);
			setAddress(shippingAddress.address);
			setCity(shippingAddress.city);
			setRegion(shippingAddress.region);
			setPostalCode(shippingAddress.postalCode);
			setCountry(shippingAddress.country);
		}
	}, [shippingAddress]);

	return (
		<>
			<Typography variant='h6' gutterBottom>
				Shipping address
			</Typography>
			<Grid container spacing={3} component='form' onSubmit={submitFormHandler}>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id='firstName'
						name='firstName'
						label='First name'
						fullWidth
						autoComplete='given-name'
						variant='standard'
						value={firstName}
						onChange={e => setFirstName(e.target.value)}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id='lastName'
						name='lastName'
						label='Last name'
						fullWidth
						autoComplete='family-name'
						variant='standard'
						value={lastName}
						onChange={e => setLastName(e.target.value)}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						required
						id='address'
						name='address'
						label='Address'
						fullWidth
						autoComplete='shipping address'
						variant='standard'
						value={address}
						onChange={e => setAddress(e.target.value)}
					/>
				</Grid>

				<Grid item xs={12} sm={6}>
					<TextField
						required
						id='city'
						name='city'
						label='City'
						fullWidth
						autoComplete='shipping city'
						variant='standard'
						value={city}
						onChange={e => setCity(e.target.value)}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						id='state'
						name='state'
						label='State/Province/Region'
						fullWidth
						variant='standard'
						value={region}
						onChange={e => setRegion(e.target.value)}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id='zip'
						name='zip'
						label='Zip / Postal code'
						fullWidth
						autoComplete='shipping postal-code'
						variant='standard'
						value={postalCode}
						onChange={e => setPostalCode(e.target.value)}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id='country'
						name='country'
						label='Country'
						fullWidth
						autoComplete='shipping country'
						variant='standard'
						value={country}
						onChange={e => setCountry(e.target.value)}
					/>
				</Grid>
				<Grid item xs={12} textAlign='right'>
					<Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
						Next
					</Button>
				</Grid>
			</Grid>
		</>
	);
};

export default AddressForm;
