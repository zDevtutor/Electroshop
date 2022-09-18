import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import productSlice from './productSlice';
import productsSlice from './productsSlice';

const store = configureStore({
	reducer: {
		products: productsSlice,
		product: productSlice,
		cart: cartSlice,
	},
});

export default store;
