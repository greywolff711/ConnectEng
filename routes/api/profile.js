const express=require('express');
const router=express.Router();

//@route  GET/profile
//@desc   Test route
//@access Public

router.get('/',(req,res)=>res.send('profile PAGE'));

module.exports=router;