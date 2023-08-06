const express = require('express');

const userRouter = require('./userRouter');
const binRouter = require('./binRouter');
const vehicleRouter = require('./vehicleRouter');
const companyRouter = require('./companyRouter');
const taskRouter = require('./taskRouter');

let v1Router = express.Router();

v1Router.use('/users', userRouter);
v1Router.use('/bins', binRouter);
v1Router.use('/vehicles', vehicleRouter);
v1Router.use('/companies', companyRouter);
v1Router.use('/tasks', taskRouter);

module.exports = v1Router;
