import { useEffect, useState } from 'react';
import customerData from '../../assets/dummy.json' with {type:'json'};
// import fs from 'fs'; // This is typically used in Node.js environments
// import path from 'path'
// fs path and savetofile works wiht node runfile only not for react
import { useAppContext } from '../context/AppContext';



const useCustomerDataManagement = () => {
  const {allCustomers, setAllCustomers}=useAppContext()
    const [customers, setCustomers] = useState(allCustomers);

useEffect(()=>{
setCustomers(allCustomers)
},[allCustomers])
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
      // saveToFile(updatedCustomers);
      // setAllCustomers(updatedCustomers)
      return updatedCustomers;
    });
  };

  const updateCustomer = async (updatedCustomer) => {
    console.warn('updateCustomer is being called\n');
    setCustomers((customers) => {
      const updatedCustomers =  customers.map((customer) =>{

       console.log( customer.id)
        customer.id === updatedCustomer.id ? updatedCustomer : customer
      });
      // saveToFile(updatedCustomers); // Uncomment if needed
      // setAllCustomers(updatedCustomers);
      return updatedCustomers;
    });
  };
  

  const deleteCustomer = (customerName) => {
    setCustomers((prevCustomers) => {
      const updatedCustomers = prevCustomers.filter(
        (customer) => customer.customerName !== customerName
      );
      // saveToFile(updatedCustomers);
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
      // saveToFile(updatedCustomers); 
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

export default useCustomerDataManagement;
