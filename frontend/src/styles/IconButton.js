import React from 'react';

import { styled, Button } from '@mui/material';

const StyledButton = styled(Button)({
	color: '#FFF',
	border: '1px solid #FFF',
	'&:hover': {
		backgroundColor: '#16213E',
	},
});

const IconButton = props => {
	return (
		<StyledButton size='small' variant='outlined' {...props}>
			{props.children}
		</StyledButton>
	);
};

export default IconButton;
