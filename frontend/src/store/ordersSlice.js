import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getLoggedInOrders = createAsyncThunk(
	'order/getLoggedInOrders',
	async (arg, { getState }) => {
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

			const { data } = await axios.get(`/api/orders/myOrders`, config);

			return data;
		} catch (error) {
			throw error.response.data.message || error.message;
		}
	}
);

export const getAllOrders = createAsyncThunk(
	'order/getAllOrders',
	async (arg, { getState }) => {
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

			const { data } = await axios.get(`/api/orders`, config);

			return data;
		} catch (error) {
			throw error.response.data.message || error.message;
		}
	}
);

const initialState = { orders: [], loading: false, error: null };

const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {},
	extraReducers: {
		[getLoggedInOrders.pending]: state => {
			state.loading = true;
		},
		[getLoggedInOrders.fulfilled]: (state, action) => {
			state.loading = false;
			state.orders = action.payload;
			state.error = false;
		},
		[getLoggedInOrders.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		},
		[getAllOrders.pending]: state => {
			state.loading = true;
		},
		[getAllOrders.fulfilled]: (state, action) => {
			state.loading = false;
			state.orders = action.payload;
			state.error = false;
		},
		[getAllOrders.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		},
	},
});

export const selectOrders = state => state.orders;

export default ordersSlice.reducer;
