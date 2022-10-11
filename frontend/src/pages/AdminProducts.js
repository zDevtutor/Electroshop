import React, { useState, useEffect } from 'react';

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
	Stack,
	Typography,
	Tooltip,
	IconButton,
} from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, selectAllProducts } from '../store/productsSlice';

import { getUserInfo } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { addProduct, deleteProduct } from '../store/productSlice';

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
		label: 'Price',
	},
	{
		id: 4,
		label: 'Brand',
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

const AdminProducts = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { products, loading, error } = useSelector(selectAllProducts);
	const { userInfo } = useSelector(getUserInfo);

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
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

	const addProductHandler = () => {
		dispatch(addProduct()).then(data => {
			navigate(`/admin/products/${data.payload._id}`);
		});
	};

	const updateProductHandler = event => {
		const productId =
			event.target.parentElement.id ||
			event.target.id ||
			event.target.parentElement.parentElement.id;

		navigate(`/admin/products/${productId}`);
	};

	const deleteProductHandler = event => {
		const productId =
			event.target.parentElement.id ||
			event.target.id ||
			event.target.parentElement.parentElement.id;

		if (window.confirm('Are You Sure?')) {
			dispatch(deleteProduct(productId)).then(() => {
				dispatch(getAllProducts());
			});
		}
	};

	useEffect(() => {
		if (!userInfo.isAdmin) {
			navigate('/', { replace: true });
		} else {
			dispatch(getAllProducts());
		}
	}, [dispatch, userInfo.isAdmin, navigate]);

	return (
		<Container maxWidth='lg' sx={{ margin: '50px auto', minHeight: '100vh' }}>
			<Stack direction='row' alignItems='center' justifyContent='space-between'>
				<Typography
					variant='h2'
					component='h2'
					fontSize={24}
					fontWeight={700}
					mb={2}>
					All Products:
				</Typography>
				<Button
					onClick={addProductHandler}
					variant='contained'
					startIcon={<Add />}>
					Add Product
				</Button>
			</Stack>

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
									{products
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map(product => {
											return (
												<TableRow hover key={product._id}>
													<TableCell
														align='center'
														component='th'
														id={product._id}
														scope='row'>
														#{product._id}
													</TableCell>
													<TableCell sx={{ width: '30%' }} align='center'>
														{product.name}
													</TableCell>
													<TableCell align='center'>
														${product.price.toFixed(2)}
													</TableCell>
													<TableCell align='center'>{product.brand}</TableCell>
													<TableCell align='center'>
														<Tooltip
															title='Edit'
															onClick={updateProductHandler}>
															<IconButton id={product._id}>
																<Edit color='dark' />
															</IconButton>
														</Tooltip>
														<Tooltip
															title='Delete'
															onClick={deleteProductHandler}>
															<IconButton id={product._id}>
																<Delete color='error' />
															</IconButton>
														</Tooltip>
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
							count={products.length}
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

export default AdminProducts;
