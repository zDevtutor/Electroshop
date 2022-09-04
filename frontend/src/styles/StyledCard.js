import React from 'react';

import { Card, styled } from '@mui/material';

const StyledCard = props => {
	const AnimatedCard = styled(Card)(theme => ({
		cursor: 'pointer',
		transition: 'all 0.5s ease-in-out',
		'&:hover': {
			backgroundColor: '#F9F5EB',
			transform: 'scale(1.05)',
		},
	}));

	return <AnimatedCard {...props}>{props.children}</AnimatedCard>;
};

export default StyledCard;
