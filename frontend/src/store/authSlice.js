import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk(
	'auth/login',
	async ({ email, password }) => {
		const config = {
			'Content-Type': 'application/json',
		};

		try {
			const { data } = await axios.post(
				'/api/auth/login',
				{ email, password },
				config
			);

			return data;
		} catch (error) {
			throw error.response.data.message || error.message;
		}
	}
);

export const register = createAsyncThunk(
	'auth/register',
	async ({ name, email, password }) => {
		const config = { 'Content-Type': 'application/json' };

		try {
			const { data } = await axios.post(
				'/api/auth/register',
				{ name, email, password },
				config
			);

			return data;
		} catch (error) {
			throw error.response.data.message || error.message;
		}
	}
);

const initialState = {
	loading: false,
	error: null,
	userInfo: {},
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout(state) {
			state.userInfo = {};
		},
		updateUserInfo(state, action) {
			state.userInfo = { ...state, ...action.payload };
		},
	},
	extraReducers: {
		[login.pending]: state => {
			state.loading = true;
		},
		[login.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;

			state.userInfo = action.payload;
		},
		[login.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		},
		[register.pending]: state => {
			state.loading = true;
		},
		[register.fulfilled]: state => {
			state.loading = false;
			state.error = null;
		},
		[register.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		},
	},
});

export const getUserInfo = state => state.auth;

export const { logout, updateUserInfo } = authSlice.actions;

export default authSlice.reducer;
