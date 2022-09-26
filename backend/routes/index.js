const productRouter = require('./product');
const userRouter = require('./user');
const express = require('express');

const route = (app) => {
    app.use('/product', productRouter);
    app.use('/user', userRouter);
}

module.exports = route;
