import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/layout/Header';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Footer from './components/layout/Footer';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Error404 from './pages/Error404';
import UserProfile from './pages/UserProfile';
import Checkout from './pages/Checkout';
import OrderDatails from './pages/OrderDetails';
import Users from './pages/Users';
import AdminProducts from './pages/AdminProducts';
import AdminProduct from './pages/AdminProduct';

const App = () => {
	return (
		<>
			<Header />
			<Routes>
				<Route index element={<Products />} />
				<Route path='/products' element={<Products />} />
				<Route path='/products/:productId' element={<ProductDetail />} />
				<Route path='/admin/products' element={<AdminProducts />} />
				<Route path='/admin/products/:productId' element={<AdminProduct />} />
				<Route path='/cart/*' element={<Cart />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/users/:id' element={<UserProfile />} />
				<Route path='/admin/users' element={<Users />} />
				<Route path='/checkout' element={<Checkout />} />
				<Route path='/orders/:orderId' element={<OrderDatails />} />
				<Route path='*' element={<Error404 />} />
			</Routes>
			<Footer />
		</>
	);
};

export default App;
