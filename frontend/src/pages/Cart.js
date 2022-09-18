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
import { addToCart, getCartItems, selectCart } from '../store/cartSlice';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import CartItem from '../components/cart/CartItem';

const Cart = () => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const { cartItems } = useSelector(selectCart);
	const urlParam = useParams();
	const navigate = useNavigate();

	const productId = urlParam['*'];

	const [searchParams] = useSearchParams();

	const qty = Number(searchParams.get('qty'));

	useEffect(() => {
		if (qty && productId) {
			dispatch(addToCart({ productId, qty }));
		} else {
			dispatch(getCartItems());
		}
	}, [dispatch, productId, qty]);

	const proceedToCheckoutHandler = e => {
		navigate('/login?redirect=shipping');
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
			<Stack
				direction='row'
				sx={{
					gap: '30px',
					[theme.breakpoints.down('sm')]: {
						flexDirection: 'column',
						justifyContent: 'center',
						gap: 0,
					},
				}}>
				<Grid container spacing={2}>
					{cartItems.length === 0 ? (
						<Grid item xs={9}>
							<Alert severity='info'>No Items in cart</Alert>
						</Grid>
					) : (
						<Grid item xs={9}>
							{cartItems.map(item => (
								<CartItem key={item.product} item={item} />
							))}
						</Grid>
					)}

					<Grid item xs={3}>
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
							<Typography variant='p' component='p' sx={{ marginTop: '20px' }}>
								$
								{cartItems
									.reduce((curr, item) => {
										return curr + item.price * item.qty;
									}, 0)
									.toFixed(2)}
							</Typography>
							<Button
								onClick={proceedToCheckoutHandler}
								variant='contained'
								size='small'
								sx={{ marginTop: '20px' }}>
								Proceed To Checkout
							</Button>
						</Stack>
					</Grid>
				</Grid>
			</Stack>
		</Container>
	);
};

export default Cart;
