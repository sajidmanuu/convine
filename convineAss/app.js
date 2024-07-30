import express from 'express';
import bodyParser from 'body-parser';
import db from './utils/db.js';
import userRoutes from './routes/userRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import config from './config/config.js';

const app = express();
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/expenses', expenseRoutes);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
