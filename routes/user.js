const router = require('express').Router();


const {login_user,register_user,make_payment,registration_page,login_page,pay_page, sign_up, login_2}=require('../controllers/user')
const auth=require('../middleware/auth')
let {get_access_token_2,stk_push2,CallBackURI}=require('../controllers/mpesacontroller')

router.get('/register', registration_page)
router.get('/login',login_page)
router.get('/pay_page',pay_page)
router.post('/register', sign_up)
router.post('/login',login_2)
router.post('/make_payment',get_access_token_2,stk_push2)

module.exports=router