import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import store, { persistor } from './store';
import App from './App';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<PayPalScriptProvider
			options={{ 'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
			<BrowserRouter>
				<PersistGate loading={null} persistor={persistor}>
					<App />
				</PersistGate>
			</BrowserRouter>
		</PayPalScriptProvider>
	</Provider>
);
