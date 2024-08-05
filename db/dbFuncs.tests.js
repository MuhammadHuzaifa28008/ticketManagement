const mongoose = require('mongoose');
const Customer = require('./model/Customer.model'); // Adjust the path accordingly

// MongoDB connection logic
const mongoURI = 'mongodb://localhost:27017/test'; // Replace with your actual MongoDB URI

let id;

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Create a new customer
const createCustomer = async (customerData) => {
  try {
    const customer = new Customer(customerData);
    await customer.save();
    console.log('Customer created:', customer);
    id = customer._id
  } catch (err) {
    console.error('Error creating customer:', err);
  }
};

// Read customer(s) by filter
const readCustomers = async (filter) => {
  try {
    const customers = await Customer.find(filter);
    console.log('Customers found:', customers);
    return customers;
  } catch (err) {
    console.error('Error reading customers:', err);
  }
};

// Update a customer's information
const updateCustomer = async (_id, updateData) => {
  try {
    const updatedCustomer = await Customer.findOneAndUpdate(
      { _id },
      { $set: updateData },
      { new: true, runValidators: true }
    );
    console.log('Updated Customer:', updatedCustomer);
  } catch (err) {
    console.error('Error updating customer:', err);
  }
};

// Delete a customer
const deleteCustomer = async (_id) => {
  try {
    const result = await Customer.findOneAndDelete({ _id });
    console.log('Customer deleted:', result);
  } catch (err) {
    console.error('Error deleting customer:', err);
  }
};

// Add a payment record to a customer's paymentInfo
const addPaymentRecord = async (_id, newPaymentRecord) => {
  try {
    const updatedCustomer = await Customer.findOneAndUpdate(
      { _id },
      { $push: { 'paymentInfo.paymentRecords': newPaymentRecord } },
      { new: true, runValidators: true }
    );
    console.log('Updated Customer with new payment record:', updatedCustomer);
  } catch (err) {
    console.error('Error adding payment record:', err);
  }
};

// Example usage
(async () => {
  // Example data for creating a customer
  const customerData = {
    customerName: 'Alice Johnson',
    email: 'alice.j@example.com',
    phoneNumber: '987-654-3210',
    dob: new Date('1990-02-15'),
    ticketInfo: {
      PNRNo: 'PNR987654',
      dateOfTraveling: new Date('2024-08-16'),
      dateOfIssue: new Date('2024-08-01')
    },
    paymentInfo: {
      ticketPrice: 75,
      profit: 25,
      invoiceAmount: 400,
      paymentRecords: [
        { date: new Date(), amt: 100, method: 'Credit Card' }
      ],
      paymentStatus: 'complete',
      paymentMethod: 'Credit Card',
      amountPaid: 400,
      dueAmount: 0
    }
  };

  await createCustomer(customerData);

  // Reading customers
  await readCustomers({ _id: id });

  // Updating a customer
  await updateCustomer(id, { phoneNumber: '123-456-7890' });

  // Adding a payment record
  await addPaymentRecord(id, { date: new Date(), amt: 50, method: 'Paypal' });

  // Deleting a customer
  await deleteCustomer(id);

  mongoose.connection.close(); // Close the connection after operations
})();
