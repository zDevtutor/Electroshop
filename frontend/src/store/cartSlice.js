import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const addCartItem = createAsyncThunk(
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

const cartItems = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

const initialState = { cartItems };

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		updateCartItem(state, action) {
			const existingItem = state.cartItems.find(
				item => item.product === action.payload.productId
			);

			if (existingItem) {
				existingItem.qty = action.payload.qty;

				state.cartItems = state.cartItems.map(item =>
					item.product === existingItem.product ? existingItem : item
				);

				localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
			}
		},
		removeCartItem(state, action) {
			state.cartItems = state.cartItems.filter(
				item => item.product !== action.payload.product
			);

			localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
		},
	},
	extraReducers: {
		[addCartItem.fulfilled]: (state, action) => {
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
	},
});

export const { updateCartItem, removeCartItem } = cartSlice.actions;

export const selectCart = state => state.cart;

export default cartSlice.reducer;
