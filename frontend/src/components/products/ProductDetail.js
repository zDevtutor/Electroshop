import {
	Container,
	Typography,
	Stack,
	Box,
	Divider,
	useTheme,
	Button,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import StyledLink from '../../styles/StyledLink';
import Rating from './Rating';

const ProductDetail = () => {
	const theme = useTheme();
	const { productId } = useParams();
	const [product, setProduct] = useState({});

	useEffect(() => {
		axios
			.get(`/api/products/${productId}`)
			.then(res => setProduct(res.data))
			.catch(err => console.log(err));
	});

	return (
		<Container maxWidth='md' sx={{ margin: '50px auto' }}>
			<StyledLink to='/'>
				<Typography variant='h5' component='h5' fontSize={16} mb={2}>
					Go Back
				</Typography>
			</StyledLink>

			<Stack
				direction='row'
				sx={{
					gap: '30px',
					[theme.breakpoints.down('sm')]: {
						flexDirection: 'column',
						justifyContent: 'center',
						gap: 0,
					},
				}}>
				<Box sx={{ flex: 1 }}>
					<Box
						component='img'
						src={product.image}
						sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
					/>
				</Box>
				<Box
					sx={{
						flex: 1,
						[theme.breakpoints.down('sm')]: {
							marginTop: '20px',
						},
					}}>
					<Typography variant='h4' component='h4'>
						{product.name}
					</Typography>
					<Divider sx={{ margin: '20px 0' }} />
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}>
						<Rating value={product.rating} />
						<Typography variant='span' component='span'>
							{product.numReviews} Reviews
						</Typography>
					</Box>
					<Divider sx={{ margin: '20px 0' }} />
					<Typography variant='p' component='p'>
						<Typography fontWeight={700} variant='span' component='span'>
							Price:
						</Typography>{' '}
						${product.price}
					</Typography>
					<Divider sx={{ margin: '20px 0' }} />
					<Typography variant='p' component='p'>
						<Typography fontWeight={700} variant='span' component='span'>
							Description:
						</Typography>{' '}
						{product.description}
					</Typography>
				</Box>
				<Stack
					direction='column'
					sx={{
						flex: 0.5,
						alignSelf: 'start',
						padding: '10px',
						border: '1px solid #ccc',

						[theme.breakpoints.down('sm')]: {
							alignSelf: 'stretch',
							marginTop: '20px',
						},
					}}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							borderBottom: '1px solid #ccc',
							paddingBottom: '5px',
							marginBottom: '5px',
						}}>
						<Typography fontWeight={700} variant='span' component='span'>
							Price:
						</Typography>
						<Typography variant='span' component='span'>
							${product.price}
						</Typography>
					</Box>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							borderBottom: '1px solid #ccc',
							paddingBottom: '5px',
							marginBottom: '5px',
						}}>
						<Typography fontWeight={700} variant='span' component='span'>
							Status:
						</Typography>
						<Typography variant='span' component='span'>
							{product.countInStock ? 'In Stock' : 'Not Avalible'}
						</Typography>
					</Box>
					<Button variant='contained' sx={{ marginTop: '20px' }}>
						Add To Cart
					</Button>
				</Stack>
			</Stack>
		</Container>
	);
};

export default ProductDetail;
