const router = require('express').Router()
const controller = require('../controllers/map')

router.get('/publicToilets', controller.publicToiletControl)

module.exports = router
