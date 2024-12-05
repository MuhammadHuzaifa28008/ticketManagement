const mongoose = require('mongoose');
const moment = require('moment-timezone');
const Customer = require('../db/models/Customer.model');
const retry = require('../utils/retry.js'); // Import the retry utility

// Helper function to get all customers with retry logic
const getAll = async () => {
    return retry(async () => {
        return await Customer.find({});
    }, 3, 1000);
};

// Helper function to create a new customer with retry logic
const createNewCustomer = async (customerData) => {
    return retry(async () => {
        customerData.paymentInfo.ticketPrice = Math.round(customerData.paymentInfo.ticketPrice);
        customerData.paymentInfo.profit = Math.round(customerData.paymentInfo.profit);
        customerData.paymentInfo.invoiceAmount = Math.round(customerData.paymentInfo.invoiceAmount);
        customerData.paymentInfo.amountPaid = 0;
        customerData.paymentInfo.dueAmount = Math.round(customerData.paymentInfo.invoiceAmount);

        const customer = new Customer(customerData);
        return await customer.save();
    }, 3, 1000);
};

// Helper function to delete a customer by ID with retry logic
const deleteCustomerById = async (id) => {
    return retry(async () => {
        const deletedCustomer = await Customer.findByIdAndDelete(id);
        if (!deletedCustomer) {
            throw new Error('Customer not found.');
        }
        return deletedCustomer;
    }, 3, 1000);
};

// Helper function to find a customer by ID with retry logic
const findCustomerById = async (id) => {
    return retry(async () => {
        return await Customer.findById(id);
    }, 3, 1000);
};

// Helper function to update customer data by ID with retry logic
const updateCustomerById = async (id, updateData) => {
    return retry(async () => {
        if (updateData.paymentInfo) {
            ['ticketPrice', 'profit', 'invoiceAmount', 'amountPaid', 'dueAmount'].forEach(key => {
                if (typeof updateData.paymentInfo[key] === 'number') {
                    updateData.paymentInfo[key] = Math.round(updateData.paymentInfo[key]);
                }
            });

            if (updateData.paymentInfo.paymentRecords) {
                updateData.paymentInfo.paymentRecords = updateData.paymentInfo.paymentRecords.map(record => ({
                    ...record,
                    amt: typeof record.amt === 'number' ? Math.round(record.amt) : record.amt
                }));
            }
        }

        let updatePaths = {};

        if (updateData.ticketInfo) {
            Object.keys(updateData.ticketInfo).forEach(key => {
                updatePaths[`ticketInfo.${key}`] = updateData.ticketInfo[key];
            });
        }

        if (updateData.paymentInfo) {
            Object.keys(updateData.paymentInfo).forEach(key => {
                if (typeof updateData.paymentInfo[key] === 'number') {
                    updatePaths[`paymentInfo.${key}`] = Math.round(updateData.paymentInfo[key]);
                }
            });
        }

        Object.keys(updateData).forEach(key => {
            if (key !== 'ticketInfo' && key !== 'paymentInfo') {
                updatePaths[key] = updateData[key];
            }
        });

        return await Customer.findByIdAndUpdate(
            id,
            { $set: updatePaths },
            { new: true, runValidators: true }
        );
    }, 3, 1000);
};

// Helper function to add a payment record with retry logic
const addPaymentRecordById = async (customerId, paymentRecord) => {
    return retry(async () => {
        const customer = await Customer.findById(customerId);
        if (!customer) throw new Error('Customer not found.');

        paymentRecord.date = moment().tz('Asia/Karachi').format('YYYY-MM-DDTHH:mm:ssZ'); // Asia/Karachi is UTC+5:00
        paymentRecord.amt = Math.round(paymentRecord.amt);

        customer.paymentInfo.dueAmount -= Math.round(paymentRecord.amt);
        customer.paymentInfo.amountPaid += Math.round(paymentRecord.amt);
        customer.paymentInfo.paymentRecords.push(paymentRecord);

        return await customer.save();
    }, 3, 1000);
};

// Helper function to delete a payment record by customer ID and record ID with retry logic
const deletePaymentRecordById = async (customerId, recordId) => {
    return retry(async () => {
        const customer = await Customer.findById(customerId);
        if (!customer) throw new Error('Customer not found.');

        const paymentRecordIndex = customer.paymentInfo.paymentRecords.findIndex(
            (record) => record._id.toString() === recordId
        );
        if (paymentRecordIndex === -1) throw new Error('Payment record not found.');

        const paymentRecordAmount = customer.paymentInfo.paymentRecords[paymentRecordIndex].amt;

        customer.paymentInfo.dueAmount += Math.round(paymentRecordAmount);
        customer.paymentInfo.amountPaid -= Math.round(paymentRecordAmount);

        customer.paymentInfo.paymentRecords.splice(paymentRecordIndex, 1);

        return await customer.save();
    }, 3, 1000);
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
