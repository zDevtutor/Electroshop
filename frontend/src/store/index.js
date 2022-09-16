import { configureStore } from '@reduxjs/toolkit';
import productSlice from './productSlice';
import productsSlice from './productsSlice';

const store = configureStore({
	reducer: {
		products: productsSlice,
		product: productSlice,
	},
});

export default store;
