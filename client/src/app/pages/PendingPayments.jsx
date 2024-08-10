import React, { useContext, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { useAppContext } from '../context/AppContext';
import DuePaymentCard from '../components/pending.Payments/DuePaymentCard';
import PaymentsSummary from '../components/pending.Payments/PaymentsSummary';

const PendingPayments = () => {
  const { allCustomers, fetch, setFetch } = useAppContext();
  const customersWithDue = allCustomers.filter(
    (customer) => Math.round(customer.paymentInfo.dueAmount) > 0
  );
useEffect(()=>{
  // if(fetch){
    setFetch(true)
  // }
  
},[allCustomers])

  return (
    <Container>
      <PaymentsSummary customers={customersWithDue} />
      {customersWithDue.map((customer) => (
        <DuePaymentCard key={customer._id} customer={customer} />
      ))}
    </Container>
  );
};

export default PendingPayments;
