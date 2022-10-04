import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import productSlice from './productSlice';
import productsSlice from './productsSlice';
import authSlice from './authSlice';
import profileSlice from './profileSlice';
import orderSlice from './orderSlice';
import ordersSlice from './ordersSlice';

const store = configureStore({
	reducer: {
		products: productsSlice,
		product: productSlice,
		cart: cartSlice,
		auth: authSlice,
		profile: profileSlice,
		order: orderSlice,
		orders: ordersSlice,
	},
});

export default store;
