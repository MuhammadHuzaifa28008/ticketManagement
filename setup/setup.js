const mongoose = require('mongoose');
const data = require("./dummy.json");
const Customer = require('../db/models/Customer.model');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: './config/.env' });

// MongoDB connection logic
const mongoURI = process.env.dbURI;

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Function to recalculate and set payment values
const recalculatePaymentInfo = (customer) => {
  let { ticketPrice, profit, amountPaid } = customer.paymentInfo;

  // Round ticketPrice and profit to the nearest integer
  ticketPrice = Math.round(ticketPrice);
  profit = Math.round(profit);

  // Calculate the invoice amount and round it to the nearest integer
  const invoiceAmount = Math.round(ticketPrice + (ticketPrice * (profit / 100)));
  customer.paymentInfo.invoiceAmount = invoiceAmount;

  // Ensure amountPaid is not greater than invoiceAmount and round it to the nearest integer
  if (amountPaid > invoiceAmount) {
    amountPaid = Math.round(Math.random() * invoiceAmount);
  } else {
    amountPaid = Math.round(amountPaid);
  }
  customer.paymentInfo.amountPaid = amountPaid;

  // Calculate the due amount and round it to the nearest integer
  customer.paymentInfo.dueAmount = Math.round(invoiceAmount - amountPaid);

  return customer;
};

// Function to insert data into MongoDB
const insertData = async () => {
  try {
    // Ensure the connection is established
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(mongoURI);
    }

    // Process data before inserting
    const processedData = data.map(recalculatePaymentInfo);

    // Insert data
    await Customer.insertMany(processedData);

    console.log('Data inserted successfully');
  } catch (err) {
    console.error('Error inserting data:', err);
  } finally {
    mongoose.connection.close(); // Close the connection after inserting
  }
};

// Call the function to insert data
insertData();
