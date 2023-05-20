const {getalljobs,getjob,updatejob,deletejob,createjob,} =require('../controllers/jobs')
const express =require('express')

const router =express.Router()



router.route('/').get(getalljobs).post(createjob)
router.route('/:id').patch(updatejob).get(getjob).delete(deletejob)

module.exports=router