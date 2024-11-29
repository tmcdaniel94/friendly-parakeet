const router = require('express').Router();
const ThoughtsRoutes = require('./ThoughtsRoutes');
const UserRoutes = require('./UserRoutes');

router.use('/thoughts', ThoughtsRoutes);
router.use('/users', UserRoutes);

module.exports = router;