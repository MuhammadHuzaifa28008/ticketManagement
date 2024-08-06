const {getAll, createNewCustomer, updateCustomerById, findCustomerById, addPaymentRecordById, deleteCustomerById, deletePaymentRecordById} = require('../db/dbFuncs')


const getAllCustomers = async (req, res) => {
    try {
      const allCustomers = await getAll();
      res.status(201).json(allCustomers);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };


const createCustomer = async (req, res) => {
    try {
      const customerData = req.body;
      console.log(customerData)
      const newCustomer = await createNewCustomer(customerData);
      res.status(201).json(newCustomer);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  const updateCustomer = async (req, res) => {
    try {
        // console.log('update customer called')
      const customerId = req.params.id;
      if(!customerId) {
        console.error('please provide id');
         throw new error('please provide id')
        }
        // else console.log(customerId)
      const updateData = req.body;
      if(!updateData) {
        console.error('please provide data'); 
        throw new error('please proivde data')
      }
      // else console.log(updateData)

      const updatedCustomer = await updateCustomerById(customerId, updateData);
      if (!updatedCustomer) return res.status(404).json({ error: 'Customer not found.' });
      // console.log('updatedCustomer:', updatedCustomer)
      res.json(updatedCustomer);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  const deleteCustomer = async (req, res) => {
    try {
      const customerId = req.params.id;
      const customer = await findCustomerById(customerId);
      if (!customer) return res.status(404).json({ error: 'Customer not found.' });
  
      if (customer.paymentInfo.dueAmount > 0) {
        return res.status(400).json({ error: 'Cannot delete customer with due amount greater than 0.' });
      }
  
      await deleteCustomerById(customerId);
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  const addPaymentRecord = async (req, res) => {
    try {
      const customerId = req.params.customerId;
      const paymentRecord = req.body;
      const updatedCustomer = await addPaymentRecordById(customerId, paymentRecord);
      res.json(updatedCustomer);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  const deletePaymentRecord = async (req, res) => {
    try {
      const customerId = req.params.customerId;
      const recordId = req.params.recordId;
      const updatedCustomer = await deletePaymentRecordById(customerId, recordId);
      res.json(updatedCustomer);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  module.exports = {getAllCustomers, createCustomer, updateCustomer, deleteCustomer, addPaymentRecord, deletePaymentRecord };
