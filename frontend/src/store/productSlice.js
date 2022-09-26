import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProduct = createAsyncThunk('product/getProduct', async id => {
	try {
		const { data } = await axios.get(`/api/products/${id}`);

		return data;
	} catch (error) {
		throw error.response.data.message || error.message;
	}
});

const initialState = { product: { reviews: [] }, loading: false, error: null };

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchProduct.pending]: state => {
			state.loading = true;
		},
		[fetchProduct.fulfilled]: (state, action) => {
			state.loading = false;
			state.product = action.payload;
		},
		[fetchProduct.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		},
	},
});

export const selectProduct = state => state.product;

export default productSlice.reducer;
