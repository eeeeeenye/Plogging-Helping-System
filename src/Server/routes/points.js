const router = require('express').Router()
const controller = require('../controllers/points')

router.post('/save', controller.savePointControl)
router.post('/info/:clientId', controller.pointHistoryControl)

module.exports = router
