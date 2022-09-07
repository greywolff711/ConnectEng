const express=require('express');
const router=express.Router();
const auth=require('../../middleware/auth');
const User=require('../../models/User');
const jwt=require('jsonwebtoken');
const config=require('config');
const { check, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');

//@route  GET/auth
//@desc   Test route
//@access Public

router.get('/',auth,async (req,res)=>{
    try{
        const user=await User.findById(req.user.id).select('-password');
        //req.user can be accessed throughout the middleware because of its definitation in auth.js in middleware
        res.json(user);
    }
    catch(err){
        console.log(err.message);
    }
});

//@route  POST/auth
//@desc   posting auth route
//@access Public
router.post(
    '/',
    [
        check('email','Email is required').isEmail(),
        check('password','Password error').exists(),
    ],
    async (req,res)=>{
        errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        
        const {email,password}=req.body;

        try{
            //See if user is present
            let user=await User.findOne({email});
            if(!user){
                return res.status(400).json({error:[{msg:'Invalid credentials'}]});
            }

            const isMatch=await bcrypt.compare(password,user.password);
            if(!isMatch)return res.status(400).json({error:[{msg:'Invalid credentials'}]});
            //return json web token
            const payload={
                user:{
                    id:user.id
                }
            }
            jwt.sign(payload,config.get('jwttoken'),{expiresIn:3600},(err,token)=>{
                if(err)throw err;
                res.json({token});
            });
        }
        catch(err){
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports=router;