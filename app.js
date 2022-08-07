require('dotenv').config();
const express = require('express');
const logger = require('morgan');

const app = express();

const host = 'localhost';
const port = 3000;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/UserRouter');
const itemsRouter = require('./routes/ItemRouter');
const ordersRouter = require('./routes/OrderRouter');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/items', itemsRouter);
app.use('/api/orders', ordersRouter);

module.exports = app;
app.listen(port, host, () => {
  console.log(`server running on http://${host}:${port}`);
});
