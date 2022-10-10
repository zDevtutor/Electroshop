import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
	Container,
	Box,
	CircularProgress,
	Alert,
	Typography,
	TextField,
	Button,
	TextareaAutosize,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
	getProduct,
	selectProduct,
	updateProduct,
} from '../store/productSlice';
import { useParams } from 'react-router-dom';

const AdminProduct = () => {
	const { product, loading, error } = useSelector(selectProduct);
	const [name, setName] = useState(product.name);
	const [image, setImage] = useState(product.image);
	const [brand, setBrand] = useState(product.brand);
	const [price, setPrice] = useState(product.price);
	const [countInStock, setCountInStock] = useState(product.countInStock);
	const [description, setDescription] = useState(product.description);
	const [uploading, setUploading] = useState(false);
	const [message, setMessage] = useState('');

	const disptach = useDispatch();
	const { productId } = useParams();

	const updateProductHandler = event => {
		event.preventDefault();

		if (price < 0 || countInStock < 0) {
			setMessage('Price and Count In Stock must be 0 and above');
		} else {
			disptach(
				updateProduct({
					id: productId,
					name,
					image,
					brand,
					price: +price,
					countInStock: +countInStock,
					description,
				})
			);

			setMessage('');
		}
	};

	const uploadImageHandler = async event => {
		const file = event.target.files[0];
		const formData = new FormData();

		formData.append('image', file);
		setUploading(true);

		try {
			const config = {
				header: {
					'Content-Type': 'multipart/form-data',
				},
			};

			const { data } = await axios.post('/api/uploads', formData, config);

			setImage(`/${data}`);
			setUploading(false);
		} catch (error) {
			setUploading(false);
		}
	};

	useEffect(() => {
		disptach(getProduct(productId)).then(() => {
			setName(product.name);
			setBrand(product.brand);
			setPrice(product.price);
			setImage(product.image);
			setCountInStock(product.countInStock);
			setDescription(product.description);
		});
	}, [
		disptach,
		productId,
		product.name,
		product.brand,
		product.price,
		product.countInStock,
		product.description,
		product.image,
	]);

	return (
		<Container maxWidth='sm' sx={{ margin: '50px auto', minHeight: '65vh' }}>
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
				<>
					<Typography
						variant='h2'
						component='h2'
						fontSize={24}
						fontWeight={700}
						mb={2}>
						Product Details
					</Typography>
					<Box
						component='form'
						noValidate
						sx={{ mt: 1 }}
						onSubmit={updateProductHandler}>
						{message && <Alert severity='error'>{message}</Alert>}
						<TextField
							margin='normal'
							required
							fullWidth
							id='name'
							name='name'
							label='Name'
							autoComplete='name'
							value={name}
							onChange={e => setName(e.target.value)}
						/>

						<TextField
							margin='normal'
							required
							fullWidth
							type='file'
							id='image'
							name='image'
							autoComplete='image'
							onChange={uploadImageHandler}
						/>
						{uploading && <CircularProgress />}
						<TextField
							margin='normal'
							required
							fullWidth
							name='brand'
							label='Brand'
							type='text'
							id='brand'
							autoComplete='brand'
							value={brand}
							onChange={e => setBrand(e.target.value)}
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							name='price'
							label='Price'
							type='number'
							id='price'
							autoComplete='price'
							value={price}
							onChange={e => setPrice(e.target.value)}
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							name='countInStock'
							label='Count In Stock'
							type='number'
							id='countInStock'
							autoComplete='countInStock'
							value={countInStock}
							onChange={e => setCountInStock(e.target.value)}
						/>
						<TextareaAutosize
							aria-label='product description'
							minRows={10}
							style={{ width: '100%', marginTop: '15px', padding: '10px' }}
							value={description}
							onChange={e => setDescription(e.target.value)}
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}>
							Update Product
						</Button>
					</Box>
				</>
			)}
		</Container>
	);
};

export default AdminProduct;
