const express = require('express');
const router = express.Router();
const {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  addPaymentRecord,
  deletePaymentRecord
} = require('../controllers/customerControllers')

// Route for Getting all customers
router.get('/all', getAllCustomers);

// Route for creating a customer
router.post('/add', createCustomer);

// Route for updating a customer by ID
router.put('/:id', updateCustomer);

// Route for deleting a customer by ID
router.delete('/:id', deleteCustomer);

// Route for adding a payment record to a customer by customer ID
router.post('/:customerId/paymentRecords', addPaymentRecord);

// Route for deleting a payment record by customer ID and record ID
router.delete('/:customerId/paymentRecords/:recordId', deletePaymentRecord);

module.exports = router;
