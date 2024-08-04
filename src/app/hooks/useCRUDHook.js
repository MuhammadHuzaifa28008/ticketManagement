import { useState } from 'react';
import customerData from '../../assets/dummy.json' with {type:'json'};
import fs from 'fs'; // This is typically used in Node.js environments
import path from 'path'
const useCustomerData = () => {
    const [customers, setCustomers] = useState(customerData);
    const saveToFile = (data) => {
        try {
            // const __dirname = "./src/assets/";
            const __dirname = "../../assets/";
          const filePath = path.resolve(__dirname, 'dummy.json');
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        } catch (error) {
          console.error('Error writing to file:', error);
        }
      };
    

  const createCustomer = (newCustomer) => {
    setCustomers((prevCustomers) => {
      const updatedCustomers = [...prevCustomers, newCustomer];
      saveToFile(updatedCustomers);
      return updatedCustomers;
    });
  };

  const updateCustomer = (updatedCustomer) => {
    setCustomers((prevCustomers) => {
      const updatedCustomers = prevCustomers.map((customer) =>
        customer.customerName === updatedCustomer.customerName ? updatedCustomer : customer
      );
      saveToFile(updatedCustomers);
      return updatedCustomers;
    });
  };

  const deleteCustomer = (customerName) => {
    setCustomers((prevCustomers) => {
      const updatedCustomers = prevCustomers.filter(
        (customer) => customer.customerName !== customerName
      );
      saveToFile(updatedCustomers);
      return updatedCustomers;
    });
  };

  const updatePaymentInfo = (customerName, newPaymentInfo) => {
    setCustomers((prevCustomers) => {
      const updatedCustomers = prevCustomers.map((customer) =>
        customer.customerName === customerName
          ? { ...customer, paymentInfo: newPaymentInfo }
          : customer
      );
      saveToFile(updatedCustomers);
      return updatedCustomers;
    });
  };

  return {
    customers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    updatePaymentInfo,
  };
};


// saveToFile('data')

export default useCustomerData;
