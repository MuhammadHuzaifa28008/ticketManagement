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

// Function to insert data into MongoDB
const insertData = async () => {
  try {
    // Ensure the connection is established
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(mongoURI);
    }

    // Insert data
    await Customer.insertMany(data);

    console.log('Data inserted successfully');
    mongoose.connection.close(); // Close the connection after inserting
  } catch (err) {
    console.error('Error inserting data:', err);
  }finally{
    mongoose.connection.close()
  }
};

// Call the function to insert data
insertData();
