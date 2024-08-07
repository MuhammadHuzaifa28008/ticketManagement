const mongoose = require('mongoose');
const data = require("./dummy.json")
const Customer = require('../db/models/Customer.model')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({path: './config/.env'});

// MongoDB connection logic
const mongoURI = process.env.dbURI; // Replace with your actual MongoDB URI

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Function to recalculate and set payment values
const recalculatePaymentInfo = (customer) => {
  const { ticketPrice, profit, amountPaid } = customer.paymentInfo;
  
  // Calculate the invoice amount
  const invoiceAmount = ticketPrice+( ticketPrice * (profit / 100));
  customer.paymentInfo.invoiceAmount = invoiceAmount;
  
  // Ensure amountPaid is not greater than invoiceAmount
  if (amountPaid > invoiceAmount) {
    customer.paymentInfo.amountPaid = Math.random() * invoiceAmount;
  }
  
  // Calculate the due amount
  customer.paymentInfo.dueAmount = invoiceAmount - customer.paymentInfo.amountPaid;
  
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
    console.log(processedData)
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
