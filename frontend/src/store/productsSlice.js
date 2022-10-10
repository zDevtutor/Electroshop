import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProducts = createAsyncThunk(
	'products/getProducts',
	async ({ searchQuery = '', pageNumber = 1 }) => {
		try {
			const { data } = await axios.get(
				`/api/products?keyword=${searchQuery}&pageNumber=${pageNumber}`
			);

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
		[getProducts.pending]: state => {
			state.loading = true;
		},
		[getProducts.fulfilled]: (state, action) => {
			state.loading = false;
			state.products = action.payload.products;
			state.pages = action.payload.pages;
		},
		[getProducts.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		},
	},
});

export const selectAllProducts = state => state.products;

export default productsSlice.reducer;
