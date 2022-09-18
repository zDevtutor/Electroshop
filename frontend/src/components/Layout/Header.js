import React from 'react';

import { AppBar, Toolbar, Typography, Stack, useTheme } from '@mui/material';
import { ElectricBolt, Person, ShoppingCart } from '@mui/icons-material';

import Search from '../../styles/Search';
import IconButton from '../../styles/IconButton';
import StyledLink from '../../styles/StyledLink';

const Header = () => {
	const theme = useTheme();

	return (
		<AppBar position='static'>
			<Toolbar
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					gap: '10px',
					[theme.breakpoints.down('sm')]: {
						flexDirection: 'column',
						justifyContent: 'center',
						padding: '10px',
					},
				}}>
				<StyledLink to='/'>
					<Typography
						variant='h6'
						component='h1'
						sx={{ display: 'flex', alignItems: 'center' }}>
						<ElectricBolt /> ElectroShop
					</Typography>
				</StyledLink>

				<Search />

				<Stack direction='row' spacing={2}>
					<IconButton startIcon={<ShoppingCart />}>
						<StyledLink to='/cart/'>Cart</StyledLink>
					</IconButton>
					<IconButton startIcon={<Person />}>Login</IconButton>
				</Stack>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
