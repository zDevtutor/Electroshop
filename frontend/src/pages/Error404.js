import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Error404 = () => {
	const navigate = useNavigate();

	const navigateHandler = () => {
		navigate('/');
	};

	return (
		<Stack
			direction='column'
			alignItems='center'
			justifyContent='center'
			sx={{ minHeight: '78vh' }}>
			<Typography variant='h1' component='h1'>
				404 Error
			</Typography>
			<Typography variant='h2' component='h2'>
				Page Not Found
			</Typography>
			<Button
				onClick={navigateHandler}
				variant='contained'
				size='large'
				sx={{ marginTop: '20px' }}>
				Go Back
			</Button>
		</Stack>
	);
};

export default Error404;
