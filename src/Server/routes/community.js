const router = require('express').Router()
const controller = require('../controllers/community')

router.patch('/edit') //수정
router.post('/save') //등록
router.delete('/') //
router.get('/info', controller.BoardInfo) //community 목록
//community 클릭시
//내 community

module.exports = router
