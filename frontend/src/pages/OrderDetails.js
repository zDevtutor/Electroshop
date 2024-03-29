import React, { useEffect } from 'react';

import {
	Container,
	Typography,
	Grid,
	Alert,
	Box,
	CircularProgress,
	List,
	ListItem,
	Avatar,
	ListItemText,
	ListItemAvatar,
	Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
	deliverOrder,
	getOrderDetails,
	payOrder,
	selectOrder,
} from '../store/orderSlice';
import { useParams } from 'react-router-dom';
import PaypalCheckoutButton from '../components/paypal/PaypalCheckoutButton';
import { getUserInfo } from '../store/authSlice';

const OrderDetails = () => {
	const { order, loading, error } = useSelector(selectOrder);
	const { userInfo } = useSelector(getUserInfo);
	const dispatch = useDispatch();
	const { orderId } = useParams();

	const addDecimal = num => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};

	const totalItemsPrice = addDecimal(
		order.orderItems.reduce((curr, item) => {
			return curr + item.price * item.qty;
		}, 0)
	);

	const handleSuccess = details => {
		dispatch(
			payOrder({
				id: order._id,
				paymentResult: {
					id: details.id,
					status: details.status,
					update_time: details.update_time,
					email_address: details.payer.email_address,
				},
			})
		);
	};

	const deliverOrderHandler = () => {
		dispatch(deliverOrder(orderId));
	};

	useEffect(() => {
		dispatch(getOrderDetails(orderId));
	}, [dispatch, orderId]);

	return (
		<Container maxWidth='md' sx={{ margin: '50px auto', minHeight: '65vh' }}>
			{loading && !error ? (
				<Box
					sx={{
						display: 'flex',
						height: '100vh',
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<CircularProgress />
				</Box>
			) : error ? (
				<Alert severity='error'>{error}</Alert>
			) : (
				<>
					<Typography
						variant='h2'
						component='h2'
						fontSize={30}
						fontWeight={500}
						mb={2}
						textTransform='uppercase'>
						Order #{order._id}
					</Typography>

					<Grid container spacing={2}>
						<Grid item xs={12} sm={8}>
							<Typography
								variant='h5'
								gutterBottom
								sx={{ mt: 2 }}
								textTransform='uppercase'>
								Shipping
							</Typography>
							<Typography gutterBottom sx={{ mt: 2 }}>
								<Typography component='span' varient='span' fontWeight={700}>
									Name:
								</Typography>{' '}
								{order.shippingAddress.firstName +
									' ' +
									order.shippingAddress.lastName}
							</Typography>
							<Typography gutterBottom sx={{ mt: 2 }}>
								<Typography component='span' varient='span' fontWeight={700}>
									Email:
								</Typography>{' '}
								{order.user.email}
							</Typography>
							<Typography gutterBottom sx={{ mt: 2 }}>
								<Typography component='span' varient='span' fontWeight={700}>
									Address:
								</Typography>{' '}
								{order.shippingAddress.address} {order.shippingAddress.city},{' '}
								{order.shippingAddress.region},{' '}
								{order.shippingAddress.postalCode}{' '}
								{order.shippingAddress.country}
							</Typography>

							<Alert
								sx={{ marginTop: '15px' }}
								severity={order.isDelivered ? 'success' : 'error'}>
								{order.isDelivered
									? `Delivered At ${order.deliveredAt}`
									: 'Not Delivered'}
							</Alert>

							<Typography
								variant='h5'
								gutterBottom
								sx={{ mt: 2 }}
								textTransform='uppercase'>
								Payment Method
							</Typography>
							<Typography gutterBottom sx={{ mt: 2 }}>
								<Typography component='span' varient='span' fontWeight={700}>
									Method:
								</Typography>{' '}
								{order.paymentMethod}
							</Typography>
							<Alert
								sx={{ marginTop: '15px' }}
								severity={order.isPaid ? 'success' : 'error'}>
								{order.isPaid ? `Paid on ${order.paidAt}` : 'Not Paid'}
							</Alert>

							<Typography
								variant='h5'
								gutterBottom
								sx={{ mt: 2 }}
								textTransform='uppercase'>
								Order Items
							</Typography>

							<List disablePadding>
								{order.orderItems.length === 0 ? (
									<Alert severity='info'>Your Order Is Empty</Alert>
								) : (
									order.orderItems.map(item => (
										<ListItem key={item.product} sx={{ py: 1, px: 0 }}>
											<ListItemAvatar>
												<Avatar alt={item.name} src={item.image.url} />
											</ListItemAvatar>

											<ListItemText
												primary={item.name}
												secondary={`Qty: ${item.qty}`}
											/>
											<Typography variant='body2'>
												${addDecimal(item.price * item.qty)}
											</Typography>
										</ListItem>
									))
								)}
							</List>
						</Grid>
						<Grid item xs={12} sm={4}>
							<Box sx={{ border: '1px solid #CCC', padding: '10px' }}>
								<Typography
									variant='h5'
									gutterBottom
									sx={{ mt: 2 }}
									textTransform='uppercase'
									textAlign='center'>
									Order Summary
								</Typography>

								<List>
									<ListItem sx={{ py: 1, px: 0 }}>
										<ListItemText primary='Items' />
										<Typography variant='subtitle1'>
											${totalItemsPrice}
										</Typography>
									</ListItem>
									<ListItem sx={{ py: 1, px: 0 }}>
										<ListItemText primary='Tax' />
										<Typography variant='subtitle1'>
											${addDecimal(order.taxPrice)}
										</Typography>
									</ListItem>
									<ListItem sx={{ py: 1, px: 0 }}>
										<ListItemText primary='Shipping' />
										<Typography variant='subtitle1'>
											${addDecimal(order.shippingPrice)}
										</Typography>
									</ListItem>
									<ListItem sx={{ py: 1, px: 0 }}>
										<ListItemText primary='Total' />
										<Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
											${addDecimal(order.totalPrice)}
										</Typography>
									</ListItem>
								</List>
							</Box>

							{!order.isPaid && (
								<Box sx={{ marginTop: '20px' }}>
									<PaypalCheckoutButton
										totalPrice={addDecimal(order.totalPrice)}
										onSuccess={handleSuccess}
									/>
								</Box>
							)}
							{!order.isDelivered && userInfo.isAdmin && (
								<Box sx={{ marginTop: '20px' }}>
									<Button
										variant='contained'
										fullWidth
										onClick={deliverOrderHandler}>
										Mark As Delivered
									</Button>
								</Box>
							)}
						</Grid>
					</Grid>
				</>
			)}
		</Container>
	);
};

export default OrderDetails;
