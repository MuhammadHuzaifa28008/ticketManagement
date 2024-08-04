import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import AssignmentSolver from '../../microServices/AssignmentSolver/AssignmentSolver.jsx';
import Home from '../pages/Home';
import AddOrEditCustomer from '../components/AddOrEditCustomer';
import { Height } from '@mui/icons-material';

function MainRoutes() {
  return (
    <Routes >
      <Route exact path='/' element={<Home />} />
      <Route exact path='/add-or-edit-customer-data' element={<AddOrEditCustomer />} />
      {/* <Route exact path="/assignment-solver" element={<AssignmentSolver />} /> */}
    </Routes>
  );
}

export default MainRoutes;
