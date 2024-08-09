const mongoose = require('mongoose');
const Customer = require('../db/models/Customer.model');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: './config/.env' });

// MongoDB connection logic
const mongoURI = process.env.dbURI; // Ensure you have your MongoDB URI in the .env file

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Function to delete all customers from the database
const deleteAllCustomers = async () => {
  try {
    // Ensure the connection is established
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(mongoURI);
    }

    // Delete all documents in the Customer collection
    const result = await Customer.deleteMany({});
    console.log(`Deleted ${result.deletedCount} customers from the database.`);

  } catch (err) {
    console.error('Error deleting customers:', err);
  } finally {
    mongoose.connection.close(); // Close the connection after operation
  }
};

// Call the function to delete all customers
deleteAllCustomers();
