import React, { useState } from 'react';

import {
	Box,
	Typography,
	Button,
	Select,
	MenuItem,
	TextareaAutosize,
	InputLabel,
	FormControl,
	Alert,
	Card,
	CardContent,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../store/authSlice';
import { Link, useParams } from 'react-router-dom';
import { addReview, getProduct } from '../../store/productSlice';
import Rating from './Rating';

const ProductReview = ({ reviews }) => {
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');
	const { userInfo } = useSelector(getUserInfo);
	const dispatch = useDispatch();
	const { productId } = useParams();

	const alreadyReviewed = reviews.find(review => review.user === userInfo._id);

	const review = {
		rating,
		comment,
	};

	const addReviewHandler = event => {
		event.preventDefault();
		dispatch(addReview({ productId, review })).then(() => {
			dispatch(getProduct(productId));
		});
	};

	return (
		<Box sx={{ marginTop: '50px' }}>
			<Typography
				variant='h2'
				component='h2'
				fontSize={24}
				fontWeight={700}
				mb={2}>
				Product Reviews
			</Typography>

			{reviews.map(review => (
				<Card
					key={review._id}
					sx={{
						marginBottom: '20px',
						textAlign: 'left',
						background: '#F9F5EB',
					}}>
					<CardContent>
						<Typography
							variant='h3'
							component='h3'
							fontSize={20}
							fontWeight={500}
							mb={2}>
							{review.name}
						</Typography>
						<Rating value={review.rating} />
						<Typography
							variant='h4'
							component='h4'
							fontSize={18}
							fontWeight={400}
							mb={2}>
							{review.createdAt.substring(0, 10)}
						</Typography>
						<Typography
							variant='p'
							component='p'
							fontSize={16}
							fontWeight={400}
							mb={2}>
							{review.comment}
						</Typography>
					</CardContent>
				</Card>
			))}

			{Object.keys(userInfo).length === 0 ? (
				<Alert severity='info'>
					<Link
						style={{
							color: 'orangered',
						}}
						to='/login'>
						Sign In
					</Link>{' '}
					to add a review
				</Alert>
			) : alreadyReviewed ? (
				''
			) : (
				<Box
					component='form'
					noValidate
					sx={{ mt: 1 }}
					onSubmit={addReviewHandler}>
					<FormControl fullWidth>
						<InputLabel id='rating'>Rating</InputLabel>
						<Select
							sx={{ textAlign: 'left' }}
							labelId='rating'
							id='rating'
							value={rating}
							label='Rating'
							onChange={e => setRating(e.target.value)}>
							<MenuItem disabled value={0}>
								Select...
							</MenuItem>
							<MenuItem value={1}>1- Poor</MenuItem>
							<MenuItem value={2}>2- Fair</MenuItem>
							<MenuItem value={3}>3- Good</MenuItem>
							<MenuItem value={4}>4- Very Good</MenuItem>
							<MenuItem value={5}>5- Excellent</MenuItem>
						</Select>
					</FormControl>

					<TextareaAutosize
						aria-label='Review'
						placeholder='Add Your comment'
						minRows={10}
						style={{ width: '100%', marginTop: '15px', padding: '10px' }}
						value={comment}
						onChange={e => setComment(e.target.value)}
					/>
					<Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
						Add Review
					</Button>
				</Box>
			)}
		</Box>
	);
};

export default ProductReview;
