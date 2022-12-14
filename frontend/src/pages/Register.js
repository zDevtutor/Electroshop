import React, { useState, useEffect } from 'react';
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	Grid,
	Box,
	Typography,
	Container,
	Alert,
	CircularProgress,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, register } from '../store/authSlice';

const Register = () => {
	const dispatch = useDispatch();
	const { loading, error, userInfo } = useSelector(getUserInfo);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setpassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = event => {
		event.preventDefault();

		setMessage(null);

		if (password !== confirmPassword) {
			setMessage('Password do not match');
		} else {
			dispatch(
				register({
					name: name.trim(),
					email: email.trim(),
					password: password.trim(),
				})
			).then(() => {
				setIsSubmitted(true);
			});
		}
	};

	useEffect(() => {
		if (Object.keys(userInfo).length > 0) {
			navigate('/', { replace: true });
		}

		if (!error && isSubmitted) {
			setMessage('Account Created Successfully');

			setTimeout(() => {
				navigate('/login');
			}, 2000);
		}
	}, [userInfo, navigate, error, isSubmitted]);

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlined />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign up
				</Typography>
				<Box
					component='form'
					onSubmit={handleSubmit}
					validate='true'
					sx={{ mt: 1 }}>
					{loading && !error && (
						<Box
							sx={{
								display: 'flex',
								height: '50vh',
								alignItems: 'center',
								justifyContent: 'center',
							}}>
							<CircularProgress />
						</Box>
					)}

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
						label='Name'
						name='name'
						autoComplete='name'
						autoFocus
						value={name}
						onChange={e => setName(e.target.value)}
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						type='email'
						id='email'
						label='Email Address'
						name='email'
						autoComplete='email'
						autoFocus
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
						onChange={e => setpassword(e.target.value)}
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
						Register
					</Button>
					<Grid container textAlign='right'>
						<Grid item xs>
							<Link to='/login'>Already have an account? Sign in</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};

export default Register;
