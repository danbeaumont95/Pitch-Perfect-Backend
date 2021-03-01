const express = require('express')
const usersRouter = express.Router();
const { getAllUsers, addNewUser, getUserById } = require('../controllers/users.controller')

usersRouter.route('/').get(getAllUsers).post(addNewUser);
usersRouter.route('/:user_id').get(getUserById)

module.exports = usersRouter