import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProfile = createAsyncThunk(
	'profile/getProfile',
	async (arg, { getState }) => {
		try {
			const {
				auth: {
					userInfo: { token, _id },
				},
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await axios.get(`/api/users/${_id}`, config);

			return data;
		} catch (error) {
			throw error.response.data.message || error.message;
		}
	}
);

export const updateProfile = createAsyncThunk(
	'profile/updateProfile',
	async ({ image, name, email, password }, { getState }) => {
		try {
			const {
				auth: {
					userInfo: { token, _id },
				},
			} = getState();

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await axios.put(
				`/api/users/${_id}`,
				{
					image,
					name,
					email,
					password,
				},
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
	user: { name: '', email: '', image: '' },
};

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {},
	extraReducers: {
		[getProfile.pending]: state => {
			state.loading = true;
		},
		[getProfile.fulfilled]: (state, action) => {
			state.loading = false;
			state.user = action.payload;
		},
		[getProfile.rejected]: (state, action) => {
			state.error = action.error.message;
		},
		[updateProfile.pending]: state => {
			state.loading = true;
		},
		[updateProfile.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
			state.user = action.payload;

			localStorage.setItem('userInfo', JSON.stringify(state.user));
		},
		[updateProfile.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		},
	},
});

export const getUserProfile = state => state.profile;

export default profileSlice.reducer;
