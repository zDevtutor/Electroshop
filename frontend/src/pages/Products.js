import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
	Container,
	Grid,
	Typography,
	CircularProgress,
	Box,
	Alert,
} from '@mui/material';

import Product from '../components/products/Product';
import { fetchProducts, selectAllProducts } from '../store/productsSlice';

const Products = () => {
	const { products, loading, error } = useSelector(selectAllProducts);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	return (
		<Container maxWidth='md' sx={{ margin: '50px auto', minHeight: '100vh' }}>
			<Typography
				variant='h2'
				component='h2'
				fontSize={24}
				fontWeight={700}
				mb={2}>
				Latest Products:{' '}
			</Typography>
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
				<Grid container spacing={2} columns={{ xs: 2, sm: 8, md: 12 }}>
					{products.map(product => (
						<Grid key={product._id} item xs={2} sm={4} md={4}>
							<Link
								style={{ textDecoration: 'none' }}
								to={`/products/${product._id}`}>
								<Product details={product} />
							</Link>
						</Grid>
					))}
				</Grid>
			)}
		</Container>
	);
};

export default Products;
