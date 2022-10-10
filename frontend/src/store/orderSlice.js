import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addNewOrder = createAsyncThunk(
	'order/addOrder',
	async (
		{
			orderItems,
			shippingAddress,
			paymentMethod,
			shippingPrice,
			taxPrice,
			totalPrice,
		},
		{ getState }
	) => {
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

			const { data } = await axios.post(
				'/api/orders',
				{
					orderItems,
					shippingAddress,
					paymentMethod,
					shippingPrice,
					taxPrice,
					totalPrice,
				},
				config
			);

			return data;
		} catch (error) {
			throw error.response.data.message || error.message;
		}
	}
);

export const getOrderDetails = createAsyncThunk(
	'order/getOrderDetails',
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

			const { data } = await axios.get(`/api/orders/${id}`, config);

			return data;
		} catch (error) {
			throw error.response.data.message || error.message;
		}
	}
);

export const payOrder = createAsyncThunk(
	'order/payOrder',
	async ({ id, paymentResult }, { getState }) => {
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
				`/api/orders/${id}/pay`,
				paymentResult,
				config
			);

			return data;
		} catch (error) {
			throw error.response.data.message || error.message;
		}
	}
);

export const deliverOrder = createAsyncThunk(
	'order/deliverOrder',
	async (id, { getState }) => {
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

			const { data } = await axios.put(`/api/orders/${id}/deliver`, {}, config);

			return data;
		} catch (error) {
			throw error.response.data.message || error.message;
		}
	}
);

const initialState = {
	order: {
		shippingAddress: {},
		orderItems: [],
		user: {},
		isPaid: false,
		isDelivered: false,
	},
	loading: false,
	error: null,
};

const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {},
	extraReducers: {
		[addNewOrder.pending]: state => {
			state.loading = true;
		},
		[addNewOrder.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
			state.order = action.payload;
		},
		[addNewOrder.rejected]: (state, action) => {
			state.error = action.error.message;
			state.loading = false;
		},
		[getOrderDetails.pending]: state => {
			state.loading = true;
		},
		[getOrderDetails.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
			state.order = action.payload;
		},
		[getOrderDetails.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		},
		[payOrder.pending]: state => {
			state.loading = true;
		},
		[payOrder.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
			state.order = action.payload;
		},
		[payOrder.rejected]: (state, action) => {
			state.error = action.error.message;
			state.loading = false;
		},
		[deliverOrder.pending]: state => {
			state.loading = true;
		},
		[deliverOrder.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
			state.order = action.payload;
		},
		[deliverOrder.rejected]: (state, action) => {
			state.error = action.error.message;
			state.loading = false;
		},
	},
});

export const selectOrder = state => state.order;

export default orderSlice.reducer;
