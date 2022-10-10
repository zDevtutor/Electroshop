import React, { useEffect, useState } from 'react';

import { Stack, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Paginate = ({ pages, searchQuery }) => {
	const navigate = useNavigate();
	const [page, setPage] = useState(null);

	useEffect(() => {
		if (page && !searchQuery) {
			navigate(`/pages/${page}`);
		}

		setPage(null);
	}, [navigate, page, searchQuery]);

	return (
		<Stack spacing={2}>
			<Pagination
				color='primary'
				sx={{ margin: '50px auto' }}
				count={pages}
				size='large'
				onChange={(e, p) => setPage(p)}
			/>
		</Stack>
	);
};

export default Paginate;
