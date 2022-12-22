const Router = require('express').Router
const router = new Router()
const groupController = require('../controller/group.controller')


router.post('/group', groupController.addNewGroupByUser)
router.delete('/group/:id', groupController.deleteGroupById)
router.put('/group', groupController.renameGroupById)
router.get('/group/:id', groupController.getAllGroupByUser)

module.exports = router