const express = require('express');

const userRouter = require('./userRouter');
const taskRouter = require('./taskRouter');
const notificationRouter = require('./notificationRouter');
const categoryRouter = require('./categoryRouter');
const authRouter = require('./authRouter');

const router = express.Router();

router.use('/users', userRouter);
router.use('/tasks', taskRouter);
router.use('/notifications', notificationRouter);
router.use('/categories', categoryRouter);
router.use('/auth', authRouter);

module.exports = router;
