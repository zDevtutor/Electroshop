import React, { useEffect } from 'react';

import {
	Container,
	Typography,
	Stack,
	useTheme,
	Grid,
	Alert,
	Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem, selectCart } from '../store/cartSlice';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import CartItem from '../components/cart/CartItem';
import { getUserInfo } from '../store/authSlice';

const Cart = () => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const { cartItems } = useSelector(selectCart);
	const urlParam = useParams();
	const navigate = useNavigate();
	const { userInfo } = useSelector(getUserInfo);

	const productId = urlParam['*'];

	const [searchParams] = useSearchParams();

	const qty = Number(searchParams.get('qty'));

	useEffect(() => {
		if (productId && qty) {
			dispatch(addCartItem({ productId, qty }));
		}
	}, [dispatch, productId, qty]);

	const proceedToCheckoutHandler = e => {
		if (Object.keys(userInfo).length > 0) {
			navigate('/checkout', { replace: true });
		} else {
			navigate('/login');
		}
	};

	return (
		<Container maxWidth='md' sx={{ margin: '50px auto', minHeight: '65vh' }}>
			<Typography
				variant='h2'
				component='h2'
				fontSize={24}
				fontWeight={700}
				mb={2}>
				Shopping Cart
			</Typography>

			<Grid container spacing={2}>
				{cartItems.length === 0 ? (
					<Grid sx={{ marginTop: '10px' }} item xs={12} sm={8} md={9}>
						<Alert severity='info'>Your Cart Is Empty</Alert>
					</Grid>
				) : (
					<Grid item xs={12} sm={8} md={9}>
						{cartItems.map(item => (
							<CartItem key={item.product} item={item} />
						))}
					</Grid>
				)}

				<Grid item xs={12} sm={4} md={3}>
					<Stack
						direction='column'
						sx={{
							flex: 0.5,
							alignSelf: 'start',
							padding: '10px',
							border: '1px solid #ccc',
							marginTop: '10px',

							[theme.breakpoints.down('sm')]: {
								alignSelf: 'stretch',
								marginTop: '20px',
							},
						}}>
						<Typography variant='h6' component='h6'>
							SUBTOTAL{' '}
							{cartItems.reduce((curr, item) => {
								return curr + item.qty;
							}, 0)}{' '}
							items
						</Typography>
						<Typography variant='h5' component='p' sx={{ marginTop: '20px' }}>
							$
							{cartItems
								.reduce((curr, item) => {
									return curr + item.price * item.qty;
								}, 0)
								.toFixed(2)}
						</Typography>
						<Button
							disabled={cartItems.length === 0}
							onClick={proceedToCheckoutHandler}
							variant='contained'
							size='small'
							sx={{ marginTop: '20px' }}>
							Proceed To Checkout
						</Button>
					</Stack>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Cart;
