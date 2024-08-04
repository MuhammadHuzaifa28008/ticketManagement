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
    // console.log('profitAmount = ', profitAmount);
  
    // Calculate invoice amount
    const invoiceAmount = ticketPriceNumber + profitAmount;
    return invoiceAmount;
  }
  // Function to calculate the due amount
  function calculateDueAmount(amountPaid, invoiceAmount) {
    const dueAmount = invoiceAmount - amountPaid;
    return dueAmount;
  }
  
  export {calculateDueAmount, calculateInvoiceAmount}