const express=require('express');
const router=express.Router();
const gravatar=require('gravatar');
const jwt=require('jsonwebtoken');
const config=require('config');
const { check, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');

const User=require('../../models/User');

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
    async (req,res)=>{
        errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        
        const {name,email,password}=req.body;

        try{
            //See if user is present
            let user=await User.findOne({email});
            if(user){
                return res.status(400).json({error:[{msg:'User already taken'}]});
            }
            //use gravatar
            const avatar=gravatar.url(email,{
                s:'200',//size
                r:'pg',//rating
                d:'mm'//default profile image
            })

            user=new User({
                name,
                email,
                avatar,
                password
            })
            //encrypt password as it is plane text
            const salt=await bcrypt.genSalt(10);
            user.password=await bcrypt.hash(password,salt);
            await user.save();
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