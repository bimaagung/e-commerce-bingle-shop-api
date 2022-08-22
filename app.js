require('dotenv').config();
const express = require('express');
const logger = require('morgan');

const app = express();

const host = 'localhost';
const port = 3000;

const indexRouter = require('./routes/index');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/', indexRouter);

function errorHandler(err, req, res, next) {
  console.log(err);
  res.status(500).json({
    status: 'failed',
    message: err.message,
  });
}

app.use(errorHandler);

app.listen(port, host, () => {
  console.log(`server running on http://${host}:${port}`);
});
