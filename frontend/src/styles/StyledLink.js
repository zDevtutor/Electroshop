import React from 'react';
import { Link } from 'react-router-dom';

const StyledLink = props => {
	return (
		<Link {...props} style={{ textDecoration: 'none', color: 'inherit' }}>
			{props.children}
		</Link>
	);
};

export default StyledLink;
