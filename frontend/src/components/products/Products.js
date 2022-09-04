import React from 'react';

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
					<Grid item xs={2} sm={4} md={4}>
						<Product details={product} />
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default Products;
