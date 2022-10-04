import React, { useState } from 'react';

import {
	AppBar,
	Toolbar,
	Typography,
	Stack,
	useTheme,
	Menu,
	MenuItem,
	IconButton as Gravatar,
} from '@mui/material';
import {
	ElectricBolt,
	Person,
	ShoppingCart,
	AccountCircle,
} from '@mui/icons-material';

import Search from '../../styles/Search';
import IconButton from '../../styles/IconButton';
import StyledLink from '../../styles/StyledLink';

import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, logout } from '../../store/authSlice';

const Header = () => {
	const theme = useTheme();
	const [anchorEl, setAnchorEl] = useState(null);
	const { userInfo } = useSelector(getUserInfo);
	const dispatch = useDispatch();

	const handleMenu = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const logoutHandler = () => {
		setAnchorEl(null);
		dispatch(logout());
	};

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

				{Object.keys(userInfo).length === 0 ? (
					<Stack direction='row' spacing={2}>
						<IconButton startIcon={<ShoppingCart />}>
							<StyledLink to='/cart'>Cart</StyledLink>
						</IconButton>
						<IconButton startIcon={<Person />}>
							<StyledLink to='/login'>Login</StyledLink>
						</IconButton>
					</Stack>
				) : (
					<div>
						<Gravatar
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							sx={{ fontSize: '14px', fontWeight: '700' }}
							onClick={handleMenu}
							color='inherit'>
							Welcome{' '}
							{userInfo.name.slice(0, 1).toUpperCase() +
								userInfo.name.slice(1).split(' ')[0]}
							<AccountCircle sx={{ marginLeft: '10px' }} />
						</Gravatar>
						<Menu
							id='menu-appbar'
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorEl)}
							onClose={handleClose}>
							{userInfo.isAdmin && (
								<div>
									<MenuItem onClick={handleClose}>
										<StyledLink to={`/admin/users`}>Users</StyledLink>
									</MenuItem>
									<MenuItem onClick={handleClose}>
										<StyledLink to='/admin/products'>Products</StyledLink>
									</MenuItem>
									<MenuItem onClick={handleClose}>
										<StyledLink to='/admin/orders'>Orders</StyledLink>
									</MenuItem>
								</div>
							)}
							<MenuItem onClick={handleClose}>
								<StyledLink to={`/users/${userInfo._id}`}>Profile</StyledLink>
							</MenuItem>
							<MenuItem onClick={handleClose}>
								<StyledLink to='/cart'>Cart</StyledLink>
							</MenuItem>
							<MenuItem onClick={logoutHandler}>
								<StyledLink to='/login'>Logout</StyledLink>
							</MenuItem>
						</Menu>
					</div>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Header;
