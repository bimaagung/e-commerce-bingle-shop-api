module.exports = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    status: 'failed',
    message: err.message,
  });
};
