const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Custom validator to ensure the value is an integer
const integerValidator = {
  validator: Number.isInteger,
  message: '{VALUE} is not an integer value'
};

const paymentRecordSchema = new Schema({
  date: { type: Date, required: true },
  amt: { 
    type: Number, 
    required: true,
    validate: integerValidator // Validate that amt is an integer
  },
  method: { type: String, required: true }
});

const paymentInfoSchema = new Schema({
  ticketPrice: { 
    type: Number, 
    required: true,
    validate: integerValidator // Validate that ticketPrice is an integer
  },
  profit: { 
    type: Number, 
    required: true,
    validate: integerValidator // Validate that profit is an integer
  },
  invoiceAmount: { 
    type: Number, 
    required: true,
    validate: integerValidator // Validate that invoiceAmount is an integer
  },
  paymentRecords: [paymentRecordSchema],
  amountPaid: { 
    type: Number, 
    required: true,
    validate: integerValidator // Validate that amountPaid is an integer
  },
  dueAmount: { 
    type: Number, 
    required: true,
    validate: integerValidator // Validate that dueAmount is an integer
  }
});

const ticketInfoSchema = new Schema({
  PNRNo: { type: String, required: true },
  dateOfTraveling: { type: Date, required: true },
  dateOfIssue: { type: Date, required: true }
});

const customerSchema = new Schema({
  customerName: { type: String, required: true },
  email: { type: String},
  phoneNumber: { type: String, required: true },
  dob: { type: Date, required: true },
  ticketInfo: ticketInfoSchema,
  paymentInfo: paymentInfoSchema
});

// Middleware to round off values before saving
customerSchema.pre('save', function(next) {
  this.paymentInfo.ticketPrice = Math.round(this.paymentInfo.ticketPrice);
  this.paymentInfo.profit = Math.round(this.paymentInfo.profit);
  this.paymentInfo.invoiceAmount = Math.round(this.paymentInfo.invoiceAmount);
  this.paymentInfo.amountPaid = Math.round(this.paymentInfo.amountPaid);
  this.paymentInfo.dueAmount = Math.round(this.paymentInfo.dueAmount);

  this.paymentInfo.paymentRecords.forEach(record => {
    record.amt = Math.round(record.amt);
  });

  next();
});

module.exports = mongoose.model('Customer', customerSchema);
