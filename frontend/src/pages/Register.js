import React, { useState } from 'react';
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	Grid,
	Box,
	Typography,
	Container,
	createTheme,
	ThemeProvider,
	Alert,
	CircularProgress,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, register } from '../store/userSlice';

const Register = () => {
	const theme = createTheme();
	const dispatch = useDispatch();
	const { loading, error } = useSelector(getUserInfo);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setpassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = async event => {
		event.preventDefault();

		if (password !== confirmPassword) {
			setMessage('Password do not match');
			return;
		}

		await dispatch(
			register({
				name: name.trim(),
				email: email.trim(),
				password: password.trim(),
			})
		);

		if (!error) {
			navigate('/');
		}
	};

	return (
		<ThemeProvider theme={theme}>
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
						noValidate
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
							<Alert severity='error'>{message}</Alert>
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
		</ThemeProvider>
	);
};

export default Register;
