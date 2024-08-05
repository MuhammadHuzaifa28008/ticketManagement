const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentRecordSchema = new Schema({
  date: { type: Date, required: true },
  amt: { type: Number, required: true },
  method: { type: String, required: true }
});

const paymentInfoSchema = new Schema({
  ticketPrice: { type: Number, required: true },
  profit: { type: Number, required: true },
  invoiceAmount: { type: Number, required: true },
  paymentRecords: [paymentRecordSchema],
  paymentStatus: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  amountPaid: { type: Number, required: true },
  dueAmount: { type: Number, required: true }
});

const ticketInfoSchema = new Schema({
  PNRNo: { type: String, required: true },
  dateOfTraveling: { type: Date, required: true },
  dateOfIssue: { type: Date, required: true }
});

const customerSchema = new Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  dob: { type: Date, required: true },
  ticketInfo: ticketInfoSchema,
  paymentInfo: paymentInfoSchema
});

module.exports = mongoose.model('Customer', customerSchema);
