import React, { useRef } from 'react';
import { Box, Typography, Button, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { formatDateReadable } from '../utils/formatDate';

function DisplayCustomerData({ customer }) {
  const { customerName, email, phoneNumber, dob, ticketInfo, paymentInfo } = customer;
  const billRef = useRef();

  const downloadPdf = () => {
    const buttons = billRef.current.querySelectorAll('button');
    buttons.forEach(button => button.style.display = 'none');

    html2canvas(billRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // PDF width in mm
      const pageHeight = 295; // PDF height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const doc = new jsPDF('p', 'mm', 'a4');
      let heightLeft = imgHeight;
      let position = 0;

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      doc.save(`${customerName}_${ticketInfo.PNRNo}.pdf`);
    }).finally(() => {
      buttons.forEach(button => button.style.display = '');
    });
  };

  const downloadImage = () => {
    const buttons = billRef.current.querySelectorAll('button');
    buttons.forEach(button => button.style.display = 'none');

    html2canvas(billRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `${customerName}_${ticketInfo.PNRNo}.png`;
      link.click();
    }).finally(() => {
      buttons.forEach(button => button.style.display = '');
    });
  };

  return (
    <Paper ref={billRef} sx={{ padding: 4, backgroundColor: 'background.paper', maxWidth: '900px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Customer Bill
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ color: 'primary.main' }}>
            {customerName}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {email} | {phoneNumber}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            DOB: {formatDateReadable(dob)}
          </Typography>
          
          <Divider sx={{ marginY: 2 }} />

          <Typography variant="h6" gutterBottom>
            Ticket Info
          </Typography>
          <Typography variant="body1"><strong>PNR:</strong> {ticketInfo.PNRNo}</Typography>
          <Typography variant="body1"><strong>Travel Date:</strong> {formatDateReadable(ticketInfo.dateOfTraveling)}</Typography>
          <Typography variant="body1"><strong>Issue Date:</strong> {formatDateReadable(ticketInfo.dateOfIssue)}</Typography>

          <Divider sx={{ marginY: 2 }} />

          <Typography variant="h6" gutterBottom>
            Payment Info
          </Typography>
          <Typography variant="body1"><strong>Invoice:</strong> ${paymentInfo.invoiceAmount}</Typography>
          <Typography variant="body1"><strong>Paid:</strong> ${paymentInfo.amountPaid}</Typography>
          <Typography variant="body1"><strong>Due:</strong> ${paymentInfo.dueAmount}</Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          {paymentInfo.paymentRecords && paymentInfo.paymentRecords.length > 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Payment Records
              </Typography>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Amount</strong></TableCell>
                      <TableCell><strong>Method</strong></TableCell>
                      <TableCell><strong>Date</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paymentInfo.paymentRecords.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell>${record.amt}</TableCell>
                        <TableCell>{record.method}</TableCell>
                        <TableCell>{formatDateReadable(record.date)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Grid>
      </Grid>

      <Divider sx={{ marginY: 3 }} />

      <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={downloadPdf}>
          Download PDF
        </Button>
        <Button variant="contained" color="secondary" onClick={downloadImage}>
          Download Image
        </Button>
      </Box>
    </Paper>
  );
}

export default DisplayCustomerData;
