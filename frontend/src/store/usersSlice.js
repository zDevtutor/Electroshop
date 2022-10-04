import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllUsers = createAsyncThunk(
	'users/fetchAllUsers',
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

			const { data } = await axios.get('/api/users', config);

			return data;
		} catch (error) {
			throw error.response.data.message || error.message;
		}
	}
);

export const deleteUser = createAsyncThunk(
	'users/deleteUser',
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

			const { data } = await axios.delete(`/api/users/${id}`, config);

			return data;
		} catch (error) {
			throw error.response.data.message || error.message;
		}
	}
);

const initialState = { users: [], loading: false, error: null };

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: {
		[getAllUsers.pending]: state => {
			state.loading = true;
		},
		[getAllUsers.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
			state.users = action.payload;
		},
		[getAllUsers.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		},
		[deleteUser.pending]: state => {
			state.loading = true;
		},
		[deleteUser.fulfilled]: state => {
			state.loading = false;
			state.error = null;
		},
		[deleteUser.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		},
	},
});

export const selectUsers = state => state.users;

export default usersSlice.reducer;
