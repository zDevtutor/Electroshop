import React from 'react';

import { styled, Button } from '@mui/material';

const IconButton = styled(Button)({
	color: '#FFF',
	border: '1px solid #FFF',
	'&:hover': {
		backgroundColor: '#16213E',
	},
});

const StyledButton = props => {
	return (
		<IconButton size='small' variant='outlined' {...props}>
			{props.children}
		</IconButton>
	);
};

export default StyledButton;
