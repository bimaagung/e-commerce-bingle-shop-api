require('dotenv').config();
const express = require('express');
const logger = require('morgan');

const app = express();

const host = 'localhost';
const port = 3000;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user.router');
const itemsRouter = require('./routes/item.router');
const ordersRouter = require('./routes/order.router');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/items', itemsRouter);
app.use('/api/orders', ordersRouter);

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.json({
    msg: err.message,
  });
}

app.use(errorHandler);

app.listen(port, host, () => {
  console.log(`server running on http://${host}:${port}`);
});
