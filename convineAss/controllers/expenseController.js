import Expense from '../models/Expense.js';
import generateCSV from '../utils/csvGenerator.js';

export const addExpense = async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getUserExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ 'participants.user': req.params.userId });
    res.json(expenses);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getOverallExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Existing functions...

export const downloadBalanceSheet = async (req, res) => {
  try {
    const expenses = await Expense.find().populate('participants.user', 'name email');

    // Transform data to be CSV-friendly
    const data = expenses.map(expense => ({
      description: expense.description,
      amount: expense.amount,
      splitMethod: expense.splitMethod,
      participants: expense.participants.map(part => `${part.user.name} (${part.user.email})`).join(', '),
      date: expense.date.toISOString(),
    }));

    const csv = generateCSV(data);
    
    res.setHeader('Content-disposition', 'attachment; filename=balance_sheet.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

