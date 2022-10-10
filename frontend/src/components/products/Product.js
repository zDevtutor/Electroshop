import React from 'react';
import { CardMedia, CardContent, Typography, Box } from '@mui/material';

import Rating from './Rating';
import StyledCard from '../../styles/StyledCard';

const Product = props => {
	const { name, image, rating, numReviews, price } = props.details;

	return (
		<StyledCard>
			<CardMedia component='img' height='194' image={image} alt={name} />
			<CardContent>
				<Typography
					sx={{
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						display: '-webkit-box',
						WebkitLineClamp: '3',
						WebkitBoxOrient: 'vertical',
					}}
					variant='h3'
					component='h3'
					fontSize={20}>
					{name}
				</Typography>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						margin: '20px 0',
					}}>
					<Rating value={rating} />
					<Typography variant='span' component='span'>
						{numReviews} Reviews
					</Typography>
				</Box>
				<Typography variant='h4' component='h4' fontSize={24}>
					${price.toFixed(2)}
				</Typography>
			</CardContent>
		</StyledCard>
	);
};

export default Product;
