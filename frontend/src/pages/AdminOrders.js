import React, { useState, useEffect } from 'react';
import {
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
	Button,
	Container,
	Alert,
	CircularProgress,
} from '@mui/material';
import { Cancel, CheckCircle } from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllOrders, selectOrders } from '../store/ordersSlice';

const headCells = [
	{
		id: 1,
		label: 'ID',
	},
	{
		id: 2,
		label: 'User',
	},
	{
		id: 3,
		label: 'Date',
	},
	{
		id: 4,
		label: 'Total',
	},
	{
		id: 5,
		label: 'Paid',
	},
	{
		id: 6,
		label: 'Delivered',
	},
	{
		id: 7,
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

export default function AdminOrders() {
	const dispatch = useDispatch();
	const { orders, loading, error } = useSelector(selectOrders);
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getAllOrders());
	}, [dispatch]);

	const [page, setPage] = useState(0);
	const [dense, setDense] = useState(false);
	const [rowsPerPage, setRowsPerPage] = useState(5);

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
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

	return (
		<Container maxWidth='lg' sx={{ margin: '50px auto', minHeight: '65vh' }}>
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
									{orders
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map(order => {
											return (
												<TableRow hover key={order._id}>
													<TableCell
														align='center'
														component='th'
														id={order._id}
														scope='row'>
														#{order._id}
													</TableCell>
													<TableCell align='center'>
														{order.shippingAddress.firstName +
															' ' +
															order.shippingAddress.lastName}
													</TableCell>
													<TableCell align='center'>
														{order.createdAt.substring(0, 10)}
													</TableCell>
													<TableCell align='center'>
														${order.totalPrice.toFixed(2)}
													</TableCell>
													<TableCell align='center'>
														{' '}
														{order.isPaid ? (
															<CheckCircle sx={{ color: 'green' }} />
														) : (
															<Cancel sx={{ color: 'red' }} />
														)}
													</TableCell>
													<TableCell align='center'>
														{' '}
														{order.isDelivered ? (
															<CheckCircle sx={{ color: 'green' }} />
														) : (
															<Cancel sx={{ color: 'red' }} />
														)}
													</TableCell>
													<TableCell align='center'>
														<Button
															size='small'
															variant='contained'
															onClick={() => navigate(`/orders/${order._id}`)}>
															Details
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
							count={orders.length}
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
}
