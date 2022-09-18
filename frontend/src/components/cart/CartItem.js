import React, { useEffect, useState } from 'react';
import {
	Stack,
	Box,
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	IconButton,
	Tooltip,
} from '@mui/material';

import { Delete as DeleteIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../store/cartSlice';

const CartItem = ({ item }) => {
	const [qty, setQty] = useState(item.qty);
	const dispatch = useDispatch();
	const productId = item.product;

	const qtyChangeHandler = e => {
		setQty(+e.target.value);
	};

	const removeItemFromCartHandler = e => {
		dispatch(removeFromCart(item));
	};

	useEffect(() => {
		dispatch(addToCart({ productId, qty }));
	}, [dispatch, productId, qty]);

	return (
		<Stack
			direction='row'
			sx={{
				gap: '20px',
				margin: '10px 0',
				alignItems: 'center',
				border: '1px solid #ccc',
				padding: '10px',
			}}>
			<Box
				component='img'
				src={item.image}
				alt={item.name}
				sx={{
					width: '20%',
					height: '20%',
					borderRadius: '10px',
				}}
			/>
			<Typography variant='h4' component='h4' fontSize={20}>
				{item.name}
			</Typography>
			<Typography variant='h4' component='h4' fontSize={20}>
				${(item.price * qty).toFixed(2)}
			</Typography>
			<FormControl sx={{ minWidth: '15%' }} size='small'>
				<InputLabel id='qty'>Qty</InputLabel>
				<Select
					labelId='qty'
					id='qty'
					value={qty}
					label='Qty'
					onChange={qtyChangeHandler}>
					{[...Array(item.countInStock).keys()].map(x => (
						<MenuItem key={x} value={x + 1}>
							{x + 1}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<Tooltip title='Delete' onClick={removeItemFromCartHandler}>
				<IconButton>
					<DeleteIcon />
				</IconButton>
			</Tooltip>
		</Stack>
	);
};

export default CartItem;
