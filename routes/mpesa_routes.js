
const router = require('express').Router();

const daraja=require('../controllers/mpesacontroller.js')
let {get_access_token_2,stk_push2,CallBackURI}=daraja


router.get('/token',get_access_token_2)
router.post('/stk/push',get_access_token_2, stk_push2)
// router.post('/stk/push/callback',CallBackURI())

module.exports=router