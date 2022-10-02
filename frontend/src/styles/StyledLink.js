import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const StyledLink = props => {
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<Link
			{...props}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			style={{
				textDecoration: `${
					isHovered ? 'underline' : props.textDecoration || 'none'
				}`,
				color: 'inherit',
				display: 'block',
			}}>
			{props.children}
		</Link>
	);
};

export default StyledLink;
