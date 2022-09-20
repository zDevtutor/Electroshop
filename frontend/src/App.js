import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/layout/Header';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Footer from './components/layout/Footer';
import Cart from './pages/Cart';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import Register from './pages/Register';

const App = () => {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Products />} />
				<Route path='/products' element={<Products />} />
				<Route path='/products/:productId' element={<ProductDetail />} />
				<Route path='/cart/*' element={<Cart />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/profile' element={<UserProfile />} />
			</Routes>
			<Footer />
		</>
	);
};

export default App;
