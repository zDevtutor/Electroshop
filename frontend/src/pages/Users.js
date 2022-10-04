import React, { useEffect } from 'react';

import {
	Container,
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Paper,
	FormControlLabel,
	Switch,
	CircularProgress,
	Alert,
	Button,
} from '@mui/material';
import { Cancel, CheckCircle, Delete } from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, selectUsers, deleteUser } from '../store/usersSlice';
import { getUserInfo } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const headCells = [
	{
		id: 1,
		label: 'ID',
	},
	{
		id: 2,
		label: 'Name',
	},
	{
		id: 3,
		label: 'Email',
	},
	{
		id: 4,
		label: 'Admin',
	},
	{
		id: 5,
		label: '',
	},
];

function EnhancedTableHead() {
	return (
		<TableHead>
			<TableRow>
				{headCells.map(headCell => (
					<TableCell key={headCell.id} align='center'>
						{headCell.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

const Users = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { users, loading, error } = useSelector(selectUsers);
	const { userInfo } = useSelector(getUserInfo);

	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleChangeDense = event => {
		setDense(event.target.checked);
	};

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

	const deleteUserHandler = event => {
		const userId = event.target.id;

		if (window.confirm('Are You Sure?')) {
			dispatch(deleteUser(userId)).then(() => {
				dispatch(getAllUsers());
			});
		}
	};

	useEffect(() => {
		if (!userInfo.isAdmin) {
			navigate('/', { replace: true });
		} else {
			dispatch(getAllUsers());
		}
	}, [dispatch, userInfo.isAdmin, navigate]);

	return (
		<Container maxWidth='md' sx={{ margin: '50px auto', minHeight: '100vh' }}>
			{loading && !error ? (
				<Box
					sx={{
						display: 'flex',
						height: '100vh',
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<CircularProgress />
				</Box>
			) : error ? (
				<Alert severity='error'>{error}</Alert>
			) : (
				<Box sx={{ width: '100%', marginTop: '30px' }}>
					<Paper sx={{ width: '100%', mb: 2 }}>
						<TableContainer>
							<Table
								sx={{ minWidth: 750 }}
								aria-labelledby='tableTitle'
								size={dense ? 'small' : 'medium'}>
								<EnhancedTableHead />
								<TableBody>
									{users
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map(user => {
											return (
												<TableRow hover key={user._id}>
													<TableCell
														align='center'
														component='th'
														id={user._id}
														scope='row'>
														#{user._id}
													</TableCell>
													<TableCell align='center'>{user.name}</TableCell>
													<TableCell align='center'>{user.email}</TableCell>
													<TableCell align='center'>
														{' '}
														{user.isAdmin ? (
															<CheckCircle sx={{ color: 'green' }} />
														) : (
															<Cancel sx={{ color: 'red' }} />
														)}
													</TableCell>
													<TableCell align='center'>
														<Button
															id={user._id}
															size='small'
															variant='contained'
															color='error'
															onClick={deleteUserHandler}
															startIcon={<Delete />}>
															Delete
														</Button>
													</TableCell>
												</TableRow>
											);
										})}
									{emptyRows > 0 && (
										<TableRow
											style={{
												height: (dense ? 33 : 53) * emptyRows,
											}}>
											<TableCell colSpan={6} />
										</TableRow>
									)}
								</TableBody>
							</Table>
						</TableContainer>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25]}
							component='div'
							count={users.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</Paper>
					<FormControlLabel
						control={<Switch checked={dense} onChange={handleChangeDense} />}
						label='Dense padding'
					/>
				</Box>
			)}
		</Container>
	);
};

export default Users;
