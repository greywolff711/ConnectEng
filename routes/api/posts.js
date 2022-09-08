const express=require('express');
const router=express.Router();
const { check, validationResult } = require('express-validator');
const auth=require('../../middleware/auth');
const User=require('../../models/User');
const Post=require('../../models/Post');
const Profile=require('../../models/Profile');

//@route  POST api/post
//@desc   post a request
//@access Private

router.post('/',
    auth,
    check('text','text is required').not().isEmpty(),
    async (req,res)=>{
        errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        try {
            const user=User.findById(req.user.id).select('-password');
            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
              });
            
            const post=await newPost.save();
            res.json(post);
        } catch (err) {
            console.log(err);
            res.status(500).send('Server Error');
        }

    });

module.exports=router;