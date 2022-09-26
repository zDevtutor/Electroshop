import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
	'products/getProducts',
	async () => {
		try {
			const { data } = await axios.get('/api/products');

			return data;
		} catch (error) {
			throw error.response.data.message || error.message;
		}
	}
);

const initialState = {
	products: [],
	loading: false,
	error: null,
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchProducts.pending]: state => {
			state.loading = true;
		},
		[fetchProducts.fulfilled]: (state, action) => {
			state.loading = false;
			state.products = action.payload;
		},
		[fetchProducts.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		},
	},
});

export const selectAllProducts = state => state.products;

export default productsSlice.reducer;
