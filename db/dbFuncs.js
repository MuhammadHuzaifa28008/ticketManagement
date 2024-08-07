const mongoose = require('mongoose');
const moment = require('moment-timezone');
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
    try {
      // Find the customer by ID
      const customer = await Customer.findById(customerId);
      if (!customer) throw new Error('Customer not found.');
  
      // Find the payment record index
      const paymentRecordIndex = customer.paymentInfo.paymentRecords.findIndex(
        (record) => record._id.toString() === recordId
      );
      if (paymentRecordIndex === -1) throw new Error('Payment record not found.');
  
      // Get the payment record amount
      const paymentRecordAmount = customer.paymentInfo.paymentRecords[paymentRecordIndex].amt;
  
      // Update dueAmount
      customer.paymentInfo.dueAmount += paymentRecordAmount;
  
      // Remove the payment record from the array
      customer.paymentInfo.paymentRecords.splice(paymentRecordIndex, 1);
  
      // Save the updated customer document
      return await customer.save();
    } catch (error) {
      throw new Error(error.message);
    }
  };
  


module.exports ={getAll, createNewCustomer, findCustomerById, updateCustomerById, addPaymentRecordById, deletePaymentRecordById, deleteCustomerById}