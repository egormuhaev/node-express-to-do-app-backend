const Router = require('express').Router
const router = new Router()
const taskController = require('../controller/task.controller')

router.post('/task', taskController.addNewTask)
router.delete('/task/:id', taskController.deleteTaskById)
router.put('/task/status/:id', taskController.comleteTaskById)
router.put('/task/imp/:id', taskController.setImpTaskById)
router.put('/task', taskController.taskAddToGroup)
router.get('/task/:id', taskController.getAllTaskByUserId)



module.exports = router

