import React from 'react';

import {
	Box,
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material';

const ProductQty = ({ product, qty, setQty }) => {
	const qtyChangeHandler = e => {
		setQty(e.target.value);
	};

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				borderBottom: '1px solid #ccc',
				paddingBottom: '5px',
				marginBottom: '5px',
			}}>
			<Typography fontWeight={700} variant='span' component='span'>
				Qty:
			</Typography>
			<FormControl sx={{ minWidth: '70%' }} size='small'>
				<InputLabel id='qty'>Qty</InputLabel>
				<Select
					labelId='qty'
					id='qty'
					value={qty}
					label='Qty'
					onChange={qtyChangeHandler}>
					{[...Array(product.countInStock).keys()].slice(0, 9).map(x => (
						<MenuItem key={x} value={x + 1}>
							{x + 1}
						</MenuItem>
					))}
					{[...Array(product.countInStock).keys()].length >= 10 && (
						<MenuItem key={10} value={10}>
							10+
						</MenuItem>
					)}
				</Select>
			</FormControl>
		</Box>
	);
};

export default ProductQty;
