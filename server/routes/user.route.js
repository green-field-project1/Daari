const express = require('express')
const {updateUser} = require('../controllers/user.controller.js')
const { verifyToken } = require('../utils/verifyUser.js')

const router = express.Router()


router.get('/test',(req,res)=>{
    res.send('hello world')
})

router.post('/update/:id',verifyToken,updateUser)

module.exports = router