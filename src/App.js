import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import CarManagementLayout from './components/layout/CarManagementLayout';
import Dashboard from './components/dashboard/Dashboard';
import Cars from './components/cars/Cars';
import Customers from './components/customers/Customers';
import Sales from './components/sales/Sales';
import Employees from './components/employees/Employees';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CarManagementLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cars" element={<Cars />} />
          <Route path="customers" element={<Customers />} />
          <Route path="sales" element={<Sales />} />
          <Route path="employees" element={<Employees />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;