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
	useTheme,
} from '@mui/material';

import { Delete as DeleteIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { removeCartItem, updateCartItem } from '../../store/cartSlice';

const CartItem = ({ item }) => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const productId = item.product;

	const qtyChangeHandler = e => {
		dispatch(updateCartItem({ productId, qty: +e.target.value }));
	};

	const removeItemFromCartHandler = e => {
		dispatch(removeCartItem(item));
	};

	return (
		<Stack
			direction='row'
			sx={{
				gap: '20px',
				margin: '10px 0',
				alignItems: 'center',
				border: '1px solid #ccc',
				padding: '10px',

				[theme.breakpoints.down('sm')]: {
					flexDirection: 'column',
					textAlign: 'center',
				},
			}}>
			<Box
				component='img'
				src={item.image}
				alt={item.name}
				sx={{
					width: '20%',
					height: '20%',
					borderRadius: '10px',

					[theme.breakpoints.down('sm')]: {
						width: '100%',
					},
				}}
			/>
			<Typography
				variant='p'
				component='p'
				sx={{
					fontSize: '20px',

					[theme.breakpoints.down('sm')]: {
						fontSize: '26px',
					},
				}}>
				{item.name}
			</Typography>
			<Typography
				variant='p'
				component='p'
				sx={{
					fontSize: '20px',

					[theme.breakpoints.down('sm')]: {
						fontSize: '26px',
					},
				}}>
				${item.price}
			</Typography>
			<FormControl
				sx={{
					minWidth: '15%',

					[theme.breakpoints.down('sm')]: {
						minWidth: '50%',
					},
				}}
				size={theme.breakpoints.up('sm') ? 'small' : 'large'}>
				<InputLabel id='qty'>Qty</InputLabel>
				<Select
					labelId='qty'
					id='qty'
					value={item.qty}
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
