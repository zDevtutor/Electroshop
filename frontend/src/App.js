import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/layout/Header';
import Products from './components/products/Products';
import ProductDetail from './components/products/ProductDetail';

const App = () => {
	return (
		<>
			<Header />
			<Routes>
				<Route exact path='/' element={<Products />} />
				<Route path='/products/:productId' element={<ProductDetail />} />
			</Routes>
		</>
	);
};

export default App;
