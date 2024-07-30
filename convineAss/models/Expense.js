import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  splitMethod: { type: String, required: true }, // 'equal', 'exact', 'percentage'
  participants: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amountOwed: Number,
    percentage: Number
  }],
  date: { type: Date, default: Date.now }
});

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;
