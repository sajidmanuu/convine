import express from 'express';
import { addExpense, getUserExpenses, getOverallExpenses, downloadBalanceSheet } from '../controllers/expenseController.js';

const router = express.Router();

router.post('/', addExpense);
router.get('/user/:userId', getUserExpenses);
router.get('/all', getOverallExpenses);
router.get('/download', downloadBalanceSheet);

export default router;
