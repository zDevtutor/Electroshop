import React from 'react';
import {
	Typography,
	List,
	ListItem,
	ListItemText,
	Grid,
	Alert,
	ListItemAvatar,
	Avatar,
	Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../../store/cartSlice';
import { addNewOrder, selectOrder } from '../../store/orderSlice';
import StyledLink from '../../styles/StyledLink';
import { useNavigate } from 'react-router-dom';

const Review = props => {
	const { cartItems, shippingAddress, paymentMethod } = useSelector(selectCart);
	const { error } = useSelector(selectOrder);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const totalItemsPrice = cartItems.reduce((curr, item) => {
		return curr + item.price * item.qty;
	}, 0);

	const shippingPrice = !totalItemsPrice ? 0 : totalItemsPrice > 100 ? 25 : 50;

	const taxPrice = 0.15 * totalItemsPrice;
	const totalPrice = totalItemsPrice + shippingPrice + taxPrice;

	const addDecimal = num => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};

	const placeOrderHandler = () => {
		dispatch(
			addNewOrder({
				orderItems: cartItems,
				shippingAddress,
				paymentMethod,
				taxPrice,
				shippingPrice,
				totalPrice,
			})
		).then(data => {
			navigate(`/orders/${data.payload._id}`);
		});
	};

	const navigateBackHandler = () => {
		props.onBack();
	};

	return (
		<>
			<Typography variant='h6' gutterBottom>
				Order summary
			</Typography>
			<List disablePadding>
				{cartItems.length === 0 ? (
					<Alert severity='info'>Your Cart Is Empty</Alert>
				) : (
					cartItems.map(item => (
						<ListItem key={item.product} sx={{ py: 1, px: 0 }}>
							<ListItemAvatar>
								<Avatar alt={item.name} src={item.image} />
							</ListItemAvatar>

							<ListItemText
								primary={
									<StyledLink to={`/products/${item.product}`}>
										{item.name}
									</StyledLink>
								}
								secondary={`Qty: ${item.qty}`}
							/>
							<Typography variant='body2'>
								${addDecimal(item.price * item.qty)}
							</Typography>
						</ListItem>
					))
				)}

				<ListItem sx={{ py: 1, px: 0 }}>
					<ListItemText primary='Tax Price' />
					<Typography variant='subtitle1'>${addDecimal(taxPrice)}</Typography>
				</ListItem>

				<ListItem sx={{ py: 1, px: 0 }}>
					<ListItemText primary='Total' />
					<Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
						${addDecimal(totalPrice)}
					</Typography>
				</ListItem>
			</List>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
						Shipping
					</Typography>
					<Typography gutterBottom>
						{shippingAddress.firstName + ' ' + shippingAddress.lastName}
					</Typography>
					<Typography
						gutterBottom>{`${shippingAddress.address} ${shippingAddress.city}, ${shippingAddress.region}, ${shippingAddress.postalCode} ${shippingAddress.country}`}</Typography>
				</Grid>
				<Grid item container direction='column' xs={12} sm={6}>
					<Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
						Payment Method
					</Typography>
					<Grid container>{paymentMethod}</Grid>
				</Grid>

				{error && (
					<Grid item xs={12}>
						<Alert severity='error'>{error}</Alert>
					</Grid>
				)}

				<Grid item xs={12} textAlign='right'>
					<Button
						type='button'
						sx={{ mt: 3, mb: 2 }}
						onClick={navigateBackHandler}>
						Back
					</Button>
					<Button
						disabled={cartItems.length === 0}
						type='button'
						variant='contained'
						sx={{ mt: 3, mb: 2 }}
						onClick={placeOrderHandler}>
						Place Order
					</Button>
				</Grid>
			</Grid>
		</>
	);
};

export default Review;
