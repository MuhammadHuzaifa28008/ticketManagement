import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import AssignmentSolver from '../../microServices/AssignmentSolver/AssignmentSolver.jsx';
import Home from '../pages/Home';
import AddOrEditCustomer from '../pages/AddOrEditCustomer';
import CreateCustomer from '../pages/CreateCustomer';
import PendingPayments from '../pages/PendingPayments';
import RecordPayment from '../components/pending.Payments/RecordPayment';
import { Height } from '@mui/icons-material';

function MainRoutes() {
  return (
    <Routes >
      <Route exact path='/' element={<Home />} />
      <Route exact path='/add-customer' element={<CreateCustomer />} />
      <Route exact path='/add-or-edit-customer-data' element={<AddOrEditCustomer />} />
      <Route exact path='/payments' element={<PendingPayments />} />
      <Route exact path='/recordpayment/:id' element={<RecordPayment />} />
      <Route  path='*' element={<Home />} />
    </Routes>
  );
}

export default MainRoutes;
