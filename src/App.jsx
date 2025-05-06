import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CarDealership from './components/client/CarDealership';
import CarDetail from './components/client/CarDetail';
import FavoriteCars from './components/client/FavoriteCars';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/client"
                        element={
                            <PrivateRoute>
                                <CarDealership />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/client/car/:id"
                        element={
                            <PrivateRoute>
                                <CarDetail />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/client/favorites"
                        element={
                            <PrivateRoute>
                                <FavoriteCars />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App; 