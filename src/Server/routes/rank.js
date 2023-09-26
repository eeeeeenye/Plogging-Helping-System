const router = require('express').Router()
const controller = require('../controllers/rank')

router.post('/client-ranking', controller.clientRankingControl)

module.exports = router
