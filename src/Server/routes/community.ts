export {}

const router = require('express').Router()
const controller = require('../controllers/community.ts')

router.patch('/edit') //수정
router.post('/save', controller.saveCommunityControl) //등록
router.delete('/') //
router.get('/info', controller.communityInfo) //community 목록
// router.get('/select/:community_id', controller.communitySelectInfo) //community 클릭시

//내 community

module.exports = router
