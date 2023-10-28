export {}

const router = require('express').Router()
const controller = require('../controllers/picture.ts')

router.post('/save', controller.savePicture)
router.get('/info', controller.infoPicture)

module.exports = router
