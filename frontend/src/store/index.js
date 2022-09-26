import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import productSlice from './productSlice';
import productsSlice from './productsSlice';
import authSlice from './authSlice';
import profileSlice from './profileSlice';

const store = configureStore({
	reducer: {
		products: productsSlice,
		product: productSlice,
		cart: cartSlice,
		auth: authSlice,
		profile: profileSlice,
	},
});

export default store;
