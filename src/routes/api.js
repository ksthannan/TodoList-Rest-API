const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const todoController = require('../controller/TodoListController')
const authVerifyMiddleware = require('../middleware/authVerifyMiddleware')

// User registration & login 
router.post('/userRegistration', userController.userRegistration)
router.post('/userLogin', userController.userLogin)

// User read data 
router.post('/viewProfile', authVerifyMiddleware, userController.viewProfile)

// User update data 
router.post('/updateProfile', authVerifyMiddleware, userController.updateProfile)

// create todo
router.post('/createTodo', authVerifyMiddleware, todoController.createTodo)

// select todo 
router.post('/selectTodo', authVerifyMiddleware, todoController.selectTodo)

// update todo 
router.post('/updateTodo', authVerifyMiddleware, todoController.updateTodo)

// update status todo 
router.post('/updateStatusTodo', authVerifyMiddleware, todoController.updateStatusTodo)

// remove todo 
router.post('/removeTodo', authVerifyMiddleware, todoController.removeTodo)

// filterTodoByStatus  
router.post('/filterTodoByStatus', authVerifyMiddleware, todoController.filterTodoByStatus)

// filterTodoByStatus  
router.post('/filterTodoByDate', authVerifyMiddleware, todoController.filterTodoByDate)



module.exports = router