const express=require('express');
const router=express.Router();
const auth=require('../../middleware/auth');
const Profile=require('../../models/Profile');
const { check, validationResult } = require('express-validator');
const { json } = require('express');

//@route  GET api/profile/me
//@desc   get the user details
//@access Private

router.get('/me',auth,async(req,res)=>{
    try{
        const profile=await Profile.findOne({user:req.user.id}).populate('user',['name','avatar']);
        if(!profile)return res.status(400).json({msg:'No Profile found'});
        res.json(profile);
    }
    catch(err){

    }
});

//@route  POST api/profile
//@desc   post the user details
//@access Private

router.post('/',
    auth,
    check('status', 'Status is required').notEmpty(),
    check('skills', 'Skills is required').notEmpty(),
    async (req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty())return res.status(400).json({errors:errors.array()});
        //Start building profile object
        const {
            website,
            skills,
            company,
            location,
            bio,
            status,
            youtube,
            twitter,
            linkedin,
            instagram,
        } = req.body;
        const profileFields={};
        profileFields.user=req.user.id;
        if(company)profileFields.company=company;
        if(website)profileFields.company=company;
        if(location)profileFields.location=location;
        if(bio)profileFields.bio=bio;
        if(status)profileFields.status=status;
        if(skills)profileFields.skills=skills.split(',').map(skill=>skill.trim());

        //Build Social object
        profileFields.social={};

        if(youtube)profileFields.social.youtube=youtube;
        if(twitter)profileFields.social.twitter=twitter;
        if(linkedin)profileFields.social.linkedin=linkedin;
        if(instagram)profileFields.social.instagram=instagram;
        console.log(profileFields.skills);

        try{
            let profile=await Profile.findOne({user:req.user.id});

            //If profile is found
            if(profile){
                profile=await Profile.findOneAndUpdate(
                    {user:req.user.id},
                    {$set:profileFields},
                    {new: true}
                )

                return res.json(profile);
            }

            //New profile
            profile=new Profile(profileFields);
            await profile.save();
            return res.json(profile);
        }
        catch(err){
            console.log(err.message);
            res.status(500).json({msg:'Server Error'})
        }

        res.send('Hello');
    })

module.exports=router;