import React from 'react';

import { Star, StarBorder, StarHalf } from '@mui/icons-material';

const Rating = ({ value }) => {
	return (
		<>
			{value >= 1 ? (
				<Star sx={{ color: 'gold' }} />
			) : value >= 0.5 ? (
				<StarHalf sx={{ color: 'gold' }} />
			) : (
				<StarBorder sx={{ color: 'gold' }} />
			)}
			{value >= 2 ? (
				<Star sx={{ color: 'gold' }} />
			) : value >= 1.5 ? (
				<StarHalf sx={{ color: 'gold' }} />
			) : (
				<StarBorder sx={{ color: 'gold' }} />
			)}
			{value >= 3 ? (
				<Star sx={{ color: 'gold' }} />
			) : value >= 2.5 ? (
				<StarHalf sx={{ color: 'gold' }} />
			) : (
				<StarBorder sx={{ color: 'gold' }} />
			)}
			{value >= 4 ? (
				<Star sx={{ color: 'gold' }} />
			) : value >= 3.5 ? (
				<StarHalf sx={{ color: 'gold' }} />
			) : (
				<StarBorder sx={{ color: 'gold' }} />
			)}
			{value >= 5 ? (
				<Star sx={{ color: 'gold' }} />
			) : value >= 4.5 ? (
				<StarHalf sx={{ color: 'gold' }} />
			) : (
				<StarBorder sx={{ color: 'gold' }} />
			)}
		</>
	);
};

export default Rating;
