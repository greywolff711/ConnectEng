const express=require('express');
const router=express.Router();

//@route  GET/post
//@desc   Test route
//@access Public

router.get('/',(req,res)=>res.send('post PAGE'));

module.exports=router;