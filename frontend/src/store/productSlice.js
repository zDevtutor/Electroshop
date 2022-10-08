import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProduct = createAsyncThunk('product/getProduct', async id => {
	try {
		const { data } = await axios.get(`/api/products/${id}`);

		return data;
	} catch (error) {
		throw error.response.data.message || error.message;
	}
});

export const addProduct = createAsyncThunk(
	'product/addProduct',
	async (arg, { getState }) => {
		try {
			const {
				auth: {
					userInfo: { token },
				},
			} = getState();

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await axios.post('/api/products', {}, config);

			return data;
		} catch (error) {
			throw error.response.data.message || error.message;
		}
	}
);

export const deleteProduct = createAsyncThunk(
	'product/deleteProduct',
	async (id, { getState }) => {
		try {
			const {
				auth: {
					userInfo: { token },
				},
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await axios.delete(`/api/products/${id}`, config);

			return data;
		} catch (error) {
			throw error.response.data.message || error.message;
		}
	}
);

export const updateProduct = createAsyncThunk(
	'product/updateProduct',
	async (
		{ id, name, image, brand, price, countInStock, description },
		{ getState }
	) => {
		try {
			const {
				auth: {
					userInfo: { token },
				},
			} = getState();

			const config = {
				'Content-Type': 'application/json',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await axios.put(
				`/api/products/${id}`,
				{ name, image, brand, price, countInStock, description },
				config
			);

			return data;
		} catch (error) {
			throw error.response.data.message || error.message;
		}
	}
);

const initialState = {
	product: {
		name: '',
		brand: '',
		price: 0,
		countInStock: 0,
		description: '',
		reviews: [],
	},
	loading: false,
	error: null,
};

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {},
	extraReducers: {
		[getProduct.pending]: state => {
			state.loading = true;
		},
		[getProduct.fulfilled]: (state, action) => {
			state.loading = false;
			state.product = action.payload;
		},
		[getProduct.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		},
		[addProduct.pending]: state => {
			state.loading = true;
		},
		[addProduct.fulfilled]: (state, action) => {
			state.loading = false;
			state.product = action.payload;
			state.error = null;
		},
		[addProduct.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		},
		[deleteProduct.pending]: state => {
			state.loading = true;
		},
		[deleteProduct.fulfilled]: state => {
			state.loading = false;
			state.error = null;
		},
		[deleteProduct.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		},
		[updateProduct.pending]: state => {
			state.loading = true;
		},
		[updateProduct.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
			state.product = action.payload;
		},
		[updateProduct.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		},
	},
});

export const selectProduct = state => state.product;

export default productSlice.reducer;
