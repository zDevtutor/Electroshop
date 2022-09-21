import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk(
	'user/login',
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
	'user/register',
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
	userInfo: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout(state) {
			state.userInfo = null;
			localStorage.removeItem('userInfo');
		},
		isLoggedIn(state) {
			state.userInfo = JSON.parse(localStorage.getItem('userInfo')) || null;
			state.error = null;
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

			localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
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

export const getUserInfo = state => state.userInfo;

export const { logout, isLoggedIn } = userSlice.actions;

export default userSlice.reducer;
