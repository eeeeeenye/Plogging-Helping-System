const router = require('express').Router()
const controller = require('../controllers/user')

router.patch(':params', controller.userEditControl)
router.post(':client', controller.userInfoControl)
router.get('/info', controller.user)

module.exports = router
