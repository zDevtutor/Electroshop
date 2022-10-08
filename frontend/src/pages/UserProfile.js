import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	getProfile,
	getUserProfile,
	updateProfile,
} from '../store/profileSlice';

import {
	Container,
	Grid,
	Typography,
	Box,
	Button,
	TextField,
	Alert,
	CircularProgress,
} from '@mui/material';
import { getUserInfo, updateUserInfo } from '../store/authSlice';
import MyOrders from '../components/orders/MyOrders';

const UserProfile = () => {
	const { user, error, loading } = useSelector(getUserProfile);
	const { userInfo } = useSelector(getUserInfo);
	const dispatch = useDispatch();
	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');
	const [isSubmitted, setIsSubmitted] = useState(false);
	const navigate = useNavigate();

	const updateProfileHandler = event => {
		event.preventDefault();

		setMessage('');
		setIsSubmitted(false);

		if (password !== confirmPassword) {
			setMessage('Password do not match');
		} else if (password !== '' && password.length < 6) {
			setMessage('Password Should be more than 6 characters');
		} else {
			dispatch(updateProfile({ name, email, password })).then(() => {
				setIsSubmitted(true);
				setMessage('Profile Updated Successfully');
				dispatch(updateUserInfo());
			});
		}
	};

	useEffect(() => {
		if (Object.keys(userInfo).length === 0) {
			navigate('/', { replace: true });
		} else {
			dispatch(getProfile()).then(() => {
				setName(user.name);
				setEmail(user.email);
			});
		}
	}, [userInfo, navigate, dispatch, user.name, user.email]);

	return (
		<Container maxWidth='lg' sx={{ margin: '50px auto', minHeight: '65vh' }}>
			{loading && !error ? (
				<Box
					sx={{
						display: 'flex',
						height: '100vh',
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<CircularProgress />
				</Box>
			) : (
				<Grid container spacing={4}>
					<Grid item xs={12} sm={4}>
						<Typography
							variant='h2'
							component='h2'
							fontSize={24}
							fontWeight={700}
							mb={2}>
							Update Profile
						</Typography>
						<Box
							component='form'
							noValidate
							sx={{ mt: 1 }}
							onSubmit={updateProfileHandler}>
							{message ? (
								<Alert severity={!error && isSubmitted ? 'success' : 'error'}>
									{message}
								</Alert>
							) : error ? (
								<Alert severity='error'>{error}</Alert>
							) : (
								''
							)}

							<TextField
								margin='normal'
								required
								fullWidth
								id='name'
								name='name'
								autoComplete='name'
								value={name}
								onChange={e => setName(e.target.value)}
							/>
							<TextField
								margin='normal'
								required
								fullWidth
								type='email'
								id='email'
								name='email'
								autoComplete='email'
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
							<TextField
								margin='normal'
								required
								fullWidth
								name='password'
								label='Password'
								type='password'
								id='password'
								autoComplete='current-password'
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
							<TextField
								margin='normal'
								required
								fullWidth
								name='confirmPassword'
								label='confirmPassword'
								type='password'
								id='confirmPassword'
								autoComplete='current-confirmPassword'
								value={confirmPassword}
								onChange={e => setConfirmPassword(e.target.value)}
							/>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								sx={{ mt: 3, mb: 2 }}>
								Update Profile
							</Button>
						</Box>
					</Grid>
					<Grid item xs={12} sm={8}>
						<Typography
							variant='h2'
							component='h2'
							fontSize={24}
							fontWeight={700}
							mb={2}>
							My Orders
						</Typography>
						<MyOrders />
					</Grid>
				</Grid>
			)}
		</Container>
	);
};

export default UserProfile;
