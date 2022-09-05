const express=require('express');
const router=express.Router();
const { check, validationResult } = require('express-validator');

//@route  POST/users
//@desc   Register user
//@access Public

router.post(
    '/',
    [
        check('name','Name is required')
        .not()
        .isEmpty(),
        check('email','Email is required').isEmail(),
        check('password','Please enter a password with 6 or more letters').isLength({ min: 5 }),
    ],
    (req,res)=>{
        errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        console.log(req.body);
        res.send('User route');
    }
);

module.exports=router;