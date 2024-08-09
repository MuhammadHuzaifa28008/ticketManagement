// Function to calculate the invoice amount
function calculateInvoiceAmount(ticketPrice, profitPercentage) {
  // Convert the arguments to numbers
  const ticketPriceNumber = Number(ticketPrice);
  const profitPercentageNumber = Number(profitPercentage);

  // Check if conversion resulted in NaN, and handle accordingly
  if (isNaN(ticketPriceNumber) || isNaN(profitPercentageNumber)) {
    console.error('Invalid input: Both ticketPrice and profitPercentage should be numbers or numeric strings.');
    return null; // Return null or any appropriate value for invalid inputs
  }

  // Calculate profit amount
  const profitAmount = (profitPercentageNumber / 100) * ticketPriceNumber;

  // Calculate invoice amount and round to the nearest integer
  const invoiceAmount = Math.round(ticketPriceNumber + profitAmount);
  return invoiceAmount;
}

// Function to calculate the due amount
function calculateDueAmount(amountPaid, invoiceAmount) {
  // Convert the arguments to numbers
  const amountPaidNumber = Number(amountPaid);
  const invoiceAmountNumber = Number(invoiceAmount);

  // Check if conversion resulted in NaN, and handle accordingly
  if (isNaN(amountPaidNumber) || isNaN(invoiceAmountNumber)) {
    console.error('Invalid input: Both amountPaid and invoiceAmount should be numbers or numeric strings.');
    return null; // Return null or any appropriate value for invalid inputs
  }

  // Calculate due amount and round to the nearest integer
  const dueAmount = Math.round(invoiceAmountNumber - amountPaidNumber);
  return dueAmount;
}

const returnNumber =(number) => {
// Check if conversion resulted in NaN, and handle accordingly
if (isNaN(number)) {
  console.error('Invalid input: it is not a number');
  return null; // Return null or any appropriate value for invalid inputs
}

// Calculate due amount and round to the nearest integer
const integerValue = Math.round(number);
return integerValue;
}

export { calculateDueAmount, calculateInvoiceAmount, returnNumber };
