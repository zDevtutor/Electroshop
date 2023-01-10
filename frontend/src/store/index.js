import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import productSlice from './productSlice';
import productsSlice from './productsSlice';
import authSlice from './authSlice';
import profileSlice from './profileSlice';
import orderSlice from './orderSlice';
import ordersSlice from './ordersSlice';
import usersSlice from './usersSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['products', 'product', 'order', 'orders', 'users'],
};

const reducer = combineReducers({
	auth: authSlice,
	cart: cartSlice,
	profile: profileSlice,
	users: usersSlice,
	order: orderSlice,
	orders: ordersSlice,
	products: productsSlice,
	product: productSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: [thunk],
});

export default store;

export const persistor = persistStore(store);
