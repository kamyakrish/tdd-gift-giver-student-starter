//Import express and morgan
const express = require('express');
const morgan = require('morgan');
const giftExchange = require('./routes/gift-exchange')
const { NotFoundError, BadRequestError } = require('./utils/errors');

const app = express();

//incorporate logging middleware

app.use(morgan('tiny'));
app.use(express.json());
app.use('/gift-exchange', giftExchange);

// Get Request Handler
app.get('/', (req, res) => {
    res.send({ "ping": "pong" });
    res.status(200).send('Success!');
});

// 404 middleware
app.use((req, res, next) => {
    return next(new NotFoundError);
});

// Generic error handler midleware
app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        error: { message: err.message, status: err.status }
    });
});

module.exports = app;
