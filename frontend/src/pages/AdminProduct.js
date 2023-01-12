import React, { useEffect, useState } from 'react';

import {
	Container,
	Box,
	CircularProgress,
	Alert,
	Typography,
	TextField,
	Button,
	TextareaAutosize,
	Stack,
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

	const transfromFile = file => {
		const reader = new FileReader(); // gets a base64URL

		if (file) {
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				setImage(reader.result);
				setUploading(false);
			};
		} else {
			setImage('');
			setUploading(false);
		}
	};

	const uploadImageHandler = async event => {
		const file = event.target.files[0];

		transfromFile(file);
	};

	useEffect(() => {
		disptach(getProduct(productId)).then(() => {
			setName(product.name);
			setBrand(product.brand);
			setPrice(product.price);
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
	]);

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
				<Stack
					direction={{ xs: 'column', sm: 'row' }}
					spacing={{ xs: 1, sm: 2, md: 4 }}
					alignItems='start'>
					<Box order={{ xs: 2, sm: 1 }}>
						<Typography
							variant='h2'
							component='h2'
							fontSize={24}
							fontWeight={700}
							mt={{ sm: 0, xs: 2 }}
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
								inputProps={{ accept: 'image/*' }}
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
					</Box>
					<Box
						order={{ xs: 1, sm: 2 }}
						sx={{
							border: '1px solid #CCC',
							width: '100%',
							height: '300px',
							padding: '10px',
						}}>
						{image ? (
							<img
								src={image}
								style={{ width: '100%', height: '100%', objectFit: 'cover' }}
								alt='image'
							/>
						) : (
							<Typography variant='h6' component='h6' textAlign='center'>
								Preview Will Appear Here!
							</Typography>
						)}
					</Box>
				</Stack>
			)}
		</Container>
	);
};

export default AdminProduct;
