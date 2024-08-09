import React, { useContext, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { useAppContext } from '../context/AppContext';
import DuePaymentCard from '../components/pending.Payments/DuePaymentCard';
import PaymentsSummary from '../components/pending.Payments/PaymentsSummary';


const PendingPayments = () => {
  const { allCustomers } = useAppContext();

  const customersWithDue = allCustomers.filter(
    (customer) => customer.paymentInfo.dueAmount > 0
  );
useEffect(()=>{
console.log('updating due payments with context')
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
