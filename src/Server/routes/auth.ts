const router = require('express').Router()
const controller = require('../controllers/auth.ts')

router.post('/login', controller.loginControl)
router.post('/reset-password', controller.resetPasswordControl)
router.post('/clients', controller.clientControl)

module.exports = router
