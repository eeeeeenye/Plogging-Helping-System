const router = require('express').Router()
const controller = require('../controllers/user')

router.put(':params', controller.userAddressEditControl)
router.post(':client', controller.userInfoControl)

module.exports = router
