export {}

const router = require('express').Router()
const controller = require('../controllers/community.ts')

router.post('/save')
router.get('/info')

module.exports = router
