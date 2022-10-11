import React, { useRef } from 'react';

import { InputBase, styled, alpha } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const StyledSearch = styled('form')(({ theme }) => ({
	flex: 0.5,
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto',
	},
	[theme.breakpoints.down('sm')]: {
		order: 3,
		margin: 0,
	},
}));

const SearchIconWrapper = styled('button')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	background: 'transparent',
	color: 'white',
	border: 'none',
	cursor: 'pointer',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	width: '80%',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}));

const Search = props => {
	const searchInputRef = useRef();
	const navigate = useNavigate();

	const submitSearchHandler = event => {
		event.preventDefault();

		const searchQuery = searchInputRef.current.firstElementChild.value.trim();

		if (searchQuery) {
			navigate(`/search/${searchQuery}`);
		} else {
			navigate('/');
		}
	};

	return (
		<StyledSearch onSubmit={submitSearchHandler}>
			<SearchIconWrapper>
				<SearchIcon />
			</SearchIconWrapper>
			<StyledInputBase
				ref={searchInputRef}
				placeholder='Search…'
				inputProps={{ 'aria-label': 'search' }}
			/>
		</StyledSearch>
	);
};

export default Search;
