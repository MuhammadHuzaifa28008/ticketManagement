const mongoose = require('mongoose');
const moment = require('moment-timezone');
const Customer = require('../db/models/Customer.model');

// Helper function to get all customers
const getAll = async () => {
    try {
        return await Customer.find({});
    } catch (err) {
        throw new Error('Error fetching customers: ' + err.message);
    }
};

// Helper function to create a new customer
const createNewCustomer = async (customerData) => {
    try {
        // Round numeric fields in paymentInfo
        customerData.paymentInfo.ticketPrice = Math.round(customerData.paymentInfo.ticketPrice);
        customerData.paymentInfo.profit = Math.round(customerData.paymentInfo.profit);
        customerData.paymentInfo.invoiceAmount = Math.round(customerData.paymentInfo.invoiceAmount);
        // customerData.paymentInfo.amountPaid = Math.round(customerData.paymentInfo.amountPaid);
        // customerData.paymentInfo.dueAmount = Math.round(customerData.paymentInfo.dueAmount);
        
        customerData.paymentInfo.amountPaid = 0;
        customerData.paymentInfo.dueAmount = Math.round(customerData.paymentInfo.invoiceAmount);

        // customerData.paymentInfo.paymentRecords = customerData.paymentInfo.paymentRecords.map(record => ({
        //     ...record,
        //     amt: Math.round(record.amt)
        // }));

        const customer = new Customer(customerData);
        return await customer.save();
    } catch (err) {
        throw new Error('Error creating customer: ' + err.message);
    }
};

// Helper function to delete a customer by ID
const deleteCustomerById = async (id) => {
    try {
        // Find the customer by ID and delete it from the database
        const deletedCustomer = await Customer.findByIdAndDelete(id);

        // Check if the customer was found and deleted
        if (!deletedCustomer) {
            throw new Error('Customer not found.');
        }

        // Return the deleted customer data
        return deletedCustomer;
    } catch (err) {
        // If an error occurs, throw a new error with the message
        throw new Error('Error deleting customer: ' + err.message);
    }
};


// Helper function to find a customer by ID
const findCustomerById = async (id) => {
    try {
        return await Customer.findById(id);
    } catch (err) {
        throw new Error('Error finding customer by ID: ' + err.message);
    }
};

// Helper function to update customer data by ID
const updateCustomerById = async (id, updateData) => {
    try {
        // Round numeric fields in paymentInfo before updating
        if (updateData.paymentInfo) {
            if (updateData.paymentInfo.ticketPrice !== undefined) {
                updateData.paymentInfo.ticketPrice = Math.round(updateData.paymentInfo.ticketPrice);
            }
            if (updateData.paymentInfo.profit !== undefined) {
                updateData.paymentInfo.profit = Math.round(updateData.paymentInfo.profit);
            }
            if (updateData.paymentInfo.invoiceAmount !== undefined) {
                updateData.paymentInfo.invoiceAmount = Math.round(updateData.paymentInfo.invoiceAmount);
            }
            if (updateData.paymentInfo.amountPaid !== undefined) {
                updateData.paymentInfo.amountPaid = Math.round(updateData.paymentInfo.amountPaid);
            }
            if (updateData.paymentInfo.dueAmount !== undefined) {
                updateData.paymentInfo.dueAmount = Math.round(updateData.paymentInfo.dueAmount);
            }

            if (updateData.paymentInfo.paymentRecords) {
                updateData.paymentInfo.paymentRecords = updateData.paymentInfo.paymentRecords.map(record => ({
                    ...record,
                    amt: Math.round(record.amt)
                }));
            }
        }

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
                updatePaths[`paymentInfo.${key}`] = Math.round(updateData.paymentInfo[key]);
            });
        }

        // Update other fields in the customer schema if they are provided
        Object.keys(updateData).forEach(key => {
            if (key !== 'ticketInfo' && key !== 'paymentInfo') {
                updatePaths[key] = Math.round(updateData[key]);
            }
        });

        // Perform the update with $set to ensure partial updates are handled properly
        return await Customer.findByIdAndUpdate(
            id,
            { $set: updatePaths },
            { new: true, runValidators: true }
        );
    } catch (err) {
        throw new Error('Error updating customer: ' + err.message);
    }
};

// Helper function to add a payment record
const addPaymentRecordById = async (customerId, paymentRecord) => {
    try {
        const customer = await Customer.findById(customerId);
        if (!customer) throw new Error('Customer not found.');

        // Add current timestamp in UTC+5:00 to paymentRecord.time
        paymentRecord.date = moment().tz('Asia/Karachi').format('YYYY-MM-DDTHH:mm:ssZ'); // Asia/Karachi is UTC+5:00

        // Round the payment amount
        paymentRecord.amt = Math.round(paymentRecord.amt);

        // Update dueAmount and amountPaid, and push the payment record
        customer.paymentInfo.dueAmount -= Math.round(paymentRecord.amt);
        customer.paymentInfo.amountPaid += Math.round(paymentRecord.amt);
        customer.paymentInfo.paymentRecords.push(paymentRecord);

        return await customer.save();
    } catch (err) {
        throw new Error('Error adding payment record: ' + err.message);
    }
};

// Helper function to delete a payment record by customer ID and record ID
const deletePaymentRecordById = async (customerId, recordId) => {
    try {
        const customer = await Customer.findById(customerId);
        if (!customer) throw new Error('Customer not found.');

        const paymentRecordIndex = customer.paymentInfo.paymentRecords.findIndex(
            (record) => record._id.toString() === recordId
        );
        if (paymentRecordIndex === -1) throw new Error('Payment record not found.');

        // Get the payment record amount
        const paymentRecordAmount = customer.paymentInfo.paymentRecords[paymentRecordIndex].amt;

        // Update dueAmount
        customer.paymentInfo.dueAmount += Math.round(paymentRecordAmount);
        // update amountPaid
        customer.paymentInfo.amountPaid -= Math.round(paymentRecordAmount);

        // Remove the payment record from the array
        customer.paymentInfo.paymentRecords.splice(paymentRecordIndex, 1);

        return await customer.save();
    } catch (err) {
        throw new Error('Error deleting payment record: ' + err.message);
    }
};

module.exports = {
    getAll,
    createNewCustomer,
    findCustomerById,
    updateCustomerById,
    addPaymentRecordById,
    deletePaymentRecordById,
    deleteCustomerById
};


