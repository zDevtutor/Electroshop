import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const addToCart = createAsyncThunk(
	'cart/addToCart',
	async ({ productId, qty }) => {
		try {
			const { data } = await axios.get(`/api/products/${productId}`);

			return {
				product: data._id,
				name: data.name,
				image: data.image,
				price: data.price,
				countInStock: data.countInStock,
				qty,
			};
		} catch (error) {
			throw error.response.data.message || error.message;
		}
	}
);

const initialState = { cartItems: [], loading: false, error: null };

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		getCartItems(state) {
			state.cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
		},
		removeFromCart(state, action) {
			state.cartItems = state.cartItems.filter(
				item => item.product !== action.payload.product
			);

			localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
		},
	},
	extraReducers: {
		[addToCart.pending]: state => {
			state.loading = true;
		},
		[addToCart.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;

			const existingItem = state.cartItems.find(
				item => item.product === action.payload.product
			);

			if (existingItem) {
				state.cartItems = state.cartItems.map(item =>
					item.product === existingItem.product ? action.payload : item
				);
			} else {
				state.cartItems.push(action.payload);
			}

			localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
		},
		[addToCart.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		},
	},
});

export const { getCartItems, removeFromCart } = cartSlice.actions;

export const selectCart = state => state.cart;

export default cartSlice.reducer;
