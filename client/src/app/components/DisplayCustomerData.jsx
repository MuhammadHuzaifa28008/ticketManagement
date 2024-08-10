import React, { useRef } from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

function DisplayCustomerData({ customer }) {
  const { customerName, email, phoneNumber, dob, ticketInfo, paymentInfo } = customer;
  const billRef = useRef();

  const downloadPdf = () => {
    const doc = new jsPDF();
    html2canvas(billRef.current).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 10, 10);
      doc.save('customer-bill.pdf');
    });
  };

  const downloadImage = () => {
    html2canvas(billRef.current).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'customer-bill.png';
      link.click();
    });
  };

  return (
    <Box ref={billRef} sx={{ padding: 4, backgroundColor: '#f5f5f5', maxWidth: '600px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Customer Bill
      </Typography>
      <Typography variant="body1"><strong>Name:</strong> {customerName}</Typography>
      <Typography variant="body1"><strong>Email:</strong> {email}</Typography>
      <Typography variant="body1"><strong>Phone Number:</strong> {phoneNumber}</Typography>
      <Typography variant="body1"><strong>Date of Birth:</strong> {dob}</Typography>

      <Divider sx={{ marginY: 2 }} />

      <Typography variant="h6" gutterBottom>
        Ticket Information
      </Typography>
      <Typography variant="body1"><strong>PNR No:</strong> {ticketInfo.PNRNo}</Typography>
      <Typography variant="body1"><strong>Date of Traveling:</strong> {ticketInfo.dateOfTraveling}</Typography>
      <Typography variant="body1"><strong>Date of Issue:</strong> {ticketInfo.dateOfIssue}</Typography>

      <Divider sx={{ marginY: 2 }} />

      <Typography variant="h6" gutterBottom>
        Payment Information
      </Typography>
      <Typography variant="body1"><strong>Invoice Amount:</strong> {paymentInfo.invoiceAmount}</Typography>
      <Typography variant="body1"><strong>Amount Paid:</strong> {paymentInfo.amountPaid}</Typography>
      <Typography variant="body1"><strong>Due Amount:</strong> {paymentInfo.dueAmount}</Typography>

      {paymentInfo.paymentRecords && paymentInfo.paymentRecords.length > 0 && (
        <>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="h6" gutterBottom>
            Payment Records
          </Typography>
          {paymentInfo.paymentRecords.map((record, index) => (
            <Box key={index} sx={{ marginBottom: 1 }}>
              <Typography variant="body1"><strong>Amount:</strong> {record.amt}</Typography>
              <Typography variant="body1"><strong>Method:</strong> {record.method}</Typography>
              <Typography variant="body1"><strong>Time:</strong> {record.time}</Typography>
            </Box>
          ))}
        </>
      )}

      <Divider sx={{ marginY: 2 }} />

      <Box sx={{ marginTop: 4 }}>
        <Button variant="contained" color="primary" onClick={downloadPdf} sx={{ marginRight: 2 }}>
          Download PDF
        </Button>
        <Button variant="contained" color="secondary" onClick={downloadImage}>
          Download Image
        </Button>
      </Box>
    </Box>
  );
}

export default DisplayCustomerData;
