import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Import your AuthContext
import { UserProvider } from './UserContext';
import Donate from './Donate';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

//const stripePromise = loadStripe('pk_test_51HukyvL804ojXsbD9GxRMkVNO6ab5KhrxUpqbUN9wKLZsPVpvgIqrQPlxW8hZH2nXccMELTn93y69Yg1fQDj8lpT00FH2WGsD1');
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_TEST_KEY);
if (!stripePromise) {
  console.error('Failed to initialize Stripe with the provided key');
} else {
  console.log('Stripe initialized successfully');
}

const userName = process.env.REACT_APP_CBS_USER_NAME
if (!userName) {
  console.error('Failed to initialize CBS Data: User Name missing');
} 

const password = process.env.REACT_APP_CBS_PASSWORD;
if (!password) {
  console.error('Failed to initialize CBS Data: password missing');
} 

const token = process.env.REACT_APP_CBS_USER_NAME
if (!token) {
  console.error('Failed to initialize CBS Data: token missing');
} 

const apiKey = process.env.REACT_APP_CBS_PASSWORD;
if (!apiKey) {
  console.error('Failed to initialize CBS Data: apiKey missing');
} else {
  console.log('CBS Data initialized successfully');
}

function App() {
  return (
    <AuthProvider> {/* Wrap your application in AuthProvider */}
      <UserProvider>
          <Router>
            <Routes> {/* Use `Routes` instead of `Switch` */}
              <Route path="/donate" element={
                <Elements stripe={stripePromise}>
                  <Donate />
                </Elements>
              } />
              <Route path="*" element={<Navigate to="/donate" />} />
            </Routes>
          </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;