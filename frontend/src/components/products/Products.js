import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Grid, Typography } from '@mui/material';

import products from '../../data/products';
import Product from './Product';

const Products = () => {
	return (
		<Container maxWidth='md' sx={{ margin: '50px auto' }}>
			<Typography variant='h2' component='h2' fontSize={24} mb={2}>
				Latest Products:{' '}
			</Typography>
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
		</Container>
	);
};

export default Products;
