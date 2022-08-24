require('dotenv').config();
const express = require('express');
const logger = require('morgan');

const app = express();

const serverError = require('./middleware/server_error');

const index_router = require('./routes/index.routes');
const auth_router = require('./routes/auth.routes');
const category_router = require('./routes/category.routes');
const item_router = require('./routes/item.routes');
const order_router = require('./routes/order.routes');
const admin_router = require('./routes/admin.routes');
const user_router = require('./routes/user.routes');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', index_router);
app.use('/api/auth/', auth_router);
app.use('/api/category/', category_router);
app.use('/api/item/', item_router);
app.use('/api/order/', order_router);
app.use('/api/admin/', admin_router);
app.use('/api/user/', user_router);

// handle server error
app.use(serverError);

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(
    `server running on http://${process.env.HOST}:${process.env.PORT}`,
  );
});
