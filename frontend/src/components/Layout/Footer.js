import React from 'react';
import { Stack, Typography } from '@mui/material';

const Footer = () => {
	return (
		<Stack
			direction='column'
			sx={{
				height: '60px',
				alignItems: 'center',
				justifyContent: 'center',
			}}>
			<Typography variant='p' component='p' textAlign='center'>
				Copyright &copy; ElectroShop | Developed By zDevtutor
			</Typography>
		</Stack>
	);
};

export default Footer;
