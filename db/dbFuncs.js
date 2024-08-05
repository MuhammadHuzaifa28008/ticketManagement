const mongoose = require('mongoose');
const Customer = require('../db/models/Customer.model');

// Helper function to get all customers
const getAll = async () => {
    try {
      const customers = await Customer.find({});
      return customers;
    } catch (err) {
      throw new Error('Error fetching customers: ' + err.message);
    }
  };
// Helper function to create a new customer
const createNewCustomer = async (customerData) => {
  const customer = new Customer(customerData);
  return await customer.save();
};

// Helper function to find a customer by ID
const findCustomerById = async (id) => {
  return await Customer.findById(id);
};

// Helper function to update customer data by ID
const updateCustomerById = async (id, updateData) => {
    // Create an object to store the update paths
    let updatePaths = {};
  
    // Update ticketInfo fields if they are provided
    if (updateData.ticketInfo) {
      Object.keys(updateData.ticketInfo).forEach(key => {
        updatePaths[`ticketInfo.${key}`] = updateData.ticketInfo[key];
      });
    }
  
    // Update paymentInfo fields if they are provided
    if (updateData.paymentInfo) {
      Object.keys(updateData.paymentInfo).forEach(key => {
        updatePaths[`paymentInfo.${key}`] = updateData.paymentInfo[key];
      });
    }
  
    // Update other fields in the customer schema if they are provided
    Object.keys(updateData).forEach(key => {
      if (key !== 'ticketInfo' && key !== 'paymentInfo') {
        updatePaths[key] = updateData[key];
      }
    });
  
    // Perform the update with $set to ensure partial updates are handled properly
    return await Customer.findByIdAndUpdate(
      id,
      { $set: updatePaths },
      { new: true, runValidators: true }
    );
  };
  





// Helper function to delete a customer by ID
const deleteCustomerById = async (id) => {
  return await Customer.findByIdAndDelete(id);
};

// Helper function to add a payment record
const addPaymentRecordById = async (customerId, paymentRecord) => {
  const customer = await Customer.findById(customerId);
  if (!customer) throw new Error('Customer not found.');

  // Update dueAmount
  customer.paymentInfo.dueAmount -= paymentRecord.amt;
  customer.paymentInfo.paymentRecords.push(paymentRecord);

  return await customer.save();
};

// Helper function to delete a payment record by customer ID and record ID
const deletePaymentRecordById = async (customerId, recordId) => {
  const customer = await Customer.findById(customerId);
  if (!customer) throw new Error('Customer not found.');

  const paymentRecord = customer.paymentInfo.paymentRecords.id(recordId);
  if (!paymentRecord) throw new Error('Payment record not found.');

  // Update dueAmount
  customer.paymentInfo.dueAmount += paymentRecord.amt;
  
// Remove the payment record from the array
customer.paymentInfo.paymentRecords.splice(paymentRecordIndex, 1);
  return await customer.save();
};


module.exports ={getAll, createNewCustomer, findCustomerById, updateCustomerById, addPaymentRecordById, deletePaymentRecordById, deleteCustomerById}