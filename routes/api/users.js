const express=require('express');
const router=express.Router();

//@route  GET/users
//@desc   Test route
//@access Public

router.get('/',(req,res)=>res.send('USER PAGE'));

module.exports=router;