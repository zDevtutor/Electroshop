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
import { login, getUserInfo } from '../store/userSlice';

const Login = () => {
	const theme = createTheme();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading, error } = useSelector(getUserInfo);
	const [email, setEmail] = useState('');
	const [password, setpassword] = useState('');

	const handleSubmit = async event => {
		event.preventDefault();

		await dispatch(login({ email, password }));

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
						Sign in
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

						{error && <Alert severity='error'>{error}</Alert>}
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
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link to='/'>Forgot password?</Link>
							</Grid>
							<Grid item>
								<Link to='/register'>{"Don't have an account? Sign Up"}</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
};

export default Login;
